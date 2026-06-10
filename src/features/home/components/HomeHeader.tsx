import { View, Text, StyleSheet } from "react-native";

export default function HomeHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Discover</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
});
