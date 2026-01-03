import React, { useCallback, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, View, Image, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useFetchCart from '@/queries/useFetchCart';
import { useRemoveFromCartMutation } from '@/api/cart';
import Loader from '@/components/Loader';
import ErrorView from '@/components/ErrorView';
import { showToast } from '@/utils/toast';

export default function CartScreen() {
  const { data, isLoading, isError, refetch } = useFetchCart();
  const removeFromCartMutation = useRemoveFromCartMutation();
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

  const cartItems = data?.data?.products || [];
  const total = data?.data?.totalCartPrice || 0;

  const handleRemoveFromCart = async (productId: string) => {
    try {
      await removeFromCartMutation.mutateAsync(productId);
      showToast("info", "Removed from cart");
    } catch (error: any) {
      showToast("error", error?.response?.data?.message || "Failed to remove from cart");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shopping Cart</Text>
        <Text style={styles.subtitle}>{cartItems.length} items</Text>
      </View>

      <ScrollView
        style={styles.itemsContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {cartItems.map((item: any) => (
          <View key={item.product._id} style={styles.cartItem}>
            <Image source={{ uri: item.product.imageCover }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.product.title}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.quantityButton}>
                  <Ionicons name="remove" size={16} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.count}</Text>
                <TouchableOpacity style={styles.quantityButton}>
                  <Ionicons name="add" size={16} color="#1A1A1A" />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveFromCart(item.product._id)} disabled={removeFromCartMutation.isPending}>
              {removeFromCartMutation.isPending ? (
                <ActivityIndicator size="small" color="#FF3B30" />
              ) : (
                <Ionicons name="trash-outline" size={20} color="#FF3B30" />
              )}
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={() => showToast('info', 'Checkout')}>
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
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
  cartItem: {
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
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  removeButton: {
    padding: 5,
  },
  footer: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  checkoutButton: {
    backgroundColor: '#1A1A1A',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
