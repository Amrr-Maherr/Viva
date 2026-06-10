import { useEffect, useState } from 'react';

type Message = {
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

export function useChatMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (text: string, sender: 'user' | 'ai') => {
    setMessages(prev => [...prev, { text, sender, timestamp: new Date() }]);
  };

  const addMessages = (newMessages: Message[]) => {
    setMessages(prev => [...prev, ...newMessages]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return {
    messages,
    isLoading,
    setIsLoading,
    addMessage,
    addMessages,
    clearMessages,
    setMessages,
  };
}
