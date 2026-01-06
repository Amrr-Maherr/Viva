import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Alert, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import useFetchCart from '@/queries/useFetchCart';
import Loader from '@/components/Loader';
import ErrorView from '@/components/ErrorView';
import { showToast } from '@/utils/toast';

export default function CheckoutScreen() {
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState(1);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const { data: cartData, isLoading, isError, refetch } = useFetchCart();

  const addresses = [
    { id: 1, type: 'Home', address: '123 Main St, City, State 12345' },
    { id: 2, type: 'Work', address: '456 Office Blvd, City, State 67890' },
  ];

  const paymentMethods = [
    { id: 1, type: 'Credit Card', last4: '**** 1234', brand: 'Visa' },
    { id: 2, type: 'PayPal', email: 'user@example.com' },
  ];

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorView onRefetch={refetch} />;
  }

  const cartItems = cartData?.data?.products || [];
  const subtotal = cartData?.data?.totalCartPrice || 0;
  const shipping = 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Checkout</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <TouchableOpacity onPress={() => router.push('/new-address')}>
            <Text style={styles.addButton}>Add New</Text>
          </TouchableOpacity>
        </View>
        {addresses.map((address) => (
          <TouchableOpacity
            key={address.id}
            style={[styles.addressCard, selectedAddress === address.id && styles.selectedCard]}
            onPress={() => setSelectedAddress(address.id)}
          >
            <View style={styles.addressContent}>
              <Text style={styles.addressType}>{address.type}</Text>
              <Text style={styles.addressText}>{address.address}</Text>
            </View>
            <View style={[styles.radioButton, selectedAddress === address.id && styles.radioSelected]}>
              {selectedAddress === address.id && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <TouchableOpacity onPress={() => router.push('/new-card')}>
            <Text style={styles.addButton}>Add New</Text>
          </TouchableOpacity>
        </View>
        {paymentMethods.map((payment) => (
          <TouchableOpacity
            key={payment.id}
            style={[styles.paymentCard, selectedPayment === payment.id && styles.selectedCard]}
            onPress={() => setSelectedPayment(payment.id)}
          >
            <View style={styles.paymentContent}>
              <Text style={styles.paymentType}>{payment.type}</Text>
              <Text style={styles.paymentDetails}>
                {payment.last4 ? `${payment.brand} ${payment.last4}` : payment.email}
              </Text>
            </View>
            <View style={[styles.radioButton, selectedPayment === payment.id && styles.radioSelected]}>
              {selectedPayment === payment.id && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        {cartItems.map((item: any) => (
          <View key={item.product._id} style={styles.orderItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.product.title}</Text>
              <Text style={styles.itemQuantity}>Qty: {item.count}</Text>
            </View>
            <Text style={styles.itemPrice}>${(item.price * item.count).toFixed(2)}</Text>
          </View>
        ))}

        <View style={styles.orderTotals}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Shipping</Text>
            <Text style={styles.totalValue}>${shipping.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax</Text>
            <Text style={styles.totalValue}>${tax.toFixed(2)}</Text>
          </View>
          <View style={[styles.totalRow, styles.finalTotal]}>
            <Text style={styles.finalTotalLabel}>Total</Text>
            <Text style={styles.finalTotalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.placeOrderButton}
        disabled={isPlacingOrder}
        onPress={async () => {
          setIsPlacingOrder(true);
          // Simulate order placement
          setTimeout(() => {
            setIsPlacingOrder(false);
            showToast('success', 'Order placed successfully!');
            router.push('/order-success'); // Navigate to success screen
          }, 2000); // 2 second delay to simulate API call
        }}
      >
        <Text style={styles.placeOrderText}>
          {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
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
  },
  section: {
    margin: 20,
    marginBottom: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  addButton: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedCard: {
    borderColor: '#1A1A1A',
    backgroundColor: '#f8f9ff',
  },
  addressContent: {
    flex: 1,
  },
  addressType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#1A1A1A',
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1A1A1A',
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  paymentContent: {
    flex: 1,
  },
  paymentType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  paymentDetails: {
    fontSize: 14,
    color: '#666',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  orderTotals: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
  },
  totalValue: {
    fontSize: 14,
    color: '#1A1A1A',
  },
  finalTotal: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  finalTotalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  finalTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  placeOrderButton: {
    margin: 20,
    backgroundColor: '#1A1A1A',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
