import { Menu, LogOut, Bot, Sparkles, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';

interface ChatHeaderProps {
  onMenuClick?: () => void;
  onLogoClick?: () => void;
  showMenuButton?: boolean;
}

export function ChatHeader({ onMenuClick, onLogoClick, showMenuButton }: ChatHeaderProps) {
  const { user, signOut } = useAuth();

  return (
    <header className="h-16 border-b border-border/50 flex items-center justify-between px-4 glass-subtle">
      <div className="flex items-center gap-3">
        {showMenuButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
        )}

        <button
          onClick={onLogoClick}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity active:scale-95 text-left"
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_15px_rgba(var(--primary),0.3)]">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <Sparkles className="w-3 h-3 text-accent absolute -top-0.5 -right-0.5" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-base md:text-lg gradient-text leading-none">AI Dost</h1>
            <p className="text-[9px] md:text-[10px] text-muted-foreground font-medium italic">made by Rachit Kumar Singh.</p>
          </div>
        </button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-[0_0_15px_rgba(var(--primary),0.2)]">
            <Avatar className="h-10 w-10 rounded-xl border border-border/50">
              <AvatarFallback className="rounded-xl bg-secondary text-secondary-foreground font-semibold">
                {user?.email?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 glass" align="end">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              <p className="font-medium text-sm">{user?.email}</p>
              <p className="text-xs text-muted-foreground">Logged in</p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut} className="text-destructive focus:text-destructive cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
