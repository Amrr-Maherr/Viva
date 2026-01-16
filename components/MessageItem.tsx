import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

type Message = {
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

interface MessageItemProps {
  message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View
      style={[
        styles.messageWrapper,
        message.sender === "user" ? styles.userMessageWrapper : styles.aiMessageWrapper
      ]}
    >
      <View
        style={[
          styles.messageContainer,
          message.sender === "user" ? styles.userMessage : styles.aiMessage,
        ]}
      >
        <Text style={[
          styles.messageText,
          message.sender === "user" ? styles.userMessageText : styles.aiMessageText
        ]}>
          {message.text}
        </Text>
      </View>
      <View
        style={[
          styles.metaContainer,
          message.sender === "user" ? styles.userMeta : styles.aiMeta,
        ]}
      >
        <Text style={styles.timestamp}>{formatTime(message.timestamp)}</Text>
        <View
          style={styles.actionsContainer}
        >
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => console.log("Like pressed")}
          >
            <Ionicons name="thumbs-up-outline" size={14} color={message.sender === "user" ? "#FFFFFF" : "#666"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => console.log("Copy pressed")}
          >
            <Ionicons name="copy-outline" size={14} color={message.sender === "user" ? "#FFFFFF" : "#666"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageWrapper: {
    marginVertical: 6,
    maxWidth: '85%',
  },
  userMessageWrapper: {
    alignSelf: 'flex-end',
    marginRight: 16,
  },
  aiMessageWrapper: {
    alignSelf: 'flex-start',
    marginLeft: 16,
  },
  messageContainer: {
    padding: 14,
    borderRadius: 18,
    maxWidth: '100%',
  },
  userMessage: {
    backgroundColor: '#667eea',
    borderBottomRightRadius: 4,
  },
  aiMessage: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  aiMessageText: {
    color: '#333333',
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    paddingHorizontal: 4,
  },
  userMeta: {
    alignSelf: 'flex-end',
  },
  aiMeta: {
    alignSelf: 'flex-start',
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 8,
    padding: 4,
  },
  timestamp: {
    fontSize: 11,
    color: '#888',
    marginRight: 4,
  },
});