import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import type { Product } from '../types/Product';

interface RelatedProductsProps {
    products?: Product[];
    title?: string;
}

const RelatedProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const router = useRouter();

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: '/product/[id]', params: { id: product._id } })}
            activeOpacity={0.7}
        >
            <Image source={{ uri: product.imageCover }} style={styles.cardImage} resizeMode="cover" />
            <View style={styles.cardInfo}>
                <Text style={styles.cardBrand} numberOfLines={1}>{product.brand?.name}</Text>
                <Text style={styles.cardTitle} numberOfLines={1}>{product.title}</Text>
                <Text style={styles.cardPrice}>${product.price}</Text>
            </View>
        </TouchableOpacity>
    );
};

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products, title = 'You May Also Like' }) => {
    if (!products || products.length === 0) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <FlatList
                data={products}
                renderItem={({ item }) => <RelatedProductCard product={item} />}
                keyExtractor={(item) => item._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        backgroundColor: '#fff',
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#1A1A1A',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    listContent: {
        paddingHorizontal: 16,
        gap: 12,
    },
    card: {
        width: 150,
        backgroundColor: '#f9f9fb',
        borderRadius: 12,
        overflow: 'hidden',
    },
    cardImage: {
        width: 150,
        height: 150,
        backgroundColor: '#f0f0f0',
    },
    cardInfo: {
        padding: 10,
    },
    cardBrand: {
        fontSize: 10,
        fontWeight: '700',
        color: '#666',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        marginBottom: 2,
    },
    cardTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 4,
    },
    cardPrice: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1A1A1A',
    },
});

export default RelatedProducts;
