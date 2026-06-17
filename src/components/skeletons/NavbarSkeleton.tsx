import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonBox from './SkeletonBox';
import SkeletonCircle from './SkeletonCircle';

interface NavbarSkeletonProps {
  showBack?: boolean;
  showActions?: boolean;
}

const NavbarSkeleton: React.FC<NavbarSkeletonProps> = ({
  showBack = false,
  showActions = true,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {showBack && <SkeletonCircle size={32} />}
      </View>
      <View style={styles.center}>
        <SkeletonBox width={160} height={18} borderRadius={4} />
      </View>
      <View style={styles.right}>
        {showActions && (
          <>
            <SkeletonCircle size={28} />
            <SkeletonCircle size={28} />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});

export default memo(NavbarSkeleton);
