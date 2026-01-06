import React from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
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
}

const ProductsList: React.FC<ProductsListProps> = ({ products, refreshing, onRefresh }) => {
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
});

export default ProductsList;
