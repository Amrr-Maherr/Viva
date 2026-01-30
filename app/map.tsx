import React, { useRef, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function MapExample() {
  const mapRef = useRef(null);
  const router = useRouter();

  const [region, setRegion] = useState({
    latitude: 31.04,
    longitude: 31.38,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        /* ---------- BASIC ---------- */
        provider={PROVIDER_GOOGLE}
        mapType="hybrid"
        initialRegion={region}
        region={region}
        /* ---------- UI ---------- */
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
        toolbarEnabled={true}
        /* ---------- GESTURES ---------- */
        zoomEnabled={true}
        scrollEnabled={true}
        rotateEnabled={true}
        pitchEnabled={true}
        /* ---------- EVENTS ---------- */
        onPress={(e) => {
          console.log("Pressed:", e.nativeEvent.coordinate);
        }}
        onLongPress={(e) => {
          console.log("Long Press:", e.nativeEvent.coordinate);
        }}
        /* ---------- LIMITS ---------- */
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          title="Title"
          description="Desc"
          draggable
        />
      </MapView>

      {/* Subtle back button positioned in top-left corner */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 60,  // Adjusted to account for status bar
          left: 20,
          zIndex: 1000,
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
          borderRadius: 20,
          padding: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 5,
        }}
        onPress={handleGoBack}
      >
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
}
