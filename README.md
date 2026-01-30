# Viva - AI-Powered E-commerce Mobile App

A modern, cross-platform e-commerce mobile application built with React Native and Expo, featuring an intelligent AI assistant powered by Google Gemini for enhanced shopping experiences.

## 🚀 Project Overview

Viva is a comprehensive e-commerce solution that combines traditional shopping functionality with cutting-edge AI assistance. The app provides users with a seamless shopping experience, from product discovery to checkout, while offering personalized recommendations and instant support through an integrated AI chatbot.

**Key Problem Solved:** Bridging the gap between online shopping convenience and personalized customer service by providing instant, intelligent assistance for product discovery, comparisons, and shopping decisions.

## ✨ Features

### 🛍️ Core E-commerce Features
- **Product Catalog**: Browse extensive product collections with infinite scroll pagination
- **Advanced Search**: Real-time product search with query optimization and filters
- **Category Navigation**: Organized product browsing by categories and subcategories
- **Product Details**: Comprehensive product information with image galleries and specifications
- **Shopping Cart**: Persistent cart management with quantity updates and checkout flow
- **Wishlist/Favorites**: Save products for later with easy management
- **Brand Discovery**: Explore products by brand with dedicated brand pages

### 🤖 AI Assistant Integration
- **Google Gemini AI**: Intelligent chatbot for shopping assistance and product recommendations
- **Contextual Help**: Product-specific AI assistance with detailed information and comparisons
- **Shopping Guidance**: AI-powered suggestions for product selection and styling tips
- **Real-time Chat**: Instant responses with typing indicators and message history
- **Multi-language Support**: AI responses in English and Arabic

### 🔐 Authentication & User Management
- **User Registration**: Email/password signup with form validation
- **Secure Login**: JWT-based authentication with persistent sessions
- **Password Recovery**: Complete forgot password flow with email verification
- **Profile Management**: Edit personal information, addresses, and preferences
- **Session Persistence**: Automatic login on app restart

### 📱 Navigation & UI/UX
- **File-based Routing**: Expo Router with automatic route generation
- **Tab Navigation**: Bottom tab bar for main app sections (Home, Search, Cart, Favorites, Profile)
- **Stack Navigation**: Modal and push navigation for detailed views
- **Onboarding Flow**: First-time user experience with animated introduction
- **Splash Screen**: Branded loading experience with animations

### 🗺️ Location & Maps
- **Interactive Maps**: Google Maps integration with hybrid view support
- **Location Tracking**: Real-time user location detection with permissions handling
- **Address Management**: Multiple shipping addresses with map-based selection
- **Geolocation Services**: Location-based features and store locators

### 🔔 Notifications System
- **Push Notifications**: Expo Notifications integration with permission handling
- **Interactive Notifications**: Tap-to-navigate functionality with deep linking
- **Notification Management**: User preferences and notification history
- **AI Assistant Promotions**: Periodic notifications promoting AI chat features

### 🎨 UI Components & Animations
- **Lottie Animations**: Complex animations for loading states and micro-interactions
- **Custom Components**: Reusable UI components with consistent design system
- **Dark/Light Theme**: Automatic theme detection and switching
- **Responsive Design**: Optimized layouts for different screen sizes
- **Video Integration**: Hero sections with background video content

### 💳 Checkout & Payments
- **Multi-step Checkout**: Address selection, payment method, and order review
- **Payment Methods**: Credit card and PayPal integration (UI ready)
- **Order Management**: Order history and tracking capabilities
- **Address Book**: Multiple shipping addresses with easy selection

### 📊 Data Management
- **React Query**: Advanced server state management with caching and background updates
- **Offline Support**: Cached data availability when network is unavailable
- **Optimistic Updates**: Immediate UI feedback for better user experience
- **Error Handling**: Comprehensive error management with user-friendly messages

## 🛠️ Tech Stack

### Frontend Framework
- **React Native** (0.81.5) - Cross-platform mobile development
- **Expo** (~54.0.30) - Development platform and build tooling
- **TypeScript** (~5.9.2) - Type safety and enhanced developer experience

### Navigation & Routing
- **Expo Router** (~6.0.21) - File-based routing system
- **React Navigation** (^7.1.8) - Navigation library integration

### State Management
- **TanStack React Query** (^5.90.16) - Server state management and caching
- **AsyncStorage** (^2.2.0) - Local storage for user data and app state
- **React Context** - Global state management for authentication

### UI & Styling
- **React Native Reanimated** (~4.1.1) - Advanced animations and gestures
- **Lottie React Native** (~7.3.1) - Complex animations and micro-interactions
- **Expo Vector Icons** (^15.0.3) - Comprehensive icon library
- **React Native Safe Area Context** (~5.6.0) - Safe area handling

### Data Fetching & API
- **Axios** (^1.13.2) - HTTP client for API requests
- **RouteEgypt E-commerce API** - Backend service for product data
- **Google Gemini API** - AI chatbot integration

