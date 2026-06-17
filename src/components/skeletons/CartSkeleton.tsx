import React, { memo, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import MobileCardSkeleton from './MobileCardSkeleton';
import SkeletonBox from './SkeletonBox';

interface CartSkeletonProps {
  items?: number;
}

const CartSkeleton: React.FC<CartSkeletonProps> = ({ items = 3 }) => {
  const cartItems = useMemo(() => Array.from({ length: items }), [items]);

  return (
    <View style={styles.container}>
      {cartItems.map((_, index) => (
        <MobileCardSkeleton key={index} />
      ))}
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <SkeletonBox width={60} height={18} borderRadius={4} />
          <SkeletonBox width={80} height={20} borderRadius={4} />
        </View>
        <SkeletonBox width="100%" height={50} borderRadius={8} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  footer: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    gap: 15,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default memo(CartSkeleton);
