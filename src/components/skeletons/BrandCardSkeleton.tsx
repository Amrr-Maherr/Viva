import React, { memo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import SkeletonBox from './SkeletonBox';

const { width } = Dimensions.get('window');
const itemWidth = (width - 32) / 2 - 8;

const BrandCardSkeleton: React.FC = () => {
  return (
    <View style={styles.card}>
      <SkeletonBox width="100%" height={100} borderRadius={0} style={styles.image} />
      <SkeletonBox width="60%" height={16} borderRadius={4} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 8,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: itemWidth,
    gap: 12,
  },
  image: {
    marginBottom: 4,
  },
});

export default memo(BrandCardSkeleton);
