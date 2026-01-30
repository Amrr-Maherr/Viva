import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

import { useColorScheme } from "@/components/useColorScheme";
import Provider from "@/provider/Provider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [initialRoute, setInitialRoute] = useState("splash"); // Default to splash

  useEffect(() => {
    const determineInitialRoute = async () => {
      try {
        // Check if user is already authenticated
        const token = await AsyncStorage.getItem("token");

        if (token) {
          // User is authenticated, go directly to main app
          setInitialRoute("(tabs)");
          return;
        }

        // Check if onboarding has been completed
        const onboardingCompleted = await AsyncStorage.getItem(
          "onboardingCompleted",
        );

        if (onboardingCompleted === "true") {
          // onboarding already completed, go to login
          setInitialRoute("login");
        } else {
          // Show splash screen (which will navigate to onboarding)
          setInitialRoute("splash");
        }
      } catch (error) {
        console.error("Error determining initial route:", error);
        // Default to splash screen if there's an error
        setInitialRoute("splash");
      }
    };

    determineInitialRoute();
  }, []);

  return (
    <Provider>
      <Stack
        initialRouteName={initialRoute}
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="notifications"
          options={{ title: "Notifications" }}
        />
        <Stack.Screen name="faqs" options={{ title: "FAQs" }} />
        <Stack.Screen name="help-center" options={{ title: "Help Center" }} />
        <Stack.Screen name="my-orders" options={{ title: "My Orders" }} />
        <Stack.Screen name="checkout" options={{ title: "Checkout" }} />
        <Stack.Screen name="address" options={{ title: "My Addresses" }} />
        <Stack.Screen name="new-address" options={{ title: "Add Address" }} />
        <Stack.Screen
          name="payment-method"
          options={{ title: "Payment Methods" }}
        />
        <Stack.Screen name="new-card" options={{ title: "Add Card" }} />
        <Stack.Screen name="edit-profile" options={{ title: "Edit Profile" }} />
        <Stack.Screen
          name="change-password"
          options={{ title: "Change Password" }}
        />
        <Stack.Screen name="contact" options={{ title: "Contact Us" }} />
        <Stack.Screen
          name="chat"
          options={{ title: "Viva AI Assistant", headerShown: true }}
        />
        <Stack.Screen name="map" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
      <Toast />
    </Provider>
  );
}
