import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={24} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000',
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        animation: 'shift',
        tabBarStyle: {
          height: 65,
          paddingBottom: 5,
          paddingTop: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: "Discover",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home-outline" color={color} />
          ),
          // headerLeft: () => (
          //   <Ionicons
          //     name="arrow-back"
          //     size={24}
          //     onPress={() => router.back()}
          //     style={{ marginLeft: 15 }}
          //   />
          // ),
          headerRight: () => (
            <Ionicons
              name="notifications"
              size={24}
              onPress={() => alert("Settings pressed")}
              style={{ marginRight: 15 }}
            />
          )
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="search-outline" color={color} />
          ),
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              onPress={() => router.back()}
              style={{ marginLeft: 15 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bag-outline" color={color} />
          ),
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              onPress={() => router.back()}
              style={{ marginLeft: 15 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="heart-outline" color={color} />
          ),
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              onPress={() => router.back()}
              style={{ marginLeft: 15 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="person-outline" color={color} />
          ),
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              onPress={() => router.back()}
              style={{ marginLeft: 15 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
