import React, { memo } from 'react';
import SkeletonBox from './SkeletonBox';

interface SkeletonImageProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
}

const SkeletonImage: React.FC<SkeletonImageProps> = ({
  width = '100%',
  height = 150,
  borderRadius = 8,
}) => {
  return <SkeletonBox width={width} height={height} borderRadius={borderRadius} />;
};

export default memo(SkeletonImage);
