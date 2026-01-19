import React from 'react';
import { FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';

interface ProductsListProps {
    products: Product[] | undefined;
    onLoadMore?: () => void;
    isLoadingMore?: boolean;
}

const ProductsList: React.FC<ProductsListProps> = ({ products, onLoadMore, isLoadingMore }) => {
    return (
      <>
        {products && (
          <FlatList
            data={products}
            renderItem={({ item }) => <ProductCard product={item} />}
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
    paddingVertical:10
  },
  loader: {
    marginVertical: 20,
  },
});

export default ProductsList;
