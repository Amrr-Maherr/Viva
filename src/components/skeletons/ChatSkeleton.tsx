import React, { memo, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonBox from './SkeletonBox';

interface ChatSkeletonProps {
  messages?: number;
}

const ChatSkeleton: React.FC<ChatSkeletonProps> = ({ messages = 4 }) => {
  const messageItems = useMemo(() => Array.from({ length: messages }), [messages]);

  return (
    <View style={styles.container}>
      {messageItems.map((_, index) => {
        const isUser = index % 2 === 0;
        return (
          <View
            key={index}
            style={[
              styles.messageRow,
              isUser ? styles.userRow : styles.aiRow,
            ]}
          >
            {!isUser && (
              <View style={styles.avatarContainer}>
                <SkeletonBox width={32} height={32} borderRadius={16} />
              </View>
            )}
            <View
              style={[
                styles.bubble,
                isUser ? styles.userBubble : styles.aiBubble,
              ]}
            >
              <SkeletonBox
                width={isUser ? 120 : 180}
                height={12}
                borderRadius={4}
                style={styles.textLine}
              />
              <SkeletonBox
                width={isUser ? 80 : 140}
                height={12}
                borderRadius={4}
                style={styles.textLine}
              />
              {!isUser && (
                <SkeletonBox
                  width={60}
                  height={12}
                  borderRadius={4}
                />
              )}
            </View>
          </View>
        );
      })}

      <View style={styles.inputArea}>
        <SkeletonBox flex={1} height={44} borderRadius={22} />
        <SkeletonBox width={44} height={44} borderRadius={22} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  aiRow: {
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    marginRight: 8,
    alignSelf: 'flex-end',
  },
  bubble: {
    borderRadius: 16,
    padding: 12,
  },
  userBubble: {
    backgroundColor: '#f0f0f0',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#f8f9ff',
    borderBottomLeftRadius: 4,
  },
  textLine: {
    marginBottom: 6,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    gap: 8,
  },
});

export default memo(ChatSkeleton);
