# Viva — AI-Powered E-Commerce Mobile App

Viva is a cross-platform e-commerce mobile application built with React Native and Expo. It combines a full shopping experience — product catalog, cart, wishlist, checkout, and order management — with an AI assistant powered by Groq (Llama 3.1 8B Instant) to help users discover products, compare options, and make purchase decisions.

---

## Features

### Shopping
- **Product Catalog** — browse products with pagination, category and brand filtering
- **Search** — real-time product search with query parameters
- **Product Details** — image gallery, specifications, pricing, reviews, and ratings
- **Categories** — organized browsing with subcategory drill-down
- **Brands** — dedicated brand pages with product listings
- **Shopping Cart** — add/remove items, quantity updates, persistent state
- **Wishlist** — save and manage favorite products
- **Checkout** — address selection, payment method selection, order summary

### Authentication & User Management
- **Registration & Login** — email/password with JWT token persistence via AsyncStorage
- **Password Flow** — forgot password, verify reset code, reset password
- **Profile Management** — edit name, email, phone; change password
- **Profile Image** — upload with phone library or camera
- **Address Management** — add, view, and manage shipping addresses with map-based selection

### AI Assistant
- **Groq-Powered Chat** — Llama 3.1 8B Instant model for shopping assistance
- **Contextual Help** — product-aware responses with purchase guidance and comparisons
- **Conversation UI** — message bubbles, typing indicators, copy/share actions

### Orders & Reviews
- **Order History** — view past orders
- **Order Success** — post-checkout confirmation screen
- **Product Reviews** — read and submit reviews with ratings

### Navigation & UI
- **Expo Router** — file-based routing with tab and stack navigation
- **Bottom Tabs** — Home, Search, Cart, Favorites, Profile
- **Stack Screens** — product details, checkout, chat, settings, and more
- **Splash Screen** — branded loading with font preloading
- **Onboarding Flow** — first-time user introduction
- **Skeleton Loading** — 38 skeleton components for loading states
- **Light/Dark Theme** — automatic color scheme detection
- **Lottie Animations** — micro-interactions and empty states

### Maps & Location
- **Google Maps Integration** — interactive map with hybrid view
- **Location Services** — permission-based current location detection
- **Map-Based Addresses** — address selection and management on map

### Notifications (Partial)
- **Expo Notifications** — notification handler configured at root level
- **Notifications Screen** — mock notification list with type-based icons and read/unread state

---

## Tech Stack

| Category       | Technologies |
|----------------|-------------|
| Framework      | React Native 0.81.5, Expo ~54.0.30, TypeScript ~5.9.2 |
| Navigation     | Expo Router ~6.0.21, React Navigation ^7.1.8 |
| State Mgmt     | TanStack React Query ^5.90.16, AsyncStorage ^2.2.0 |
| HTTP Client    | Axios ^1.13.2 |
| AI Integration | Groq API (Llama 3.1 8B Instant) |
| Animations     | React Native Reanimated ~4.1.1, Lottie ~7.3.1 |
| Maps           | React Native Maps 1.20.1, Expo Location ~19.0.8 |
| Forms          | React Hook Form ^7.69.0 |
| Icons          | Expo Vector Icons ^15.0.3 |
| Notifications  | Expo Notifications ~0.32.16 |
| Media          | Expo AV ~16.0.8, Expo Video ~3.0.15 |
| Build          | EAS Build, Expo Dev Client ~6.0.20 |
| Other          | react-native-toast-message, react-native-pager-view, expo-image-picker, expo-sharing, expo-web-browser |

**Backend API:** RouteEgypt E-Commerce API (`https://ecommerce.routemisr.com/api/v1/`)

---

## Architecture

