import { WelcomeScreen } from "@/components/WelcomeScreen";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatInput } from "@/components/ChatInput";
import { useState } from "react";

const Index = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState<any[]>([]);
    const [currentId, setCurrentId] = useState<string | null>(null);

    const handleSend = (message: string) => {
        setMessages(prev => [...prev, { content: message, role: 'user' }]);
        setLoading(true);
        setTimeout(() => {
            setMessages(prev => [...prev, { content: "This is a simulated response.", role: 'assistant' }]);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="flex h-screen w-full bg-background overflow-hidden relative">
            <div className="hidden md:flex w-[260px] flex-shrink-0">
                <ChatSidebar
                    conversations={conversations}
                    currentConversation={conversations.find(c => c.id === currentId) || null}
                    onSelectConversation={(c) => setCurrentId(c.id)}
                    onNewChat={() => {
                        setMessages([]);
                        setCurrentId(null);
                    }}
                    onDeleteConversation={(id) => setConversations(prev => prev.filter(c => c.id !== id))}
                    onDeleteAll={() => setConversations([])}
                />
            </div>
            <div className="flex-1 flex flex-col h-full relative z-10">
                <div className="flex-1 overflow-y-auto">
                    {messages.length === 0 ? (
                        <WelcomeScreen onSend={handleSend} />
                    ) : (
                        <div className="p-4 space-y-4">
                            {messages.map((msg, i) => (
                                <div key={i} className={`p-4 rounded-lg ${msg.role === 'user' ? 'bg-primary/10 ml-auto' : 'bg-secondary/10 mr-auto'} max-w-[80%]`}>
                                    {msg.content}
                                </div>
                            ))}
                            {loading && <div className="p-4">Thinking...</div>}
                        </div>
                    )}
                </div>
                <div className="p-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <ChatInput onSend={handleSend} disabled={loading} isLoading={loading} />
                </div>
            </div>
        </div>
    );
};

export default Index;
