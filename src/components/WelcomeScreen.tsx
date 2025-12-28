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
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-6 md:py-12">
      {/* Logo and Title */}
      <div className="flex flex-col items-center mb-8 md:mb-12 animate-float">
        <div className="relative mb-4 md:mb-6">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
            <Bot className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 rounded-full bg-accent flex items-center justify-center animate-pulse">
            <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3 text-accent-foreground" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-1 gradient-text">
          AI Dost
        </h1>
        <p className="text-[10px] md:text-xs text-muted-foreground font-medium italic mb-4">made by Rachit Kumar Singh.</p>
        <p className="text-muted-foreground text-lg text-center max-w-md">
          Your friendly AI companion for coding, learning, and creative tasks
        </p>
      </div>

      {/* Feature Pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {['Fast Responses', 'Code Helper', 'Creative Writing', '24/7 Available'].map((feature) => (
          <span
            key={feature}
            className="px-4 py-2 rounded-full glass-subtle text-sm text-muted-foreground"
          >
            {feature}
          </span>
        ))}
      </div>

      {/* Suggestion Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        {suggestions.map((suggestion, index) => (
          <button
            key={suggestion.title}
            onClick={() => onSend(suggestion.message)}
            style={{ animationDelay: `${index * 100}ms` }}
            className="flex flex-col items-start p-4 rounded-2xl bg-secondary/10 border border-border/50 hover:bg-secondary/20 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(var(--primary),0.1)] text-left group active:scale-95 animate-in opacity-0"
          >
            <div className={cn("p-2 rounded-xl mb-3 transition-opacity", `bg-gradient-to-br ${suggestion.gradient} opacity-80 group-hover:opacity-100 shadow-md`)}>
              <suggestion.icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{suggestion.title}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2">{suggestion.message}</p>
          </button>
        ))}
      </div>

      {/* Hint */}
      <p className="mt-8 text-sm text-muted-foreground/60 text-center">
        Type a message below or use voice input to get started
      </p>
    </div>
  );
}
