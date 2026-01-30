import { useImagePicker } from '@/hooks/ImagePicker';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import React from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImageActionButtons from './ImageActionButtons';

interface EnhancedProfileImagePickerProps {
  currentImage?: string | null;
  onImageChange?: (imageUri: string) => void;
  onImageClear?: () => void;
  size?: number;
  showActions?: boolean;
  actionPosition?: 'bottom-right' | 'top-right' | 'floating';
  showLabel?: boolean;
  label?: string;
  editable?: boolean;
}

export default function EnhancedProfileImagePicker({ 
  currentImage, 
  onImageChange, 
  onImageClear,
  size = 200,
  showActions = true,
  actionPosition = 'bottom-right',
  showLabel = false,
  label = 'Profile Picture',
  editable = true
}: EnhancedProfileImagePickerProps) {
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
    if (!editable) return;
    
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
    clearImage();
    if (onImageClear) {
      onImageClear();
    }
  };

  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  return (
    <View style={styles.container}>
      {showLabel && (
        <Text style={styles.label}>{label}</Text>
      )}
      
      <View style={styles.imageContainer}>
        <TouchableOpacity 
          style={[styles.imageWrapper, !editable && styles.nonEditable]} 
          onPress={editable ? showImagePickerOptions : undefined}
          disabled={!editable}
        >
          <View style={[styles.avatar, avatarStyle]}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={[styles.profileImage, avatarStyle]} />
            ) : (
              <View style={styles.placeholderContainer}>
                <LottieView
                  source={require('../assets/jsonIcons/Profile_Avatar.json')}
                  autoPlay
                  loop
                  style={styles.lottieAvatar}
                />
                {editable && (
                  <View style={styles.uploadHint}>
                    <Ionicons name="camera-outline" size={24} color="#666" />
                    <Text style={styles.uploadText}>Tap to add photo</Text>
                  </View>
                )}
              </View>
            )}
            
            {isLoading && (
              <View style={[styles.loadingOverlay, avatarStyle]}>
                <ActivityIndicator size="large" color="#1A1A1A" />
                <Text style={styles.loadingText}>Uploading...</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
        
        {showActions && editable && (
          <ImageActionButtons
            onEdit={showImagePickerOptions}
            onDelete={handleClearImage}
            hasImage={!!selectedImage}
            size={size * 0.2}
            position={actionPosition}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  imageContainer: {
    position: 'relative',
  },
  imageWrapper: {
    position: 'relative',
  },
  nonEditable: {
    opacity: 0.8,
  },
  avatar: {
    backgroundColor: '#f0f0f0',
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
  placeholderContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  lottieAvatar: {
    width: '100%',
    height: '100%',
  },
  uploadHint: {
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  uploadText: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 12,
    color: '#1A1A1A',
    fontWeight: '500',
  },
});