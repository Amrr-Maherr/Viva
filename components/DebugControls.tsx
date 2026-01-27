import React from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';
import { clearAppStorage, getAllStoredKeys, resetonboardingStatus } from '../utils/clearStorage';

interface DebugControlsProps {
  onStorageCleared?: () => void;
}

const DebugControls: React.FC<DebugControlsProps> = ({ onStorageCleared }) => {
  const handleClearAllStorage = async () => {
    Alert.alert(
      'Clear All Storage',
      'Are you sure you want to clear all app storage? This will reset onboarding and authentication.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearAppStorage();
              Alert.alert('Success', 'All storage cleared');
              onStorageCleared?.();
            } catch (error) {
              Alert.alert('Error', 'Failed to clear storage');
            }
          },
        },
      ]
    );
  };

  const handleResetonboarding = async () => {
    Alert.alert(
      'Reset onboarding',
      'Are you sure you want to reset onboarding status?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          onPress: async () => {
            try {
              await resetonboardingStatus();
              Alert.alert('Success', 'onboarding status reset');
              onStorageCleared?.();
            } catch (error) {
              Alert.alert('Error', 'Failed to reset onboarding status');
            }
          },
        },
      ]
    );
  };

  const handleShowStoredKeys = async () => {
    try {
      const keys = await getAllStoredKeys();
      Alert.alert('Stored Keys', keys.join('\n') || 'No stored keys found');
    } catch (error) {
      Alert.alert('Error', 'Failed to get stored keys');
    }
  };

  // Only show controls in development
  if (!__DEV__) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Button title="Clear All Storage" onPress={handleClearAllStorage} />
      <View style={styles.spacer} />
      <Button title="Reset onboarding" onPress={handleResetonboarding} />
      <View style={styles.spacer} />
      <Button title="Show Stored Keys" onPress={handleShowStoredKeys} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  spacer: {
    height: 10,
  },
});

export default DebugControls;