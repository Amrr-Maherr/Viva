import React, { memo, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import MobileCardSkeleton from './MobileCardSkeleton';

interface MobileListSkeletonProps {
  rows?: number;
}

const MobileListSkeleton: React.FC<MobileListSkeletonProps> = ({ rows = 4 }) => {
  const items = useMemo(() => Array.from({ length: rows }), [rows]);

  return (
    <View style={styles.container}>
      {items.map((_, index) => (
        <MobileCardSkeleton key={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
});

export default memo(MobileListSkeleton);
