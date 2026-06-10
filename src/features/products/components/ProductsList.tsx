import React from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import ProductCard from './ProductCard';
import { Product } from '@src/features/products/types/Product';

interface ProductsListProps {
    products: Product[] | undefined;
    onLoadMore?: () => void;
    isLoadingMore?: boolean;
}

const { width: screenWidth } = Dimensions.get('window');
const HORIZONTAL_CARD_WIDTH = (screenWidth - 60) / 2.2;

const ProductsList: React.FC<ProductsListProps> = ({ products, onLoadMore, isLoadingMore }) => {
    return (
      <>
        {products && (
          <FlatList
            data={products}
            renderItem={({ item }) => (
              <View style={[styles.cardWrapper, { width: HORIZONTAL_CARD_WIDTH }]}>
                <ProductCard product={item} />
              </View>
            )}
            horizontal
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.container}
            showsHorizontalScrollIndicator={false}
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isLoadingMore ? (
                <ActivityIndicator
                  size="large"
                  color="#1A1A1A"
                  style={styles.loader}
                />
              ) : null
            }
          />
        )}
      </>
    );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 12,
  },
  cardWrapper: {
    flex: 0,
  },
  loader: {
    marginVertical: 20,
  },
});

export default ProductsList;

