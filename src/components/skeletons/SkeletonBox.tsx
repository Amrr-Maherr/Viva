import React, { memo, useMemo } from 'react';
import { Animated, ViewStyle } from 'react-native';
import useSkeletonAnimation from './useSkeletonAnimation';

interface SkeletonBoxProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  flex?: number;
  style?: ViewStyle;
}

const SkeletonBox: React.FC<SkeletonBoxProps> = ({
  width,
  height = 20,
  borderRadius = 8,
  flex,
  style,
}) => {
  const opacity = useSkeletonAnimation();

  const animatedStyle = useMemo(
    () => ({
      width: width as any,
      height: height as any,
      borderRadius,
      backgroundColor: '#E1E4E8',
      opacity,
      ...(flex !== undefined ? { flex } : {}),
    }),
    [width, height, borderRadius, opacity, flex]
  );

  return <Animated.View style={[animatedStyle, style]} />;
};

export default memo(SkeletonBox);
