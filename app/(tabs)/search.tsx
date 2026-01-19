import React, { useState } from 'react';
import { StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import useFetchSearchProducts from '@/queries/useFetchSearchProducts';
import ProductsList from '@/components/ProductsList';
import Loader from '@/components/Loader';
import ErrorView from '@/components/ErrorView';
import EmptyState from '@/components/EmptyState';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const router = useRouter();

  const { data: searchResults, isLoading, isError, refetch } = useFetchSearchProducts(debouncedQuery);

  const popularSearches = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Beauty', 'Toys', 'Furniture'];

  const recentSearches = ['Wireless headphones', 'Running shoes', 'Coffee maker', 'Smartphone', 'Laptop'];

  const handleSearch = () => {
    setDebouncedQuery(searchQuery.trim());
  };

  const handleTagPress = (tag: string) => {
    setSearchQuery(tag);
    setDebouncedQuery(tag);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setDebouncedQuery('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search products..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                <Ionicons name="close-circle" size={20} color="#ccc" />
              </TouchableOpacity>
            )}
          </View>
          {searchQuery.length > 0 && (
            <TouchableOpacity style={styles.cancelButton} onPress={clearSearch}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!debouncedQuery ? (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Popular Searches</Text>
              <View style={styles.tagsContainer}>
                {popularSearches.map((search, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.tag}
                    onPress={() => handleTagPress(search)}
                  >
                    <Ionicons name="flame-outline" size={14} color="#1A1A1A" style={styles.tagIcon} />
                    <Text style={styles.tagText}>{search}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
              {recentSearches.map((search, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.recentItem}
                  onPress={() => handleTagPress(search)}
                >
                  <Ionicons name="time-outline" size={20} color="#666" />
                  <Text style={styles.recentText}>{search}</Text>
                  <Ionicons name="chevron-forward" size={20} color="#ccc" />
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <>
            {isLoading && <Loader />}
            {isError && <ErrorView onRefetch={refetch} />}
            {!isLoading && !isError && searchResults?.data && searchResults.data.length > 0 && (
              <View style={styles.resultsContainer}>
                <View style={styles.resultsHeader}>
                  <Text style={styles.resultsTitle}>Search Results for "{debouncedQuery}"</Text>
                  <Text style={styles.resultsCount}>{searchResults.data.length} items</Text>
                </View>
                <ProductsList products={searchResults.data} />
                {searchResults.data.length > 10 && (
                  <TouchableOpacity
                    style={styles.viewAllButton}
                    onPress={() => router.push('/all-products')}
                  >
                    <Text style={styles.viewAllText}>View All Products</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
            {!isLoading && !isError && searchResults?.data && searchResults.data.length === 0 && (
              <EmptyState
                title="No results found"
                subtitle="Try different keywords or browse categories"
                icon="search"
              />
            )}
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flex: 1,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    paddingVertical: 0,
  },
  clearButton: {
    marginLeft: 10,
  },
  cancelButton: {
    paddingLeft: 15,
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 15,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tagIcon: {
    marginRight: 6,
  },
  tagText: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  recentText: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    marginLeft: 10,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  itemImage: {
    width: 50,
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 0,
    paddingTop: 10,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  resultsCount: {
    fontSize: 14,
    color: '#666',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 100,
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
  },
  viewAllButton: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  viewAllText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
});
