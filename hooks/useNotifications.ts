import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';
import { router } from 'expo-router';

export const useNotifications = () => {
  const responseListener = useRef<any>(null);

  useEffect(() => {
    setupNotificationListener();

    // Cleanup on unmount
    return () => {
      // Note: Expo Notifications automatically handles cleanup of listeners
      // No need to manually remove notification subscriptions
    };
  }, []);

  const setupNotificationListener = async () => {
    // Request notification permissions
    let { status } = await Notifications.getPermissionsAsync();

    if (status !== 'granted') {
      const permissionResult = await Notifications.requestPermissionsAsync();
      status = permissionResult.status;
    }

    if (status !== 'granted') {
      console.log('Notification permission denied');
      Alert.alert('Notification Permission', 'Please enable notifications in your device settings to receive alerts.');
      return;
    }

    console.log('Notification permission granted');

    // Add notification response listener to handle when user taps on notification
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      // Handle the notification tap - this is where the "link" functionality happens
      const data = response.notification.request.content.data;

      // Navigate based on notification data or content
      if (data && data.screen) {
        // If notification has specific screen data, navigate to it
        router.push(data.screen);
      } else {
        // Default navigation when notification is tapped
        router.push('/(tabs)/index'); // Navigate to home screen
      }
    });
  };

  return { setupNotificationListener };
};
