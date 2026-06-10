import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, Text, View } from "react-native";

const features = [
  { icon: "search-outline" as const, text: "Find products & deals", desc: "Ask about any product, price, or promotion" },
  { icon: "card-outline" as const, text: "Payment & shipping", desc: "Info about payment methods and delivery" },
  { icon: "cube-outline" as const, text: "Order tracking", desc: "Track your orders and returns" },
];

export default function WelcomeView() {
  return (
    <View style={styles.container}>
      <View style={styles.logoWrap}>
        <LottieView
          source={require('../../../../assets/jsonIcons/AI_logo.json')}
          autoPlay
          loop
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>Viva Assistant</Text>
      <Text style={styles.subtitle}>Your AI shopping companion</Text>

      <View style={styles.grid}>
        {features.map((f) => (
          <View key={f.text} style={styles.card}>
            <View style={styles.iconCircle}>
              <Ionicons name={f.icon} size={22} color="#FFFFFF" />
            </View>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{f.text}</Text>
              <Text style={styles.cardDesc}>{f.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.hint}>Type a message to get started</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingBottom: 40,
    backgroundColor: '#FFFFFF',
  },
  logoWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 56,
    height: 56,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#808080',
    textAlign: 'center',
    marginBottom: 32,
  },
  grid: {
    width: '100%',
    gap: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 14,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  cardDesc: {
    fontSize: 14,
    color: '#808080',
  },
  hint: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    marginTop: 32,
  },
});
