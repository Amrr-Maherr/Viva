import React, { memo, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonBox from './SkeletonBox';
import SkeletonCircle from './SkeletonCircle';

interface ListSkeletonProps {
  rows?: number;
  showAvatar?: boolean;
  showSecondary?: boolean;
}

const ListSkeleton: React.FC<ListSkeletonProps> = ({
  rows = 5,
  showAvatar = false,
  showSecondary = false,
}) => {
  const rowItems = useMemo(() => Array.from({ length: rows }), [rows]);

  return (
    <View style={styles.container}>
      {rowItems.map((_, index) => (
        <View
          key={index}
          style={[styles.row, index < rows - 1 && styles.rowBorder]}
        >
          {showAvatar && (
            <SkeletonCircle size={40} />
          )}
          <View style={styles.textContainer}>
            <SkeletonBox
              width={showSecondary ? '60%' : '80%'}
              height={15}
              borderRadius={4}
              style={styles.primaryLine}
            />
            {showSecondary && (
              <SkeletonBox width="40%" height={12} borderRadius={4} />
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  primaryLine: {
    marginBottom: 4,
  },
});

export default memo(ListSkeleton);
