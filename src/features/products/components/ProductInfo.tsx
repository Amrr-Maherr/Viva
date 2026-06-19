import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../types/Product';

interface ProductInfoProps {
    product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
    const hasDiscount = product.priceAfterDiscount !== undefined && product.priceAfterDiscount < product.price;
    const stockStatus = product.quantity > 10 ? 'In Stock' : product.quantity > 0 ? 'Low Stock' : 'Out of Stock';
    const stockColor = product.quantity > 10 ? '#34c759' : product.quantity > 0 ? '#ff9500' : '#ff3b30';

    return (
        <View style={styles.container}>
            <Text style={styles.brand}>{product.brand?.name}</Text>
            <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
            <Text style={styles.category}>{product.category?.name}</Text>

            <View style={styles.priceRow}>
                {hasDiscount ? (
                    <View style={styles.priceContainer}>
                        <Text style={styles.currentPrice}>${product.priceAfterDiscount}</Text>
                        <Text style={styles.originalPrice}>${product.price}</Text>
                        <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>
                                -{Math.round((1 - product.priceAfterDiscount! / product.price) * 100)}%
                            </Text>
                        </View>
                    </View>
                ) : (
                    <Text style={styles.currentPrice}>${product.price}</Text>
                )}
            </View>

            <View style={styles.metaRow}>
                <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#ffcc02" />
                    <Text style={styles.ratingText}>{product.ratingsAverage}</Text>
                    <Text style={styles.reviewsCount}>({product.ratingsQuantity})</Text>
                </View>
                <View style={[styles.stockBadge, { backgroundColor: stockColor + '15' }]}>
                    <View style={[styles.stockDot, { backgroundColor: stockColor }]} />
                    <Text style={[styles.stockText, { color: stockColor }]}>{stockStatus}</Text>
                </View>
            </View>

            <View style={styles.divider} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 20,
        backgroundColor: '#fff',
    },
    brand: {
        fontSize: 12,
        fontWeight: '700',
        color: '#666',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        marginBottom: 6,
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        color: '#1A1A1A',
        lineHeight: 28,
        marginBottom: 4,
    },
    category: {
        fontSize: 14,
        color: '#808080',
        fontWeight: '400',
        marginBottom: 16,
    },
    priceRow: {
        marginBottom: 16,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    currentPrice: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1A1A1A',
    },
    originalPrice: {
        fontSize: 18,
        fontWeight: '400',
        color: '#999',
        textDecorationLine: 'line-through',
    },
    discountBadge: {
        backgroundColor: '#ff3b30',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
    },
    discountText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
    },
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1A1A1A',
        marginLeft: 2,
    },
    reviewsCount: {
        fontSize: 14,
        color: '#808080',
        fontWeight: '400',
    },
    stockBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
        gap: 6,
    },
    stockDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    stockText: {
        fontSize: 13,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
    },
});

export default ProductInfo;
