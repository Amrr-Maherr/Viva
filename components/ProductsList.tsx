import React from 'react';
import { FlatList, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import ProductCard from './ProductCard';

interface Product {
    _id: string;
    title: string;
    price: number;
    imageCover: string;
    // add other properties as needed
}

interface ProductsListProps {
    products: Product[] | undefined;
    refreshing?: boolean;
    onRefresh?: () => void;
    onLoadMore?: () => void;
    isLoadingMore?: boolean;
}

const ProductsList: React.FC<ProductsListProps> = ({ products, refreshing, onRefresh, onLoadMore, isLoadingMore }) => {
    return (
      <>
        {products && (
          <FlatList
            data={products}
            renderItem={({ item }) => <ProductCard product={item} />}
            numColumns={2}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.container}
            columnWrapperStyle={styles.columnWrapper}
            showsVerticalScrollIndicator={false}
            refreshControl={
              onRefresh ? (
                <RefreshControl refreshing={refreshing || false} onRefresh={onRefresh} />
              ) : undefined
            }
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={isLoadingMore ? <ActivityIndicator size="large" color="#1A1A1A" style={styles.loader} /> : null}
          />
        )}
      </>
    );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,

  },
  columnWrapper: {
    justifyContent: "space-around",
    marginBottom: 15,
    gap: 5,
  },
  loader: {
    marginVertical: 20,
  },
});

export default ProductsList;
