import { useEffect, useRef } from "react";
import { Image, Animated } from "react-native";
import { View } from "react-native";
import { StyleSheet, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash() {
  const backgroundFadeAnim1 = useRef(new Animated.Value(0)).current;
  const backgroundFadeAnim2 = useRef(new Animated.Value(0)).current;
  const backgroundFadeAnim3 = useRef(new Animated.Value(0)).current;
  const backgroundFadeAnim4 = useRef(new Animated.Value(0)).current;
  const logoScaleAnim = useRef(new Animated.Value(0)).current;
  const loaderFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start staggered animations for background images
    Animated.stagger(200, [
      Animated.timing(backgroundFadeAnim1, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundFadeAnim2, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundFadeAnim3, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundFadeAnim4, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Logo scale animation
    Animated.spring(logoScaleAnim, {
      toValue: 1,
      tension: 10,
      friction: 3,
      useNativeDriver: true,
    }).start();

    // Loader fade in
    Animated.timing(loaderFadeAnim, {
      toValue: 1,
      duration: 800,
      delay: 1000,
      useNativeDriver: true,
    }).start();

    const checkTokenAndNavigate = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');

        setTimeout(() => {
          if (token) {
            router.push("/(tabs)");
          } else if (!hasSeenOnboarding) {
            router.push("/Onboarding");
          } else {
            router.push("/login");
          }
        }, 3000);
      } catch (error) {
        console.log('Error checking token:', error);
        setTimeout(() => {
          router.push("/Onboarding");
        }, 3000);
      }
    };

    checkTokenAndNavigate();
  },[])
  return (
    <>
      <View style={style.container}>
        <Animated.Image
          style={[
            {position:"absolute", top:100},
            {opacity: backgroundFadeAnim1}
          ]}
          source={require("../assets/images/logo-background.png")}
        />
        <Animated.Image
          style={[
            {position:"absolute", top:150},
            {opacity: backgroundFadeAnim2}
          ]}
          source={require("../assets/images/logo-background.png")}
        />
        <Animated.Image
          style={[
            {position:"absolute", top:200},
            {opacity: backgroundFadeAnim3}
          ]}
          source={require("../assets/images/logo-background.png")}
        />
        <Animated.Image
          style={[
            {position:"absolute", top:250},
            {opacity: backgroundFadeAnim4}
          ]}
          source={require("../assets/images/logo-background.png")}
        />
        <Animated.View
          style={[
            style.logo,
            {
              transform: [{ scale: logoScaleAnim }],
            },
          ]}
        >
          <Image
            style={{ width: "100%", height: "100%" }}
            source={require("../assets/images/logo.png")}
          />
        </Animated.View>
        <Animated.View
          style={[
            style.loaderContainer,
            { opacity: loaderFadeAnim }
          ]}
        >
          <ActivityIndicator size="large" color="#fff" />
        </Animated.View>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1A1A1A",
  },
  logo: {
    height: 133,
    width: 133,
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    alignItems: 'center',
  },
});
