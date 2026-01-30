# Viva E-commerce Mobile App

## Project Overview

Viva is a cross-platform e-commerce mobile application built with React Native and Expo. The app provides a complete shopping experience with product browsing, cart management, user authentication, and an integrated AI assistant powered by Google Gemini. It targets mobile users looking for a modern, intuitive shopping experience with intelligent product recommendations and customer support.

The main problem it solves is providing a seamless mobile shopping experience with AI-powered assistance, allowing users to browse products, manage their cart, track orders, and get instant help through an intelligent chat assistant.

## Tech Stack

### Frameworks & Runtime
- **React Native** (0.81.5) - Cross-platform mobile development
- **Expo** (~54.0.30) - Development platform and build tooling
- **Expo Router** (~6.0.21) - File-based routing system
- **TypeScript** (~5.9.2) - Type safety and development experience

### State Management & Data Fetching
- **TanStack React Query** (^5.90.16) - Server state management and caching
- **Axios** (^1.13.2) - HTTP client for API requests
- **AsyncStorage** (^2.2.0) - Local storage for user data and app state

### UI & Styling
- **React Native Reanimated** (~4.1.1) - Advanced animations
- **Expo Vector Icons** (^15.0.3) - Icon library
- **Lottie React Native** (~7.3.1) - Complex animations and micro-interactions
- **React Native Safe Area Context** (~5.6.0) - Safe area handling

### Form Management & Validation
- **React Hook Form** (^7.69.0) - Form state management and validation

### Build & Deployment
- **EAS Build** - Expo Application Services for building and deployment
- **Metro** - JavaScript bundler for React Native

## Project Structure

```
├── api/                    # API service layer
│   ├── auth.ts            # Authentication endpoints
│   ├── cart.ts            # Cart management endpoints
│   ├── fetchProducts.ts   # Product fetching logic
│   ├── FetchChat.ts       # AI chat integration
│   └── ...                # Other API services
├── app/                   # File-based routing (Expo Router)
│   ├── (tabs)/           # Tab navigation screens
│   │   ├── index.tsx     # Home screen
│   │   ├── search.tsx    # Search functionality
│   │   ├── cart.tsx      # Shopping cart
│   │   ├── favorites.tsx # Wishlist
│   │   └── profile.tsx   # User profile
│   ├── login.tsx         # Authentication screens
│   ├── onboarding.tsx    # First-time user experience
│   ├── chat.tsx          # AI assistant interface
│   └── _layout.tsx       # Root navigation layout
├── components/            # Reusable UI components
│   ├── ProductCard.tsx   # Product display component
│   ├── ChatList.tsx      # Chat message list
│   ├── MessageInput.tsx  # Chat input component
│   └── ...               # Other shared components
├── queries/              # React Query hooks
│   ├── useFetchProducts.ts
│   ├── useFetchCart.ts
│   └── ...
├── hooks/                # Custom React hooks
│   ├── useLocation.ts    # Location management and permissions
│   └── useNotifications.ts # Notification handling and routing
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
├── constants/            # App constants and configuration
├── provider/             # Context providers
└── assets/               # Static assets (images, fonts, animations)
```

### Folder Responsibilities

