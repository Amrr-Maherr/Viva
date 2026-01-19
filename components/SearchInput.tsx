import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search for clothes...",
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={25} color="gray" style={styles.iconLeft} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
      />
      <Ionicons name="mic" size={25} color="gray" style={styles.iconRight} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 20,
    height: 52,
    marginTop:10
  },
  iconLeft: {
    marginRight: 5,
  },
  input: {
    flex: 1,
  },
  iconRight: {
    marginLeft: 5,
  },
});

export default SearchInput;
