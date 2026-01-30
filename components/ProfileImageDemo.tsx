import { showToast } from '@/utils/toast';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import EnhancedProfileImagePicker from './EnhancedProfileImagePicker';
import ProfileImagePicker from './ProfileImagePicker';

export default function ProfileImageDemo() {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [showActions, setShowActions] = useState(true);
  const [editable, setEditable] = useState(true);

  const handleImageChange = (imageUri: string) => {
    setCurrentImage(imageUri);
    showToast('success', 'Image updated successfully!');
  };

  const handleImageClear = () => {
    setCurrentImage(null);
    showToast('info', 'Image removed');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Profile Image Picker Demo</Text>
      
      {/* Controls */}
      <View style={styles.controls}>
        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Show Actions:</Text>
          <Switch value={showActions} onValueChange={setShowActions} />
        </View>
        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Editable:</Text>
          <Switch value={editable} onValueChange={setEditable} />
        </View>
      </View>

      {/* Basic Profile Image Picker */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Profile Image Picker</Text>
        <ProfileImagePicker
          currentImage={currentImage}
          onImageChange={handleImageChange}
          onImageClear={handleImageClear}
          size={150}
          showActions={showActions}
        />
      </View>

      {/* Enhanced Profile Image Picker - Bottom Right Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Enhanced - Bottom Right Actions</Text>
        <EnhancedProfileImagePicker
          currentImage={currentImage}
          onImageChange={handleImageChange}
          onImageClear={handleImageClear}
          size={150}
          showActions={showActions}
          actionPosition="bottom-right"
          showLabel={true}
          label="Profile Picture"
          editable={editable}
        />
      </View>

      {/* Enhanced Profile Image Picker - Floating Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Enhanced - Floating Actions</Text>
        <EnhancedProfileImagePicker
          currentImage={currentImage}
          onImageChange={handleImageChange}
          onImageClear={handleImageClear}
          size={150}
          showActions={showActions}
          actionPosition="floating"
          showLabel={true}
          label="Avatar"
          editable={editable}
        />
      </View>

      {/* Small Size Example */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Small Size (100px)</Text>
        <EnhancedProfileImagePicker
          currentImage={currentImage}
          onImageChange={handleImageChange}
          onImageClear={handleImageClear}
          size={100}
          showActions={showActions}
          actionPosition="top-right"
          showLabel={true}
          label="Small Avatar"
          editable={editable}
        />
      </View>

      {/* Large Size Example */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Large Size (250px)</Text>
        <EnhancedProfileImagePicker
          currentImage={currentImage}
          onImageChange={handleImageChange}
          onImageClear={handleImageClear}
          size={250}
          showActions={showActions}
          actionPosition="bottom-right"
          showLabel={true}
          label="Large Profile Picture"
          editable={editable}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1A1A1A',
  },
  controls: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  controlLabel: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  section: {
    marginBottom: 30,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#1A1A1A',
    textAlign: 'center',
  },
});