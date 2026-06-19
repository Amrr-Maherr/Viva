import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import useFetchCategory from '@src/features/categories/hooks/useCategory';
import useFetchProducts from '@src/features/products/hooks/useProducts';
import ErrorView from '@src/shared/components/ErrorView';
import { DetailsPageSkeleton } from '@src/components/skeletons';
import { Product } from '@src/features/products/types/Product';

const { width } = Dimensions.get('window');
const itemWidth = (width - 48) / 2;

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const router = useRouter();
    return (
        <TouchableOpacity
            style={styles.productCard}
            onPress={() => router.push({ pathname: '/product/[id]', params: { id: product._id } })}
            activeOpacity={0.7}
        >
            <Image source={{ uri: product.imageCover }} style={styles.productImage} resizeMode="cover" />
            <View style={styles.productInfo}>
                <Text style={styles.productTitle} numberOfLines={1}>{product.title}</Text>
                <Text style={styles.productPrice}>${product.price}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default function CategoryDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { data: category, isLoading, isError, refetch } = useFetchCategory(id);
    const { data: productsData } = useFetchProducts(id, undefined, 1, 50);

    if (isLoading) return <DetailsPageSkeleton />;
    if (isError) return <ErrorView onRefetch={refetch} />;
    if (!category) return <View style={styles.center}><Text>Category not found</Text></View>;

    const categoryProducts = productsData?.pages.flatMap(p => p.data) || [];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{category.name}</Text>
                <View style={styles.backButton} />
            </View>
            <View style={styles.categoryBanner}>
                <Image source={{ uri: category.image }} style={styles.categoryImage} resizeMode="cover" />
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categorySlug}>{category.slug?.replace(/-/g, ' ')}</Text>
            </View>
            <View style={styles.productsSection}>
                <Text style={styles.productsTitle}>Products ({categoryProducts.length})</Text>
                <FlatList
                    data={categoryProducts}
                    renderItem={({ item }) => <ProductCard product={item} />}
                    keyExtractor={(item) => item._id}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.grid}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<Text style={styles.empty}>No products found in this category.</Text>}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f2f2f7' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e0e0e0',
    },
    backButton: { width: 40 },
    headerTitle: { fontSize: 17, fontWeight: '600', color: '#1A1A1A' },
    categoryBanner: {
        alignItems: 'center',
        paddingVertical: 32,
        backgroundColor: '#fff',
        marginBottom: 1,
    },
    categoryImage: { width: 120, height: 120, borderRadius: 16, marginBottom: 12, backgroundColor: '#f0f0f0' },
    categoryName: { fontSize: 22, fontWeight: '700', color: '#1A1A1A', marginBottom: 4 },
    categorySlug: { fontSize: 14, color: '#666', fontWeight: '400' },
    productsSection: { flex: 1, paddingHorizontal: 16, paddingTop: 20 },
    productsTitle: { fontSize: 17, fontWeight: '700', color: '#1A1A1A', marginBottom: 16 },
    grid: { paddingBottom: 24 },
    row: { justifyContent: 'space-between', marginBottom: 16 },
    productCard: {
        width: itemWidth,
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    productImage: { width: itemWidth, height: itemWidth },
    productInfo: { padding: 10 },
    productTitle: { fontSize: 14, fontWeight: '600', color: '#1A1A1A', marginBottom: 4 },
    productPrice: { fontSize: 14, fontWeight: '700', color: '#1A1A1A' },
    empty: { fontSize: 14, color: '#999', textAlign: 'center', paddingVertical: 40 },
});
