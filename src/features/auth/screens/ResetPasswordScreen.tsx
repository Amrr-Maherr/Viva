import React from 'react';
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
import { router, useLocalSearchParams } from 'expo-router';
import { useForm, Controller } from "react-hook-form";
import { SafeAreaView } from 'react-native-safe-area-context';
import { showToast } from '@src/shared/utils/toast';
import { useResetPassword } from '../hooks/useResetPassword';

export default function ResetPasswordScreen() {
  const { resetCode, email } = useLocalSearchParams<{ resetCode: string; email: string }>();
  const { mutateAsync: resetPwd, isPending } = useResetPassword();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: email || "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: { email: string; newPassword: string; confirmPassword: string }) => {
    if (data.newPassword !== data.confirmPassword) {
      showToast('error', "Passwords do not match");
      return;
    }

    try {
      await resetPwd({ email: data.email, newPassword: data.newPassword });
      showToast('success', "Your password has been reset successfully. Please login with your new password.");
      router.replace('/login');
    } catch (error: any) {
      showToast('error', error.response?.data?.message || "Something went wrong");
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
          keyboardShouldPersistTaps="never"
        >
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>Enter the email associated with your account and your new password.</Text>

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
                  placeholderTextColor="#999"
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
            <Text style={styles.label}>New Password</Text>
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
                  style={styles.input}
                  placeholder="Enter new password"
                  placeholderTextColor="#999"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                />
              )}
              name="newPassword"
            />
            {errors.newPassword && (
              <Text style={styles.errorText}>
                {errors.newPassword.message || "Please enter new password"}
              </Text>
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
                  placeholder="Confirm new password"
                  placeholderTextColor="#999"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                />
              )}
              name="confirmPassword"
            />
            {errors.confirmPassword && (
              <Text style={styles.errorText}>Please confirm your password</Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.button}
            disabled={isPending}
            onPress={handleSubmit(onSubmit)}
          >
            {isPending ? (
              <ActivityIndicator size={30} color={"#fff"}/>
            ) : (
              <Text style={styles.buttonText}>Reset Password</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()}>
            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>Back</Text>
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
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  linkText: {
    textAlign: "center",
    fontSize: 16,
    color: "#1A1A1A",
    fontWeight: "bold",
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
  },
});
