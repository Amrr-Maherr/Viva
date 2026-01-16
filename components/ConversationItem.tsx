import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';

interface ConversationItemProps {
  item: {
    id: string;
    name: string;
    lastMessage: string;
    time: string;
    avatar: string;
    unreadCount: number;
  };
  onPress?: () => void;
}

export default function ConversationItem({ item, onPress }: ConversationItemProps) {
  const ColorScheme = useColorScheme();
  const logoSource = ColorScheme === 'dark' ? require('../assets/images/LightLogo.png') : require('../assets/images/BlackLogo.png');
  return (
    <TouchableOpacity style={styles.conversationItem} onPress={onPress}>
      <Image source={logoSource} style={styles.avatar} />
      <View
        style={styles.conversationContent}
        lightColor="#F7F8FA"
        darkColor="#141718"
      >
        <View
          lightColor="#F7F8FA"
          darkColor="#141718"
          style={styles.conversationHeader}
        >
          <Text lightColor="#141718" darkColor="#F7F8FA" style={styles.name}>
            {item.name}
          </Text>
          <Text lightColor="#141718" darkColor="#F7F8FA" style={styles.time}>
            {item.time}
          </Text>
        </View>
        <View
          lightColor="#F7F8FA"
          darkColor="#141718"
          style={styles.messageContainer}
        >
          <Text
            lightColor="#141718"
            darkColor="#F7F8FA"
            style={styles.lastMessage}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View
              lightColor="#F7F8FA"
              darkColor="#141718"
              style={styles.unreadBadge}
            >
              <Text style={styles.unreadText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  conversationItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: '#e9ecef',
    alignItems: 'center',
    width:"100%"
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    // color: '#000',
  },
  time: {
    fontSize: 12,
    // color: '#888',
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    // color: '#666',
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  unreadText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
});