### Form Management
- **React Hook Form** (^7.69.0) - Form state management and validation

### Maps & Location
- **React Native Maps** (1.20.1) - Google Maps integration
- **Expo Location** (~19.0.8) - Location services and permissions

### Media & Content
- **Expo Video** (~3.0.15) - Video playback and streaming
- **Expo AV** (~16.0.8) - Audio/video media handling
- **React Native Pager View** (6.9.1) - Swipeable page views

### Notifications & Communication
- **Expo Notifications** (~0.32.16) - Push notifications and local notifications
- **React Native Toast Message** (^2.3.3) - User feedback and alerts

### Development & Build
- **EAS Build** - Expo Application Services for building and deployment
- **Metro** - JavaScript bundler for React Native
- **Expo Dev Client** (~6.0.20) - Custom development builds

## 📁 Project Structure

```
├── api/                    # API service layer
│   ├── auth.ts            # Authentication endpoints (login, signup, password reset)
│   ├── cart.ts            # Cart management (add, remove, get cart items)
│   ├── fetchProducts.ts   # Product fetching with pagination and filters
│   ├── FetchChat.ts       # Google Gemini AI integration
│   ├── wishlist.ts        # Wishlist/favorites management
│   ├── fetchBrands.ts     # Brand data fetching
│   ├── fetchCategories.ts # Category and subcategory data
│   ├── fetchOrders.ts     # Order history and tracking
│   └── users.ts           # User profile management
├── app/                   # File-based routing (Expo Router)
│   ├── (tabs)/           # Tab navigation screens
│   │   ├── index.tsx     # Home screen with featured products
│   │   ├── search.tsx    # Product search with filters
│   │   ├── cart.tsx      # Shopping cart management
│   │   ├── favorites.tsx # Wishlist/favorites
│   │   └── profile.tsx   # User profile and settings
│   ├── product/[id].tsx  # Dynamic product details screen
│   ├── chat.tsx          # AI assistant interface
│   ├── login.tsx         # User authentication
│   ├── register.tsx      # User registration
│   ├── onboarding.tsx    # First-time user experience
│   ├── checkout.tsx      # Multi-step checkout process
│   ├── map.tsx           # Interactive map with location services
│   └── _layout.tsx       # Root navigation layout
├── components/            # Reusable UI components
│   ├── ProductCard.tsx   # Product display component
│   ├── ChatList.tsx      # Chat message list
│   ├── MessageInput.tsx  # Chat input component
│   ├── HeroSection.tsx   # Video hero section
│   ├── ProductsList.tsx  # Product grid/list display
│   ├── CategoryButtons.tsx # Category navigation
│   ├── SearchInput.tsx   # Search functionality
│   ├── Loader.tsx        # Loading states
│   └── ErrorView.tsx     # Error handling UI
├── queries/              # React Query hooks
│   ├── useFetchProducts.ts # Product data with infinite scroll
│   ├── useFetchCart.ts   # Cart state management
│   ├── useFetchWishlist.ts # Wishlist data
│   └── useFetchSearchProducts.ts # Search functionality
├── hooks/                # Custom React hooks
│   ├── useLocation.ts    # Location services and permissions
│   ├── useNotifications.ts # Notification handling
│   └── useFetchChat.ts   # AI chat integration
├── types/                # TypeScript type definitions
│   ├── product.ts        # Product data types
│   ├── Products.ts       # Product response types
│   ├── Categories.ts     # Category data types
│   └── RequsetType.ts    # API request/response types
├── utils/                # Utility functions
│   ├── toast.ts          # Toast notification helpers
│   └── clearStorage.ts   # Storage management utilities
├── constants/            # App constants and configuration
│   └── Colors.ts         # Theme colors and styling
├── provider/             # React Context providers
│   └── Provider.tsx      # QueryClient provider setup
└── assets/               # Static assets
    ├── images/           # App icons, logos, and images
    ├── fonts/            # Custom fonts
    └── jsonIcons/        # Lottie animation files
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Expo CLI** (`npm install -g @expo/cli`)
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd viva-ecommerce-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file and add your Google Gemini API key:
   ```bash
   EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

### Running on Devices

#### Android
```bash
npm run android
# or
expo run:android
```

#### iOS (macOS only)
```bash
npm run ios
# or
expo run:ios
```

#### Web
```bash
npm run web
# or
expo start --web
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```bash
# Google Gemini API Key for AI Chat Assistant
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

### EAS Build Configuration

The app uses Expo Application Services (EAS) for building and deployment. Configuration is managed in `eas.json`:

- **Development**: Internal distribution with development API keys
- **Preview**: Internal testing with preview API keys  
- **Production**: App store distribution with production API keys

### API Configuration

The app connects to the RouteEgypt E-commerce API:
- **Base URL**: `https://ecommerce.routemisr.com/api/v1/`
- **Authentication**: Bearer token-based
- **Endpoints**: Products, categories, cart, wishlist, orders, authentication

