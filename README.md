# Viva — AI-Powered E-Commerce Mobile App

Viva is a cross-platform e-commerce mobile application built with React Native and Expo. It combines a full shopping experience — product catalog, cart, wishlist, checkout, and order management — with an AI assistant powered by Groq (Llama 3.1 8B Instant) to help users discover products, compare options, and make purchase decisions.

---

## Features

### Shopping
- **Product Catalog** — browse products with infinite-scroll pagination, category filtering, and horizontal product lists
- **Search** — two search modes: client-side filtering on the Search tab, and server-side debounced search on the All Products screen
- **Product Details** — image gallery, specs, pricing, brand/category chips, reviews with star ratings, and a sticky purchase bar with an "Ask AI" button (a `RelatedProducts` component is imported but not yet rendered)
- **Categories** — category grid browsing with detail pages showing category info and filtered product lists
- **Brands** — brand grid browsing with detail pages showing brand info and matching products
- **Shopping Cart** — add/remove items via API, view totals, proceed to checkout (quantity +/- buttons are present in the UI but have no handlers)
- **Wishlist** — add/remove favorite products, move items to cart
- **Checkout** — order summary with subtotal/shipping/tax calculation, address and payment method selection (uses hardcoded mock data and simulated order placement)

### Authentication & User Management
- **Registration & Login** — email/password with JWT token persistence via AsyncStorage
- **Password Flow** — forgot password, verify reset code, reset password
- **Profile Management** — edit name, email, phone with form validation
- **Change Password** — dedicated change password flow
- **Profile Image** — image picker via camera or library (stored locally only; server upload code exists but is commented out)

### AI Assistant
- **Groq-Powered Chat** — Llama 3.1 8B Instant model for shopping assistance with a system prompt that defines Viva's persona
- **Contextual Help** — product-aware responses when launched from a product detail page, with structured product context injection
- **Conversation UI** — message bubbles, typing indicators, welcome view, copy to clipboard, share functionality
- **Standalone & Contextual** — works both as a general shopping assistant and as a product-specific advisor

### Orders & Reviews
- **Order History** — view past orders with item details, pricing, and delivery status
- **Order Success** — post-checkout confirmation screen with navigation to continue shopping or view order history
- **Product Reviews** — read paginated reviews with expand/collapse, submit new reviews with star rating and text

### Navigation & UI
- **Expo Router** — file-based routing with a Stack navigator for auth flows and a Tab navigator for main app sections
- **Bottom Tabs** — Home, Search, Cart, Favorites, Profile
- **Stack Screens** — product details, checkout, chat, profile settings, orders, addresses, payment, map, support, and more
- **Splash Screen** — branded loading screen with font preloading (SpaceMono)
- **Onboarding Flow** — first-time user introduction
- **Skeleton Loading** — 34 skeleton components plus a `useSkeletonAnimation` hook for loading states across all major screens
- **Lottie Animations** — AI logo FAB on home screen, 404 animation, empty state illustrations
- **Toast Notifications** — global toast system via `react-native-toast-message` for success/error/info feedback

### Maps & Location
- **Google Maps Integration** — interactive map with map view via `react-native-maps`
- **Location Services** — permission-based current location detection via `expo-location`
- **Address Selection** — map-based address picking screen

### Notifications (Partial)
- **Expo Notifications** — notification handler configured at root level with banner/sound/badge settings
- **Notifications Screen** — static mock notification list with type-based icons (order, promotion, system)

---

## Tech Stack

