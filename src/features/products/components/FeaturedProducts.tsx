import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FeaturedProductCard from './FeaturedProductCard';

interface Product {
    _id: string;
    title: string;
    price: number;
    imageCover: string;
    // add other properties as needed
}

interface FeaturedProductsProps {
    products: Product[];
    title?: string;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products, title = "Featured Product" }) => {
    const featuredProduct = products[0];

    if (!featuredProduct) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <FeaturedProductCard product={featuredProduct} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 15,
        textAlign: 'left',
        paddingLeft:25
    },
});

export default FeaturedProducts;