## 📱 App Flow

### User Journey

1. **App Launch**: Splash screen with brand animation
2. **Route Determination**: Check authentication and onboarding status
3. **Onboarding**: First-time user introduction (if needed)
4. **Authentication**: Login or registration flow
5. **Main App**: Tab-based navigation with core features
6. **Shopping Flow**: Browse → Search → Product Details → Cart → Checkout
7. **AI Assistance**: Contextual help throughout the shopping journey

### Data Flow

1. **API Layer**: Axios-based HTTP client handles all backend communication
2. **React Query**: Manages server state, caching, and background updates
3. **Local Storage**: AsyncStorage persists user tokens and app preferences
4. **Component State**: Local React state for UI interactions
5. **Global State**: Minimal global state through React Context

### Navigation Structure

```
Root Stack Navigator
├── Splash Screen
├── Onboarding Flow
├── Authentication Stack
│   ├── Login
│   └── Register
└── Main App (Tab Navigator)
    ├── Home Tab
    ├── Search Tab
    ├── Cart Tab
    ├── Favorites Tab
    └── Profile Tab
```

## 🎨 Design System

### Color Palette
- **Primary**: #1A1A1A (Dark)
- **Secondary**: #667eea (Blue)
- **Success**: #34c759 (Green)
- **Warning**: #ff9500 (Orange)
- **Error**: #ff3b30 (Red)
- **Background**: #f5f5f5 (Light Gray)

### Typography
- **Primary Font**: System default (San Francisco on iOS, Roboto on Android)
- **Custom Font**: SpaceMono for special elements

### Component Guidelines
- **Consistent Spacing**: 8px grid system
- **Border Radius**: 8-12px for cards, 20-25px for buttons
- **Shadows**: Subtle elevation with consistent shadow properties
- **Animations**: Smooth transitions with React Native Reanimated

## 🔐 Security & Privacy

### Authentication Security
- **JWT Tokens**: Secure token-based authentication
- **Token Storage**: Encrypted storage using AsyncStorage
- **Session Management**: Automatic token refresh and logout

### API Security
- **HTTPS Only**: All API communications over secure connections
- **Input Validation**: Client-side and server-side validation
- **Error Handling**: Secure error messages without sensitive data exposure

### Privacy Considerations
- **Location Permissions**: Explicit user consent for location access
- **Notification Permissions**: Optional notification preferences
- **Data Minimization**: Only collect necessary user information

## 🧪 Testing

### Available Test Scripts
```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Testing Strategy
- **Unit Tests**: Component and utility function testing
- **Integration Tests**: API integration and data flow testing
- **E2E Tests**: Complete user journey testing (planned)

## 📦 Build & Deployment

### Development Build
```bash
eas build --profile development --platform android
eas build --profile development --platform ios
```

### Production Build
```bash
eas build --profile production --platform android
eas build --profile production --platform ios
```

### App Store Submission
```bash
eas submit --platform android
eas submit --platform ios
```

## 🐛 Known Issues & Limitations

### Current Limitations
- **Offline Functionality**: Limited offline support, requires network for most operations
- **Payment Processing**: Payment methods UI implemented but actual payment processing not integrated
- **Push Notifications**: Notification system configured but push service not fully implemented
- **Image Optimization**: Product images loaded directly without CDN optimization

### Performance Considerations
- **Large Catalogs**: May require additional optimization for extensive product collections
- **Memory Usage**: Image caching could be improved for better memory management
- **Network Efficiency**: API calls could be optimized with better caching strategies

### Platform-Specific Issues
- **Android**: Some animations may perform differently than iOS
- **iOS**: Keyboard handling requires additional testing on various device sizes
- **Web**: Limited web support, primarily designed for mobile platforms

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the existing code style and conventions
4. Add tests for new functionality
5. Commit changes (`git commit -m 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style Guidelines
- **TypeScript**: Use strict typing throughout the application
- **ESLint**: Follow the configured linting rules
- **Prettier**: Use consistent code formatting
- **Component Structure**: Follow React functional component patterns
- **File Naming**: Use PascalCase for components, camelCase for utilities

### API Integration Guidelines
- **Error Handling**: Implement comprehensive error handling for all API calls
- **Loading States**: Provide loading indicators for all async operations
- **Caching Strategy**: Use React Query for efficient data caching
- **Type Safety**: Define TypeScript interfaces for all API responses

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- **Email**: support@vivaapp.com
- **Documentation**: [API Documentation](https://ecommerce.routemisr.com/docs)
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)

## 🙏 Acknowledgments

- **RouteEgypt**: E-commerce API provider
- **Google Gemini**: AI assistant integration
- **Expo Team**: Development platform and tools
- **React Native Community**: Open source components and libraries
- **Design Inspiration**: Modern e-commerce design patterns

---

**Built with ❤️ using React Native and Expo**