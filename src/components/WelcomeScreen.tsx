import { Bot, Code, Lightbulb, MessageSquare, Sparkles, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onSend: (message: string) => void;
}

const suggestions = [
  {
    icon: Code,
    title: "Help me code",
    message: "Help me write a Python function to sort a list of objects by multiple properties",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Lightbulb,
    title: "Brainstorm ideas",
    message: "Give me creative ideas for a personal project using AI",
    gradient: "from-amber-500 to-orange-500"
  },
  {
    icon: MessageSquare,
    title: "Explain something",
    message: "Explain quantum computing in simple terms",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Zap,
    title: "Quick task",
    message: "Write a professional email to request a meeting with a client",
    gradient: "from-purple-500 to-pink-500"
  }
];

export function WelcomeScreen({ onSend }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] px-4 py-3 md:py-4">
      {/* Logo and Title */}
      <div className="flex flex-col items-center mb-4 md:mb-6 animate-float">
        <div className="relative mb-2 md:mb-3">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
            <Bot className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
          </div>
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-accent flex items-center justify-center animate-pulse">
            <Sparkles className="w-1.5 h-1.5 md:w-2 md:h-2 text-accent-foreground" />
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-0.5 gradient-text">
          AI Dost
        </h1>
        <p className="text-muted-foreground text-sm md:text-base text-center max-w-md">
          Your friendly AI companion for coding, learning, and creative tasks
        </p>
      </div>

      {/* Feature Pills */}
      <div className="flex flex-wrap justify-center gap-1.5 mb-4">
        {['Fast Responses', 'Code Helper', 'Creative Writing', '24/7 Available'].map((feature) => (
          <span
            key={feature}
            className="px-2.5 py-1 rounded-full glass-subtle text-[10px] text-muted-foreground"
          >
            {feature}
          </span>
        ))}
      </div>

      {/* Suggestion Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-2xl">
        {suggestions.map((suggestion, index) => (
          <button
            key={suggestion.title}
            onClick={() => onSend(suggestion.message)}
            style={{ animationDelay: `${index * 100}ms` }}
            className="flex flex-col items-start p-3 rounded-2xl bg-secondary/10 border border-border/50 hover:bg-secondary/20 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(var(--primary),0.1)] text-left group active:scale-95 animate-in opacity-0"
          >
            <div className={cn("p-2 rounded-xl mb-2 transition-opacity", `bg-gradient-to-br ${suggestion.gradient} opacity-80 group-hover:opacity-100 shadow-md`)}>
              <suggestion.icon className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{suggestion.title}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2">{suggestion.message}</p>
          </button>
        ))}
      </div>

      {/* Hint */}
      <p className="mt-6 text-xs text-muted-foreground/60 text-center">
        Type a message below or use voice input to get started
      </p>
    </div>
  );
}
