import { addToCart } from '@src/features/cart/api/cartApi';
import { addToWishlist, removeFromWishlist } from '@src/features/wishlist/api/wishlistApi';
import ErrorView from '@src/shared/components/ErrorView';
import { DetailsPageSkeleton } from '@src/components/skeletons';
import Colors from '@src/shared/constants/colors';
import useFetchProduct from '@src/features/products/hooks/useProduct';
import { showToast } from '@src/shared/utils/toast';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import { Image, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ProductGallery from '../components/ProductGallery';
import ProductInfo from '../components/ProductInfo';
import ProductDescription from '../components/ProductDescription';
import ProductSpecifications from '../components/ProductSpecifications';
import ProductReviews from '../components/ProductReviews';
import RelatedProducts from '../components/RelatedProducts';
import StickyPurchaseBar from '../components/StickyPurchaseBar';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.background,
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#f2f2f7',
    },
    sectionSpacer: {
        height: 1,
        backgroundColor: '#f0f0f0',
    },
    brandSection: {
        paddingHorizontal: 16,
        paddingVertical: 24,
        backgroundColor: '#fff',
    },
    brandSectionTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 16,
    },
    brandCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9fb',
        borderRadius: 12,
        padding: 16,
        gap: 16,
    },
    brandImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#f0f0f0',
    },
    brandInfo: {
        flex: 1,
    },
    brandName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 4,
    },
    brandSlug: {
        fontSize: 13,
        color: '#808080',
        fontWeight: '400',
    },
    categoriesSection: {
        paddingHorizontal: 16,
        paddingVertical: 24,
        backgroundColor: '#fff',
    },
    categoriesSectionTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 16,
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    chip: {
        backgroundColor: '#f0f0f5',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
    },
    chipText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1A1A1A',
    },

});

export default function ProductDetailsScreen() {
    const { id } = useLocalSearchParams();
    const navigation = useNavigation();
    const router = useRouter();
    const { data: product, isLoading, isError, refetch } = useFetchProduct(id as string);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [isUpdatingWishlist, setIsUpdatingWishlist] = useState(false);

    const shareProduct = async () => {
        if (!product) return;
        try {
            await Share.share({
                message: `Check out ${product.title} — $${product.price} on Viva App!`,
                title: `${product.title} - Viva App`,
            });
            showToast('success', 'Product shared!');
        } catch {
            // user cancelled
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerStyle: { backgroundColor: '#fff' },
            headerShadowVisible: false,
            headerTitle: '',
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={{ padding: 8 }}
                >
                    <Ionicons name="chevron-back" size={24} color="#1A1A1A" />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity
                    onPress={shareProduct}
                    style={{ padding: 8 }}
                >
                    <Ionicons name="share-outline" size={22} color="#1A1A1A" />
                </TouchableOpacity>
            ),
        });
    }, [navigation, product]);

    if (isLoading) {
        return <DetailsPageSkeleton />;
    }

    if (isError) {
        return <ErrorView onRefetch={refetch} />;
    }

    if (!product) {
        return (
            <View style={styles.center}>
                <Text>No product found</Text>
            </View>
        );
    }

    const productImages = [product.imageCover, ...(product.images || [])];

    const handleToggleFavorite = async () => {
        setIsUpdatingWishlist(true);
        try {
            if (isFavorite) {
                await removeFromWishlist(product._id);
                showToast('info', `${product.title} removed from wishlist`);
            } else {
                await addToWishlist(product._id);
                showToast('success', `${product.title} added to wishlist`);
            }
            setIsFavorite(!isFavorite);
        } catch (error: any) {
            showToast('error', error.response?.data?.message || 'Failed to update wishlist');
        } finally {
            setIsUpdatingWishlist(false);
        }
    };

    const handleAddToCart = async () => {
        setIsAddingToCart(true);
        try {
            await addToCart(product._id);
            showToast('success', `${product.title} added to cart!`);
        } catch (error: any) {
            showToast('error', error.response?.data?.message || 'Failed to add to cart');
        } finally {
            setIsAddingToCart(false);
        }
    };

    const handleAskAI = () => {
        const productData = {
            id: product._id,
            title: product.title,
            price: product.price,
            brand: product.brand?.name || 'Unknown',
            category: product.category?.name || 'Unknown',
            description: product.description || '',
            rating: product.ratingsAverage || 0,
            stock: product.quantity || 0,
        };
        router.push({
            pathname: '/chat',
            params: {
                productContext: JSON.stringify(productData),
                initialMessage: `Tell me about ${product.title}`,
            },
        });
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <ProductGallery
                    images={productImages}
                    isFavorite={isFavorite}
                    isUpdatingWishlist={isUpdatingWishlist}
                    onToggleFavorite={handleToggleFavorite}
                />

                <ProductInfo product={product} />

                <View style={styles.sectionSpacer} />

                <ProductDescription description={product.description} />

                <View style={styles.sectionSpacer} />

                <ProductSpecifications product={product} />

                <View style={styles.sectionSpacer} />

                {product.brand && (
                    <View style={styles.brandSection}>
                        <Text style={styles.brandSectionTitle}>Brand</Text>
                        <TouchableOpacity
                            style={styles.brandCard}
                            activeOpacity={0.7}
                            onPress={() => router.push({ pathname: '/', params: { brand: product.brand?._id } })}
                        >
                            {product.brand.image && (
                                <Image
                                    source={{ uri: product.brand.image }}
                                    style={styles.brandImage}
                                    resizeMode="cover"
                                />
                            )}
                            <View style={styles.brandInfo}>
                                <Text style={styles.brandName}>{product.brand.name}</Text>
                                <Text style={styles.brandSlug}>
                                    {product.brand.slug?.replace(/-/g, ' ')}
                                </Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#999" />
                        </TouchableOpacity>
                    </View>
                )}

                <View style={styles.sectionSpacer} />

                {product.category && (
                    <View style={styles.categoriesSection}>
                        <Text style={styles.categoriesSectionTitle}>Categories</Text>
                        <View style={styles.chipsContainer}>
                            <TouchableOpacity
                                style={styles.chip}
                                activeOpacity={0.7}
                                onPress={() => router.push({ pathname: '/', params: { category: product.category?._id } })}
                            >
                                <Text style={styles.chipText}>{product.category.name}</Text>
                            </TouchableOpacity>
                            {product.subcategory?.map((sub) => (
                                <TouchableOpacity
                                    key={sub._id}
                                    style={styles.chip}
                                    activeOpacity={0.7}
                                    onPress={() => router.push({ pathname: '/', params: { category: sub._id } })}
                                >
                                    <Text style={styles.chipText}>{sub.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}

                <View style={styles.sectionSpacer} />

                <ProductReviews
                    productId={product._id}
                    rating={product.ratingsAverage}
                    ratingsQuantity={product.ratingsQuantity}
                />

                <View style={[styles.sectionSpacer, { marginBottom: 24 }]} />
            </ScrollView>

            <StickyPurchaseBar
                price={product.price}
                priceAfterDiscount={product.priceAfterDiscount}
                isOutOfStock={product.quantity === 0}
                isAddingToCart={isAddingToCart}
                onAddToCart={handleAddToCart}
                onAskAI={handleAskAI}
            />
        </View>
    );
}
