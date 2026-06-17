import React, { memo, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonBox from './SkeletonBox';
import SkeletonText from './SkeletonText';

interface CheckoutSkeletonProps {
  items?: number;
}

const CheckoutSkeleton: React.FC<CheckoutSkeletonProps> = ({ items = 3 }) => {
  const orderItems = useMemo(() => Array.from({ length: items }), [items]);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <SkeletonBox width="40%" height={18} borderRadius={4} />
        </View>
        {[0, 1].map((i) => (
          <View key={i} style={styles.card}>
            <View style={styles.cardContent}>
              <SkeletonBox width="30%" height={16} borderRadius={4} />
              <SkeletonBox width="70%" height={14} borderRadius={4} style={styles.cardSub} />
            </View>
            <SkeletonBox width={20} height={20} borderRadius={10} />
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <SkeletonBox width="50%" height={18} borderRadius={4} />
        </View>
        {[0, 1].map((i) => (
          <View key={i} style={styles.card}>
            <View style={styles.cardContent}>
              <SkeletonBox width="30%" height={16} borderRadius={4} />
              <SkeletonBox width="50%" height={14} borderRadius={4} style={styles.cardSub} />
            </View>
            <SkeletonBox width={20} height={20} borderRadius={10} />
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <SkeletonBox width="40%" height={18} borderRadius={4} style={styles.sectionTitle} />
        {orderItems.map((_, index) => (
          <View key={index} style={styles.orderItem}>
            <View style={styles.itemInfo}>
              <SkeletonBox width="70%" height={16} borderRadius={4} />
              <SkeletonBox width="30%" height={14} borderRadius={4} style={styles.qty} />
            </View>
            <SkeletonBox width={60} height={16} borderRadius={4} />
          </View>
        ))}
        <View style={styles.orderTotals}>
          {['Subtotal', 'Shipping', 'Tax'].map((_, i) => (
            <View key={i} style={styles.totalRow}>
              <SkeletonBox width={80} height={14} borderRadius={4} />
              <SkeletonBox width={60} height={14} borderRadius={4} />
            </View>
          ))}
          <View style={styles.totalRow}>
            <SkeletonBox width={60} height={16} borderRadius={4} />
            <SkeletonBox width={70} height={18} borderRadius={4} />
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
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
  section: {
    margin: 20,
    marginBottom: 0,
  },
  sectionHeader: {
    marginBottom: 15,
  },
  sectionTitle: {
    marginBottom: 15,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardContent: {
    flex: 1,
    gap: 4,
  },
  cardSub: {
    marginTop: 2,
  },
  itemInfo: {
    flex: 1,
  },
  qty: {
    marginTop: 4,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  orderTotals: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonContainer: {
    margin: 20,
  },
});

export default memo(CheckoutSkeleton);
