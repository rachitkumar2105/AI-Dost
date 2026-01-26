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
    <div className="w-full h-full flex flex-col items-center justify-center min-h-[50vh] px-4 py-6 md:py-10 overflow-y-auto">
      {/* Logo and Title */}
      <div className="flex flex-col items-center mb-4 md:mb-5 animate-float">
        <div className="relative mb-2">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
            <Bot className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
          </div>
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-accent flex items-center justify-center animate-pulse">
            <Sparkles className="w-1.5 h-1.5 text-accent-foreground" />
          </div>
        </div>

        <h1 className="text-xl md:text-2xl font-bold mb-0.5 gradient-text">
          AI Dost
        </h1>
        <p className="text-muted-foreground text-xs md:text-sm text-center max-w-sm">
          Your friendly AI companion for coding, learning, and creative tasks
        </p>
      </div>

      {/* Feature Pills */}
      <div className="flex flex-wrap justify-center gap-1.5 mb-4">
        {['Fast Responses', 'Code Helper', 'Creative Writing', '24/7 Available'].map((feature) => (
          <span
            key={feature}
            className="px-2 py-0.5 rounded-full glass-subtle text-[9px] md:text-[10px] text-muted-foreground"
          >
            {feature}
          </span>
        ))}
      </div>

      {/* Suggestion Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-xl">
        {suggestions.map((suggestion, index) => (
          <button
            key={suggestion.title}
            onClick={() => onSend(suggestion.message)}
            style={{ animationDelay: `${index * 100}ms` }}
            className="flex flex-col items-start p-2.5 rounded-xl bg-secondary/10 border border-border/50 hover:bg-secondary/20 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(var(--primary),0.1)] text-left group active:scale-95 animate-in fade-in slide-in-from-bottom-2"
          >
            <div className={cn("p-1.5 rounded-lg mb-1.5 transition-opacity", `bg-gradient-to-br ${suggestion.gradient} opacity-80 group-hover:opacity-100 shadow-md`)}>
              <suggestion.icon className="w-3.5 h-3.5 text-white" />
            </div>
            <h3 className="font-semibold text-xs md:text-sm mb-0.5 group-hover:text-primary transition-colors">{suggestion.title}</h3>
            <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-2">{suggestion.message}</p>
          </button>
        ))}
      </div>

      {/* Hint */}
    </div>
  );
}
