import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Utility function to clear all AsyncStorage data
 * Useful for resetting the app state during development/testing
 */
export const clearAppStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
    console.log('✅ App storage cleared successfully');
  } catch (error) {
    console.error('❌ Failed to clear app storage:', error);
    throw error;
  }
};

/**
 * Utility function to reset onboarding status
 */
export const resetonboardingStatus = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('onboardingCompleted');
    console.log('✅ onboarding status reset successfully');
  } catch (error) {
    console.error('❌ Failed to reset onboarding status:', error);
    throw error;
  }
};

/**
 * Utility function to reset authentication status
 */
export const resetAuthStatus = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    console.log('✅ Authentication status reset successfully');
  } catch (error) {
    console.error('❌ Failed to reset authentication status:', error);
    throw error;
  }
};

/**
 * Utility function to get all stored keys for debugging
 */
export const getAllStoredKeys = async (): Promise<string[]> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    console.log('💾 Stored keys:', keys);
    return keys;
  } catch (error) {
    console.error('❌ Failed to get stored keys:', error);
    return [];
  }
};