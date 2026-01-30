import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';

export const useNotifications = () => {
  const notificationListener = useRef<any>(null);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setupNotifications();

    // Cleanup on unmount
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
      // Note: Expo Notifications automatically handles cleanup of listeners
    };
  }, []);

  const setupNotifications = async () => {
    // Request notification permissions
    let { status } = await Notifications.getPermissionsAsync();

    if (status !== 'granted') {
      const permissionResult = await Notifications.requestPermissionsAsync();
      status = permissionResult.status;
    }

    if (status !== 'granted') {
      console.log('Notification permission denied');
      Alert.alert(
        'Notification Permission',
        'Please enable notifications in your device settings to receive alerts.'
      );
      return;
    }

    console.log('Notification permission granted');

    // Cancel any existing scheduled notifications to avoid duplicates
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Schedule repeating notifications using setInterval
    intervalId.current = setInterval(async () => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "🤖 Meet Viva AI!",
          body: "Need help picking the perfect product? Viva's AI Bot has you covered!"
        },
        trigger: null, // Immediate notification
      });
    }, 600000); // every 10 seconds
  };

  return { setupNotifications };
};
