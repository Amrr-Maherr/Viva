import { View, StyleSheet, Dimensions } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";

const { width } = Dimensions.get("window");

export default function HomeBanner() {
  const player = useVideoPlayer(
    "https://ik.imagekit.io/pieg1rcfk/Viva%20Assests/9510023-uhd_4096_2160_25fps.mp4",
    (player) => {
      player.loop = true;
      player.muted = true;
      player.play();
    },
  );

  return (
    <View style={styles.container}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen={false}
        contentFit="cover"
      />
      <View style={styles.overlay} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 250,
    position: "relative",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});