| Category | Technologies |
|---|---|
| Framework | React Native 0.81.5, Expo ~54.0.30, TypeScript ~5.9.2 |
| Navigation | Expo Router ~6.0.21, React Navigation ^7.1.8 |
| State Mgmt | TanStack React Query ^5.90.16, AsyncStorage ^2.2.0 |
| HTTP Client | Axios ^1.13.2 |
| Forms | React Hook Form ^7.69.0 |
| AI Integration | Groq API (Llama 3.1 8B Instant) |
| Animations | React Native Reanimated ~4.1.1, Lottie ~7.3.1 |
| Maps | React Native Maps 1.20.1, Expo Location ~19.0.8 |
| Icons | Expo Vector Icons ^15.0.3 |
| Notifications | Expo Notifications ~0.32.16 |
| Media | Expo AV ~16.0.8, Expo Video ~3.0.15, Expo Image Picker ~17.0.10 |
| Clipboard/Share | Expo Clipboard ~8.0.8, Expo Sharing ~14.0.8 |
| Build | EAS Build, Expo Dev Client ~6.0.20 |
| Toast | react-native-toast-message ^2.3.3 |
| Pager | react-native-pager-view 6.9.1 |

**Backend API:** RouteEgypt E-Commerce API (`https://ecommerce.routemisr.com/api/v1/`) — no local backend server.

---

## Architecture

```
app/                    # Expo Router file-based routing
├── _layout.tsx         # Root Stack navigator + notification handler + Toast + AppProvider
├── (tabs)/             # Bottom tab navigator
│   ├── _layout.tsx     # Tab configuration (Home, Search, Cart, Favorites, Profile)
│   ├── index.tsx       # Home (hero, featured, brands, categories, products, FAB to chat)
│   ├── search.tsx      # Search (client-side filtering of fetched products)
│   ├── cart.tsx        # Cart (add/remove, totals, checkout button)
│   ├── favorites.tsx   # Wishlist (remove, move to cart)
│   └── profile.tsx     # Profile (user info, settings links)
├── product/[id].tsx    # Product details (gallery, info, specs, reviews, related, sticky bar)
├── brand/[id].tsx      # Brand detail (brand info + filtered products)
├── category/[id].tsx   # Category detail (category info + filtered products)
├── chat.tsx            # AI Assistant (Groq chat, product context, typing indicator)
├── checkout.tsx        # Checkout (mock addresses, payment, order summary, simulated placement)
├── all-products.tsx    # All products with server-side search and infinite scroll
├── categories.tsx      # Category grid (cards without onPress — no navigation from here)
├── brands.tsx          # Brand grid
├── splash.tsx          # Splash screen
├── onboarding.tsx      # First-time user flow
├── login.tsx           # Login
├── register.tsx        # Registration
├── forgot-password.tsx # Forgot password
├── verify-reset-code.tsx # Verify reset code
├── reset-password.tsx  # Reset password
├── edit-profile.tsx    # Edit profile
├── change-password.tsx # Change password
├── my-orders.tsx       # Order history
├── order-success.tsx   # Order success confirmation
├── notifications.tsx   # Notifications (mock data)
├── address.tsx         # My addresses (mock data)
├── new-address.tsx     # Add address (mock/Alert-based)
├── payment-method.tsx  # Payment methods (mock data)
├── new-card.tsx        # Add card (mock/Alert-based)
├── map.tsx             # Map screen (react-native-maps)
├── contact.tsx         # Contact us (mock data)
├── faqs.tsx            # FAQs (mock data)
├── help-center.tsx     # Help center (mock data)
├── modal.tsx           # Modal screen (Expo template leftover)
├── +html.tsx           # Web-only root HTML configuration
└── +not-found.tsx      # 404 screen with Lottie animation, auto-redirect to splash

src/
├── features/           # Feature-based modules (17 total)
│   ├── auth/           # Authentication (api, hooks, screens, types)
│   ├── brands/         # Brand browsing (api, hooks, screens, components)
│   ├── cart/           # Cart management (api, hooks, screens)
│   ├── categories/     # Category/subcategory navigation (api, hooks, screens, data)
│   ├── chat/           # AI chat (api/groqApi, hooks, screens, components, types)
│   ├── checkout/       # Checkout flow (screens)
│   ├── home/           # Home screen (components: HeroSection, BannerAd)
│   ├── misc/           # Modal screen
│   ├── notifications/  # Notifications screen (hooks with static mock data)
│   ├── onboarding/     # Splash + onboarding flow (screens)
│   ├── orders/         # Order history + success (api, hooks, screens)
│   ├── payment/        # Payment method UI screens (mock data)
│   ├── products/       # Products, search, details, components (api, hooks, screens, types)
│   ├── profile/        # User profile, addresses, settings, map (api, hooks, screens)
│   ├── reviews/        # Product reviews (api, hooks, types)
│   ├── support/        # FAQ, Help Center, Contact (screens with static data)
│   └── wishlist/       # Wishlist management (api, hooks, screens)
├── shared/             # Shared code
│   ├── components/     # Loader, ErrorView, EmptyState, SectionTitle, Themed, ExternalLink, etc.
│   ├── constants/      # Colors (light/dark definitions — mostly unused, screens hardcode light colors)
│   ├── hooks/          # useColorScheme, useClientOnlyValue, useLocation
│   ├── types/          # Shared type definitions
│   └── utils/          # showToast, clearAppStorage, resetonboardingStatus, resetAuthStatus, getAllStoredKeys
├── components/
│   └── skeletons/      # 34 skeleton components + 1 animation hook
└── provider/           # AppProvider (wraps children with QueryClientProvider)

server/                 # Empty directory — no local backend
```

