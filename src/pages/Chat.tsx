import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ChatSidebar } from '@/components/ChatSidebar';
import { ChatHeader } from '@/components/ChatHeader';
import { ChatMessage, TypingIndicator } from '@/components/ChatMessage';
import { ChatInput } from '@/components/ChatInput';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { useAuth } from '@/hooks/useAuth';
import { useConversations } from '@/hooks/useConversations';
import { useChat } from '@/hooks/useChat';
import { cn } from '@/lib/utils';

export default function Chat() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const {
    conversations,
    currentConversation,
    messages,
    loading: conversationsLoading,
    selectConversation,
    addMessage,
    deleteConversation,
    startNewChat,
    resetToHome,
  } = useConversations();
  const { streamChat, isLoading: isChatLoading } = useChat();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streamingContent]);

  const sendMessage = useCallback(async (content: string) => {
    let conversation = currentConversation;

    if (!conversation) {
      const newConv = await startNewChat();
      if (!newConv) return;
      conversation = newConv;
      // Wait for a tick to ensure state updates
      await new Promise(resolve => setTimeout(resolve, 0));
    }

    await addMessage('user', content, conversation.id);

    // After adding the user message, we must ensure we're viewing this conversation
    if (currentConversation?.id !== conversation.id) {
      await selectConversation(conversation);
    }

    const apiMessages = [
      ...(messages.length > 0 && conversation.id === currentConversation?.id ? messages : []).map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content
      })),
      { role: 'user' as const, content }
    ];

    setIsStreaming(true);
    let fullResponse = '';

    try {
      await streamChat({
        messages: apiMessages,
        onDelta: (delta) => {
          fullResponse += delta;
          setStreamingContent(fullResponse);
        },
        onDone: async () => {
          setIsStreaming(false);
          setStreamingContent('');
          if (fullResponse) {
            // CRITICAL: Explicitly pass the conversation ID to avoid stale closure issues
            await addMessage('assistant', fullResponse, conversation.id);
          }
        }
      });
    } catch (error) {
      console.error('Chat error:', error);
      setIsStreaming(false);
      setStreamingContent('');
    }
  }, [currentConversation, messages, addMessage, startNewChat, streamChat]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-primary/20 animate-pulse-glow" />
            <Loader2 className="w-8 h-8 animate-spin text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      {/* Background gradient effect */}
      <div className="fixed inset-0 gradient-radial pointer-events-none" />

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:relative inset-y-0 left-0 z-50 w-72 transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 lg:hidden z-10"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="w-4 h-4" />
        </Button>
        <ChatSidebar
          conversations={conversations}
          currentConversation={currentConversation}
          onSelectConversation={(conv) => {
            selectConversation(conv);
            setSidebarOpen(false);
          }}
          onNewChat={() => {
            startNewChat();
            setSidebarOpen(false);
          }}
          onDeleteConversation={deleteConversation}
        />
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        <ChatHeader
          onMenuClick={() => setSidebarOpen(true)}
          onLogoClick={resetToHome}
          showMenuButton
        />

        <ScrollArea className="flex-1" ref={scrollRef}>
          <div className="max-w-4xl mx-auto">
            {!currentConversation && messages.length === 0 ? (
              <WelcomeScreen onSend={sendMessage} />
            ) : conversationsLoading && messages.length === 0 && !isStreaming ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : (
              <div className="py-4 pb-24">
                {messages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    role={msg.role}
                    content={msg.content}
                  />
                ))}
                {isStreaming && streamingContent && (
                  <ChatMessage
                    role="assistant"
                    content={streamingContent}
                    isStreaming
                  />
                )}
                {isChatLoading && !streamingContent && (
                  <TypingIndicator />
                )}
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background to-transparent pt-8 pb-4 px-4">
          <div className="max-w-4xl mx-auto">
            <ChatInput
              onSend={sendMessage}
              disabled={isStreaming}
              isLoading={isChatLoading}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
