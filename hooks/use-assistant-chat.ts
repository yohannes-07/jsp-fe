import { useCallback, useEffect, useState } from "react";

import { ApiError, apiRequest } from "@/lib/api-client";
import type { AssistantChatResponse, ConversationDetail, ConversationSummary, MessageRead } from "@/lib/types";

export function useAssistantChat(assistantPath: string) {
  const [messages, setMessages] = useState<MessageRead[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);

  const selectConversation = useCallback(async (id: string) => {
    setIsHistoryLoading(true);
    setError(null);
    try {
      const detail = await apiRequest<ConversationDetail>(`/chat/conversations/${id}`);
      setConversationId(detail.conversation.id);
      setMessages(detail.messages);
    } catch {
      setError("This conversation could not be loaded.");
    } finally {
      setIsHistoryLoading(false);
    }
  }, []);

  const refreshConversations = useCallback(async (openLatest = false) => {
    try {
      const items = await apiRequest<ConversationSummary[]>(
        `/chat/conversations?assistant_type=${encodeURIComponent(assistantPath)}&limit=20`,
      );
      setConversations(items);
      if (openLatest && items[0]) await selectConversation(items[0].id);
      else setIsHistoryLoading(false);
    } catch {
      setIsHistoryLoading(false);
    }
  }, [assistantPath, selectConversation]);

  useEffect(() => {
    const timer = window.setTimeout(() => void refreshConversations(true), 0);
    return () => window.clearTimeout(timer);
  }, [refreshConversations]);

  const submitMessage = async (content: string, addOptimisticMessage: boolean) => {
    if (!content.trim() || isLoading) return;

    if (addOptimisticMessage) {
      const userMessage: MessageRead = {
        id: crypto.randomUUID(),
        role: "user",
        content: content.trim(),
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMessage]);
    }
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiRequest<AssistantChatResponse>(
        `/chat/${assistantPath}`,
        {
          method: "POST",
          body: JSON.stringify({
            message: content.trim(),
            conversation_id: conversationId,
          }),
        }
      );

      setConversationId(response.conversation_id);
      setMessages((prev) => [...prev, response.message]);
      setFailedMessage(null);
      await refreshConversations(false);
    } catch (error) {
      setFailedMessage(content.trim());
      setError(
        error instanceof ApiError && error.status === 503
          ? "The assistant is temporarily unavailable. Your message was not lost."
          : "Your message could not be sent. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = (content: string) => submitMessage(content, true);
  const retry = () => failedMessage && submitMessage(failedMessage, false);
  const newConversation = () => {
    setConversationId(null);
    setMessages([]);
    setError(null);
    setFailedMessage(null);
  };

  return {
    messages,
    conversationId,
    isLoading,
    isHistoryLoading,
    conversations,
    error,
    sendMessage,
    retry,
    newConversation,
    selectConversation,
  };
}
