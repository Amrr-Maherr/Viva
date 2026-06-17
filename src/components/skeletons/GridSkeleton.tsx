import React, { memo, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import ProductCardSkeleton from './ProductCardSkeleton';

interface GridSkeletonProps {
  columns?: number;
  rows?: number;
}

const GridSkeleton: React.FC<GridSkeletonProps> = ({ columns = 2, rows = 3 }) => {
  const items = useMemo(
    () => Array.from({ length: columns * rows }),
    [columns, rows]
  );

  return (
    <View style={styles.container}>
      {items.map((_, index) => (
        <View key={index} style={styles.gridItem}>
          <ProductCardSkeleton />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 10,
    gap: 16,
  },
  gridItem: {
    width: '47%',
  },
});

export default memo(GridSkeleton);
