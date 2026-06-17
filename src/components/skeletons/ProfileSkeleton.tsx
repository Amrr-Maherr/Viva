import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonCircle from './SkeletonCircle';
import SkeletonBox from './SkeletonBox';
import SidebarSkeleton from './SidebarSkeleton';

const ProfileSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SkeletonCircle size={100} />
        <SkeletonBox width={140} height={22} borderRadius={4} style={styles.name} />
        <SkeletonBox width={180} height={16} borderRadius={4} />
      </View>
      <View style={styles.section}>
        <SkeletonBox width="40%" height={18} borderRadius={4} style={styles.sectionTitle} />
        <SidebarSkeleton items={6} />
      </View>
      <View style={styles.section}>
        <SkeletonBox width="30%" height={18} borderRadius={4} style={styles.sectionTitle} />
        <SidebarSkeleton items={3} />
      </View>
      <View style={styles.logoutContainer}>
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
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  name: {
    marginTop: 15,
    marginBottom: 6,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    marginBottom: 10,
  },
  logoutContainer: {
    margin: 20,
  },
});

export default memo(ProfileSkeleton);
