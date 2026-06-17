import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonBox from './SkeletonBox';
import SkeletonText from './SkeletonText';

const ArticleCardSkeleton: React.FC = () => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <SkeletonBox width="100%" height={120} borderRadius={10} />
      </View>
      <View style={styles.content}>
        <SkeletonText lines={2} lineHeight={16} spacing={6} width="95%" />
        <View style={styles.meta}>
          <SkeletonBox width={80} height={12} borderRadius={4} />
          <SkeletonBox width={60} height={12} borderRadius={4} />
        </View>
        <SkeletonText lines={1} lineHeight={13} width="70%" lastLineWidth="70%" />
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
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
  },
  content: {
    padding: 14,
    gap: 8,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default memo(ArticleCardSkeleton);
