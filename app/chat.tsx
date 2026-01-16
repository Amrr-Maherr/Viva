import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, View, StatusBar } from "react-native";
import ChatHeader from '@/components/ChatHeader';
import MessageInput from '@/components/MessageInput';
import ChatList, { ChatListRef } from '@/components/ChatList';
import useFetchChat from '@/hooks/useFetchChat';

type Message = {
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [messageToSend, setMessageToSend] = useState('');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const chatListRef = useRef<ChatListRef>(null);

  const { data, isLoading, isError } = useFetchChat(messageToSend);
console.log(data);
console.log(isError);

  const sendMessage = () => {
    if (message.trim()) {
      setChatMessages(prev => [...prev, { text: message, sender: 'user', timestamp: new Date() }]);
      setMessageToSend(message);
      setMessage('');
    }
  };

  // Handle response when received
  useEffect(() => {
    if (data) {
      if ('error' in data) {
        // Handle error
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

  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      <ChatHeader title="BrainBox AI" /> */}
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 90}
      >
        <View style={styles.chatContainer}>
          <ChatList ref={chatListRef} messages={chatMessages} />
          <MessageInput
            value={message}
            onChangeText={setMessage}
            onSendPress={sendMessage}
            isLoading={isLoading}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  keyboardAvoidingContainer: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
});
