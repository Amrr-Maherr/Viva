import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Alert, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FAQsScreen() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: 'How do I place an order?',
      answer: 'To place an order, browse our products, add items to your cart, and proceed to checkout. You can pay using credit card, PayPal, or other available payment methods.',
    },
    {
      id: 2,
      question: 'What are the shipping costs?',
      answer: 'Shipping costs vary depending on your location and order value. Orders over $50 qualify for free shipping. You can see exact costs during checkout.',
    },
    {
      id: 3,
      question: 'How long does delivery take?',
      answer: 'Standard delivery takes 3-5 business days. Express delivery (1-2 business days) is available for an additional fee. International shipping may take 7-14 days.',
    },
    {
      id: 4,
      question: 'Can I return items?',
      answer: 'Yes, we offer a 30-day return policy. Items must be in original condition with tags attached. Return shipping costs may apply.',
    },
    {
      id: 5,
      question: 'How do I track my order?',
      answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also check your order status in the "My Orders" section of your account.',
    },
    {
      id: 6,
      question: 'What payment methods do you accept?',
      answer: 'We accept Visa, MasterCard, American Express, PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted.',
    },
    {
      id: 7,
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by destination. Import duties may apply.',
    },
    {
      id: 8,
      question: 'How do I change my account information?',
      answer: 'Go to your profile settings and select "Edit Profile". You can update your name, email, password, and other personal information there.',
    },
  ];

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Frequently Asked Questions</Text>
        <Text style={styles.subtitle}>Find answers to common questions</Text>
      </View>

      <ScrollView style={styles.faqList}>
        {faqs.map((faq) => (
          <View key={faq.id} style={styles.faqItem}>
            <TouchableOpacity
              style={styles.faqQuestion}
              onPress={() => toggleFAQ(faq.id)}
            >
              <Text style={styles.questionText}>{faq.question}</Text>
              <Ionicons
                name={expandedFAQ === faq.id ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#666"
              />
            </TouchableOpacity>
            {expandedFAQ === faq.id && (
              <View style={styles.faqAnswer}>
                <Text style={styles.answerText}>{faq.answer}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Still need help?</Text>
        <Text style={styles.contactText}>Can't find the answer you're looking for?</Text>
        <TouchableOpacity style={styles.contactButton} onPress={() => Alert.alert('Contact Support')}>
          <Ionicons name="mail-outline" size={20} color="#fff" />
          <Text style={styles.contactButtonText}>Contact Support</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  faqList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  faqItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  faqQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 1,
    marginRight: 10,
  },
  faqAnswer: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  answerText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  contactSection: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
