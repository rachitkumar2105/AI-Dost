import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export function useConversations() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchConversations = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching conversations:', error);
      return;
    }

    setConversations(data || []);
  }, [user]);

  const fetchMessages = useCallback(async (conversationId: string) => {
    setLoading(true);

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      setLoading(false);
      return;
    }

    setMessages(data?.map(m => ({
      id: m.id,
      role: m.role as 'user' | 'assistant',
      content: m.content,
      created_at: m.created_at
    })) || []);
    setLoading(false);
  }, []);

  const createConversation = useCallback(async (title?: string) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('conversations')
      .insert({ user_id: user.id, title: title || 'New Chat' })
      .select()
      .single();

    if (error) {
      console.error('Error creating conversation:', error);
      return null;
    }

    await fetchConversations();
    return data;
  }, [user, fetchConversations]);

  const selectConversation = useCallback(async (conversation: Conversation) => {
    setCurrentConversation(conversation);
    await fetchMessages(conversation.id);
  }, [fetchMessages]);

  const addMessage = useCallback(async (role: 'user' | 'assistant', content: string, conversationId?: string) => {
    const userId = user?.id;
    const targetConversationId = conversationId || currentConversation?.id;

    if (!userId || !targetConversationId) return;

    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: targetConversationId,
        user_id: userId,
        role,
        content
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding message:', error);
      return null;
    }

    setMessages(prev => [...prev, {
      id: data.id,
      role: data.role as 'user' | 'assistant',
      content: data.content,
      created_at: data.created_at
    }]);

    // Update conversation title if first message
    if (messages.length === 0 && role === 'user') {
      const title = content.slice(0, 50) + (content.length > 50 ? '...' : '');
      await supabase
        .from('conversations')
        .update({ title })
        .eq('id', targetConversationId);
      await fetchConversations();
    }

    return data;
  }, [user, currentConversation, messages.length, fetchConversations]);

  const deleteConversation = useCallback(async (id: string) => {
    const { error } = await supabase
      .from('conversations')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting conversation:', error);
      return;
    }

    if (currentConversation?.id === id) {
      setCurrentConversation(null);
      setMessages([]);
    }

    await fetchConversations();
  }, [currentConversation, fetchConversations]);

  const deleteAllConversations = useCallback(async () => {
    if (!user) return;

    const { error } = await supabase
      .from('conversations')
      .delete()
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting all conversations:', error);
      return;
    }

    setCurrentConversation(null);
    setMessages([]);
    await fetchConversations();
  }, [user, fetchConversations]);

  const startNewChat = useCallback(async () => {
    const newConv = await createConversation();
    if (newConv) {
      setCurrentConversation(newConv);
      setMessages([]);
      return newConv;
    }
    return null;
  }, [createConversation]);

  const resetToHome = useCallback(() => {
    setCurrentConversation(null);
    setMessages([]);
  }, []);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return {
    conversations,
    currentConversation,
    messages,
    loading,
    selectConversation,
    createConversation,
    addMessage,
    deleteConversation,
    deleteAllConversations,
    startNewChat,
    setMessages,
    resetToHome
  };
}
