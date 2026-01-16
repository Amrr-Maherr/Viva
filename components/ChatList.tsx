import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, FlatList, Keyboard, Platform } from 'react-native';
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
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);

  useImperativeHandle(ref, () => ({
    scrollToBottom: () => {
      flatListRef.current?.scrollToEnd({ animated: true });
    },
  }));

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
      if (Platform.OS === 'ios') {
        setKeyboardHeight(e.endCoordinates.height);
      } else {
        setKeyboardHeight(0); // Android handles keyboard differently
      }
    });

    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription?.remove();
      hideSubscription?.remove();
    };
  }, []);

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
      contentContainerStyle={{ paddingBottom: keyboardHeight ? keyboardHeight - 50 : 20 }}
      keyboardShouldPersistTaps="handled"
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
