import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function ContactScreen() {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
  });

  const [selectedTopic, setSelectedTopic] = useState('');

  const contactTopics = [
    'General Inquiry',
    'Technical Support',
    'Billing Question',
    'Order Issue',
    'Account Problem',
    'Feedback',
    'Other',
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSendMessage = () => {
    if (!formData.subject || !formData.message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!selectedTopic) {
      Alert.alert('Error', 'Please select a topic');
      return;
    }

    Alert.alert(
      'Message Sent',
      'Thank you for contacting us! We\'ll get back to you within 24 hours.',
      [
        { text: 'OK', onPress: () => router.back() },
      ]
    );
  };

  const quickContacts = [
    {
      id: 1,
      title: 'Call Us',
      subtitle: 'Mon-Fri 9AM-6PM',
      icon: 'call-outline',
      action: '+1 (555) 123-4567',
    },
    {
      id: 2,
      title: 'Email Support',
      subtitle: 'support@example.com',
      icon: 'mail-outline',
      action: 'support@example.com',
    },
    {
      id: 3,
      title: 'Live Chat',
      subtitle: 'Available now',
      icon: 'chatbubbles-outline',
      action: 'live_chat',
    },
  ];

  const handleQuickContact = (action: string) => {
    if (action === 'live_chat') {
      Alert.alert('Live Chat', 'Connecting to live chat...');
    } else {
      Alert.alert('Contact Info', action);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Contact Us</Text>
        <Text style={styles.subtitle}>We're here to help</Text>
      </View>

      <View style={styles.quickContacts}>
        {quickContacts.map((contact) => (
          <TouchableOpacity
            key={contact.id}
            style={styles.quickContactCard}
            onPress={() => handleQuickContact(contact.action)}
          >
            <View style={styles.contactIcon}>
              <Ionicons name={contact.icon as any} size={24} color="#1A1A1A" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>{contact.title}</Text>
              <Text style={styles.contactSubtitle}>{contact.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.form}>
        <Text style={styles.formTitle}>Send us a Message</Text>

        <View style={styles.topicSelector}>
          <Text style={styles.inputLabel}>Topic</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topicsList}>
            {contactTopics.map((topic) => (
              <TouchableOpacity
                key={topic}
                style={[styles.topicChip, selectedTopic === topic && styles.topicChipSelected]}
                onPress={() => setSelectedTopic(topic)}
              >
                <Text style={[styles.topicText, selectedTopic === topic && styles.topicTextSelected]}>
                  {topic}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Subject</Text>
          <TextInput
            style={styles.input}
            placeholder="Brief description of your inquiry"
            placeholderTextColor="#999"
            value={formData.subject}
            onChangeText={(value) => handleInputChange('subject', value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Message</Text>
          <TextInput
            style={[styles.input, styles.messageInput]}
            placeholder="Please provide details about your question or issue..."
            placeholderTextColor="#999"
            value={formData.message}
            onChangeText={(value) => handleInputChange('message', value)}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Ionicons name="send" size={20} color="#fff" />
          <Text style={styles.sendButtonText}>Send Message</Text>
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  quickContacts: {
    padding: 20,
  },
  quickContactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  contactSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  form: {
    padding: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  topicSelector: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  topicsList: {
    paddingVertical: 5,
  },
  topicChip: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  topicChipSelected: {
    backgroundColor: '#1A1A1A',
  },
  topicText: {
    fontSize: 14,
    color: '#666',
  },
  topicTextSelected: {
    color: '#fff',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
