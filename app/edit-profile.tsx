import { updateMe } from '@/api/users';
import { showToast } from '@/utils/toast';
import { router } from 'expo-router';
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditProfileScreen() {
  const [currentProfileImage, setCurrentProfileImage] = useState<string | null>(null);
  
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isLoading },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        const profileImage = await AsyncStorage.getItem('profileImage');
        
        if (userData) {
          const user = JSON.parse(userData);
          setValue('name', user.name || '');
          setValue('email', user.email || '');
          setValue('phone', user.phone || '');
        }
        
        if (profileImage) {
          setCurrentProfileImage(profileImage);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    
    loadUserData();
  }, [setValue]);

  const handleImageChange = async (imageUri: string) => {
    try {
      await AsyncStorage.setItem('profileImage', imageUri);
      setCurrentProfileImage(imageUri);
      
      // Update user data with new profile image
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        const updatedUser = { ...user, profileImage: imageUri };
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      showToast('success', 'Profile image updated!');
    } catch (error) {
      console.error('Error saving profile image:', error);
      showToast('error', 'Failed to update profile image');
    }
  };

  const handleImageClear = async () => {
    try {
      await AsyncStorage.removeItem('profileImage');
      setCurrentProfileImage(null);
      
      // Update user data to remove profile image
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        const updatedUser = { ...user };
        delete updatedUser.profileImage;
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      showToast('info', 'Profile image removed');
    } catch (error) {
      console.error('Error clearing profile image:', error);
      showToast('error', 'Failed to remove profile image');
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const result = await updateMe(data.name, data.email, data.phone);
      showToast('success', "Your profile has been updated successfully.");
      console.log('Update profile result:', result);
      // Navigate back
      router.back();
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
          keyboardShouldPersistTaps="never"
        >
          <Text style={styles.title}>Edit Profile</Text>
          <Text style={styles.subtitle}>Update your personal information.</Text>

          {/* Profile Image Section */}
          <View style={styles.imageSection}>
            <Text style={styles.sectionTitle}>Profile Picture</Text>
            <ProfileImagePicker 
              currentImage={currentProfileImage}
              onImageChange={handleImageChange}
              onImageClear={handleImageClear}
              size={150}
            />
          </View>

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
                  placeholderTextColor="#999"
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
                  placeholderTextColor="#999"
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
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()}>
            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>Cancel</Text>
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
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#808080",
    textAlign: "center",
    marginBottom: 24,
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 15,
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
