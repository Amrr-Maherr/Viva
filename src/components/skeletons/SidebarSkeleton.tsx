import React, { memo, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonBox from './SkeletonBox';
import SkeletonCircle from './SkeletonCircle';

interface SidebarSkeletonProps {
  items?: number;
}

const SidebarSkeleton: React.FC<SidebarSkeletonProps> = ({ items = 6 }) => {
  const menuItems = useMemo(() => Array.from({ length: items }), [items]);

  return (
    <View style={styles.container}>
      {menuItems.map((_, index) => (
        <View key={index} style={styles.menuItem}>
          <SkeletonCircle size={24} />
          <SkeletonBox width="70%" height={16} borderRadius={4} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginBottom: 4,
    gap: 14,
  },
});

export default memo(SidebarSkeleton);
