import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonBox from './SkeletonBox';

interface ChartSkeletonProps {
  type?: 'bar' | 'line' | 'pie';
  height?: number;
}

const ChartSkeleton: React.FC<ChartSkeletonProps> = ({
  type = 'bar',
  height = 200,
}) => {
  if (type === 'bar') {
    const barHeights = [60, 80, 45, 90, 50, 70, 85];
    return (
      <View style={[styles.container, { height }]}>
        <View style={styles.yAxis}>
          <SkeletonBox width={30} height={12} borderRadius={2} />
          <SkeletonBox width={30} height={12} borderRadius={2} />
          <SkeletonBox width={30} height={12} borderRadius={2} />
        </View>
        <View style={styles.barChart}>
          {barHeights.map((barHeight, index) => (
            <View key={index} style={styles.barColumn}>
              <SkeletonBox
                width={20}
                height={barHeight}
                borderRadius={4}
              />
            </View>
          ))}
        </View>
      </View>
    );
  }

  if (type === 'pie') {
    return (
      <View style={[styles.container, { height }, styles.pieContainer]}>
        <SkeletonBox width={height * 0.7} height={height * 0.7} borderRadius={height * 0.35} />
        <View style={styles.legend}>
          {[1, 2, 3].map((i) => (
            <View key={i} style={styles.legendRow}>
              <SkeletonBox width={12} height={12} borderRadius={3} />
              <SkeletonBox width={80} height={12} borderRadius={3} />
            </View>
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { height }]}>
      <SkeletonBox width="100%" height={height} borderRadius={8} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  yAxis: {
    justifyContent: 'space-between',
    height: '100%',
    position: 'absolute',
    left: 8,
    top: 16,
    bottom: 16,
  },
  barChart: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    marginLeft: 40,
    paddingBottom: 8,
  },
  barColumn: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
  },
  pieContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  legend: {
    gap: 12,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default memo(ChartSkeleton);
