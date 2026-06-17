import React, { memo, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonBox from './SkeletonBox';

interface WishlistSkeletonProps {
  items?: number;
}

const WishlistSkeleton: React.FC<WishlistSkeletonProps> = ({ items = 4 }) => {
  const rows = useMemo(() => Array.from({ length: items }), [items]);

  return (
    <View style={styles.container}>
      {rows.map((_, index) => (
        <View key={index} style={styles.card}>
          <SkeletonBox width={60} height={60} borderRadius={8} />
          <View style={styles.details}>
            <SkeletonBox width="85%" height={16} borderRadius={4} style={styles.title} />
            <SkeletonBox width="45%" height={14} borderRadius={4} />
          </View>
          <View style={styles.actions}>
            <SkeletonBox width={36} height={36} borderRadius={18} />
            <SkeletonBox width={36} height={36} borderRadius={18} />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  details: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    marginBottom: 6,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
});

export default memo(WishlistSkeleton);
