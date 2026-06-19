import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import useFetchBrand from '@src/features/brands/hooks/useBrand';
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

export default function BrandDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { data: brand, isLoading, isError, refetch } = useFetchBrand(id);
    const { data: productsData } = useFetchProducts(undefined, undefined, 1, 50);

    if (isLoading) return <DetailsPageSkeleton />;
    if (isError) return <ErrorView onRefetch={refetch} />;
    if (!brand) return <View style={styles.center}><Text>Brand not found</Text></View>;

    const brandProducts = productsData?.pages.flatMap(p => p.data).filter(
        (p: Product) => p.brand?._id === id || p.brand?.name === brand.name
    ) || [];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{brand.name}</Text>
                <View style={styles.backButton} />
            </View>
            <View style={styles.brandBanner}>
                <Image source={{ uri: brand.image }} style={styles.brandLogo} resizeMode="contain" />
                <Text style={styles.brandName}>{brand.name}</Text>
                <Text style={styles.brandSlug}>{brand.slug?.replace(/-/g, ' ')}</Text>
            </View>
            <View style={styles.productsSection}>
                <Text style={styles.productsTitle}>Products ({brandProducts.length})</Text>
                <FlatList
                    data={brandProducts}
                    renderItem={({ item }) => <ProductCard product={item} />}
                    keyExtractor={(item) => item._id}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.grid}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<Text style={styles.empty}>No products found for this brand.</Text>}
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
    brandBanner: {
        alignItems: 'center',
        paddingVertical: 32,
        backgroundColor: '#fff',
        marginBottom: 1,
    },
    brandLogo: { width: 100, height: 100, borderRadius: 50, marginBottom: 12, backgroundColor: '#f0f0f0' },
    brandName: { fontSize: 22, fontWeight: '700', color: '#1A1A1A', marginBottom: 4 },
    brandSlug: { fontSize: 14, color: '#666', fontWeight: '400' },
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
