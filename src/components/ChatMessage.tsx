import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  role: string;
  content: string;
  isStreaming?: boolean;
}

export function ChatMessage({ role, content, isStreaming }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div
      className={cn(
        "flex gap-4 px-4 py-6 transition-all",
        isUser ? "bg-transparent" : "bg-secondary/30"
      )}
    >
      <div className="max-w-4xl mx-auto flex gap-4 w-full">
        {/* Avatar */}
        <div
          className={cn(
            "flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-gradient-to-br from-primary to-accent text-primary-foreground"
          )}
        >
          {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0 pt-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">
              {isUser ? 'You' : 'AI Dost'}
            </span>
            {isStreaming && (
              <span className="text-xs text-primary animate-pulse">typing...</span>
            )}
          </div>
          
          <div className="prose prose-sm max-w-none text-foreground">
            <MessageContent content={content} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageContent({ content }: { content: string }) {
  // Simple markdown-like rendering
  const parts = content.split(/(```[\s\S]*?```)/g);
  
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const codeContent = part.slice(3, -3);
          const lines = codeContent.split('\n');
          const language = lines[0]?.trim() || '';
          const code = lines.slice(1).join('\n') || codeContent;
          
          return (
            <pre key={index} className="rounded-lg overflow-hidden bg-secondary my-2">
              {language && (
                <div className="bg-border/50 px-4 py-2 text-xs text-muted-foreground">
                  {language}
                </div>
              )}
              <code className="block p-4 overflow-x-auto text-sm text-foreground">
                {code}
              </code>
            </pre>
          );
        }
        
        // Handle inline formatting
        const formattedText = part
          .split(/(\*\*.*?\*\*)/g)
          .map((segment, i) => {
            if (segment.startsWith('**') && segment.endsWith('**')) {
              return <strong key={i}>{segment.slice(2, -2)}</strong>;
            }
            return segment;
          });
        
        return (
          <p key={index} className="whitespace-pre-wrap leading-relaxed">
            {formattedText}
          </p>
        );
      })}
    </>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex gap-4 px-4 py-6 bg-secondary/30">
      <div className="max-w-4xl mx-auto flex gap-4 w-full">
        <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary to-accent text-primary-foreground">
          <Bot className="w-5 h-5" />
        </div>
        <div className="flex items-center gap-2 pt-2">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary animate-typing" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 rounded-full bg-primary animate-typing" style={{ animationDelay: '200ms' }} />
            <span className="w-2 h-2 rounded-full bg-primary animate-typing" style={{ animationDelay: '400ms' }} />
          </div>
          <span className="text-sm text-muted-foreground">AI Dost is thinking...</span>
        </div>
      </div>
    </div>
  );
}
