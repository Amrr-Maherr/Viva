import { showToast } from '@/utils/toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export interface UseProfileImageReturn {
  profileImage: string | null;
  isUploading: boolean;
  updateProfileImage: (imageUri: string) => Promise<void>;
  clearProfileImage: () => Promise<void>;
  loadProfileImage: () => Promise<void>;
}

export const useProfileImage = (): UseProfileImageReturn => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const loadProfileImage = async () => {
    try {
      const savedImage = await AsyncStorage.getItem('profileImage');
      if (savedImage) {
        setProfileImage(savedImage);
      }
    } catch (error) {
      console.error('Error loading profile image:', error);
    }
  };

  const updateProfileImage = async (imageUri: string) => {
    setIsUploading(true);
    try {
      // Save locally first for immediate UI update
      setProfileImage(imageUri);
      await AsyncStorage.setItem('profileImage', imageUri);

      // Optional: Upload to server
      // Uncomment the following lines if you want to upload to server
      /*
      const uploadResult = await uploadProfileImage(imageUri);
      if (uploadResult.success && uploadResult.imageUrl) {
        // Update with server URL
        setProfileImage(uploadResult.imageUrl);
        await AsyncStorage.setItem('profileImage', uploadResult.imageUrl);
        showToast('success', 'Profile image updated successfully!');
      } else {
        showToast('warning', 'Image saved locally. Upload failed.');
      }
      */

      showToast('success', 'Profile image updated successfully!');
    } catch (error) {
      console.error('Error updating profile image:', error);
      showToast('error', 'Failed to update profile image');
    } finally {
      setIsUploading(false);
    }
  };

  const clearProfileImage = async () => {
    try {
      setProfileImage(null);
      await AsyncStorage.removeItem('profileImage');
      showToast('info', 'Profile image removed');
    } catch (error) {
      console.error('Error clearing profile image:', error);
      showToast('error', 'Failed to remove profile image');
    }
  };

  useEffect(() => {
    loadProfileImage();
  }, []);

  return {
    profileImage,
    isUploading,
    updateProfileImage,
    clearProfileImage,
    loadProfileImage,
  };
};