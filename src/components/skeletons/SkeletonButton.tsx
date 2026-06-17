import React, { memo } from 'react';
import SkeletonBox from './SkeletonBox';

interface SkeletonButtonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
}

const SkeletonButton: React.FC<SkeletonButtonProps> = ({
  width = '100%',
  height = 48,
  borderRadius = 10,
}) => {
  return <SkeletonBox width={width} height={height} borderRadius={borderRadius} />;
};

export default memo(SkeletonButton);
