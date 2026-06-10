import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';

interface ImageActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
  hasImage: boolean;
  size?: number;
  position?: 'bottom-right' | 'top-right' | 'floating';
}

export default function ImageActionButtons({
  onEdit,
  onDelete,
  hasImage,
  size = 40,
  position = 'bottom-right'
}: ImageActionButtonsProps) {
  
  const handleDelete = () => {
    Alert.alert(
      'Remove Image',
      'Are you sure you want to remove this image?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: onDelete,
        },
      ]
    );
  };

  const getContainerStyle = () => {
    switch (position) {
      case 'top-right':
        return [styles.container, styles.topRight];
      case 'floating':
        return [styles.container, styles.floating];
      default:
        return [styles.container, styles.bottomRight];
    }
  };

  return (
    <View style={getContainerStyle()}>
      {/* Edit/Camera Button */}
      <TouchableOpacity
        style={[styles.actionButton, styles.editButton, { width: size, height: size, borderRadius: size / 2 }]}
        onPress={onEdit}
      >
        <Ionicons name="camera" size={size * 0.5} color="#fff" />
      </TouchableOpacity>

      {/* Delete Button - only show if there's an image */}
      {hasImage && (
        <TouchableOpacity
          style={[
            styles.actionButton, 
            styles.deleteButton, 
            { 
              width: size * 0.8, 
              height: size * 0.8, 
              borderRadius: (size * 0.8) / 2,
              marginLeft: position === 'floating' ? 10 : 0,
              marginTop: position === 'floating' ? 0 : 10,
            }
          ]}
          onPress={handleDelete}
        >
          <Ionicons name="trash" size={size * 0.4} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
  },
  bottomRight: {
    bottom: 5,
    right: 5,
    flexDirection: 'column',
  },
  topRight: {
    top: 5,
    right: 5,
    flexDirection: 'column',
  },
  floating: {
    bottom: -20,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  editButton: {
    backgroundColor: '#1A1A1A',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
});