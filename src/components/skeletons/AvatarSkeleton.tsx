import React, { memo } from 'react';
import SkeletonCircle from './SkeletonCircle';

interface AvatarSkeletonProps {
  size?: number;
}

const AvatarSkeleton: React.FC<AvatarSkeletonProps> = ({ size = 40 }) => {
  return <SkeletonCircle size={size} />;
};

export default memo(AvatarSkeleton);
