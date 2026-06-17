import React, { memo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import SkeletonBox from './SkeletonBox';

const { width } = Dimensions.get('window');

const HeroSectionSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      <SkeletonBox width={width} height={250} borderRadius={0} />
      <View style={styles.overlay}>
        <SkeletonBox width={280} height={28} borderRadius={6} style={styles.title} />
        <SkeletonBox width={220} height={16} borderRadius={4} style={styles.subtitle} />
        <SkeletonBox width={140} height={44} borderRadius={22} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 12,
  },
  subtitle: {
    marginBottom: 24,
  },
});

export default memo(HeroSectionSkeleton);
