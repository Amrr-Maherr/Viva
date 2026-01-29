import { addToCart } from '@/api/cart';
import { addToWishlist, removeFromWishlist } from '@/api/wishlist';
import ErrorView from '@/components/ErrorView';
import Loader from '@/components/Loader';
import ProductImageGallery from '@/components/ProductImageGallery';
import Colors from '@/constants/Colors';
import useFetchBrands from '@/queries/useFetchBrands';
import useFetchProduct from '@/queries/useFetchProduct';
import { showToast } from '@/utils/toast';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import React, { useLayoutEffect, useState } from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
    },
    headerButton: {
        padding: 8,
    },
    headerRight: {
        flexDirection: 'row',
    },
    galleryContainer: {
        position: 'relative',
    },
    galleryImage: {
        width: width,
        height: Dimensions.get('window').height * 0.38,
        resizeMode: 'contain',
        backgroundColor: '#fff',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 16,
        left: 0,
        right: 0,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(0,0,0,0.2)',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#1A1A1A',
    },
    imageContainer: {
        position: 'relative',
    },
    overlayIcons: {
        position: 'absolute',
        top: 50,
        left: 16,
        right: 16,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    overlayButton: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        padding: 10,
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#f2f2f7',
    },
    content: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 24,
    },
    brand: {
        fontSize: 13,
        fontWeight: '600',
        color: '#666',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 8,
    },
    productTitle: {
        fontSize: 25,
        fontWeight: '500',
        color: '#1A1A1A',
        marginBottom: 4,
        lineHeight: 30,
    },
    category: {
        fontSize: 14,
        fontWeight: '400',
        color: '#808080',
        marginBottom: 16,
    },
    price: {
        fontSize: 19,
        fontWeight: '400',
        color: '#1A1A1A',
        marginBottom: 12,
    },
    metaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stars: {
        flexDirection: 'row',
        marginRight: 6,
    },
    reviewsText: {
        fontSize: 14,
        color: '#808080',
        fontWeight: '400',
    },
    soldText: {
        fontSize: 14,
        color: '#808080',
        fontWeight: '400',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 16,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    aiHelpButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9ff',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#667eea',
        gap: 4,
    },
    aiHelpText: {
        fontSize: 12,
        color: '#667eea',
        fontWeight: '600',
    },
    specRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    specLabel: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
    specValue: {
        fontSize: 16,
        color: '#1A1A1A',
        fontWeight: '400',
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#1A1A1A',
        marginBottom: 16,
    },
    readMore: {
        color: '#1A1A1A',
        fontWeight: '600',
        fontSize: 16,
    },
    variantContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    sizeButton: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d1d1d6',
        marginRight: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    selectedSizeButton: {
        borderColor: '#007aff',
        backgroundColor: '#007aff',
    },
    sizeText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#333',
    },
    selectedSizeText: {
        color: '#fff',
    },
    colorSwatch: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 12,
        borderWidth: 2,
        borderColor: '#d1d1d6',
    },
    selectedColorSwatch: {
        borderColor: '#007aff',
    },
    additionalInfo: {
        backgroundColor: '#f2f2f7',
        padding: 16,
        borderRadius: 10,
        marginBottom: 16,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 8,
        fontWeight: '400',
    },
    bottomCTA: {
        backgroundColor: '#fff',
        paddingVertical: 16,
        paddingHorizontal: 16,
        paddingBottom: 34,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#c6c6c8',
    },
    ctaButtonsContainer: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
    },
    askAIButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9ff',
        borderWidth: 1,
        borderColor: '#667eea',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        gap: 8,
        minWidth: 100,
    },
    askAIText: {
        color: '#667eea',
        fontSize: 16,
        fontWeight: '600',
    },
    shareButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0fff4',
        borderWidth: 1,
        borderColor: '#34c759',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        gap: 8,
        minWidth: 100,
    },
    shareText: {
        color: '#34c759',
        fontSize: 16,
        fontWeight: '600',
    },

    availability: {
        fontSize: 16,
        fontWeight: '400',
    },
    disabledButton: {
        backgroundColor: '#c7c7cc',
    },
    addToBagButton: {
        backgroundColor: '#1A1A1A',
        paddingVertical: 12,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
    },
    imagesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    imagesHorizontal: {
        paddingHorizontal: 16,
    },
    gridImage: {
        width: 120,
        height: 120,
        marginRight: 8,
        borderRadius: 8,
    },
    brandCard: {
        alignItems: 'center',
        marginRight: 16,
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    brandImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 8,
    },
    brandName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1A1A1A',
        textAlign: 'center',
    },
    brandsHorizontal: {
        paddingHorizontal: 16,
        paddingVertical:20
    },
    addToBagText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default function ProductDetailsScreen() {
    const { id } = useLocalSearchParams();
    const navigation = useNavigation();
    const router = useRouter();
    const { data: product, isLoading, isError, refetch } = useFetchProduct(id as string);
    const { data: brands } = useFetchBrands();
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('Red');
    const [selectedSize, setSelectedSize] = useState('M');
    const [isFavorite, setIsFavorite] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [isUpdatingWishlist, setIsUpdatingWishlist] = useState(false);

    // Share product function
    const shareProduct = async () => {
        if (!product) return;
        
        try {
            const shareContent = `Check out this amazing product: ${product.title}\n\nPrice: $${product.price}\nBrand: ${product.brand?.name || 'Unknown'}\nRating: ${product.ratingsAverage}/5\n\nGet it now on Viva App!`;
            
            const isAvailable = await Sharing.isAvailableAsync();
            if (isAvailable) {
                await Sharing.shareAsync(shareContent, {
                    dialogTitle: 'Share Product',
                });
                showToast('success', 'Product shared successfully!');
            } else {
                showToast('error', 'Sharing is not available on this device');
            }
        } catch (error) {
            console.error('Error sharing product:', error);
            showToast('error', 'Failed to share product');
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: product?.title || 'Product Details',
        });
    }, [navigation, product]);

    if (isLoading) {
        return <Loader />;
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
    const colors = ['Red', 'Blue', 'Black', 'White'];
    const sizes = ['S', 'M', 'L', 'XL'];
    const shortDescription = product.description.slice(0, 100);
    const fullDescription = product.description;

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {/* Image Gallery with Overlay Icons */}
                <View style={styles.imageContainer}>
                    <ProductImageGallery images={productImages} />
                    <View style={styles.overlayIcons}>
                        <TouchableOpacity style={[styles.overlayButton, isUpdatingWishlist && { opacity: 0.5 }]} disabled={isUpdatingWishlist} onPress={async () => {
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
                                showToast('error', error.response?.data?.message || "Failed to update wishlist");
                            } finally {
                                setIsUpdatingWishlist(false);
                            }
                        }}>
                            <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color={isFavorite ? "#ff3b30" : "#fff"} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.content}>
                    {/* Product Header */}
                    <Text style={styles.brand}>{product.brand?.name}</Text>
                    <Text style={styles.productTitle} numberOfLines={2}>{product.title}</Text>
                    <Text style={styles.category}>{product.category?.name}</Text>

                    {/* Price & Meta */}
                    <Text style={styles.price}>${product.price}</Text>
                    <View style={styles.metaContainer}>
                        <View style={styles.ratingContainer}>
                            <View style={styles.stars}>
                                {[1,2,3,4,5].map(star => (
                                    <Ionicons key={star} name="star" size={14} color="#ffcc02" />
                                ))}
                            </View>
                            <Text style={styles.reviewsText}>({product.ratingsQuantity})</Text>
                        </View>
                        <Text style={styles.soldText}>{product.sold} sold</Text>
                    </View>

                    {/* Description */}
                    <View style={styles.section}>
                        <Text style={styles.description}>
                            {product.description}
                        </Text>
                        {/* <TouchableOpacity onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}>
                            <Text style={styles.readMore}>
                                {isDescriptionExpanded ? 'Show less' : 'Show more'}
                            </Text>
                        </TouchableOpacity> */}
                    </View>

                    {/* Product Specs */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Product Details</Text>
                            <TouchableOpacity 
                                style={styles.aiHelpButton}
                                onPress={() => {
                                    const productData = {
                                        id: product._id,
                                        title: product.title,
                                        price: product.price,
                                        brand: product.brand?.name || 'Unknown',
                                        category: product.category?.name || 'Unknown',
                                        description: product.description || '',
                                        rating: product.ratingsAverage || 0,
                                        stock: product.quantity || 0
                                    };
                                    
                                    router.push({
                                        pathname: '/chat',
                                        params: { 
                                            productContext: JSON.stringify(productData),
                                            initialMessage: `Can you explain the details and specifications of ${product.title}?`
                                        }
                                    });
                                }}
                            >
                                <Ionicons name="help-circle-outline" size={16} color="#667eea" />
                                <Text style={styles.aiHelpText}>Ask AI</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.specRow}>
                            <Text style={styles.specLabel}>Subcategory:</Text>
                            <Text style={styles.specValue}>{product.subcategory?.[0]?.name}</Text>
                        </View>
                        <View style={styles.specRow}>
                            <Text style={styles.specLabel}>Stock:</Text>
                            <Text style={styles.specValue}>{product.quantity} available</Text>
                        </View>
                        <View style={styles.specRow}>
                            <Text style={styles.specLabel}>Sold:</Text>
                            <Text style={styles.specValue}>{product.sold} units</Text>
                        </View>
                        <View style={styles.specRow}>
                            <Text style={styles.specLabel}>Rating:</Text>
                            <Text style={styles.specValue}>{product.ratingsAverage}/5 ({product.ratingsQuantity} reviews)</Text>
                        </View>
                        <View style={styles.specRow}>
                            <Text style={styles.specLabel}>Images:</Text>
                            <Text style={styles.specValue}>{product.images?.length || 0} photos</Text>
                        </View>
                    </View>

                    {/* Availability */}
                    <View style={styles.section}>
                        <Text style={[styles.availability, {
                            color: product.quantity > 10 ? '#34c759' : product.quantity > 0 ? '#ff9500' : '#ff3b30'
                        }]}>
                            {product.quantity > 10 ? 'In stock' : product.quantity > 0 ? 'Low stock' : 'Out of stock'}
                        </Text>
                    </View>

                    {/* All Images */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>All Images</Text>
                        <FlatList
                            data={productImages}
                            renderItem={({ item }) => <Image source={{ uri: item }} style={styles.gridImage} />}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.imagesHorizontal}
                        />
                    </View>

                    {/* Brands */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Brands</Text>
                        <FlatList
                            data={brands?.data}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.brandCard}
                                    onPress={() => (router.push as any)({ pathname: '/', params: { brand: item._id } })}
                                >
                                    <Image source={{ uri: item.image }} style={styles.brandImage} />
                                    <Text style={styles.brandName}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item._id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.brandsHorizontal}
                        />
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Action Area */}
            <View style={styles.bottomCTA}>
                <View style={styles.ctaButtonsContainer}>
                    <TouchableOpacity
                        style={styles.askAIButton}
                        onPress={() => {
                            const productData = {
                                id: product._id,
                                title: product.title,
                                price: product.price,
                                brand: product.brand?.name || 'Unknown',
                                category: product.category?.name || 'Unknown',
                                description: product.description || '',
                                rating: product.ratingsAverage || 0,
                                stock: product.quantity || 0
                            };
                            
                            router.push({
                                pathname: '/chat',
                                params: { 
                                    productContext: JSON.stringify(productData),
                                    initialMessage: `Tell me more about this product: ${product.title}`
                                }
                            });
                        }}
                    >
                        <Ionicons name="chatbubble-ellipses" size={20} color="#667eea" />
                        <Text style={styles.askAIText}>Ask AI</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.shareButton}
                        onPress={shareProduct}
                    >
                        <Ionicons name="share-outline" size={20} color="#34c759" />
                        <Text style={styles.shareText}>Share</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.addToBagButton, product.quantity === 0 && styles.disabledButton]}
                        disabled={product.quantity === 0 || isAddingToCart}
                        onPress={async () => {
                            setIsAddingToCart(true);
                            try {
                                await addToCart(product._id);
                                showToast('success', `${product.title} added to cart!`);
                            } catch (error: any) {
                                showToast('error', error.response?.data?.message || "Failed to add to cart");
                            } finally {
                                setIsAddingToCart(false);
                            }
                        }}
                    >
                        <Text style={styles.addToBagText}>
                            {isAddingToCart ? 'Adding...' : 'Add to Bag'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
