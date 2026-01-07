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
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
});
