import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function NewCardScreen() {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
  });

  const [cardType, setCardType] = useState('');

  const handleInputChange = (field: string, value: string) => {
    // Format card number with spaces
    if (field === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setFormData(prev => ({ ...prev, [field]: formatted }));

      // Detect card type
      const firstDigit = value.charAt(0);
      if (firstDigit === '4') setCardType('Visa');
      else if (firstDigit === '5') setCardType('MasterCard');
      else if (firstDigit === '3') setCardType('American Express');
      else setCardType('');
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSaveCard = () => {
    // Basic validation
    if (!formData.cardNumber || !formData.expiryMonth || !formData.expiryYear || !formData.cvv || !formData.cardholderName) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (formData.cardNumber.replace(/\s/g, '').length < 13) {
      Alert.alert('Error', 'Please enter a valid card number');
      return;
    }

    if (formData.cvv.length < 3) {
      Alert.alert('Error', 'Please enter a valid CVV');
      return;
    }

    Alert.alert(
      'Card Saved',
      'Your new card has been saved successfully!',
      [
        { text: 'OK', onPress: () => router.back() },
      ]
    );
  };

  const renderInput = (
    label: string,
    field: string,
    placeholder: string,
    keyboardType: any = 'default',
    maxLength?: number,
    secureTextEntry = false
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={formData[field as keyof typeof formData]}
        onChangeText={(value) => handleInputChange(field, value)}
        keyboardType={keyboardType}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        autoCapitalize="words"
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add New Card</Text>
      </View>

      <View style={styles.cardPreview}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardType}>{cardType || 'Card'}</Text>
            <Ionicons name="card-outline" size={24} color="#fff" />
          </View>
          <View style={styles.cardNumber}>
            <Text style={styles.cardNumberText}>
              {formData.cardNumber || '•••• •••• •••• ••••'}
            </Text>
          </View>
          <View style={styles.cardFooter}>
            <Text style={styles.cardholderName}>
              {formData.cardholderName || 'CARDHOLDER NAME'}
            </Text>
            <Text style={styles.cardExpiry}>
              {formData.expiryMonth && formData.expiryYear
                ? `${formData.expiryMonth}/${formData.expiryYear.slice(-2)}`
                : 'MM/YY'
              }
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.form}>
        {renderInput('Card Number', 'cardNumber', '1234 5678 9012 3456', 'numeric', 19)}
        <View style={styles.row}>
          {renderInput('Month', 'expiryMonth', 'MM', 'numeric', 2)}
          {renderInput('Year', 'expiryYear', 'YY', 'numeric', 2)}
        </View>
        {renderInput('CVV', 'cvv', '123', 'numeric', 4, true)}
        {renderInput('Cardholder Name', 'cardholderName', 'John Doe')}

        <View style={styles.defaultContainer}>
          <TouchableOpacity style={styles.checkbox}>
            <Ionicons name="checkbox-outline" size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={styles.defaultText}>Set as default payment method</Text>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveCard}>
          <Text style={styles.saveButtonText}>Save Card</Text>
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
  cardPreview: {
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '90%',
    height: 180,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 20,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardType: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cardNumber: {
    alignItems: 'center',
  },
  cardNumberText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardholderName: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  cardExpiry: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  form: {
    padding: 20,
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
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
