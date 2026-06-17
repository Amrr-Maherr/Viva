import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonBox from './SkeletonBox';
import SkeletonText from './SkeletonText';

interface DashboardWidgetSkeletonProps {
  showIcon?: boolean;
}

const DashboardWidgetSkeleton: React.FC<DashboardWidgetSkeletonProps> = ({
  showIcon = true,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {showIcon && <SkeletonBox width={40} height={40} borderRadius={10} />}
        <View style={styles.headerText}>
          <SkeletonBox width="60%" height={16} borderRadius={4} />
        </View>
      </View>
      <View style={styles.body}>
        <SkeletonBox width="50%" height={32} borderRadius={4} style={styles.value} />
        <SkeletonText lines={1} width="80%" lineHeight={12} lastLineWidth="80%" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  headerText: {
    flex: 1,
  },
  body: {
    gap: 8,
  },
  value: {
    marginBottom: 4,
  },
});

export default memo(DashboardWidgetSkeleton);