**Data Flow:**
1. **API Layer** — Axios calls to the RouteEgypt REST API or Groq API
2. **React Query** — server-state caching, background refetching, infinite pagination, mutation invalidation
3. **AsyncStorage** — JWT token (`token`), user data (`user`), profile image (`profileImage`), onboarding flag (`onboardingCompleted`), guest mode flag (`guestMode`)
4. **React Query Provider** — `QueryClientProvider` wraps the app via `AppProvider`
5. **Expo Router** — file-based routing drives screen composition

---

## Project Structure

```
viva/
├── app/                          # Expo Router screens (38 files)
│   ├── _layout.tsx               # Root Stack navigator
│   ├── (tabs)/                   # Tab navigator (5 screens + layout)
│   ├── product/[id].tsx          # Dynamic product detail route
│   ├── brand/[id].tsx            # Dynamic brand detail route
│   ├── category/[id].tsx         # Dynamic category detail route
│   └── ...                       # 29 other screen files
├── src/
│   ├── features/                 # 17 feature modules
│   │   ├── auth/                 # api/, hooks/, screens/, types/
│   │   ├── brands/               # api/, hooks/, screens/, components/
│   │   ├── cart/                 # api/, hooks/, screens/
│   │   ├── categories/           # api/, hooks/, screens/, data/, types/
│   │   ├── chat/                 # api/, hooks/, screens/, components/, types/
│   │   ├── checkout/             # screens/
│   │   ├── home/                 # screens/, components/
│   │   ├── misc/                 # screens/
│   │   ├── notifications/        # hooks/
│   │   ├── onboarding/           # screens/
│   │   ├── orders/               # api/, hooks/, screens/
│   │   ├── payment/              # screens/
│   │   ├── products/             # api/, hooks/, screens/, components/, types/
│   │   ├── profile/              # api/, hooks/, screens/
│   │   ├── reviews/              # api/, hooks/, types/
│   │   ├── support/              # screens/
│   │   └── wishlist/             # api/, hooks/, screens/
│   ├── shared/                   # components/, constants/, hooks/, types/, utils/
│   ├── components/
│   │   └── skeletons/            # 34 skeleton components + useSkeletonAnimation
│   └── provider/                 # AppProvider (QueryClientProvider wrapper)
├── assets/
│   ├── fonts/                    # SpaceMono-Regular.ttf
│   ├── images/                   # Vectorr.png, logo.png, LightLogo.png, BlackLogo.png
│   └── jsonIcons/                # Profile_Avatar.json, Lonely_404.json, empty.json, AI_logo.json
├── android/                      # Generated native Android project (gitignored)
├── ios/                          # Generated native iOS project (gitignored)
├── server/                       # Empty — no local backend
├── app.json                      # Expo configuration
├── app.config.js                 # Dynamic config (injects EXPO_PUBLIC_GROQ_API_KEY)
├── eas.json                      # EAS Build profiles
├── tsconfig.json                 # TypeScript config with @src/* and @/* path aliases
├── package.json                  # Dependencies and scripts
├── package-lock.json             # Lock file (npm)
├── .env.example                  # Environment variable template
└── .gitignore                    # Git ignore rules
```

