import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const HeroSection = () => {
  const player = useVideoPlayer('https://ik.imagekit.io/pieg1rcfk/Viva%20Assests/9510023-uhd_4096_2160_25fps.mp4', (player) => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  return (
    <View style={styles.container}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen={false}
        contentFit="cover"
        // isUserInteractionEnabled={false}
      />
      <View style={styles.overlay}>
        {/* <View style={styles.content}>
          <Text style={styles.title}>Discover Amazing Products</Text>
          <Text style={styles.subtitle}>Shop the latest trends and find everything you need</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/(tabs)/search')}
          >
            <Text style={styles.buttonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.9,
  },
  button: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HeroSection;
