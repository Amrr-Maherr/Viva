import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

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
      <View style={[
        styles.messageRow,
        message.sender === "user" ? styles.userMessageRow : styles.aiMessageRow
      ]}>
        <View style={styles.avatarContainer}>
          {message.sender === "user" ? (
            <LottieView
              source={require('../assets/jsonIcons/Profile_Avatar.json')}
              autoPlay
              loop
              style={styles.avatar}
            />
          ) : (
            <LottieView
              source={require('../assets/jsonIcons/AI_logo.json')}
              autoPlay
              loop
              style={styles.avatar}
            />
          )}
        </View>
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
      </View>
      <View
        style={[
          styles.metaContainer,
          message.sender === "user" ? styles.userMeta : styles.aiMeta,
        ]}
      >
        <View style={styles.timestampActionsContainer}>
          <Text style={styles.timestamp}>{formatTime(message.timestamp)}</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => console.log("Like pressed")}
            >
              <Ionicons name="thumbs-up-outline" size={14} color="#4a5568" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => console.log("Copy pressed")}
            >
              <Ionicons name="copy-outline" size={14} color="#4a5568" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => console.log("Share pressed")}
            >
              <Ionicons name="share-outline" size={14} color="#4a5568" />
            </TouchableOpacity>
          </View>
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
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  userMessageRow: {
    flexDirection: 'row-reverse', // Reverse order for user messages (avatar on right)
  },
  aiMessageRow: {
    flexDirection: 'row', // Normal order for AI messages (avatar on left)
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    marginHorizontal: 8,
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 50,
    height: 50,
  },
  messageContainer: {
    padding: 14,
    borderRadius: 18,
    maxWidth: '80%',
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
    width: '100%',
  },
  timestampActionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userMeta: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
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