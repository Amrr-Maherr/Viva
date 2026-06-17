import React, { memo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import SkeletonBox from './SkeletonBox';
import SkeletonText from './SkeletonText';

const { width } = Dimensions.get('window');
const modalWidth = width * 0.85;

const ModalSkeleton: React.FC = () => {
  return (
    <View style={styles.backdrop}>
      <View style={styles.modal}>
        <View style={styles.header}>
          <SkeletonBox width="60%" height={22} borderRadius={4} />
          <SkeletonBox width={24} height={24} borderRadius={12} />
        </View>
        <View style={styles.body}>
          <SkeletonText lines={4} lineHeight={14} spacing={8} />
          <View style={styles.spacer} />
          <SkeletonBox width="100%" height={48} borderRadius={10} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    width: modalWidth,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  body: {
    gap: 16,
  },
  spacer: {
    height: 8,
  },
});

export default memo(ModalSkeleton);
