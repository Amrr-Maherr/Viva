import { Image, View, StyleSheet, ImageSourcePropType } from 'react-native';

interface BannerAdProps {
  source: ImageSourcePropType;
}

export default function BannerAd({ source }: BannerAdProps) {
  return (
    <View style={styles.container}>
      <Image
        source={source}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 250,
  },
});
