import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Message = {
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

interface MessageItemProps {
  message: Message;
}

const formatBoldText = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <Text key={index} style={styles.bold}>{part.slice(2, -2)}</Text>;
    }
    return <Text key={index}>{part}</Text>;
  });
};

const formatTime = (date: Date) =>
  date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export default function MessageItem({ message }: MessageItemProps) {
  const isUser = message.sender === 'user';

  const handleCopy = () => {
    Clipboard.setStringAsync(message.text);
  };

  return (
    <View style={[styles.wrapper, isUser ? styles.wrapperEnd : styles.wrapperStart]}>
      {!isUser && (
        <View style={styles.avatarCol}>
          <View style={styles.avatarCircle}>
            <LottieView
              source={require('../../../../assets/jsonIcons/AI_logo.json')}
              autoPlay
              loop
              style={styles.avatarIcon}
            />
          </View>
        </View>
      )}
      <View style={styles.bubbleCol}>
        <View style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}>
          <Text style={[styles.msgText, isUser && styles.userMsgText]}>
            {formatBoldText(message.text)}
          </Text>
        </View>
        <View style={[styles.metaRow, isUser && styles.metaRowEnd]}>
          <Text style={styles.time}>{formatTime(message.timestamp)}</Text>
          {!isUser && (
            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="thumbs-up-outline" size={14} color="#808080" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="thumbs-down-outline" size={14} color="#808080" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="share-outline" size={14} color="#808080" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCopy} style={styles.actionBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="copy-outline" size={13} color="#808080" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginVertical: 5,
    paddingHorizontal: 25,
    alignItems: 'flex-end',
  },
  wrapperEnd: {
    justifyContent: 'flex-end',
  },
  wrapperStart: {
    justifyContent: 'flex-start',
  },
  avatarCol: {
    marginRight: 8,
    marginBottom: 18,
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarIcon: {
    width: 22,
    height: 22,
  },
  bubbleCol: {
    maxWidth: '78%',
  },
  bubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
  },
  userBubble: {
    backgroundColor: '#1A1A1A',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  msgText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#1A1A1A',
  },
  userMsgText: {
    color: '#FFFFFF',
  },
  bold: {
    fontWeight: '700',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    paddingHorizontal: 4,
  },
  metaRowEnd: {
    justifyContent: 'flex-end',
  },
  time: {
    fontSize: 11,
    color: '#808080',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  actionBtn: {
    padding: 3,
    marginLeft: 6,
  },
});
