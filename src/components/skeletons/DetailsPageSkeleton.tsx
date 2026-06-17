import React, { memo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import SkeletonBox from './SkeletonBox';
import SkeletonText from './SkeletonText';

const { width } = Dimensions.get('window');

const DetailsPageSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.galleryContainer}>
        <SkeletonBox width={width} height={Dimensions.get('window').height * 0.38} borderRadius={0} />
        <View style={styles.overlayIcons}>
          <SkeletonBox width={44} height={44} borderRadius={22} />
        </View>
      </View>

      <View style={styles.content}>
        <SkeletonBox width="30%" height={13} borderRadius={4} style={styles.brand} />
        <SkeletonBox width="85%" height={25} borderRadius={4} style={styles.title} />
        <SkeletonBox width="50%" height={16} borderRadius={4} style={styles.category} />
        <SkeletonBox width="30%" height={19} borderRadius={4} style={styles.price} />

        <View style={styles.metaContainer}>
          <SkeletonBox width={120} height={16} borderRadius={4} />
          <SkeletonBox width={60} height={16} borderRadius={4} />
        </View>

        <View style={styles.section}>
          <SkeletonBox width="40%" height={18} borderRadius={4} style={styles.sectionTitle} />
          <SkeletonText lines={4} lineHeight={16} spacing={6} />
        </View>

        <View style={styles.section}>
          <SkeletonBox width="50%" height={18} borderRadius={4} style={styles.sectionTitle} />
          {[0, 1, 2, 3, 4].map((i) => (
            <View key={i} style={styles.specRow}>
              <SkeletonBox width="35%" height={16} borderRadius={4} />
              <SkeletonBox width="25%" height={16} borderRadius={4} />
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <SkeletonBox width={80} height={16} borderRadius={4} />
        </View>
      </View>

      <View style={styles.bottomCTA}>
        <View style={styles.ctaButtons}>
          <SkeletonBox height={48} borderRadius={10} style={{ flex: 1 }} />
          <SkeletonBox width={100} height={48} borderRadius={10} />
          <SkeletonBox height={48} borderRadius={10} style={{ flex: 1 }} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f7',
  },
  galleryContainer: {
    position: 'relative',
  },
  overlayIcons: {
    position: 'absolute',
    top: 50,
    right: 16,
  },
  content: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 24,
  },
  brand: {
    marginBottom: 8,
  },
  title: {
    marginBottom: 4,
  },
  category: {
    marginBottom: 16,
  },
  price: {
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  bottomCTA: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    paddingBottom: 34,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#c6c6c8',
  },
  ctaButtons: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
});

export default memo(DetailsPageSkeleton);
