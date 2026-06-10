import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, FlatList, Keyboard } from 'react-native';
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
    const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });
    return () => { showSub?.remove(); hideSub?.remove(); };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      renderItem={({ item }) => <MessageItem message={item} />}
      keyExtractor={(_, i) => i.toString()}
      style={styles.list}
      contentContainerStyle={{ paddingTop: 16, paddingBottom: keyboardHeight ? keyboardHeight - 50 : 16 }}
      keyboardShouldPersistTaps="handled"
    />
  );
});

export default ChatList;

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
