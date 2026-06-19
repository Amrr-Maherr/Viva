import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StickyPurchaseBarProps {
    price: number;
    priceAfterDiscount?: number;
    isOutOfStock: boolean;
    isAddingToCart: boolean;
    onAddToCart: () => void;
    onAskAI: () => void;
}

const StickyPurchaseBar: React.FC<StickyPurchaseBarProps> = ({
    price,
    priceAfterDiscount,
    isOutOfStock,
    isAddingToCart,
    onAddToCart,
    onAskAI,
}) => {
    const displayPrice = priceAfterDiscount !== undefined ? priceAfterDiscount : price;

    return (
        <View style={styles.container}>
            <View style={styles.priceColumn}>
                <Text style={styles.priceLabel}>Price</Text>
                <View style={styles.priceRow}>
                    <Text style={styles.price}>${displayPrice}</Text>
                    {priceAfterDiscount !== undefined && (
                        <Text style={styles.originalPrice}>${price}</Text>
                    )}
                </View>
            </View>
            <TouchableOpacity
                style={styles.askAIButton}
                onPress={onAskAI}
                activeOpacity={0.8}
            >
                <Ionicons name="chatbubble-ellipses" size={18} color="#667eea" />
                <Text style={styles.askAIText}>Ask AI</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.addToCartButton, isOutOfStock && styles.disabledButton]}
                disabled={isOutOfStock || isAddingToCart}
                onPress={onAddToCart}
                activeOpacity={0.8}
            >
                <Ionicons name="bag-outline" size={20} color="#fff" />
                <Text style={styles.addToCartText}>
                    {isAddingToCart ? 'Adding...' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 12,
        paddingBottom: 34,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#e0e0e0',
        gap: 12,
    },
    priceColumn: {
        flexShrink: 0,
    },
    priceLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: '#808080',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 6,
    },
    price: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1A1A1A',
    },
    originalPrice: {
        fontSize: 14,
        fontWeight: '400',
        color: '#999',
        textDecorationLine: 'line-through',
    },
    askAIButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9ff',
        borderWidth: 1,
        borderColor: '#667eea',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        gap: 6,
    },
    askAIText: {
        color: '#667eea',
        fontSize: 15,
        fontWeight: '600',
    },
    addToCartButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1A1A1A',
        paddingVertical: 14,
        borderRadius: 12,
        gap: 8,
    },
    disabledButton: {
        backgroundColor: '#c7c7cc',
    },
    addToCartText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default StickyPurchaseBar;
