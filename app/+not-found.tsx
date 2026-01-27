import { Stack, router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function NotFoundScreen() {
  // Automatically redirect to splash after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/splash');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <View style={styles.container}>
        <LottieView
          source={require('../assets/jsonIcons/Lonely_404.json')}
          autoPlay
          loop
          style={styles.animation}
        />
        <Text style={styles.title}>Oops! Page Not Found</Text>
        <Text style={styles.subtitle}>The page you're looking for doesn't exist.</Text>

        <TouchableOpacity onPress={() => router.replace('/splash')} style={styles.button}>
          <Text style={styles.buttonText}>Go to Splash</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  animation: {
    width: width * 0.8,
    height: height * 0.3,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
