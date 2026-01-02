import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Product {
    _id: string;
    title: string;
    price: number;
    imageCover: string;
    // add other properties as needed
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const router = useRouter();

    return (
        <TouchableOpacity style={styles.card} onPress={() => router.push({ pathname: '/product/[id]', params: { id: product._id } })}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: product.imageCover }} style={styles.image} />
                <TouchableOpacity style={styles.favoriteIcon}>
                    <Ionicons name="heart-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.info}>
                <Text style={styles.title}>{product.title.slice(0,10)}</Text>
                <Text style={styles.price}>${product.price}</Text>
                <TouchableOpacity style={styles.cartIcon}>
                    <Ionicons name="bag-outline" size={20} color="#333" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        width: 170,
        height: 250,
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    favoriteIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 12,
        padding: 5,
    },
    info: {
        padding: 10,
        flex: 1,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    price: {
        fontSize: 14,
        color: '#888',
    },
    cartIcon: {
        alignSelf: 'flex-end',
        marginTop: 5,
    },
});

export default ProductCard;
