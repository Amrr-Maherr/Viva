import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function NewAddressScreen() {
  const [addressType, setAddressType] = useState('Home');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });

  const addressTypes = ['Home', 'Work', 'Other'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveAddress = () => {
    // Validate form
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.zipCode) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Address Saved',
      'Your new address has been saved successfully!',
      [
        { text: 'OK', onPress: () => router.back() },
      ]
    );
  };

  const renderInput = (label: string, field: string, placeholder: string, keyboardType: any = 'default', required = false) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={formData[field as keyof typeof formData]}
        onChangeText={(value) => handleInputChange(field, value)}
        keyboardType={keyboardType}
        autoCapitalize={field === 'fullName' ? 'words' : 'none'}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add New Address</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.typeSelector}>
          <Text style={styles.sectionLabel}>Address Type</Text>
          <View style={styles.typeButtons}>
            {addressTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[styles.typeButton, addressType === type && styles.typeButtonActive]}
                onPress={() => setAddressType(type)}
              >
                <Text style={[styles.typeButtonText, addressType === type && styles.typeButtonTextActive]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {renderInput('Full Name', 'fullName', 'Enter your full name', 'default', true)}
        {renderInput('Phone Number', 'phone', 'Enter your phone number', 'phone-pad', true)}
        {renderInput('Street Address', 'address', 'Enter street address', 'default', true)}
        {renderInput('City', 'city', 'Enter city', 'default', true)}
        {renderInput('State', 'state', 'Enter state', 'default', true)}
        {renderInput('ZIP Code', 'zipCode', 'Enter ZIP code', 'numeric', true)}
        {renderInput('Country', 'country', 'Enter country')}

        <View style={styles.defaultContainer}>
          <TouchableOpacity style={styles.checkbox}>
            <Ionicons name="checkbox-outline" size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={styles.defaultText}>Set as default address</Text>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
          <Text style={styles.saveButtonText}>Save Address</Text>
        </TouchableOpacity>
      </View>
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
  form: {
    padding: 20,
  },
  typeSelector: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  typeButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: '#1A1A1A',
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  typeButtonTextActive: {
    color: '#fff',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  required: {
    color: '#FF3B30',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  defaultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    marginRight: 12,
  },
  defaultText: {
    fontSize: 14,
    color: '#1A1A1A',
  },
  saveButton: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
