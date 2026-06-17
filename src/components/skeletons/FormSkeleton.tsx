import React, { memo, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonBox from './SkeletonBox';

interface FormSkeletonProps {
  fields?: number;
  showButton?: boolean;
}

const FormSkeleton: React.FC<FormSkeletonProps> = ({
  fields = 3,
  showButton = true,
}) => {
  const fieldItems = useMemo(() => Array.from({ length: fields }), [fields]);

  return (
    <View style={styles.container}>
      {fieldItems.map((_, index) => (
        <View key={index} style={styles.fieldGroup}>
          <SkeletonBox width="30%" height={14} borderRadius={4} style={styles.label} />
          <SkeletonBox width="100%" height={48} borderRadius={10} />
        </View>
      ))}
      {showButton && (
        <SkeletonBox width="100%" height={50} borderRadius={10} style={styles.button} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 6,
  },
  button: {
    marginTop: 10,
  },
});

export default memo(FormSkeleton);
