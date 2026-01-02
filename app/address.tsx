import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Alert, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function AddressScreen() {
  const addresses = [
    {
      id: 1,
      type: 'Home',
      name: 'John Doe',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      phone: '+1 (555) 123-4567',
      isDefault: true,
    },
    {
      id: 2,
      type: 'Work',
      name: 'John Doe',
      address: '456 Office Boulevard',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      phone: '+1 (555) 987-6543',
      isDefault: false,
    },
  ];

  const handleEditAddress = (address: any) => {
    Alert.alert('Edit Address', `Edit ${address.type} address`);
  };

  const handleDeleteAddress = (address: any) => {
    Alert.alert(
      'Delete Address',
      `Are you sure you want to delete your ${address.type} address?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => Alert.alert('Address Deleted') },
      ]
    );
  };

  const handleSetDefault = (address: any) => {
    Alert.alert('Set as Default', `${address.type} address set as default`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Addresses</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/new-address')}>
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Add New</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.addressList}>
        {addresses.map((address) => (
          <View key={address.id} style={styles.addressCard}>
            <View style={styles.addressHeader}>
              <View style={styles.typeContainer}>
                <Text style={styles.addressType}>{address.type}</Text>
                {address.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultText}>Default</Text>
                  </View>
                )}
              </View>
              <View style={styles.addressActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleEditAddress(address)}
                >
                  <Ionicons name="pencil" size={16} color="#1A1A1A" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleDeleteAddress(address)}
                >
                  <Ionicons name="trash" size={16} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.addressDetails}>
              <Text style={styles.recipientName}>{address.name}</Text>
              <Text style={styles.addressLine}>{address.address}</Text>
              <Text style={styles.addressLine}>
                {address.city}, {address.state} {address.zipCode}
              </Text>
              <Text style={styles.phoneNumber}>{address.phone}</Text>
            </View>

            {!address.isDefault && (
              <TouchableOpacity
                style={styles.setDefaultButton}
                onPress={() => handleSetDefault(address)}
              >
                <Text style={styles.setDefaultText}>Set as Default</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>

      {addresses.length === 0 && (
        <View style={styles.emptyState}>
          <Ionicons name="location-outline" size={64} color="#ccc" />
          <Text style={styles.emptyTitle}>No addresses yet</Text>
          <Text style={styles.emptySubtitle}>Add your first delivery address</Text>
          <TouchableOpacity style={styles.addFirstButton} onPress={() => Alert.alert('Add Address')}>
            <Text style={styles.addFirstText}>Add Address</Text>
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
  addressList: {
    flex: 1,
    padding: 20,
  },
  addressCard: {
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
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressType: {
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
  addressActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  addressDetails: {
    marginBottom: 12,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  addressLine: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  phoneNumber: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
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
