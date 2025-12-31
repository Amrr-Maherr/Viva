import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Onboarding() {
  return (
    <>
      <SafeAreaView style={style.container}>
        <View>
          <Text style={style.title}>Define yourself in your unique way.</Text>
        </View>
        <TouchableOpacity
          style={style.nextButtonTopRight}
          accessible
          accessibilityLabel="Next"
          onPress={() => {}}
        >
          <MaterialIcons name="navigate-next" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={style.elementContainer}>
          <Image
            style={style.fullImage}
            source={require("../assets/images/Element.png")}
          />
        </View>
        <View style={style.rightImageContainer}>
          <Image
            style={style.fullImage}
            source={require("../assets/images/Image.png")}
          />
        </View>
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
  elementContainer: {
    position: "absolute",
    top: 80,
    width: 390,
    height: 745,
  },
  rightImageContainer: {
    position: "absolute",
    top: 60,
    zIndex: 100,
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
    lineHeight: 49,
    paddingTop: 25,
  },
});
