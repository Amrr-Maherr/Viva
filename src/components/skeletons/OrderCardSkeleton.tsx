import React, { memo, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonBox from './SkeletonBox';
import SkeletonText from './SkeletonText';

interface OrderCardSkeletonProps {
  items?: number;
}

const OrderCardSkeleton: React.FC<OrderCardSkeletonProps> = ({ items = 2 }) => {
  const cartItems = useMemo(() => Array.from({ length: items }), [items]);

  return (
    <View style={styles.card}>
      <SkeletonBox width="50%" height={18} borderRadius={4} style={styles.orderId} />
      <SkeletonBox width="35%" height={16} borderRadius={4} style={styles.price} />
      <SkeletonBox width="55%" height={14} borderRadius={4} style={styles.status} />
      <SkeletonBox width="40%" height={14} borderRadius={4} style={styles.date} />
      <SkeletonBox width="25%" height={16} borderRadius={4} style={styles.itemsTitle} />

      {cartItems.map((_, index) => (
        <View key={index} style={styles.itemRow}>
          <SkeletonBox width={50} height={50} borderRadius={8} />
          <View style={styles.itemDetails}>
            <SkeletonBox width="80%" height={14} borderRadius={4} style={styles.itemTitle} />
            <SkeletonBox width="50%" height={14} borderRadius={4} />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderId: {
    marginBottom: 8,
  },
  price: {
    marginBottom: 4,
  },
  status: {
    marginBottom: 4,
  },
  date: {
    marginBottom: 12,
  },
  itemsTitle: {
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    marginBottom: 2,
  },
});

export default memo(OrderCardSkeleton);
