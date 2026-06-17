import React, { memo } from 'react';
import SkeletonBox from './SkeletonBox';

interface SkeletonCircleProps {
  size?: number;
}

const SkeletonCircle: React.FC<SkeletonCircleProps> = ({ size = 40 }) => {
  return <SkeletonBox width={size} height={size} borderRadius={size / 2} />;
};

export default memo(SkeletonCircle);
