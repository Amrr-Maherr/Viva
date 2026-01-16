import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from "react-hook-form";
import { SafeAreaView } from 'react-native-safe-area-context';
import { signup } from '@/api/auth';
import { showToast } from '@/utils/toast';
export default function RegisterScreen() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
   const {
     control,
     handleSubmit,
     formState: { errors,isLoading},
   } = useForm({
     defaultValues: {
       name: "",
       email: "",
       password:"",
       rePassword: "",
       phone: ""
     },
   });
   const onSubmit = async (data: any) => {
     try {
       const result = await signup(data.name, data.email, data.password, data.rePassword, data.phone);
       showToast('success', `Welcome ${data.name}! Registration successful.`);
       console.log('Signup result:', result);
       // Navigate to login
       router.push('/login');
     } catch (error: any) {
       showToast('error', error.response?.data?.message || "Something went wrong");
       console.log(error);
     }
   };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingContainer}
    >
      <SafeAreaView style={styles.safeAreaContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Create an account</Text>
          <Text style={styles.subtitle}>Let’s create your account.</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="words"
                />
              )}
              name="name"
            />
            {errors.name && (
              <Text style={styles.errorText}>Please enter valid user name</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <Controller
              control={control}
              rules={{
                required: true,
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text style={styles.errorText}>
                Please enter valid email address
              </Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <Controller
                control={control}
                rules={{
                  required: true,
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Enter your password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry={!isPasswordVisible}
                  />
                )}
                name="password"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <Ionicons
                  name={isPasswordVisible ? "eye-off" : "eye"}
                  size={24}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={styles.errorText}>Please enter valid password</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Confirm your password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                />
              )}
              name="rePassword"
            />
            {errors.rePassword && (
              <Text style={styles.errorText}>Please confirm your password</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Enter your phone number"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="phone-pad"
                />
              )}
              name="phone"
            />
            {errors.phone && (
              <Text style={styles.errorText}>Please enter valid phone number</Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.button}
            disabled={isLoading}
            onPress={handleSubmit(onSubmit)}
          >
            {isLoading ? (
              <ActivityIndicator size={30} color={"#fff"}/>
            ) : (
              <Text style={styles.buttonText}>Register</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.termsText}>
            By signing up you agree to our{" "}
            <Text style={styles.boldText}>Terms</Text>
            {", "}
            <Text style={styles.boldText}>Privacy Policy</Text>
            {", and "}
            <Text style={styles.boldText}>Cookie Use</Text>
          </Text>



      <TouchableOpacity onPress={() => router.push("/login")}>
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>Already have an account? </Text>
          <Text style={[styles.linkText, styles.linkBold]}>Login</Text>
        </View>
      </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
    backgroundColor: "#fff",
  },
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
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  linkText: {
    textAlign: "center",
    // marginTop: 20,
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
    textAlign: "left",
    fontSize: 12,
    color: "#808080",
    marginTop: 10,
  },
  boldText: {
    fontWeight: "bold",
    textDecorationLine:"underline"
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
  },
  linkContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 20,
    gap: 5,
  },
  passwordContainer: {
    position: "relative",
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    paddingRight: 50,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: -12 }],
    padding: 4,
  },
  linkBold: {
    fontWeight: "bold",
  },
});
