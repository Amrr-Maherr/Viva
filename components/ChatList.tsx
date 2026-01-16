import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import MessageItem from './MessageItem';

type Message = {
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

interface ChatListProps {
  messages: Message[];
}

export interface ChatListRef {
  scrollToBottom: () => void;
}

const ChatList = forwardRef<ChatListRef, ChatListProps>(({ messages }, ref) => {
  const flatListRef = useRef<FlatList>(null);

  useImperativeHandle(ref, () => ({
    scrollToBottom: () => {
      flatListRef.current?.scrollToEnd({ animated: true });
    },
  }));

  useEffect(() => {
    // Auto scroll to bottom when messages change
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      renderItem={({ item }) => <MessageItem message={item} />}
      keyExtractor={(item, index) => index.toString()}
      style={styles.conversationList}
    />
  );
});

export default ChatList;

const styles = StyleSheet.create({
  conversationList: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
});
