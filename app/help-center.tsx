import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';

export default function HelpCenterScreen() {
  const helpCategories = [
    {
      id: 1,
      title: 'Getting Started',
      description: 'Learn how to use our app',
      icon: 'rocket-outline',
      color: '#4CAF50',
    },
    {
      id: 2,
      title: 'Account & Profile',
      description: 'Manage your account settings',
      icon: 'person-outline',
      color: '#2196F3',
    },
    {
      id: 3,
      title: 'Orders & Shipping',
      description: 'Track orders and shipping info',
      icon: 'bag-outline',
      color: '#FF9800',
    },
    {
      id: 4,
      title: 'Payments & Billing',
      description: 'Payment methods and billing',
      icon: 'card-outline',
      color: '#9C27B0',
    },
    {
      id: 5,
      title: 'Returns & Refunds',
      description: 'Return policy and refunds',
      icon: 'refresh-outline',
      color: '#FF5722',
    },
    {
      id: 6,
      title: 'Technical Support',
      description: 'App issues and troubleshooting',
      icon: 'settings-outline',
      color: '#607D8B',
    },
  ];

  const quickActions = [
    {
      id: 1,
      title: 'Contact Support',
      subtitle: 'Get help from our team',
      icon: 'chatbubble-outline',
      action: 'contact',
    },
    {
      id: 2,
      title: 'Live Chat',
      subtitle: 'Chat with a representative',
      icon: 'chatbubbles-outline',
      action: 'chat',
    },
    {
      id: 3,
      title: 'User Guide',
      subtitle: 'Browse our help articles',
      icon: 'book-outline',
      action: 'guide',
    },
    {
      id: 4,
      title: 'System Status',
      subtitle: 'Check service availability',
      icon: 'pulse-outline',
      action: 'status',
    },
  ];

  const handleCategoryPress = (category: any) => {
    Alert.alert(category.title, category.description);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'contact':
        Alert.alert('Contact Support', 'Opening support ticket...');
        break;
      case 'chat':
        Alert.alert('Live Chat', 'Connecting to live chat...');
        break;
      case 'guide':
        Alert.alert('User Guide', 'Opening user guide...');
        break;
      case 'status':
        Alert.alert('System Status', 'All systems operational');
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Help Center</Text>
        <Text style={styles.subtitle}>How can we help you today?</Text>
      </View>

      <View style={styles.searchSection}>
        <TouchableOpacity style={styles.searchBar} onPress={() => Alert.alert('Search Help')}>
          <Ionicons name="search" size={20} color="#666" />
          <Text style={styles.searchText}>Search for help...</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Browse by Category</Text>
        <View style={styles.categoriesGrid}>
          {helpCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => handleCategoryPress(category)}
            >
              <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                <Ionicons name={category.icon as any} size={24} color="#fff" />
              </View>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <Text style={styles.categoryDescription} numberOfLines={2}>
                {category.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={styles.quickActionItem}
            onPress={() => handleQuickAction(action.action)}
          >
            <View style={styles.actionIcon}>
              <Ionicons name={action.icon as any} size={20} color="#1A1A1A" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.popularSection}>
        <Text style={styles.sectionTitle}>Popular Articles</Text>
        <TouchableOpacity style={styles.articleItem} onPress={() => Alert.alert('How to reset password')}>
          <Text style={styles.articleTitle}>How to reset your password</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.articleItem} onPress={() => Alert.alert('Order tracking')}>
          <Text style={styles.articleTitle}>How to track your order</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.articleItem} onPress={() => Alert.alert('Return policy')}>
          <Text style={styles.articleTitle}>Understanding our return policy</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  searchSection: {
    padding: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchText: {
    fontSize: 16,
    color: '#999',
    marginLeft: 10,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 15,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  quickActionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  popularSection: {
    padding: 20,
    paddingTop: 0,
  },
  articleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  articleTitle: {
    fontSize: 16,
    color: '#1A1A1A',
    flex: 1,
  },
});
