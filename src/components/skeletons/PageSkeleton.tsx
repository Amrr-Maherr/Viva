import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import NavbarSkeleton from './NavbarSkeleton';
import SkeletonText from './SkeletonText';
import SkeletonBox from './SkeletonBox';

interface PageSkeletonProps {
  showNavbar?: boolean;
  sections?: number;
}

const PageSkeleton: React.FC<PageSkeletonProps> = ({
  showNavbar = true,
  sections = 3,
}) => {
  return (
    <View style={styles.container}>
      {showNavbar && <NavbarSkeleton />}
      <View style={styles.content}>
        {Array.from({ length: sections }, (_, i) => (
          <View key={i} style={styles.section}>
            <SkeletonBox width="40%" height={20} borderRadius={4} style={styles.sectionTitle} />
            <SkeletonText lines={3} lineHeight={14} spacing={6} />
            {i < sections - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginTop: 24,
  },
});

export default memo(PageSkeleton);
