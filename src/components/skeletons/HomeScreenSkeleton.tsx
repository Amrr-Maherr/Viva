import React, { memo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import HeroSectionSkeleton from './HeroSectionSkeleton';
import FeaturedProductCardSkeleton from './FeaturedProductCardSkeleton';
import SkeletonBox from './SkeletonBox';

const HomeScreenSkeleton: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <HeroSectionSkeleton />

      <View style={styles.featured}>
        <View style={styles.sectionTitle}>
          <SkeletonBox width={160} height={22} borderRadius={4} />
        </View>
        <FeaturedProductCardSkeleton />
      </View>

      <View style={styles.section}>
        <View style={[styles.sectionTitle, { paddingLeft: 0 }]}>
          <SkeletonBox width={160} height={22} borderRadius={4} />
        </View>
        <View style={styles.productsRow}>
          {[0, 1, 2, 3].map((i) => (
            <SkeletonBox key={i} width={170} height={250} borderRadius={10} />
          ))}
        </View>
      </View>

      <View style={styles.banner}>
        <SkeletonBox width="100%" height={120} borderRadius={0} />
      </View>

      <View style={styles.section}>
        <View style={[styles.sectionTitle, { paddingLeft: 0 }]}>
          <SkeletonBox width={160} height={22} borderRadius={4} />
        </View>
        <View style={styles.productsRow}>
          {[0, 1, 2, 3].map((i) => (
            <SkeletonBox key={i} width={170} height={250} borderRadius={10} />
          ))}
        </View>
      </View>

      <View style={styles.banner}>
        <SkeletonBox width="100%" height={120} borderRadius={0} />
      </View>

      <View style={styles.featured}>
        <View style={styles.sectionTitle}>
          <SkeletonBox width={160} height={22} borderRadius={4} />
        </View>
        <FeaturedProductCardSkeleton />
      </View>

      <View style={[styles.section, { paddingBottom: 80 }]}>
        <View style={[styles.sectionTitle, { paddingLeft: 0 }]}>
          <SkeletonBox width={160} height={22} borderRadius={4} />
        </View>
        <View style={styles.productsRow}>
          {[0, 1, 2, 3].map((i) => (
            <SkeletonBox key={i} width={170} height={250} borderRadius={10} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  featured: {
    marginVertical: 20,
  },
  sectionTitle: {
    paddingLeft: 25,
    marginBottom: 15,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  productsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 10,
  },
  banner: {
    marginVertical: 10,
  },
});

export default memo(HomeScreenSkeleton);