---

## Backend

**No local backend.** The `server/` directory exists but is empty. All data operations are handled by the **RouteEgypt E-Commerce API**:

- **Base URL:** `https://ecommerce.routemisr.com/api/v1/`
- **Auth:** JWT tokens sent via `token` header on protected endpoints
- **Cart/Wishlist:** Token-authenticated REST endpoints
- **Products/Categories/Brands:** Public read endpoints with pagination, filtering, and search
- **Orders:** Order history endpoint (called without auth in the current code)
- **User Profile:** Profile update and password change endpoints

The app also communicates with the **Groq API** for AI chat features:

- **Endpoint:** `https://api.groq.com/openai/v1/chat/completions`
- **Model:** `llama-3.1-8b-instant`
- **Auth:** Bearer token via `EXPO_PUBLIC_GROQ_API_KEY`

---

## API Endpoints

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/auth/signin` | No | Login with email/password |
| POST | `/api/v1/auth/signup` | No | Register new account |
| POST | `/api/v1/auth/forgotPasswords` | No | Request password reset |
| POST | `/api/v1/auth/verifyResetCode` | No | Verify reset code |
| PUT | `/api/v1/auth/resetPassword` | No | Set new password |

### Products
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/products` | No | List products (supports `page`, `limit`, `category[in]`, `search` params) |
| GET | `/api/v1/products/:id` | No | Get product details |
| GET | `/api/v1/products/:id/reviews` | No | Get product reviews |
| POST | `/api/v1/products/:id/reviews` | Yes | Submit a review |

### Categories & Brands
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/categories` | No | List all categories |
| GET | `/api/v1/categories/:id` | No | Get category details |
| GET | `/api/v1/subcategories` | No | List all subcategories |
| GET | `/api/v1/brands` | No | List all brands |
| GET | `/api/v1/brands/:id` | No | Get brand details |

### Cart
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/cart` | Yes | Get current cart |
| POST | `/api/v1/cart` | Yes | Add product to cart |
| DELETE | `/api/v1/cart/:productId` | Yes | Remove product from cart |
| POST | `/api/v2/orders/:cartId` | Yes | Place cash order (exists in code but not called by checkout) |

### Wishlist
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/wishlist` | Yes | Get wishlist |
| POST | `/api/v1/wishlist` | Yes | Add product to wishlist |
| DELETE | `/api/v1/wishlist/:productId` | Yes | Remove product from wishlist |

### Orders
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/orders/` | No* | Get order history |

> *The orders endpoint is called without an auth token in the current implementation.

### User Profile
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| PUT | `/api/v1/users/changeMyPassword` | Yes | Change password |
| PUT | `/api/v1/users/updateMe` | Yes | Update profile info |
| POST | `/api/v1/users/upload-profile-image` | Yes | Upload profile image (exists but commented out) |

---

## User Roles

The app has a **single customer role**. There are no admin, merchant, or other role distinctions in the mobile app. All authenticated users have the same permissions and see the same screens. There is no role-based route protection or UI differentiation.

---

## Authentication & Security

- **JWT tokens** are stored in `AsyncStorage` under the key `token`
- **User data** is stored as JSON in `AsyncStorage` under the key `user`
- Tokens are sent via the `token` HTTP header on protected API requests
- **Logout** clears all AsyncStorage data
- **No route guards** — all screens (tabs, checkout, orders) are accessible without authentication
- **No token refresh mechanism** — tokens are used until they expire server-side
- **Profile image** is stored locally in AsyncStorage (not uploaded to the server)
- **API keys** (`EXPO_PUBLIC_GROQ_API_KEY`) are exposed in the client bundle via `app.config.js`

---

## Environment Variables

The app uses one environment variable, configured via `.env` (gitignored) and injected through Expo's `EXPO_PUBLIC_` prefix:

