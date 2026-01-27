# Viva - React Native E-commerce App

## Project Overview

Viva is a React Native e-commerce application built with Expo Router and TypeScript. The app features product browsing, cart management, wishlist functionality, user authentication, and an AI chat assistant. It uses React Query for data fetching and AsyncStorage for local data persistence.

## Architecture & Technology Stack

- **Framework**: React Native with Expo SDK 54
- **Navigation**: Expo Router (file-based routing)
- **State Management**: React Query (@tanstack/react-query) for server state
- **Local Storage**: AsyncStorage for authentication tokens and user data
- **Styling**: StyleSheet API (no external styling libraries)
- **Forms**: React Hook Form for form validation
- **HTTP Client**: Axios for API requests
- **Animations**: Lottie React Native for animations
- **Icons**: Expo Vector Icons (Ionicons)
- **Toast Notifications**: React Native Toast Message

## Project Structure

```
├── api/                    # API service functions
├── app/                    # Expo Router screens (file-based routing)
│   ├── (tabs)/            # Tab navigation screens
│   └── product/           # Dynamic product routes
├── assets/                # Static assets (images, fonts, animations)
├── components/            # Reusable UI components
├── constants/             # App constants (Colors, etc.)
├── data/                  # Static data files
├── hooks/                 # Custom React hooks
├── provider/              # Context providers
├── queries/               # React Query hooks
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

## Folder Responsibilities

### `/api`
Contains service functions for API communication. Each file represents a domain:
- `auth.ts` - Authentication services (login, signup, logout)
- `cart.ts` - Cart operations with React Query mutations
- `fetchProducts.ts` - Product fetching with pagination
- `wishlist.ts` - Wishlist management
- All API functions use axios and handle AsyncStorage token management

### `/app`
Expo Router screens following file-based routing:
- Root level files are stack screens
- `(tabs)/` folder creates tab navigation
- `[id].tsx` creates dynamic routes
- `_layout.tsx` files define navigation structure
- Authentication flow: splash → onboarding → login → (tabs)

### `/components`
Reusable UI components with consistent patterns:
- Each component is a default export
- Uses StyleSheet.create for styling
- Props interfaces defined inline or imported from types
- Loading states handled with ActivityIndicator
- Error states handled with custom ErrorView component

### `/queries`
React Query hooks for data fetching:
- One hook per API endpoint
- Uses `useQuery` for GET requests
- Uses `useInfiniteQuery` for paginated data
- Consistent naming: `useFetch[EntityName]`
- Query keys follow pattern: `['entityName', ...params]`

### `/types`
TypeScript definitions:
- API response types match backend structure exactly
- Component prop interfaces
- Utility types for request/response handling

## Component Architecture

### Component Structure Pattern
```typescript
interface ComponentProps {
  // Props definition
}

const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // State and hooks
  // Event handlers
  // Render logic
  return (
    <View style={styles.container}>
      {/* JSX */}
    </View>
  );
};

const styles = StyleSheet.create({
  // Styles
});

export default Component;
```

### Styling Conventions
- All styles use StyleSheet.create
- Style objects named `styles`
- Container styles typically named `container`
- Colors use hex values or named colors
- Consistent spacing and typography patterns
- No external styling libraries used

## State Management

### Server State (React Query)
- All API data managed through React Query
- Query keys follow consistent patterns
- Mutations invalidate related queries
- Error handling at hook level
- Loading states exposed to components

### Local State
- Component state with useState
- Form state with React Hook Form
- No global state management library

### Persistent State
- AsyncStorage for authentication tokens
- User data stored as JSON strings
- onboarding completion flags
- No state persistence library used

## Data Flow

### Authentication Flow
1. Check AsyncStorage for existing token
2. Route to appropriate screen (splash/login/tabs)
3. Login stores token and user data
4. Token included in API headers automatically
5. Logout clears all AsyncStorage data

### Product Data Flow
1. Fetch products with pagination via React Query
2. Cache responses automatically
3. Infinite scroll loads more pages
4. Category filtering refetches with new parameters
5. Product details fetched individually by ID

### Cart/Wishlist Flow
1. Mutations update server state
2. React Query invalidates and refetches related data
3. Optimistic updates not implemented
4. Toast notifications for user feedback

## Navigation Structure

### Stack Navigation (Root)
- Splash screen with authentication check
- onboarding flow
- Authentication screens (login/register/forgot-password)
- Tab navigation as nested navigator
- Modal screens for specific flows

### Tab Navigation
- Home (index) - Product discovery
- Search - Product search functionality
- Cart - Shopping cart management
- Favorites - Wishlist management
- Profile - User account management

### Dynamic Routes
- `/product/[id]` - Product details
- Parameters accessed via useLocalSearchParams()

## API Integration

### Base Configuration
- Base URL: `https://ecommerce.routemisr.com/api/v1`
- Authentication via token header
- Error handling in each API function
- Consistent response structure expected

