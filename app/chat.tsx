import ChatList, { ChatListRef } from '@/components/ChatList';
import MessageInput from '@/components/MessageInput';
import useFetchChat from '@/hooks/useFetchChat';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";

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

  const chatListRef = useRef<ChatListRef>(null);

  // Parse product context if provided
  useEffect(() => {
    if (productContext) {
      try {
        const parsedProduct = JSON.parse(productContext as string);
        setProductInfo(parsedProduct);
        
        // Add initial AI message about the product
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

        // If there's an initial message, send it
        if (initialMessage) {
          setTimeout(() => {
            setMessage(initialMessage as string);
          }, 500);
        }
      } catch (error) {
        console.error('Error parsing product context:', error);
        // Add fallback message if parsing fails
        setChatMessages([{
          text: "Hi! I'm here to help you with any questions about products, orders, or shopping. What can I assist you with today?",
          sender: 'ai',
          timestamp: new Date()
        }]);
      }
    }
  }, [productContext, initialMessage]);

  const { data, isLoading, isError } = useFetchChat(messageToSend);
console.log(data);
console.log(isError);

  const sendMessage = () => {
    if (message.trim()) {
      setChatMessages(prev => [...prev, { text: message, sender: 'user', timestamp: new Date() }]);
      
      // Add product context to the message if available
      let contextualMessage = message;
      if (productInfo) {
        contextualMessage = `Product Context: I'm asking about "${productInfo.title}" by ${productInfo.brand}, priced at $${productInfo.price}, in ${productInfo.category} category, with ${productInfo.rating}/5 rating and ${productInfo.stock} in stock. Product description: ${productInfo.description.substring(0, 200)}...

User Question: ${message}`;
      }
      
      setMessageToSend(contextualMessage);
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
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 90}
      >
        <View style={styles.chatContainer}>
          {chatMessages.length === 0 && !productInfo ? (
            <View style={styles.welcomeContainer}>
              <LottieView
                source={require('../assets/jsonIcons/AI_logo.json')}
                autoPlay
                loop
                style={styles.aiLogo}
              />
              <Text style={styles.welcomeTitle}>Welcome to Viva Assistant!</Text>
              <Text style={styles.welcomeSubtitle}>I'm here to help you with products, orders, and shopping tips.</Text>
              <View style={styles.welcomeFeatures}>
                <View style={styles.featureItem}>
                  <Ionicons name="pricetag-outline" size={20} color="#667eea" />
                  <Text style={styles.featureText}>Find products & deals</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="card-outline" size={20} color="#667eea" />
                  <Text style={styles.featureText}>Payment & shipping info</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="information-circle-outline" size={20} color="#667eea" />
                  <Text style={styles.featureText}>Order tracking & support</Text>
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
  aiLogo: {
    width: 120,
    height: 120,
    marginBottom: 20,
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
