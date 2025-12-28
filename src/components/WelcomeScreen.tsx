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
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 py-4 md:py-6">
      {/* Logo and Title */}
      <div className="flex flex-col items-center mb-6 md:mb-8 animate-float">
        <div className="relative mb-3 md:mb-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
            <Bot className="w-7 h-7 md:w-8 md:h-8 text-primary-foreground" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 rounded-full bg-accent flex items-center justify-center animate-pulse">
            <Sparkles className="w-2 h-2 md:w-2.5 md:h-2.5 text-accent-foreground" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-1 gradient-text">
          AI Dost
        </h1>
        <p className="text-[10px] md:text-xs text-muted-foreground font-medium italic mb-3">made by Rachit Kumar Singh.</p>
        <p className="text-muted-foreground text-base md:text-lg text-center max-w-md">
          Your friendly AI companion for coding, learning, and creative tasks
        </p>
      </div>

      {/* Feature Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {['Fast Responses', 'Code Helper', 'Creative Writing', '24/7 Available'].map((feature) => (
          <span
            key={feature}
            className="px-3 py-1.5 rounded-full glass-subtle text-xs text-muted-foreground"
          >
            {feature}
          </span>
        ))}
      </div>

      {/* Suggestion Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
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
