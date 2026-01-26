import { Plus, MessageSquare, Trash2, LogOut, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import type { Conversation } from '@/hooks/useConversations';
import { User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

interface ChatSidebarProps {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
  onNewChat: () => void;
  onDeleteConversation: (id: string) => void;
  onDeleteAll: () => void;
  user?: User | null;
  onSignOut?: () => void;
}

export function ChatSidebar({
  conversations,
  currentConversation,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  onDeleteAll,
  user,
  onSignOut,
}: ChatSidebarProps) {
  const navigate = useNavigate();
  return (
    <div className="h-full flex flex-col bg-sidebar-background">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <Button
          onClick={onNewChat}
          className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-11"
        >
          <Plus className="w-5 h-5" />
          New Chat
        </Button>
      </div>

      {/* Conversations List */}
      <ScrollArea className="flex-1 px-2">
        <div className="py-2 space-y-1">
          {conversations.length === 0 ? (
            <div className="px-4 py-8 text-center text-muted-foreground text-sm">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No conversations yet</p>
              <p className="text-xs mt-1">Start a new chat to begin</p>
            </div>
          ) : (
            conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={cn(
                  "group flex items-center gap-2 px-3 py-3 rounded-xl cursor-pointer transition-all",
                  "hover:bg-sidebar-accent",
                  currentConversation?.id === conversation.id
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground"
                )}
                onClick={() => onSelectConversation(conversation)}
              >
                <MessageSquare className="w-4 h-4 flex-shrink-0 opacity-60" />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium">
                    {conversation.title || 'New conversation'}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {formatDistanceToNow(new Date(conversation.updated_at), { addSuffix: true })}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-all rounded-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteConversation(conversation.id);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-3">
        {conversations.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDeleteAll}
            className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg text-xs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear History
          </Button>
        )}

        {user ? (
          <div className="pt-2 border-t border-sidebar-border/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <UserIcon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.user_metadata.full_name || 'User'}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2 text-xs"
              onClick={onSignOut}
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </Button>
          </div>
        ) : (
          <Button
            className="w-full gap-2"
            onClick={() => navigate('/auth')}
          >
            <UserIcon className="w-4 h-4" />
            Sign In
          </Button>
        )}

        <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground pt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          AI Dost is active
        </div>
      </div>
    </div>
  );
}
