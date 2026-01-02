import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const categories = [
    { id: 1, name: 'Electronics', icon: 'phone-portrait-outline' },
    { id: 2, name: 'Clothing', icon: 'shirt-outline' },
    { id: 3, name: 'Books', icon: 'book-outline' },
    { id: 4, name: 'Home', icon: 'home-outline' },
    { id: 5, name: 'Sports', icon: 'football-outline' },
    { id: 6, name: 'Beauty', icon: 'sparkles-outline' },
  ];

  const featuredProducts = [
    { id: 1, name: 'Wireless Headphones', price: 99.99, rating: 4.5 },
    { id: 2, name: 'Smart Watch', price: 199.99, rating: 4.8 },
    { id: 3, name: 'Laptop', price: 899.99, rating: 4.7 },
    { id: 4, name: 'Smartphone', price: 699.99, rating: 4.6 },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning!</Text>
        <Text style={styles.subtitle}>Discover amazing products</Text>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#666" />
        <TouchableOpacity style={styles.searchInput} onPress={() => Alert.alert('Search')}>
          <Text style={styles.searchPlaceholder}>Search products...</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryItem} onPress={() => Alert.alert(category.name)}>
              <View style={styles.categoryIcon}>
                <Ionicons name={category.icon as any} size={30} color="#1A1A1A" />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Products</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsContainer}>
          {featuredProducts.map((product) => (
            <TouchableOpacity key={product.id} style={styles.productCard} onPress={() => Alert.alert('Product Details')}>
              <View style={styles.productImage}>
                <Ionicons name="image-outline" size={40} color="#ccc" />
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                <View style={styles.productFooter}>
                  <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                  <View style={styles.rating}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.ratingText}>{product.rating}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Special Offers</Text>
        <TouchableOpacity style={styles.offerCard} onPress={() => Alert.alert('Special Offer')}>
          <View style={styles.offerContent}>
            <Text style={styles.offerTitle}>Flash Sale!</Text>
            <Text style={styles.offerSubtitle}>Up to 50% off on selected items</Text>
            <Text style={styles.offerButton}>Shop Now</Text>
          </View>
          <View style={styles.offerImage}>
            <Ionicons name="flash" size={50} color="#FF6B35" />
          </View>
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
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20,
    padding: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: '#999',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginLeft: 20,
    marginBottom: 15,
  },
  categoriesContainer: {
    paddingLeft: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 80,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#f0f0f0',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    color: '#1A1A1A',
    textAlign: 'center',
  },
  productsContainer: {
    paddingLeft: 20,
  },
  productCard: {
    width: width * 0.4,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  offerCard: {
    margin: 20,
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  offerContent: {
    flex: 1,
  },
  offerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  offerSubtitle: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 12,
  },
  offerButton: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textDecorationLine: 'underline',
  },
  offerImage: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
