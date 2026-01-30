# Profile Image Components

This folder contains components for handling profile image selection, editing, and display in the Viva app.

## Components

### 1. ProfileImagePicker
Basic profile image picker with camera and delete functionality.

**Props:**
- `currentImage?: string | null` - Current image URI
- `onImageChange?: (imageUri: string) => void` - Callback when image changes
- `onImageClear?: () => void` - Callback when image is cleared
- `size?: number` - Size of the image picker (default: 200)
- `showActions?: boolean` - Show action buttons (default: true)

**Usage:**
```tsx
<ProfileImagePicker
  currentImage={profileImage}
  onImageChange={handleImageChange}
  onImageClear={handleImageClear}
  size={150}
/>
```

### 2. EnhancedProfileImagePicker
Advanced profile image picker with more customization options.

**Props:**
- `currentImage?: string | null` - Current image URI
- `onImageChange?: (imageUri: string) => void` - Callback when image changes
- `onImageClear?: () => void` - Callback when image is cleared
- `size?: number` - Size of the image picker (default: 200)
- `showActions?: boolean` - Show action buttons (default: true)
- `actionPosition?: 'bottom-right' | 'top-right' | 'floating'` - Position of action buttons
- `showLabel?: boolean` - Show label above image (default: false)
- `label?: string` - Label text (default: 'Profile Picture')
- `editable?: boolean` - Whether the image can be edited (default: true)

**Usage:**
```tsx
<EnhancedProfileImagePicker
  currentImage={profileImage}
  onImageChange={handleImageChange}
  onImageClear={handleImageClear}
  size={150}
  actionPosition="floating"
  showLabel={true}
  label="Avatar"
  editable={true}
/>
```

### 3. ImageActionButtons
Standalone action buttons for image editing and deletion.

**Props:**
- `onEdit: () => void` - Callback for edit action
- `onDelete: () => void` - Callback for delete action
- `hasImage: boolean` - Whether an image is present
- `size?: number` - Size of buttons (default: 40)
- `position?: 'bottom-right' | 'top-right' | 'floating'` - Button position

**Usage:**
```tsx
<ImageActionButtons
  onEdit={handleEdit}
  onDelete={handleDelete}
  hasImage={!!currentImage}
  size={40}
  position="bottom-right"
/>
```

## Hooks

### useImagePicker
Custom hook for image selection functionality.

**Returns:**
- `selectedImage: string | null` - Currently selected image URI
- `isLoading: boolean` - Loading state
- `pickImage: () => Promise<void>` - Pick image from library
- `pickImageFromCamera: () => Promise<void>` - Take photo with camera
- `clearImage: () => void` - Clear selected image
- `setSelectedImage: (uri: string | null) => void` - Set image programmatically

**Usage:**
```tsx
const { selectedImage, isLoading, pickImage, pickImageFromCamera, clearImage } = useImagePicker();
```

### useProfileImage
Advanced hook for profile image management with storage.

**Returns:**
- `profileImage: string | null` - Current profile image
- `isUploading: boolean` - Upload state
- `updateProfileImage: (imageUri: string) => Promise<void>` - Update profile image
- `clearProfileImage: () => Promise<void>` - Clear profile image
- `loadProfileImage: () => Promise<void>` - Load saved profile image

## Features

### ✅ Image Selection
- Camera capture
- Photo library selection
- Square aspect ratio for profile pictures
- Image quality optimization (0.8)

### ✅ User Interface
- Loading states with indicators
- Action buttons (camera, delete)
- Customizable sizes and positions
- Lottie animations for placeholders
- Upload hints for empty states

### ✅ Permissions
- Automatic permission requests
- User-friendly permission messages
- Graceful permission denial handling

### ✅ Storage
- AsyncStorage integration
- Automatic image persistence
- User data synchronization

### ✅ Error Handling
- Try-catch blocks for all operations
- User-friendly error messages
- Toast notifications for feedback

### ✅ Accessibility
- Proper button labels
- Screen reader support
- Touch target sizes

## Styling

All components use consistent styling with:
- Shadow effects for depth
- Border radius for modern look
- Color scheme matching app theme
- Responsive sizing based on props

## Example Implementation

See `ProfileImageDemo.tsx` for a complete example showing all component variations and features.

## Integration

These components are already integrated into:
- `app/(tabs)/profile.tsx` - Main profile screen
- `app/edit-profile.tsx` - Profile editing screen

## API Integration

Optional server upload functionality is available in:
- `api/uploadImage.ts` - Server upload functions
- `hooks/useProfileImage.ts` - Upload integration hook

## Dependencies

- `expo-image-picker` - Image selection
- `@expo/vector-icons` - Icons
- `lottie-react-native` - Animations
- `@react-native-async-storage/async-storage` - Storage
- `react-native-toast-message` - User feedback