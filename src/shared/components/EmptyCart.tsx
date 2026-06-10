import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import LottieView from "lottie-react-native";

const EmptyCardScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <LottieView
          source={require("../assets/jsonIcons/empty.json")}
          autoPlay
          loop
          style={styles.animation}
        />
        <Text style={styles.text}>No items here yet!</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#fff"
  },
  card: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: 400,
    height: 400,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});

export default EmptyCardScreen;
