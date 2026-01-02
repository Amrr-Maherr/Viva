import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
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
}

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
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
