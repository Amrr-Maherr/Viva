import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Alert, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationsScreen() {
  const notifications = [
    {
      id: 1,
      title: 'Order Confirmed',
      message: 'Your order #12345 has been confirmed and is being prepared.',
      time: '2 hours ago',
      type: 'order',
      unread: true,
    },
    {
      id: 2,
      title: 'Flash Sale Alert',
      message: '50% off on all electronics! Limited time offer.',
      time: '5 hours ago',
      type: 'promotion',
      unread: true,
    },
    {
      id: 3,
      title: 'Delivery Update',
      message: 'Your package is out for delivery and will arrive today.',
      time: '1 day ago',
      type: 'delivery',
      unread: false,
    },
    {
      id: 4,
      title: 'New Product Available',
      message: 'Check out our latest smartphone collection.',
      time: '2 days ago',
      type: 'product',
      unread: false,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'order':
        return 'bag-check-outline';
      case 'promotion':
        return 'pricetag-outline';
      case 'delivery':
        return 'car-outline';
      case 'product':
        return 'phone-portrait-outline';
      default:
        return 'notifications-outline';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'order':
        return '#4CAF50';
      case 'promotion':
        return '#FF9800';
      case 'delivery':
        return '#2196F3';
      case 'product':
        return '#9C27B0';
      default:
        return '#666';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity onPress={() => Alert.alert('Mark all as read')}>
          <Text style={styles.markAllRead}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.notificationsList}>
        {notifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={[styles.notificationItem, notification.unread && styles.unreadItem]}
            onPress={() => Alert.alert(notification.title, notification.message)}
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name={getIcon(notification.type) as any}
                size={24}
                color={getIconColor(notification.type)}
              />
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationMessage} numberOfLines={2}>
                {notification.message}
              </Text>
              <Text style={styles.notificationTime}>{notification.time}</Text>
            </View>
            {notification.unread && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {notifications.length === 0 && (
        <View style={styles.emptyState}>
          <Ionicons name="notifications-off-outline" size={64} color="#ccc" />
          <Text style={styles.emptyTitle}>No notifications</Text>
          <Text style={styles.emptySubtitle}>You're all caught up!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  markAllRead: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  notificationsList: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  unreadItem: {
    backgroundColor: '#f8f9ff',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2196F3',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
