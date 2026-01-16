import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, View, StatusBar, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
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
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      <ChatHeader title="BrainBox AI" />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 90}
      >
        <View style={styles.chatContainer}>
          {chatMessages.length === 0 ? (
            <View style={styles.welcomeContainer}>
              <Ionicons name="chatbubble-ellipses-outline" size={64} color="#667eea" style={styles.welcomeIcon} />
              <Text style={styles.welcomeTitle}>Welcome to BrainBox AI!</Text>
              <Text style={styles.welcomeSubtitle}>Ask me anything and I'll do my best to assist you.</Text>
              <View style={styles.welcomeFeatures}>
                <View style={styles.featureItem}>
                  <Ionicons name="bulb-outline" size={20} color="#667eea" />
                  <Text style={styles.featureText}>Get instant answers</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="chatbox-outline" size={20} color="#667eea" />
                  <Text style={styles.featureText}>Friendly conversations</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="rocket-outline" size={20} color="#667eea" />
                  <Text style={styles.featureText}>Quick solutions</Text>
                </View>
              </View>
            </View>
          ) : (
            <ChatList ref={chatListRef} messages={chatMessages} />
          )}
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
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 20,
  },
  welcomeIcon: {
    marginBottom: 20,
    opacity: 0.8,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  welcomeFeatures: {
    width: '100%',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
    paddingLeft: 10,
  },
  featureText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 12,
  },
});
