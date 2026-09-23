import { useState } from "react";

import { apiRequest } from "@/lib/api-client";
import type { AssistantChatResponse, MessageRead } from "@/lib/types";

export function useAssistantChat(assistantPath: string) {
  const [messages, setMessages] = useState<MessageRead[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    // Optimistically add the user's message
    const userMessage: MessageRead = {
      id: crypto.randomUUID(),
      role: "user",
      content: content.trim(),
      created_at: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

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
    } catch (error) {
      console.error("Failed to send message:", error);
      // Let it fail silently in the UI for now, could add a toast here
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    conversationId,
    isLoading,
    sendMessage,
  };
}
