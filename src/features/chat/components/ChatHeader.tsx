import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

interface ChatHeaderProps {
  title: string;
  onSearchPress?: () => void;
}

export default function ChatHeader({ title, onSearchPress }: ChatHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableOpacity onPress={onSearchPress} style={styles.iconBtn}>
        <Ionicons name="search" size={24} color="#1A1A1A" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    marginRight: 12,
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  iconBtn: {
    padding: 4,
  },
});
