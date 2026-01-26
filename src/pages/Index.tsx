import { WelcomeScreen } from "@/components/WelcomeScreen";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatInput } from "@/components/ChatInput";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Copy, Menu, Rocket, Stars } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

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
    const scrollAreaRef = useRef<HTMLDivElement>(null);

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
    const [mobileOpen, setMobileOpen] = useState(false);

    // Determines if we are in "loading" state (either fetching history or sending a message)
    const isLoading = historyLoading || sending;

    // Scroll to bottom on messages change
    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [messages, sending]);

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
                // Optimistic update
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
        setMobileOpen(false);
        if (isTemporary) {
            setMessages([]);
        } else {
            // Start a fresh persisted chat
            await startNewChat();
        }
    };

    return (
        <div className="flex h-screen w-full bg-background overflow-hidden relative stars-bg font-sans text-foreground">
            {/* Mobile Sidebar Trigger & Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 glass flex items-center justify-between p-4 h-16">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                        <Rocket className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">AI Dost</span>
                </div>

                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                            <Menu className="w-6 h-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-[280px] bg-card border-r border-border">
                        <ChatSidebar
                            conversations={conversations}
                            currentConversation={currentConversation}
                            onSelectConversation={(c) => {
                                setIsTemporary(false);
                                selectConversation(c);
                                setMobileOpen(false);
                            }}
                            onNewChat={handleNewChat}
                            onDeleteConversation={deleteConversation}
                            onDeleteAll={deleteAllConversations}
                            user={user}
                            onSignOut={() => {
                                signOut();
                                navigate("/auth");
                            }}
                        />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:flex w-[280px] flex-shrink-0 z-20 glass border-r border-white/5">
                <ChatSidebar
                    conversations={conversations}
                    currentConversation={currentConversation}
                    onSelectConversation={(c) => {
                        setIsTemporary(false);
                        selectConversation(c);
                    }}
                    onNewChat={handleNewChat}
                    onDeleteConversation={deleteConversation}
                    onDeleteAll={deleteAllConversations}
                    user={user}
                    onSignOut={() => {
                        signOut();
                        navigate("/auth");
                    }}
                />
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col h-full relative z-10 pt-16 md:pt-0">
                {/* Header (Desktop) */}
                <div className="hidden md:flex h-16 glass border-b border-white/5 items-center justify-between px-6 flex-shrink-0">
                    <div className="flex items-center gap-2">
                        {currentConversation ? (
                            <span className="font-medium text-gray-200 truncate max-w-[300px]">{currentConversation.title}</span>
                        ) : (
                            <div className="flex flex-col">
                                <span className="font-bold text-lg text-gray-200 leading-none">AI Dost</span>
                                <span className="text-[10px] text-muted-foreground italic leading-none">- made by Rachit</span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-black/40 rounded-full px-3 py-1.5 border border-white/5">
                            <span className={`text-xs font-medium ${isTemporary ? 'text-orange-400' : 'text-gray-400'}`}>
                                {isTemporary ? 'Temporary Chat (Not Saved)' : 'History On'}
                            </span>
                            <div
                                className={`w-8 h-4 rounded-full p-0.5 cursor-pointer transition-colors duration-300 ${isTemporary ? 'bg-orange-500/20 ring-1 ring-orange-500/50' : 'bg-white/10'}`}
                                onClick={() => {
                                    setIsTemporary(!isTemporary);
                                    if (!isTemporary) {
                                        resetToHome();
                                        toast({ description: "Temporary mode enabled. Chats won't be saved." });
                                    } else {
                                        toast({ description: "History mode enabled. Chats will be saved." });
                                    }
                                }}
                            >
                                <motion.div
                                    className={`w-3 h-3 rounded-full shadow-sm ${isTemporary ? 'bg-orange-500' : 'bg-gray-400'}`}
                                    animate={{ x: isTemporary ? 16 : 0 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Header status bar (below fixed header) */}
                <div className="md:hidden flex items-center justify-between px-4 py-2 bg-black/20 backdrop-blur-sm border-b border-white/5 text-xs">
                    <span className="truncate max-w-[200px] text-gray-300">
                        {currentConversation?.title || "New Chat"}
                    </span>
                    <div className="flex items-center gap-2" onClick={() => setIsTemporary(!isTemporary)}>
                        <div className={`w-2 h-2 rounded-full ${isTemporary ? 'bg-orange-500 animate-pulse' : 'bg-green-500'}`} />
                        <span className={isTemporary ? 'text-orange-400' : 'text-gray-400'}>
                            {isTemporary ? 'Temp' : 'Saved'}
                        </span>
                    </div>
                </div>


                <div
                    ref={scrollAreaRef}
                    className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth"
                >
                    {messages.length === 0 ? (
                        <WelcomeScreen onSend={handleSend} />
                    ) : (
                        <AnimatePresence initial={false}>
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id || Math.random().toString()}
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex w-full ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] md:max-w-[75%] p-4 text-sm md:text-base leading-relaxed relative group
                                            ${message.role === 'user'
                                                ? 'chat-bubble-user'
                                                : 'chat-bubble-ai'
                                            }
                                        `}
                                    >
                                        <ReactMarkdown
                                            className="prose dark:prose-invert max-w-none break-words"
                                            components={{
                                                pre: ({ node, ...props }) => (
                                                    <div className="not-prose my-4 rounded-lg overflow-hidden border border-white/10 bg-[#0d1117] shadow-xl">
                                                        {props.children}
                                                    </div>
                                                ),
                                                code: ({ node, className, children, ...props }) => {
                                                    const match = /language-(\w+)/.exec(className || '');
                                                    const isInline = !match && !parsedResponseIsMultiline(String(children));

                                                    if (isInline) {
                                                        return (
                                                            <code className="bg-white/10 text-white px-1.5 py-0.5 rounded text-sm font-mono border border-white/5" {...props}>
                                                                {children}
                                                            </code>
                                                        );
                                                    }

                                                    const language = match ? match[1] : 'text';
                                                    const codeString = String(children).replace(/\n$/, '');

                                                    return (
                                                        <div className="relative group/code">
                                                            <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-white/10">
                                                                <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                                    {language}
                                                                </div>
                                                                <button
                                                                    onClick={() => {
                                                                        navigator.clipboard.writeText(codeString);
                                                                        toast({ description: "Copied to clipboard" });
                                                                    }}
                                                                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors opacity-70 hover:opacity-100"
                                                                >
                                                                    <Copy className="h-3.5 w-3.5" />
                                                                    Copy
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
                                                                    lineHeight: '1.6'
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
                                            {message.content}
                                        </ReactMarkdown>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex w-full justify-start pl-2"
                        >
                            <div className="flex gap-1.5 p-3 rounded-2xl bg-white/5 border border-white/10">
                                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.3s]" />
                                <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:-0.15s]" />
                                <div className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" />
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-4 md:p-6 glass border-t border-white/5">
                    <div className="max-w-4xl mx-auto">
                        <ChatInput onSend={handleSend} disabled={isLoading} />
                        <div className="mt-2 text-center text-[10px] text-gray-500 flex items-center justify-center gap-2">
                            <span>AI can make mistakes. Verify important info.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Index;