```env
EXPO_PUBLIC_GROQ_API_KEY=your_groq_api_key_here
```

> **Note:** `eas.json` also lists `EXPO_PUBLIC_GEMINI_API_KEY` as a build environment variable in each profile, but this variable is **not used anywhere in the application code** — the codebase only reads `EXPO_PUBLIC_GROQ_API_KEY`.

Get a Groq API key at [console.groq.com/keys](https://console.groq.com/keys).

---

## Getting Started

### Prerequisites
- Node.js v16+
- npm
- Expo CLI (`npm install -g @expo/cli`)
- Android Studio (Android) or Xcode (iOS, macOS only)

### Installation

```bash
git clone <repository-url>
cd viva
npm install
cp .env.example .env
```

Edit `.env` and add your Groq API key:
```
EXPO_PUBLIC_GROQ_API_KEY=your_groq_api_key_here
```

### Start Development

```bash
npm start          # Start Expo dev server
npm run android    # Run on Android emulator/device
npm run ios        # Run on iOS simulator (macOS only)
npm run web        # Run in web browser
```

### Build with EAS

```bash
eas build --profile development --platform android
eas build --profile preview --platform android
eas build --profile production --platform android
```

---

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `expo start` | Start the Expo development server |
| `android` | `expo run:android` | Build and run on Android |
| `ios` | `expo run:ios` | Build and run on iOS |
| `web` | `expo start --web` | Start the web development server |

> There are no build, test, lint, or typecheck scripts defined in `package.json`.

---

## Testing

**Not implemented.** There are no test files, no test scripts, and no test framework configured. The `react-test-renderer` package is listed in `devDependencies` but no test suite exists.

---

## Deployment

The project is configured for **EAS Build** with three profiles defined in `eas.json`:

| Profile | Purpose | Environment |
|---------|---------|-------------|
| `development` | Development builds with dev client | Development |
| `preview` | Preview builds for testing | Production |
| `production` | Production builds for release | Production |

> **Note:** All three profiles list `EXPO_PUBLIC_GEMINI_API_KEY` as an environment variable, but this variable is not used in the codebase. Only `EXPO_PUBLIC_GROQ_API_KEY` is required for the AI chat feature.

**Android package:** `com.amr_maher.myapp`
**EAS Project ID:** `2c872e07-01cc-49b7-949b-1e7ae5eda538`

---

## Current Project Status

**Core shopping features are implemented** — product browsing, search, cart management, wishlist, and product reviews all connect to the RouteEgypt API. The AI chat feature is fully functional with Groq integration.

**Checkout and payment are not yet functional** — the checkout screen displays order summary with mock addresses and payment methods, and order placement is simulated with a `setTimeout` delay (no actual API call). The `createCashOrder` API function exists in the codebase but is not wired to the checkout UI.

**Authentication works end-to-end** — registration, login, forgot password, and profile management all connect to the RouteEgypt API and persist the JWT token.

---

## Limitations

### Checkout & Payments
- Order placement is **simulated** (`setTimeout` with a 2-second delay) — no real order is created
- `createCashOrder` API function exists but is **not connected** to the checkout screen
- Addresses and payment methods are **hardcoded mock data** — not persisted or fetched from the server
- Shipping ($9.99) and tax (8%) are **hardcoded constants**, not from the API

### Cart
- Quantity **increment/decrement buttons** are present in the UI but have **no `onPress` handlers** — they are non-functional
- Cart item count display works, but quantity cannot be changed from the client side

### Search
- The **Search tab** filters products client-side from a single page of fetched results (limited to ~20 products)
- The **All Products screen** uses proper server-side search with debounce — this is the more capable search mode

### Brand Detail
- The brand detail screen fetches **all products** and filters client-side by brand ID, rather than using a server-side brand filter
- This means only the first page of products is available for filtering

### Categories Screen
- The categories grid screen (`/categories`) displays category cards but they have **no `onPress` handlers** — tapping them does nothing
- Category navigation works from the Home screen's horizontal category list

### Notifications
- `expo-notifications` handler is configured at the root layout level
- The notifications screen displays **static mock data** — no real push notifications are sent or received
- No push token registration exists

### Profile Image
- Image picker works (camera or library via `expo-image-picker`)
- Selected image is saved to `AsyncStorage` locally
- **Server upload is commented out** — the upload API endpoint exists but is not called

### Guest Mode
- A `guestMode` flag is stored in AsyncStorage on login, but it is **never read** anywhere in the app
- No guest-specific behavior or restricted access exists

### Authentication
- **No route guards** — all screens (tabs, checkout, orders, profile) are accessible without logging in
- No token expiry handling or refresh mechanism
- Social login buttons (Google, Facebook) are rendered on the Login screen but have **no handlers**

### Theme
- `useColorScheme` and `Colors` constants exist in `src/shared/constants/` but are **barely used**
- Almost all screens **hardcode light colors** (white backgrounds, dark text)
- Dark mode is not meaningfully supported despite the configuration existing

### Support Screens
- Help Center, FAQs, and Contact screens contain **static mock content** with `Alert`-based interactions
- No backend integration for support tickets or inquiries

### Orders
- The orders API is called **without an auth token**, which may return incorrect or empty data
- Order display works when data is available

### Brand Detail
- Products are fetched for the first page only and filtered client-side by brand
- Brands with many products will not show all their products

### Other
- The `modal.tsx` screen is a leftover from the Expo Router template
- No offline support beyond React Query's cache
- No analytics, crash reporting, or monitoring
- The `+html.tsx` file configures web-specific root HTML

---

## Future Improvements

### High Priority
- **Wire up checkout** — connect `createCashOrder` to the checkout UI with real address/payment management
- **Cart quantity management** — implement increment/decrement handlers that call the API
- **Route protection** — guard protected screens (tabs, checkout, orders) behind authentication
- **Push notifications** — register device tokens and implement notification delivery

### Medium Priority
- **Payment integration** — replace mock payment UI with a real payment gateway (Stripe, PayPal)
- **Address persistence** — fetch/store addresses from the API instead of hardcoded mocks
- **Category screen navigation** — add `onPress` handlers to category cards
- **Server-side brand filtering** — use API params instead of client-side filtering for brand products
- **Search unification** — align both search screens to use server-side search
- **Order history with auth** — pass the JWT token on the orders endpoint
- **Dark mode** — implement consistent theming across all screens

### Low Priority
- **Offline support** — expand React Query cache with offline mutation queuing
- **Order tracking** — real-time status updates and shipment tracking
- **Testing** — add unit tests (components, hooks, utilities), integration tests (API flows), and E2E tests
- **Analytics** — add usage tracking and crash reporting
- **Profile image upload** — uncomment and verify the server upload endpoint
- **Remove template leftovers** — clean up `modal.tsx`, unused `SearchInput` component, `ConversationItem`/`ChatHeader` components

---

## Development Notes

### Path Aliases
TypeScript path aliases are configured in `tsconfig.json`:
- `@src/*` → `./src/*`
- `@/*` → `./*`

### Fonts
The app loads **SpaceMono-Regular** from `assets/fonts/` via `expo-font`.

### Images & Assets
- Product images, brand logos, and category images come from the RouteEgypt API
- Hero banner and promotional images are hosted on ImageKit (`ik.imagekit.io`)
- Static assets include logos (Vectorr.png, logo.png, LightLogo.png, BlackLogo.png) and Lottie JSON animations (AI_logo.json, Lonely_404.json, empty.json, Profile_Avatar.json)

### Skeleton Components
34 skeleton components are exported from `src/components/skeletons/index.ts` along with a `useSkeletonAnimation` hook that provides a fade-in/fade-out animation using React Native's `Animated` API. These are used throughout the app for loading states on every major screen.

### API Pattern
All API calls use **Axios** directly (no centralized API client). React Query hooks wrap each API function for caching and state management. Mutations invalidate relevant query keys on success.

---

## License

MIT
