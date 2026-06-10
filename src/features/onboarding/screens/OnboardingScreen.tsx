import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  const [isArrowVisible, setIsArrowVisible] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;
  const buttonScaleAnim = useRef(new Animated.Value(0)).current;
  const titleSlideAnim = useRef(new Animated.Value(-100)).current;
  const imageOpacityAnim = useRef(new Animated.Value(0)).current;

  const handleButtonPress = async () => {
    setIsArrowVisible(false);

    try {
      await AsyncStorage.setItem('onboardingCompleted', 'true');
    } catch (error) {
      console.error('Error saving onboarding completion status:', error);
    }

    Animated.sequence([
      Animated.timing(buttonScaleAnim, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScaleAnim, {
        toValue: 100,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(async () => {
      router.push("/login");
    });
  };

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(titleSlideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(imageOpacityAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(buttonScaleAnim, {
          toValue: 1,
          tension: 5,
          friction: 3,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [fadeAnim, slideAnim, buttonScaleAnim, titleSlideAnim, imageOpacityAnim]);

  return (
    <>
      <SafeAreaView style={style.container}>
        <Animated.View
          style={[
            style.backgroundImageContainer,
            {
              transform: [{ translateX: slideAnim }],
              opacity: imageOpacityAnim,
            },
          ]}
        >
          <Image
            style={style.backgroundImage}
            source={require("../../../../assets/images/Element.png")}
          />
        </Animated.View>

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateX: titleSlideAnim }],
          }}
        >
          <Text style={style.title}>Define yourself in your unique way.</Text>
        </Animated.View>

        <Animated.View
          style={[
            style.nextButtonTopRight,
            {
              transform: [{ scale: buttonScaleAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            accessible
            accessibilityLabel="Next"
            onPress={handleButtonPress}
          >
            {isArrowVisible && (
              <MaterialIcons name="navigate-next" size={24} color="#fff" />
            )}
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[
            style.elementContainer,
            {
              transform: [{ translateY: slideAnim }],
              opacity: imageOpacityAnim,
            },
          ]}
        >
          <Image
            style={style.fullImage}
            source={require("../../../../assets/images/Image.png")}
          />
        </Animated.View>
      </SafeAreaView>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 24,
    position: "relative",
  },
  backgroundImageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  elementContainer: {
    position: "absolute",
    bottom: 0,
    right:0,
    width: 390,
    height: 745,
  },
  rightImageContainer: {
    position: "absolute",
    bottom: 0,
    zIndex: 200,
    right: 0,
    width: 358,
    height: "100%",
  },
  fullImage: {
    width: "100%",
    height: "100%",
  },
  nextButtonTopRight: {
    position: "absolute",
    top: 55,
    right: 24,
    zIndex: 300,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
    paddingTop: 25,
  },
});
