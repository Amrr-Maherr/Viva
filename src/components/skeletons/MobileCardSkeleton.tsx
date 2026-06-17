import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonBox from './SkeletonBox';

const MobileCardSkeleton: React.FC = () => {
  return (
    <View style={styles.card}>
      <SkeletonBox width={60} height={60} borderRadius={8} />
      <View style={styles.details}>
        <SkeletonBox width="90%" height={16} borderRadius={4} style={styles.titleLine} />
        <SkeletonBox width="50%" height={14} borderRadius={4} />
      </View>
      <SkeletonBox width={32} height={32} borderRadius={16} />
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginRight: 10,
  },
  titleLine: {
    marginBottom: 6,
  },
});

export default memo(MobileCardSkeleton);
