import React, { memo, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonBox from './SkeletonBox';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  header?: boolean;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 5,
  columns = 4,
  header = true,
}) => {
  const rowItems = useMemo(() => Array.from({ length: rows }), [rows]);
  const colItems = useMemo(() => Array.from({ length: columns }), [columns]);

  return (
    <View style={styles.container}>
      {header && (
        <View style={styles.headerRow}>
          {colItems.map((_, colIndex) => (
            <SkeletonBox
              key={`h-${colIndex}`}
              flex={1}
              height={14}
              borderRadius={4}
              style={colIndex < columns - 1 ? styles.cellBorder : undefined}
            />
          ))}
        </View>
      )}
      {rowItems.map((_, rowIndex) => (
        <View
          key={rowIndex}
          style={[styles.row, rowIndex < rows - 1 && styles.rowBorder]}
        >
          {colItems.map((_, colIndex) => (
            <SkeletonBox
              key={colIndex}
              flex={1}
              height={12}
              borderRadius={4}
              style={colIndex < columns - 1 ? styles.cellBorder : undefined}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  headerRow: {
    flexDirection: 'row',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f0f0f0',
  },
  cellBorder: {
    marginRight: 8,
  },
});

export default memo(TableSkeleton);
