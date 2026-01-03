import React, { useCallback, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, View, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useFetchWishlist from '@/queries/useFetchWishlist';
import { useRemoveFromWishlistMutation } from '@/api/wishlist';
import { useAddToCartMutation } from '@/api/cart';
import Loader from '@/components/Loader';
import ErrorView from '@/components/ErrorView';
import { showToast } from '@/utils/toast';

export default function FavoritesScreen() {
  const { data, isLoading, isError, refetch } = useFetchWishlist();
  const removeFromWishlistMutation = useRemoveFromWishlistMutation();
  const addToCartMutation = useAddToCartMutation();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorView onRefetch={refetch} />;
  }

  const favorites = data?.data || [];

  const handleRemoveFromFavorites = async (productId: string) => {
    try {
      await removeFromWishlistMutation.mutateAsync(productId);
      showToast("info", "Removed from favorites");
    } catch (error: any) {
      showToast("error", error?.response?.data?.message || "Failed to remove from favorites");
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCartMutation.mutateAsync(productId);
      showToast("success", "Added to cart");
    } catch (error: any) {
      showToast("error", error?.response?.data?.message || "Failed to add to cart");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Favorites</Text>
        <Text style={styles.subtitle}>{favorites.length} items</Text>
      </View>

      <ScrollView
        style={styles.itemsContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {favorites.map((item: any) => (
          <TouchableOpacity key={item._id} style={styles.favoriteItem} onPress={() => showToast('info', 'Product Details')}>
            <Image source={{ uri: item.imageCover }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.title}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
            <View style={styles.itemActions}>
              <TouchableOpacity style={styles.actionButton} onPress={() => handleAddToCart(item._id)} disabled={addToCartMutation.isPending}>
                {addToCartMutation.isPending ? (
                  <ActivityIndicator size="small" color="#1A1A1A" />
                ) : (
                  <Ionicons name="bag-add-outline" size={20} color="#1A1A1A" />
                )}
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => handleRemoveFromFavorites(item._id)} disabled={removeFromWishlistMutation.isPending}>
                {removeFromWishlistMutation.isPending ? (
                  <ActivityIndicator size="small" color="#FF3B30" />
                ) : (
                  <Ionicons name="heart-dislike-outline" size={20} color="#FF3B30" />
                )}
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {favorites.length === 0 && (
        <View style={styles.emptyState}>
          <Ionicons name="heart-outline" size={64} color="#ccc" />
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptySubtitle}>Start adding items to your favorites</Text>
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
  itemsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  favoriteItem: {
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
  itemImage: {
    width: 60,
    height: 60,
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
  itemActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
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
  },
});
