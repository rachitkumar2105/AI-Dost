import { WelcomeScreen } from "@/components/WelcomeScreen";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatInput } from "@/components/ChatInput";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Copy } from "lucide-react";

// Helper to determine if code is multiline (simple heuristic)
const parsedResponseIsMultiline = (text: string) => text.includes('\n');

import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useConversations } from "@/hooks/useConversations";
import { useNavigate } from "react-router-dom";

const Index = () => {
    // Hooks
    const { toast } = useToast();
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    // Custom hook for managing conversations and reliable state
    const {
        conversations,
        currentConversation,
        messages,
        loading: historyLoading,
        selectConversation,
        deleteConversation,
        deleteAllConversations,
        startNewChat,
        addMessage,
        setMessages, // exposed to manually update local state for temporary chat
        resetToHome
    } = useConversations();

    // Local state for UI
    const [isTemporary, setIsTemporary] = useState(false);
    const [sending, setSending] = useState(false);

    // Determines if we are in "loading" state (either fetching history or sending a message)
    const isLoading = historyLoading || sending;

    // Fail-safe: Redirect if no user (should be handled by ProtectedRoute, but double check)
    useEffect(() => {
        if (!user && !historyLoading) {
            navigate("/auth");
        }
    }, [user, historyLoading, navigate]);

    const handleSend = async (messageContent: string) => {
        if (!messageContent.trim()) return;

        setSending(true);
        try {
            let currentMessages = messages;
            let activeConversationId = currentConversation?.id;

            // 1. Handle User Message
            if (isTemporary) {
                // In temp mode, just update local state
                const tempUserMsg = {
                    id: crypto.randomUUID(),
                    role: 'user',
                    content: messageContent,
                    created_at: new Date().toISOString()
                };
                currentMessages = [...messages, tempUserMsg as any];
                setMessages(currentMessages);
            } else {
                // In persistent mode, save to DB

                // If there is no active conversation, create one first!
                if (!activeConversationId) {
                    const newConv = await startNewChat();
                    if (!newConv) throw new Error("Failed to create new conversation");
                    activeConversationId = newConv.id;
                }

                await addMessage('user', messageContent, activeConversationId);
                // addMessage updates the 'messages' from the hook automatically via re-fetch or state update
                // However, we need the *updated* list for the API call context. 
                // Since state updates are async, we construct the context optimistically or wait.
                // For simplicity, we'll append optimistically for the API call context.
                currentMessages = [...messages, { role: 'user', content: messageContent } as any];
            }

            // 2. Call AI API
            const { data, error } = await supabase.functions.invoke('chats', {
                body: { messages: currentMessages.map(m => ({ role: m.role, content: m.content })) }
            });

            if (error) throw error;
            if (data.error) throw new Error(data.details || data.error);

            const aiResponse = data.reply || "No response generated.";

            // 3. Handle AI Response
            if (isTemporary) {
                const tempAiMsg = {
                    id: crypto.randomUUID(),
                    role: 'assistant',
                    content: aiResponse,
                    created_at: new Date().toISOString()
                };
                setMessages(prev => [...prev, tempAiMsg as any]);
            } else {
                await addMessage('assistant', aiResponse, activeConversationId);
            }

        } catch (error: any) {
            console.error('Error sending message:', error);
            toast({
                title: "Error",
                description: error.message || "Failed to send message",
                variant: "destructive",
            });
        } finally {
            setSending(false);
        }
    };

    const handleNewChat = async () => {
        if (isTemporary) {
            setMessages([]);
            // Remain in temp mode? Or switch back? Usually new chat implies reset.
            // Let's keep the user's preference for mode, but clear messages.
        } else {
            // Start a fresh persisted chat
            await startNewChat();
        }
    };

    return (
        <div className="flex h-screen w-full bg-background overflow-hidden relative">
            <div className="hidden md:flex w-[260px] flex-shrink-0">
                <ChatSidebar
                    conversations={conversations}
                    currentConversation={currentConversation}
                    onSelectConversation={(c) => {
                        setIsTemporary(false); // Switch off temp mode when selecting history
                        selectConversation(c);
                    }}
                    onNewChat={handleNewChat}
                    onDeleteConversation={deleteConversation}
                    onDeleteAll={deleteAllConversations}
                    user={user}
                    onSignOut={signOut}
                />
            </div>
            <div className="flex-1 flex flex-col h-full relative z-10">
                {/* Header for features like Temporary Toggle */}
                <div className="flex items-center justify-end p-2 border-b bg-background/50 backdrop-blur">
                    <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium ${isTemporary ? 'text-orange-500' : 'text-muted-foreground'}`}>
                            {isTemporary ? 'Temporary Chat (Not Saved)' : 'History Enabled'}
                        </span>
                        <div
                            className={`w-8 h-4 rounded-full p-0.5 cursor-pointer transition-colors ${isTemporary ? 'bg-orange-500' : 'bg-gray-600'}`}
                            onClick={() => {
                                setIsTemporary(!isTemporary);
                                if (!isTemporary) {
                                    // Switching TO temp mode: clear current view to start fresh temp chat
                                    resetToHome();
                                    setMessages([]);
                                } else {
                                    // Switching BACK to history: reset to home (empty) or last chat?
                                    // Let's reset to home state so they can select a chat.
                                    resetToHome();
                                }
                            }}
                        >
                            <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${isTemporary ? 'translate-x-4' : 'translate-x-0'}`} />
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {messages.length === 0 ? (
                        <WelcomeScreen onSend={handleSend} />
                    ) : (
                        <div className="p-4 space-y-4">
                            {messages.map((msg, i) => (
                                <div key={msg.id || i} className={`p-4 rounded-lg ${msg.role === 'user' ? 'bg-primary/10 ml-auto' : 'bg-secondary/10 mr-auto'} max-w-[80%]`}>
                                    <ReactMarkdown
                                        className="prose dark:prose-invert max-w-none break-words"
                                        components={{
                                            pre: ({ node, ...props }) => (
                                                <div className="not-prose my-4 rounded-lg overflow-hidden border border-border/50 bg-[#1e1e1e]">
                                                    {props.children}
                                                </div>
                                            ),
                                            code: ({ node, className, children, ...props }) => {
                                                const match = /language-(\w+)/.exec(className || '');
                                                const isInline = !match && !parsedResponseIsMultiline(String(children));

                                                if (isInline) {
                                                    return (
                                                        <code className="bg-muted text-foreground px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                                                            {children}
                                                        </code>
                                                    );
                                                }

                                                const language = match ? match[1] : 'text';
                                                const codeString = String(children).replace(/\n$/, '');

                                                return (
                                                    <div className="relative group">
                                                        <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-white/5">
                                                            <div className="text-xs font-medium text-gray-400 uppercase">
                                                                {language}
                                                            </div>
                                                            <button
                                                                onClick={() => {
                                                                    navigator.clipboard.writeText(codeString);
                                                                    toast({ description: "Copied to clipboard" });
                                                                }}
                                                                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                                                            >
                                                                <Copy className="h-3.5 w-3.5" />
                                                                Copy code
                                                            </button>
                                                        </div>
                                                        <SyntaxHighlighter
                                                            // @ts-ignore
                                                            style={atomOneDark}
                                                            language={language}
                                                            PreTag="div"
                                                            customStyle={{
                                                                margin: 0,
                                                                padding: '1.5rem',
                                                                background: 'transparent',
                                                                fontSize: '0.9rem',
                                                                lineHeight: '1.5'
                                                            }}
                                                            wrapLines={true}
                                                            wrapLongLines={true}
                                                            {...props}
                                                        >
                                                            {codeString}
                                                        </SyntaxHighlighter>
                                                    </div>
                                                );
                                            }
                                        }}
                                    >
                                        {msg.content}
                                    </ReactMarkdown>
                                </div>
                            ))}
                            {sending && <div className="p-4 text-muted-foreground animate-pulse">Thinking...</div>}
                        </div>
                    )}
                </div>
                <div className="p-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <ChatInput onSend={handleSend} disabled={sending} isLoading={sending} />
                </div>
            </div>
        </div>
    );
};

export default Index;
