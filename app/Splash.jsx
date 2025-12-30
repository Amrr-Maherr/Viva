import { Image } from "react-native";
import { View } from "react-native";
import { StyleSheet, ActivityIndicator } from "react-native";

export default function Splash() {
  return (
    <>
      <View style={style.container}>
        <Image style={{position:"absolute",top:100}} source={require("../assets/images/logo-background.png")}/>
        <Image style={{position:"absolute",top:150}} source={require("../assets/images/logo-background.png")}/>
        <Image style={{position:"absolute",top:200}} source={require("../assets/images/logo-background.png")}/>
        <Image style={{position:"absolute",top:250}} source={require("../assets/images/logo-background.png")}/>
        <View style={style.logo}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={require("../assets/images/logo.png")}
          />
        </View>
        <View style={style.loaderContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
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
