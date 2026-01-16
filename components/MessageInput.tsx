import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  View,
  TextInput,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/components/useColorScheme';

interface MessageInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSendPress: () => void;
  placeholder?: string;
  isLoading?: boolean;
}

export default function MessageInput({
  value,
  onChangeText,
  onSendPress,
  placeholder = "Type a message...",
  isLoading
}: MessageInputProps) {
  const ColorScheme = useColorScheme();
  return (
    <View
      style={styles.inputContainer}
    >
      <TextInput
        style={[
          styles.textInput,
          {
            backgroundColor: ColorScheme === "dark" ? "#2D3748" : "#FFFFFF",
            color: "#FFFFFF"
          }
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSendPress}
        placeholderTextColor={`${ColorScheme === "dark" ? "#C2C3CB" : "#ACADB9"}`}
        multiline
        // maxHeight={120}
      />
      <TouchableOpacity
        style={[
          styles.sendButton,
          isLoading ? { opacity: 0.6 } : {}
        ]}
        onPress={onSendPress}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size={20} color={"#fff"}/>
        ) : (
          <Ionicons name="send" size={24} color="#fff" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f0f4f8',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  textInput: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    borderRadius: 22,
    fontSize: 16,
    lineHeight: 20,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    color:"#fff"
  },
  sendButton: {
    width: 44,
    height: 44,
    backgroundColor: '#667eea',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
