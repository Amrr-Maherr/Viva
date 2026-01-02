import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';

export default function MyOrdersScreen() {
  const orders = [
    {
      id: 'ORD-001',
      date: 'Jan 15, 2024',
      status: 'Delivered',
      statusColor: '#4CAF50',
      items: 3,
      total: 89.97,
      products: ['Wireless Headphones', 'Phone Case', 'Screen Protector'],
    },
    {
      id: 'ORD-002',
      date: 'Jan 10, 2024',
      status: 'Shipped',
      statusColor: '#2196F3',
      items: 2,
      total: 45.98,
      products: ['Running Shoes', 'Sports Socks'],
    },
    {
      id: 'ORD-003',
      date: 'Jan 5, 2024',
      status: 'Processing',
      statusColor: '#FF9800',
      items: 1,
      total: 199.99,
      products: ['Smart Watch'],
    },
    {
      id: 'ORD-004',
      date: 'Dec 28, 2023',
      status: 'Delivered',
      statusColor: '#4CAF50',
      items: 4,
      total: 156.75,
      products: ['Laptop Bag', 'Mouse', 'Keyboard', 'USB Drive'],
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'checkmark-circle';
      case 'Shipped':
        return 'airplane';
      case 'Processing':
        return 'time';
      default:
        return 'ellipse';
    }
  };

  const handleOrderPress = (order: any) => {
    Alert.alert(
      `Order ${order.id}`,
      `Status: ${order.status}\nItems: ${order.items}\nTotal: $${order.total.toFixed(2)}\n\nProducts:\n${order.products.join('\n')}`,
      [
        { text: 'Track Order', onPress: () => Alert.alert('Track Order', 'Opening tracking...') },
        { text: 'View Details', onPress: () => Alert.alert('Order Details', 'Opening order details...') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
        <Text style={styles.subtitle}>{orders.length} orders</Text>
      </View>

      <ScrollView style={styles.ordersList}>
        {orders.map((order) => (
          <TouchableOpacity
            key={order.id}
            style={styles.orderCard}
            onPress={() => handleOrderPress(order)}
          >
            <View style={styles.orderHeader}>
              <View style={styles.orderInfo}>
                <Text style={styles.orderId}>{order.id}</Text>
                <Text style={styles.orderDate}>{order.date}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: order.statusColor }]}>
                <Ionicons name={getStatusIcon(order.status) as any} size={14} color="#fff" />
                <Text style={styles.statusText}>{order.status}</Text>
              </View>
            </View>

            <View style={styles.orderDetails}>
              <Text style={styles.itemsText}>{order.items} items</Text>
              <Text style={styles.totalText}>${order.total.toFixed(2)}</Text>
            </View>

            <View style={styles.productsPreview}>
              <Text style={styles.productsText} numberOfLines={1}>
                {order.products.join(', ')}
              </Text>
            </View>

            <View style={styles.orderActions}>
              <TouchableOpacity style={styles.actionButton} onPress={() => Alert.alert('Reorder')}>
                <Ionicons name="repeat" size={16} color="#1A1A1A" />
                <Text style={styles.actionText}>Reorder</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => Alert.alert('Download Invoice')}>
                <Ionicons name="download-outline" size={16} color="#1A1A1A" />
                <Text style={styles.actionText}>Invoice</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => Alert.alert('Leave Review')}>
                <Ionicons name="star-outline" size={16} color="#1A1A1A" />
                <Text style={styles.actionText}>Review</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {orders.length === 0 && (
        <View style={styles.emptyState}>
          <Ionicons name="bag-handle-outline" size={64} color="#ccc" />
          <Text style={styles.emptyTitle}>No orders yet</Text>
          <Text style={styles.emptySubtitle}>Start shopping to see your orders here</Text>
          <TouchableOpacity style={styles.shopButton} onPress={() => Alert.alert('Shop Now')}>
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
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
    padding: 20,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  ordersList: {
    flex: 1,
    padding: 20,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemsText: {
    fontSize: 14,
    color: '#666',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  productsPreview: {
    marginBottom: 12,
  },
  productsText: {
    fontSize: 14,
    color: '#666',
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionText: {
    fontSize: 14,
    color: '#1A1A1A',
    marginLeft: 4,
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
    marginBottom: 24,
  },
  shopButton: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
