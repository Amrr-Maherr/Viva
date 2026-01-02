import React, { useState } from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';

const { width } = Dimensions.get('window');

interface ProductImageGalleryProps {
    images: string[];
    height?: number;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
    images,
    height = Dimensions.get('window').height * 0.38
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <View style={styles.container}>
            <PagerView
                style={[styles.pagerView, { height }]}
                initialPage={0}
                onPageSelected={(e) => setCurrentIndex(e.nativeEvent.position)}
            >
                {images.map((image, index) => (
                    <View key={index} style={styles.slide}>
                        <Image
                            source={{ uri: image }}
                            style={[styles.image, { height }]}
                            resizeMode="contain"
                        />
                    </View>
                ))}
            </PagerView>
            <View style={styles.pagination}>
                {images.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            index === currentIndex && styles.activeDot
                        ]}
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
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
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
        backgroundColor: '#007aff',
    },
});

export default ProductImageGallery;
