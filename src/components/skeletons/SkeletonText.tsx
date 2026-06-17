import React, { memo, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonBox from './SkeletonBox';

interface SkeletonTextProps {
  lines?: number;
  lineHeight?: number;
  lastLineWidth?: number | string;
  spacing?: number;
  width?: number | string;
  borderRadius?: number;
  style?: Record<string, any>;
}

const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  lineHeight = 14,
  lastLineWidth = '60%',
  spacing = 8,
  width = '100%',
  borderRadius = 4,
  style,
}) => {
  const linesArray = useMemo(() => Array.from({ length: lines }), [lines]);

  return (
    <View style={[{ width: width as any }, style]}>
      {linesArray.map((_, index) => {
        const isLast = index === lines - 1;
        return (
          <SkeletonBox
            key={index}
            width={isLast ? lastLineWidth : '100%'}
            height={lineHeight}
            borderRadius={borderRadius}
            style={index < lines - 1 ? { marginBottom: spacing } : undefined}
          />
        );
      })}
    </View>
  );
};

export default memo(SkeletonText);
