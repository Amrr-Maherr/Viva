import React, { memo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import SkeletonBox from './SkeletonBox';

const { width } = Dimensions.get('window');

const FeaturedProductCardSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <SkeletonBox
          width={width * 0.35}
          height={width * 0.35}
          borderRadius={0}
        />
      </View>
      <View style={styles.details}>
        <SkeletonBox width="90%" height={16} borderRadius={4} style={styles.titleLine} />
        <SkeletonBox width="90%" height={16} borderRadius={4} style={styles.titleLine} />
        <SkeletonBox width="40%" height={14} borderRadius={4} style={styles.priceLine} />
        <View style={styles.actions}>
          <SkeletonBox width={36} height={36} borderRadius={18} />
          <SkeletonBox width={36} height={36} borderRadius={18} />
        </View>
      </View>
    </View>
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
  details: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  titleLine: {
    marginBottom: 4,
  },
  priceLine: {
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
});

export default memo(FeaturedProductCardSkeleton);
