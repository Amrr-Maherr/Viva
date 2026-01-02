import React from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Text,
  View,
} from "react-native";
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>
      <Text style={styles.subtitle}>Let’s create your account.</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          autoCapitalize="words"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.termsText}>
        By signing up you agree to our{' '}
        <Text style={styles.boldText}>Terms</Text>
        {', '}
        <Text style={styles.boldText}>Privacy Policy</Text>
        {', and '}
        <Text style={styles.boldText}>Cookie Use</Text>
      </Text>

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.socialContainer}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={() =>
            Alert.alert(
              "Google Register",
              "Google registration functionality to be implemented"
            )
          }
        >
          <Ionicons name="logo-google" size={24} color="#fff" />
          <Text style={styles.socialButtonText}>Login with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.facebookButton}
          onPress={() =>
            Alert.alert(
              "Facebook Register",
              "Facebook registration functionality to be implemented"
            )
          }
        >
          <Ionicons name="logo-facebook" size={24} color="#fff" />
          <Text style={styles.socialButtonText}>Login with Facebook</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "semibold",
    textAlign: "left",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#808080",
    textAlign: "left",
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "medium",
    marginBottom: 4,
    color: "#1A1A1A",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#1A1A1A",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  linkText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#1A1A1A",
  },
  socialContainer: {
    marginTop: 20,
    gap: 10,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 8,
    gap: 10,
  },
  socialButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 8,
    gap: 10,
    backgroundColor: "#DB4437",
  },
  facebookButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 8,
    gap: 10,
    backgroundColor: "#4267B2",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#666",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#1A1A1A",
  },
  termsText: {
    textAlign: "center",
    fontSize: 12,
    color: "#808080",
    marginTop: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
});