### Authentication Pattern
```typescript
const token = await AsyncStorage.getItem('token');
const response = await axios.get(url, {
  headers: { token }
});
```

### Error Handling
- Try-catch blocks in all API functions
- Errors thrown to be caught by React Query
- Toast notifications for user-facing errors
- Console logging for debugging

## Adding New Features

### Adding a New Component
1. Create file in `/components/ComponentName.tsx`
2. Follow component structure pattern
3. Define props interface
4. Use StyleSheet.create for styles
5. Export as default

### Adding a New Screen
1. Create file in `/app/screen-name.tsx`
2. Use Expo Router conventions
3. Add to navigation if needed
4. Follow screen structure pattern
5. Handle loading and error states

### Adding a New API Service
1. Create function in appropriate `/api/` file
2. Use axios with consistent error handling
3. Include authentication headers if needed
4. Create corresponding React Query hook in `/queries/`
5. Follow naming conventions

### Adding a New Query Hook
1. Create file in `/queries/useFetch[EntityName].ts`
2. Use appropriate React Query hook (useQuery/useInfiniteQuery/useMutation)
3. Define query key pattern
4. Handle enabled conditions
5. Export as default

## Naming Conventions

### Files and Folders
- PascalCase for components: `ProductCard.tsx`
- camelCase for utilities: `clearStorage.ts`
- kebab-case for screens: `forgot-password.tsx`
- Folder names lowercase with hyphens

### Variables and Functions
- camelCase for variables and functions
- PascalCase for components and types
- UPPER_CASE for constants
- Descriptive names preferred over abbreviations

### API and Query Keys
- Query keys: `['entityName', ...params]`
- API functions: `fetchEntityName` or `getEntityName`
- Mutation functions: `addToCart`, `removeFromWishlist`

## Important Constraints

### DO NOT Rules
- **DO NOT** use external state management libraries (Redux, Zustand, etc.)
- **DO NOT** use external styling libraries (styled-components, NativeBase, etc.)
- **DO NOT** modify the authentication flow without updating AsyncStorage logic
- **DO NOT** bypass React Query for API calls
- **DO NOT** use class components (functional components only)
- **DO NOT** use inline styles (use StyleSheet.create)
- **DO NOT** hardcode API URLs (use the established base URL pattern)

### Required Patterns
- **MUST** use React Query for all server state
- **MUST** handle loading and error states in components
- **MUST** use AsyncStorage for authentication persistence
- **MUST** follow the established folder structure
- **MUST** use TypeScript for all new code
- **MUST** use Expo Router conventions for navigation
- **MUST** include toast notifications for user actions

## Development Workflow

### Running the App
```bash
npm start          # Start Expo development server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web
```

### Key Dependencies
- `expo-router` - File-based navigation
- `@tanstack/react-query` - Server state management
- `axios` - HTTP client
- `react-hook-form` - Form handling
- `@react-native-async-storage/async-storage` - Local storage
- `react-native-toast-message` - Toast notifications
- `lottie-react-native` - Animations

## Authentication System

The app uses a token-based authentication system:
- Tokens stored in AsyncStorage
- Automatic routing based on authentication state
- Token included in API headers
- Logout clears all local data
- onboarding flow for first-time users

This README serves as the single source of truth for the Viva project architecture and development patterns. All future development should follow these established conventions and constraints.