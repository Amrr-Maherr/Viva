import React, { useState } from 'react';
import { View, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PagerView from 'react-native-pager-view';

const { width } = Dimensions.get('window');

interface ProductGalleryProps {
    images: string[];
    isFavorite: boolean;
    isUpdatingWishlist: boolean;
    onToggleFavorite: () => void;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({
    images,
    isFavorite,
    isUpdatingWishlist,
    onToggleFavorite,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <View style={styles.container}>
            <PagerView
                style={styles.pagerView}
                initialPage={0}
                onPageSelected={(e) => setCurrentIndex(e.nativeEvent.position)}
            >
                {images.map((image, index) => (
                    <View key={index} style={styles.slide}>
                        <Image
                            source={{ uri: image }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </View>
                ))}
            </PagerView>
            <View style={styles.overlay}>
                <TouchableOpacity
                    style={[styles.favoriteButton, isUpdatingWishlist && styles.disabled]}
                    disabled={isUpdatingWishlist}
                    onPress={onToggleFavorite}
                >
                    <Ionicons
                        name={isFavorite ? "heart" : "heart-outline"}
                        size={22}
                        color={isFavorite ? "#ff3b30" : "#fff"}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.pagination}>
                {images.map((_, index) => (
                    <View
                        key={index}
                        style={[styles.dot, index === currentIndex && styles.activeDot]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        backgroundColor: '#fff',
    },
    pagerView: {
        width: width,
        height: width,
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fafafa',
    },
    image: {
        width: width,
        height: width,
    },
    overlay: {
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 10,
    },
    favoriteButton: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 22,
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabled: {
        opacity: 0.5,
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
        backgroundColor: 'rgba(0,0,0,0.25)',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#1A1A1A',
        width: 20,
        height: 6,
        borderRadius: 3,
    },
});

export default ProductGallery;
