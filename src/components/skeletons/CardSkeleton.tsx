import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonBox from './SkeletonBox';
import SkeletonText from './SkeletonText';

interface CardSkeletonProps {
  showImage?: boolean;
  showFooter?: boolean;
  horizontal?: boolean;
}

const CardSkeleton: React.FC<CardSkeletonProps> = ({
  showImage = true,
  showFooter = true,
  horizontal = false,
}) => {
  if (horizontal) {
    return (
      <View style={[styles.card, styles.horizontalCard]}>
        <SkeletonBox width={100} height={100} borderRadius={10} />
        <View style={styles.horizontalContent}>
          <SkeletonText lines={2} lineHeight={16} spacing={6} width="90%" />
          {showFooter && (
            <View style={styles.footer}>
              <SkeletonBox width={60} height={16} borderRadius={4} />
              <SkeletonBox width={32} height={32} borderRadius={16} />
            </View>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      {showImage && <SkeletonBox width="100%" height={140} borderRadius={10} />}
      <View style={styles.content}>
        <SkeletonText lines={2} lineHeight={15} spacing={6} width="100%" />
        {showFooter && (
          <View style={styles.footer}>
            <SkeletonBox width={60} height={16} borderRadius={4} />
            <SkeletonBox width={32} height={32} borderRadius={16} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    overflow: 'hidden',
  },
  horizontalCard: {
    flexDirection: 'row',
    padding: 12,
  },
  horizontalContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  content: {
    padding: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default memo(CardSkeleton);
