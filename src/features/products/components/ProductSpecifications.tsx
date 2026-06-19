import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Product } from '../types/Product';

interface ProductSpecificationsProps {
    product: Product;
}

const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({ product }) => {
    const specs: { label: string; value: string }[] = [
        { label: 'Brand', value: product.brand?.name || 'N/A' },
        { label: 'Category', value: product.category?.name || 'N/A' },
        { label: 'Subcategory', value: product.subcategory?.[0]?.name || 'N/A' },
        { label: 'Stock', value: `${product.quantity} available` },
        { label: 'Sold', value: `${product.sold} units` },
        { label: 'Rating', value: `${product.ratingsAverage}/5 (${product.ratingsQuantity} reviews)` },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Specifications</Text>
            <View style={styles.table}>
                {specs.map((spec, index) => (
                    <View
                        key={spec.label}
                        style={[styles.row, index < specs.length - 1 && styles.rowBorder]}
                    >
                        <Text style={styles.label}>{spec.label}</Text>
                        <Text style={styles.value}>{spec.value}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 24,
        backgroundColor: '#fff',
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 16,
    },
    table: {
        backgroundColor: '#f9f9fb',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 4,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
    },
    rowBorder: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e8e8ed',
    },
    label: {
        fontSize: 15,
        color: '#666',
        fontWeight: '500',
        flex: 1,
    },
    value: {
        fontSize: 15,
        color: '#1A1A1A',
        fontWeight: '500',
        flex: 1,
        textAlign: 'right',
    },
});

export default ProductSpecifications;
