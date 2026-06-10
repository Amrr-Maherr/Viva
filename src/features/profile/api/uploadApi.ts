import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export interface UploadImageResponse {
  success: boolean;
  imageUrl?: string;
  message?: string;
}

export const uploadProfileImage = async (imageUri: string): Promise<UploadImageResponse> => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    // Create FormData for image upload
    const formData = new FormData();
    
    // Extract filename from URI
    const filename = imageUri.split('/').pop() || 'profile.jpg';
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : 'image/jpeg';

    formData.append('image', {
      uri: imageUri,
      name: filename,
      type,
    } as any);

    const response = await axios.post(
      'https://ecommerce.routemisr.com/api/v1/users/upload-profile-image', // This endpoint might not exist in the actual API
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': token,
        },
        timeout: 30000, // 30 seconds timeout
      }
    );

    return {
      success: true,
      imageUrl: response.data.imageUrl,
      message: 'Profile image uploaded successfully',
    };
  } catch (error: any) {
    console.error('Error uploading profile image:', error);
    
    if (error.response) {
      return {
        success: false,
        message: error.response.data?.message || 'Failed to upload image',
      };
    } else if (error.request) {
      return {
        success: false,
        message: 'Network error. Please check your connection.',
      };
    } else {
      return {
        success: false,
        message: 'Failed to upload image. Please try again.',
      };
    }
  }
};

// Alternative: Upload to cloud storage (like Cloudinary, AWS S3, etc.)
export const uploadToCloudinary = async (imageUri: string): Promise<UploadImageResponse> => {
  try {
    const cloudName = 'your_cloud_name'; // Replace with your Cloudinary cloud name
    const uploadPreset = 'your_upload_preset'; // Replace with your upload preset

    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'profile.jpg',
    } as any);
    formData.append('upload_preset', uploadPreset);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return {
      success: true,
      imageUrl: response.data.secure_url,
      message: 'Image uploaded successfully',
    };
  } catch (error: any) {
    console.error('Error uploading to Cloudinary:', error);
    return {
      success: false,
      message: 'Failed to upload image to cloud storage',
    };
  }
};