- **api/**: Contains all HTTP request logic and API endpoint definitions
- **app/**: File-based routing structure with screens and navigation
- **components/**: Reusable UI components used across multiple screens
- **queries/**: React Query hooks for data fetching and caching
- **hooks/**: Custom React hooks for shared logic
- **types/**: TypeScript interfaces and type definitions
- **utils/**: Helper functions and utilities
- **provider/**: React context providers for global state

## Application Flow

### App Initialization
1. **Splash Screen**: Initial loading with brand animation
2. **Route Determination**: Checks AsyncStorage for authentication and onboarding status
3. **Navigation**: Routes to appropriate screen (onboarding → login → main app)

### Data Flow
1. **API Layer**: Axios-based HTTP client handles all backend communication
2. **React Query**: Manages server state, caching, and background updates
3. **Local Storage**: AsyncStorage persists user tokens and app preferences
4. **Component State**: Local React state for UI interactions

### State Management
- **Server State**: Managed by TanStack React Query with automatic caching
- **Authentication State**: Stored in AsyncStorage, checked on app launch
- **UI State**: Local component state using React hooks
- **Global State**: Minimal global state through React Context (QueryClient)

### Routing
- **File-based Routing**: Expo Router provides automatic route generation
- **Tab Navigation**: Bottom tab bar for main app sections
- **Stack Navigation**: Modal and push navigation for detailed views
- **Protected Routes**: Authentication checks in root layout

## Core Features

### Authentication System
- **User Registration**: Email/password signup with validation
- **Login/Logout**: Secure authentication with token storage
- **Password Recovery**: Forgot password flow with email verification
- **Persistent Sessions**: Automatic login on app restart

### Product Catalog
- **Product Browsing**: Infinite scroll product listing with pagination
- **Category Filtering**: Filter products by categories and subcategories
- **Search Functionality**: Real-time product search with query optimization
- **Product Details**: Comprehensive product information with image galleries

### Shopping Cart
- **Add/Remove Items**: Cart management with quantity updates
- **Persistent Cart**: Cart state maintained across app sessions
- **Checkout Process**: Multi-step checkout with address and payment

### AI Assistant (Viva Chat)
- **Google Gemini Integration**: AI-powered customer support
- **Product Recommendations**: Intelligent product suggestions
- **Shopping Assistance**: Help with orders, payments, and general queries
- **Real-time Chat**: Instant responses with typing indicators

### User Profile Management
- **Profile Editing**: Update personal information and preferences
- **Order History**: View past orders and tracking information
- **Address Management**: Multiple shipping addresses
- **Payment Methods**: Saved payment options

### Map & Location Services
- **Interactive Map Display**: Google Maps integration with hybrid view
- **Location Tracking**: Real-time user location detection
- **Marker Management**: Dynamic markers showing user position
- **Navigation Controls**: Zoom, pan, rotation, and compass controls

### Notification System
- **Interactive Notifications**: Tap-to-navigate functionality
- **Permission Handling**: Automatic permission requests and error handling
- **Custom Actions**: Deep linking to specific app screens
- **Response Management**: Custom handling for notification interactions

### Custom Hooks Architecture
- **useLocation Hook**: Centralized location management with error handling
- **useNotifications Hook**: Unified notification handling and routing
- **Reusable Logic**: Separation of concerns for better maintainability
- **Type Safety**: Full TypeScript support for all custom hooks

## API / Data Handling

### Backend Integration
- **Base URL**: `https://ecommerce.routemisr.com/api/v1/`
- **Authentication**: Bearer token-based authentication
- **Error Handling**: Centralized error handling with user-friendly messages

### Key Endpoints
```typescript
// Authentication
POST /auth/signin          # User login
POST /auth/signup          # User registration
POST /auth/forgotPasswords # Password recovery

// Products
GET /products              # Product listing with pagination
GET /products/:id          # Product details

// Cart Management
GET /cart                  # Get user cart
POST /cart                 # Add item to cart
DELETE /cart/:id           # Remove item from cart

// AI Chat
POST /generateContent      # Google Gemini API integration
```

### Data Caching Strategy
- **React Query**: Automatic caching with stale-while-revalidate
- **Cache Keys**: Structured cache invalidation for related data
- **Background Updates**: Automatic refetching on focus/reconnect
- **Optimistic Updates**: Immediate UI updates for better UX

### Error Handling
- **Network Errors**: Retry logic with exponential backoff
- **API Errors**: Structured error responses with user messages
- **Offline Support**: Cached data availability when offline
- **Toast Notifications**: User feedback for all operations

## State Management Details

### React Query Configuration
```typescript
// Provider setup with QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});
```

### Query Patterns
- **Infinite Queries**: Product listing with pagination
- **Dependent Queries**: Cart data dependent on authentication
- **Mutations**: Cart operations with optimistic updates
- **Cache Invalidation**: Automatic cache updates after mutations

### Local Storage Schema
```typescript
// AsyncStorage keys and data structure
'token': string              # JWT authentication token
'user': JSON                 # User profile data
'onboardingCompleted': 'true' # Onboarding completion flag
```

## Configuration & Environment

### Environment Variables
```bash
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

### Key Configuration Files

#### app.json
- **App Metadata**: Name, version, icons, splash screen
- **Platform Settings**: iOS and Android specific configurations
- **Expo Plugins**: Router, video, and other integrations
- **EAS Integration**: Project ID and update configuration

#### eas.json
- **Build Profiles**: Development, preview, and production builds
- **Environment Variables**: API keys per build environment
- **Distribution**: Internal and store distribution settings

#### tsconfig.json
- **TypeScript Configuration**: Strict mode enabled
- **Path Mapping**: Absolute imports with `@/` prefix
- **Expo Integration**: Extended from Expo's base configuration

## Scripts & Commands

### Installation
```bash
npm install
# or
yarn install
```

### Development
```bash
# Start development server
npm start
# or
expo start

# Run on specific platforms
npm run android    # Android emulator/device
npm run ios        # iOS simulator/device
npm run web        # Web browser
```

### Available Scripts
- **start**: Launch Expo development server
- **android**: Run on Android platform
- **ios**: Run on iOS platform  
- **web**: Run in web browser

### Build & Deployment
```bash
# Build for production (requires EAS CLI)
eas build --platform android
eas build --platform ios

# Submit to app stores
eas submit --platform android
eas submit --platform ios
```

## Notes & Constraints

### Implementation Decisions
- **File-based Routing**: Chosen for better developer experience and automatic route generation
- **React Query**: Selected for robust server state management and caching capabilities
- **Expo Managed Workflow**: Provides faster development cycle with easy deployment
- **TypeScript**: Ensures type safety and better development experience

### Current Limitations
- **Offline Functionality**: Limited offline support, requires network for most operations
- **Payment Integration**: Payment methods UI exists but actual payment processing not implemented
- **Push Notifications**: Notification UI present but push notification service not configured
- **Image Optimization**: Product images loaded directly without optimization

### Development Considerations
- **API Key Security**: Gemini API key must be configured in environment variables
- **Authentication Flow**: Token expiration handling needs monitoring in production
- **Performance**: Large product catalogs may require additional optimization
- **Platform Differences**: Some animations may behave differently on iOS vs Android

### New Developer Onboarding
1. **Environment Setup**: Configure Expo CLI and development environment
2. **API Keys**: Obtain and configure Google Gemini API key
3. **Backend Understanding**: Familiarize with RouteEgypt e-commerce API
4. **State Management**: Understand React Query patterns used throughout the app
5. **Navigation**: Learn Expo Router file-based routing conventions