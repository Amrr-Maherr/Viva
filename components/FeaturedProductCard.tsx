import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAddToCartMutation } from '@/api/cart';
import { useAddToWishlistMutation, useRemoveFromWishlistMutation } from '@/api/wishlist';
import { showToast } from '@/utils/toast';

interface Product {
    _id: string;
    title: string;
    price: number;
    imageCover: string;
    // add other properties as needed
}

interface FeaturedProductCardProps {
    product: Product;
}

const { width } = Dimensions.get('window');

const FeaturedProductCard: React.FC<FeaturedProductCardProps> = ({ product }) => {
    const addToCartMutation = useAddToCartMutation();
    const addToWishlistMutation = useAddToWishlistMutation();
    const removeFromWishlistMutation = useRemoveFromWishlistMutation();
    const [isFavorite, setIsFavorite] = React.useState(false);

    const handleAddToCart = async () => {
        try {
            await addToCartMutation.mutateAsync(product._id);
            showToast("success", "Added to cart!");
        } catch (error: any) {
            showToast("error", error?.response?.data?.message || "Failed to add to cart");
        }
    };

    const handleToggleFavorite = async () => {
        try {
            if (isFavorite) {
                await removeFromWishlistMutation.mutateAsync(product._id);
                showToast("info", "Removed from wishlist");
            } else {
                await addToWishlistMutation.mutateAsync(product._id);
                showToast("success", "Added to wishlist");
            }
            setIsFavorite(!isFavorite);
        } catch (error: any) {
            showToast("error", error?.response?.data?.message || "Failed to update wishlist");
        }
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => router.push(`/product/${product._id}`)}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: product.imageCover }}
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={styles.overlay}>
                    <Text style={styles.featuredBadge}>Featured</Text>
                </View>
            </View>
            <View style={styles.details}>
                <Text style={styles.title} numberOfLines={2}>
                    {product.title}
                </Text>
                <Text style={styles.price}>${product.price}</Text>
                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.favoriteButton}
                        onPress={handleToggleFavorite}
                        disabled={addToWishlistMutation.isPending || removeFromWishlistMutation.isPending}
                    >
                        {addToWishlistMutation.isPending || removeFromWishlistMutation.isPending ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={20} color={isFavorite ? "#ff3b30" : "#333"} />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.cartButton}
                        onPress={handleAddToCart}
                        disabled={addToCartMutation.isPending}
                    >
                        {addToCartMutation.isPending ? (
                            <ActivityIndicator size="small" color="#333" />
                        ) : (
                            <Ionicons name="bag-outline" size={20} color="#333" />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width * 0.9,
        backgroundColor: '#fff',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
        marginHorizontal: 20,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    imageContainer: {
        position: 'relative',
        width: width * 0.35,
        height: width * 0.35,
    },
    image: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    overlay: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: '#1A1A1A',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    featuredBadge: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    details: {
        flex: 1,
        padding: 15,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 8,
        textAlign: 'right',
    },
    price: {
        fontSize: 14,
        color: '#888',
        fontWeight: '600',
        marginBottom: 10,
        textAlign: 'right',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    favoriteButton: {
        marginRight: 15,
        padding: 8,
    },
    cartButton: {
        padding: 8,
    },
});

export default FeaturedProductCard;
