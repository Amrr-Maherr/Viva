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
import { router } from 'expo-router';
import { useForm, Controller } from "react-hook-form";
import { SafeAreaView } from 'react-native-safe-area-context';
import { verifyResetCode } from '@/api/auth';
import { showToast } from '@/utils/toast';

export default function VerifyResetCodeScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm({
    defaultValues: {
      resetCode: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const result = await verifyResetCode(data.resetCode);
      showToast('success', "Please set your new password.");
      console.log('Verify reset code result:', result);
      // Navigate to reset password
      (router.push as any)({ pathname: '/reset-password', params: { resetCode: data.resetCode } });
    } catch (error: any) {
      showToast('error', error.response?.data?.message || "The code is incorrect or expired");
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
          keyboardShouldPersistTaps="never"
        >
          <Text style={styles.title}>Verify Reset Code</Text>
          <Text style={styles.subtitle}>Enter the 6-digit code sent to your email.</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Reset Code</Text>
            <Controller
              control={control}
              rules={{
                required: true,
                pattern: {
                  value: /^\d{6}$/,
                  message: "Reset code must be 6 digits",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Enter 6-digit code"
                  placeholderTextColor="#999"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="number-pad"
                  maxLength={6}
                />
              )}
              name="resetCode"
            />
            {errors.resetCode && (
              <Text style={styles.errorText}>
                {errors.resetCode.message || "Please enter valid reset code"}
              </Text>
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
              <Text style={styles.buttonText}>Verify Code</Text>
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
    textAlign: "center",
    fontSize: 24,
    letterSpacing: 8,
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
