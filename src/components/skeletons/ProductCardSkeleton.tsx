import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonBox from './SkeletonBox';

const ProductCardSkeleton: React.FC = () => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <SkeletonBox width="100%" height={150} borderRadius={10} />
        <View style={styles.favoriteIcon}>
          <SkeletonBox width={34} height={34} borderRadius={17} />
        </View>
      </View>
      <View style={styles.info}>
        <SkeletonBox width="80%" height={16} borderRadius={4} style={styles.title} />
        <SkeletonBox width="40%" height={14} borderRadius={4} />
        <View style={styles.cartIcon}>
          <SkeletonBox width={32} height={32} borderRadius={16} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: 170,
    height: 250,
    marginRight: 15,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  info: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    marginBottom: 5,
  },
  cartIcon: {
    alignSelf: 'flex-end',
    marginTop: 5,
  },
});

export default memo(ProductCardSkeleton);
