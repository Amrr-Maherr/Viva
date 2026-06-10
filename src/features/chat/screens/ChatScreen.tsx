import ChatList, { ChatListRef } from '@src/features/chat/components/ChatList';
import MessageInput from '@src/features/chat/components/MessageInput';
import TypingIndicator from '@src/features/chat/components/TypingIndicator';
import WelcomeView from '@src/features/chat/components/WelcomeView';
import useFetchChat from '@src/features/chat/hooks/useChat';
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";

type Message = {
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

export default function ChatScreen() {
  const { productContext, initialMessage } = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const [messageToSend, setMessageToSend] = useState('');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [productInfo, setProductInfo] = useState<any>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const chatListRef = useRef<ChatListRef>(null);

  useEffect(() => {
    if (productContext) {
      try {
        const parsedProduct = JSON.parse(productContext as string);
        setProductInfo(parsedProduct);

        const welcomeMessage = `Hi! I see you're interested in **${parsedProduct.title}** by ${parsedProduct.brand}. 

This ${parsedProduct.category} is priced at $${parsedProduct.price} and has a ${parsedProduct.rating}/5 rating. 

I can help you with:
• Product details and specifications
• Comparison with similar items
• Availability and stock info
• Styling tips and recommendations
• Any questions about this product

What would you like to know?`;

        setChatMessages([{
          text: welcomeMessage,
          sender: 'ai',
          timestamp: new Date()
        }]);

        if (initialMessage) {
          setTimeout(() => {
            setMessage(initialMessage as string);
          }, 500);
        }
      } catch (error) {
        console.error('Error parsing product context:', error);
        setChatMessages([{
          text: "Hi! I'm here to help you with any questions about products, orders, or shopping. What can I assist you with today?",
          sender: 'ai',
          timestamp: new Date()
        }]);
      }
    }
  }, [productContext, initialMessage]);

  const buildContextualMessage = useCallback((userMessage: string) => {
    if (!productInfo) return userMessage;
    return `Product Context: I'm asking about "${productInfo.title}" by ${productInfo.brand}, priced at $${productInfo.price}, in ${productInfo.category} category, with ${productInfo.rating}/5 rating and ${productInfo.stock} in stock. Product description: ${productInfo.description.substring(0, 200)}...

User Question: ${userMessage}`;
  }, [productInfo]);

  const { data, isLoading, isError, refetch } = useFetchChat(messageToSend);

  const sendMessage = useCallback(() => {
    if (!message.trim()) return;

    setChatMessages(prev => [...prev, { text: message, sender: 'user', timestamp: new Date() }]);
    setMessageToSend(buildContextualMessage(message));
    setMessage('');
    setIsAiLoading(true);
  }, [message, buildContextualMessage]);

  useEffect(() => {
    if (data) {
      setIsAiLoading(false);
      if ('error' in data) {
        setChatMessages(prev => [...prev, { text: data.error, sender: 'ai', timestamp: new Date() }]);
      } else if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        const aiResponse = data.candidates[0].content.parts[0].text;
        setChatMessages(prev => [...prev, { text: aiResponse, sender: 'ai', timestamp: new Date() }]);
      } else {
        console.warn('Unexpected response format:', data);
        setChatMessages(prev => [...prev, { text: 'Sorry, I could not process that request.', sender: 'ai', timestamp: new Date() }]);
      }
    }
  }, [data]);

  const showWelcome = chatMessages.length === 0 && !productInfo;

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 90}
    >
      {showWelcome ? (
        <WelcomeView />
      ) : (
        <>
          <ChatList ref={chatListRef} messages={chatMessages} />
          <TypingIndicator isTyping={isAiLoading} />
        </>
      )}
      <MessageInput
        value={message}
        onChangeText={setMessage}
        onSendPress={sendMessage}
        isLoading={isLoading}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
