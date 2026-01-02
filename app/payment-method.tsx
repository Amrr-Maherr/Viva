import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';

export default function PaymentMethodScreen() {
  const paymentMethods = [
    {
      id: 1,
      type: 'Credit Card',
      brand: 'Visa',
      last4: '1234',
      expiry: '12/26',
      name: 'John Doe',
      isDefault: true,
    },
    {
      id: 2,
      type: 'Credit Card',
      brand: 'MasterCard',
      last4: '5678',
      expiry: '08/25',
      name: 'John Doe',
      isDefault: false,
    },
    {
      id: 3,
      type: 'PayPal',
      email: 'john.doe@example.com',
      isDefault: false,
    },
  ];

  const getBrandIcon = (brand: string) => {
    switch (brand?.toLowerCase()) {
      case 'visa':
        return 'card-outline';
      case 'mastercard':
        return 'card-outline';
      default:
        return 'card-outline';
    }
  };

  const handleEditPayment = (payment: any) => {
    Alert.alert('Edit Payment Method', `Edit ${payment.type}`);
  };

  const handleDeletePayment = (payment: any) => {
    Alert.alert(
      'Delete Payment Method',
      `Are you sure you want to delete this ${payment.type}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => Alert.alert('Payment Method Deleted') },
      ]
    );
  };

  const handleSetDefault = (payment: any) => {
    Alert.alert('Set as Default', `${payment.type} set as default payment method`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Payment Methods</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => Alert.alert('Add New Payment')}>
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Add New</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.paymentList}>
        {paymentMethods.map((payment) => (
          <View key={payment.id} style={styles.paymentCard}>
            <View style={styles.paymentHeader}>
              <View style={styles.paymentTypeContainer}>
                <Text style={styles.paymentType}>{payment.type}</Text>
                {payment.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultText}>Default</Text>
                  </View>
                )}
              </View>
              <View style={styles.paymentActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleEditPayment(payment)}
                >
                  <Ionicons name="pencil" size={16} color="#1A1A1A" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleDeletePayment(payment)}
                >
                  <Ionicons name="trash" size={16} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.paymentDetails}>
              {payment.brand ? (
                <>
                  <View style={styles.cardInfo}>
                    <Ionicons name={getBrandIcon(payment.brand) as any} size={24} color="#1A1A1A" />
                    <Text style={styles.cardNumber}>•••• •••• •••• {payment.last4}</Text>
                  </View>
                  <View style={styles.cardMeta}>
                    <Text style={styles.cardName}>{payment.name}</Text>
                    <Text style={styles.cardExpiry}>Expires {payment.expiry}</Text>
                  </View>
                </>
              ) : (
                <View style={styles.paypalInfo}>
                  <Ionicons name="logo-paypal" size={24} color="#0070BA" />
                  <Text style={styles.paypalEmail}>{payment.email}</Text>
                </View>
              )}
            </View>

            {!payment.isDefault && (
              <TouchableOpacity
                style={styles.setDefaultButton}
                onPress={() => handleSetDefault(payment)}
              >
                <Text style={styles.setDefaultText}>Set as Default</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>

      {paymentMethods.length === 0 && (
        <View style={styles.emptyState}>
          <Ionicons name="card-outline" size={64} color="#ccc" />
          <Text style={styles.emptyTitle}>No payment methods</Text>
          <Text style={styles.emptySubtitle}>Add your first payment method</Text>
          <TouchableOpacity style={styles.addFirstButton} onPress={() => Alert.alert('Add Payment')}>
            <Text style={styles.addFirstText}>Add Payment Method</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  paymentList: {
    flex: 1,
    padding: 20,
  },
  paymentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  paymentTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginRight: 8,
  },
  defaultBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  defaultText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  paymentActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  paymentDetails: {
    marginBottom: 12,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginLeft: 12,
  },
  cardMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardName: {
    fontSize: 14,
    color: '#666',
  },
  cardExpiry: {
    fontSize: 14,
    color: '#666',
  },
  paypalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paypalEmail: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginLeft: 12,
  },
  setDefaultButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
  },
  setDefaultText: {
    fontSize: 12,
    color: '#1A1A1A',
    fontWeight: '600',
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
  addFirstButton: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addFirstText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
