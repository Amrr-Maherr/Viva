import { useImagePicker } from '@/hooks/ImagePicker';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import React from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

interface ProfileImagePickerProps {
  currentImage?: string | null;
  onImageChange?: (imageUri: string) => void;
  onImageClear?: () => void;
  size?: number;
  showActions?: boolean;
}

export default function ProfileImagePicker({ 
  currentImage, 
  onImageChange, 
  onImageClear,
  size = 200,
  showActions = true
}: ProfileImagePickerProps) {
  const { selectedImage, isLoading, pickImage, pickImageFromCamera, setSelectedImage, clearImage } = useImagePicker();

  React.useEffect(() => {
    if (currentImage && !selectedImage) {
      setSelectedImage(currentImage);
    }
  }, [currentImage]);

  React.useEffect(() => {
    if (selectedImage && onImageChange) {
      onImageChange(selectedImage);
    }
  }, [selectedImage, onImageChange]);

  const showImagePickerOptions = () => {
    Alert.alert(
      'Change Profile Picture',
      'Choose how to update your profile picture',
      [
        {
          text: 'Camera',
          onPress: pickImageFromCamera,
        },
        {
          text: 'Photo Library',
          onPress: pickImage,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const handleClearImage = () => {
    Alert.alert(
      'Remove Profile Picture',
      'Are you sure you want to remove your profile picture?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            clearImage();
            if (onImageClear) {
              onImageClear();
            }
          },
        },
      ]
    );
  };

  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  const actionButtonSize = size * 0.15;
  const actionButtonPosition = size * 0.05;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={showImagePickerOptions}>
        <View style={[styles.avatar, avatarStyle]}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={[styles.profileImage, avatarStyle]} />
          ) : (
            <LottieView
              source={require('../assets/jsonIcons/Profile_Avatar.json')}
              autoPlay
              loop
              style={styles.lottieAvatar}
            />
          )}
          {isLoading && (
            <View style={[styles.loadingOverlay, avatarStyle]}>
              <ActivityIndicator size="large" color="#1A1A1A" />
            </View>
          )}
        </View>
        
        {showActions && (
          <>
            {/* Camera/Edit Icon */}
            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.editButton,
                {
                  width: actionButtonSize * 1.2,
                  height: actionButtonSize * 1.2,
                  borderRadius: (actionButtonSize * 1.2) / 2,
                  bottom: actionButtonPosition,
                  right: actionButtonPosition,
                }
              ]}
              onPress={showImagePickerOptions}
            >
              <Ionicons name="camera" size={actionButtonSize * 0.6} color="#fff" />
            </TouchableOpacity>

            {/* Delete Icon - only show if there's an image */}
            {selectedImage && (
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  styles.deleteButton,
                  {
                    width: actionButtonSize,
                    height: actionButtonSize,
                    borderRadius: actionButtonSize / 2,
                    top: actionButtonPosition,
                    right: actionButtonPosition,
                  }
                ]}
                onPress={handleClearImage}
              >
                <Ionicons name="close" size={actionButtonSize * 0.6} color="#fff" />
              </TouchableOpacity>
            )}
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'center',
  },
  imageContainer: {
    position: 'relative',
  },
  avatar: {
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  lottieAvatar: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  editButton: {
    backgroundColor: '#1A1A1A',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
});