```
app/                    # Expo Router file-based routing
├── _layout.tsx         # Root stack + notification handler + Toast
├── (tabs)/             # Bottom tab navigator (Home, Search, Cart, Favorites, Profile)
├── product/[id].tsx    # Product details (dynamic route)
├── brand/[id].tsx      # Brand detail (dynamic route)
├── category/[id].tsx   # Category detail (dynamic route)
├── chat.tsx            # AI Assistant screen
├── checkout.tsx        # Multi-step checkout
├── splash.tsx          # Splash screen
├── onboarding.tsx      # First-time user flow
├── login.tsx           # Login
├── register.tsx        # Registration
└── + screens for       # notifications, map, orders, addresses,
    settings, support   # payment methods, and more

src/
├── features/           # Feature-based modules (16 total)
│   ├── auth/           # Authentication (api, hooks, screens, types)
│   ├── brands/         # Brand browsing
│   ├── cart/           # Cart management (api, hooks, screens)
│   ├── categories/     # Category/subcategory navigation
│   ├── chat/           # AI chat (Groq integration)
│   ├── checkout/       # Checkout flow
│   ├── home/           # Home screen (hero, banners)
│   ├── misc/           # Modal screen
│   ├── notifications/  # Notifications screen (mock data)
│   ├── onboarding/     # Splash + onboarding flow
│   ├── orders/         # Order history + success screen
│   ├── payment/        # Payment method UI screens
│   ├── products/       # Products, search, details, components
│   ├── profile/        # User profile, addresses, settings, map
│   ├── reviews/        # Product reviews (api, hooks, types)
│   ├── support/        # FAQ, Help Center, Contact
│   └── wishlist/       # Wishlist management
├── shared/             # Shared code
│   ├── components/     # Loader, ErrorView, SearchInput, Themed, etc.
│   ├── constants/      # Colors (light/dark)
│   ├── hooks/          # useColorScheme, useLocation, useClientOnlyValue
│   ├── types/          # Shared type definitions
│   └── utils/          # Toast, AsyncStorage utilities
├── components/
│   └── skeletons/      # 38 skeleton loading components
└── provider/           # AppProvider (QueryClient provider)
```

**Data Flow:**
1. **API Layer** — Axios calls to RouteEgypt REST API or Groq API
2. **React Query** — server state caching, background refetching, optimistic updates
3. **AsyncStorage** — JWT token and user data persistence
4. **React Context** — minimal global state via AppProvider
5. **Expo Router** — file-based routing drives screen composition

---

## Getting Started

### Prerequisites
- Node.js v16+
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Android Studio (Android) or Xcode (iOS, macOS only)

### Installation

```bash
git clone <repository-url>
cd viva-ecommerce-app
npm install
cp .env.example .env
```

Edit `.env` and add your Groq API key:
```
EXPO_PUBLIC_GROQ_API_KEY=your_groq_api_key_here
```

Get a key at [console.groq.com/keys](https://console.groq.com/keys).

### Start Development

```bash
npm start          # or: expo start
npm run android    # Android emulator/device
npm run ios        # iOS simulator (macOS only)
npm run web        # Web browser
```

### Build & Deploy

```bash
eas build --profile development --platform android
eas build --profile production --platform android
eas submit --platform android
```

---

## Project Configuration

| Key File | Purpose |
|----------|---------|
| `.env` | `EXPO_PUBLIC_GROQ_API_KEY` for AI chat |
| `app.config.js` / `app.json` | Expo configuration, plugins, splash, EAS project ID |
| `tsconfig.json` | TypeScript config with `@src/*` path alias |
| `eas.json` | EAS Build profiles (development, preview, production) |

---

## Roadmap

### Push Notifications
- Register device push tokens via Expo Notifications
- Build notification delivery service for order updates, promotions, and alerts
- Implement deep linking from notifications to specific product or order screens

### Local Notifications
- Add local reminder scheduling (e.g., abandoned cart, price drop alerts)
- In-app notification prompts for better user engagement

### Guest Login (Firebase)
- Allow anonymous browsing with Firebase Authentication
- Persistent guest cart and wishlist
- Upgrade guest accounts to full accounts on registration

### Payment Integration
- Replace mock payment UI with real payment gateway (Stripe, PayPal SDK)
- Support multiple payment methods (cards, wallets, COD)

### Order Tracking
- Real-time order status updates
- Shipment tracking with carrier integration

### Offline Support
- Expand offline capabilities beyond React Query cache
- Queue write operations for offline mutation replay

### Testing
- Add unit tests (components, hooks, utilities)
- Add integration tests (API flows, auth, cart lifecycle)
- Add E2E tests for critical user journeys

---

## License

MIT
