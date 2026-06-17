import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonBox from './SkeletonBox';
import SkeletonText from './SkeletonText';
import SkeletonCircle from './SkeletonCircle';
import SkeletonButton from './SkeletonButton';
import SkeletonImage from './SkeletonImage';

export type SkeletonElementType = 'box' | 'text' | 'circle' | 'button' | 'image';

interface SkeletonElement {
  type: SkeletonElementType;
  width?: number | string;
  height?: number;
  size?: number;
  borderRadius?: number;
  lines?: number;
  style?: Record<string, any>;
}

interface GenericSkeletonProps {
  elements: SkeletonElement[];
  direction?: 'vertical' | 'horizontal';
  gap?: number;
  padding?: number;
}

const renderElement = (el: SkeletonElement, index: number) => {
  switch (el.type) {
    case 'box':
      return (
        <SkeletonBox
          key={index}
          width={el.width}
          height={el.height}
          borderRadius={el.borderRadius}
          style={el.style}
        />
      );
    case 'text':
      return (
        <SkeletonText
          key={index}
          lines={el.lines || 3}
          width={el.width}
          lineHeight={el.height || 14}
          style={el.style}
        />
      );
    case 'circle':
      return (
        <SkeletonCircle
          key={index}
          size={el.size || 40}
        />
      );
    case 'button':
      return (
        <SkeletonButton
          key={index}
          width={el.width}
          height={el.height}
          borderRadius={el.borderRadius}
        />
      );
    case 'image':
      return (
        <SkeletonImage
          key={index}
          width={el.width}
          height={el.height}
          borderRadius={el.borderRadius}
        />
      );
    default:
      return null;
  }
};

const GenericSkeleton: React.FC<GenericSkeletonProps> = ({
  elements,
  direction = 'vertical',
  gap = 12,
  padding = 16,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
          gap,
          padding,
        },
      ]}
    >
      {elements.map(renderElement)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});

export default memo(GenericSkeleton);
