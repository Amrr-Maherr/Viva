# Viva - E-Commerce Mobile App

A comprehensive e-commerce mobile application built with React Native and Expo, offering a seamless shopping experience with advanced features and modern UI/UX design.

## Features

### Authentication
- **User Registration**: Register with name, email, password, confirm password, and phone
- **User Login**: Login with email and password
- **Password Reset**: Forgot password flow with email verification and reset
- **Profile Management**: View and edit user profile (name, email, phone)
- **Logout**: Secure logout with token removal
- **Persistence**: Automatic login if token exists

### Product Browsing
- **Home Screen**: Featured products and categories
- **Search**: Search for products
- **Categories**: Browse products by categories
- **Brands**: Browse products by brands
- **Product Details**: Detailed view with images, specs, and actions

### Cart Management
- **Add to Cart**: Add products to cart from product cards or details
- **View Cart**: Display cart items with quantities and total price
- **Remove from Cart**: Remove items from cart
- **Cart Persistence**: Cart data synced with server

### Wishlist (Favorites)
- **Add to Wishlist**: Favorite products from cards or details
- **View Wishlist**: Display favorite items
- **Remove from Wishlist**: Unfavorite items
- **Add to Cart from Wishlist**: Quick add to cart

### User Interface
- **Tab Navigation**: Bottom tabs for Home, Search, Cart, Favorites, Profile
- **Active Tab Styling**: Black active tab icons
- **Loaders**: Loading indicators on buttons and icons during operations
- **Toast Notifications**: Success and error toasts instead of alerts
- **Responsive Design**: Optimized for mobile screens
- **Pull-to-Refresh**: Refresh functionality across all screens for real-time data updates

### Technical Features
- **API Integration**: RESTful API calls with Axios
- **State Management**: React Query for server state
- **Local Storage**: AsyncStorage for token and user data
- **Navigation**: Expo Router for file-based routing
- **Icons**: Ionicons for UI elements
- **Forms**: React Hook Form for form handling
- **Validation**: Form validation with error messages

### API Endpoints Used
- Authentication: login, register, forgot password, verify code, reset password
- Users: update profile, change password
- Products: fetch products, product details, categories, brands
- Cart: add to cart, get cart, remove from cart
- Wishlist: add to wishlist, get wishlist, remove from wishlist

## Technologies Used
- **React Native**: Mobile app framework
- **Expo**: Development platform
- **TypeScript**: Type-safe JavaScript
- **React Query**: Data fetching and caching
- **Expo Router**: Navigation
- **AsyncStorage**: Local storage
- **Axios**: HTTP client
- **React Hot Toast**: Notifications (web version adapted)
- **React Hook Form**: Form management

## Screenshots

### Home Screen
- Product browsing with category selection
- Pull-to-refresh functionality for real-time updates

### Shopping Experience
- Detailed product pages with image galleries
- Add to cart and wishlist functionality
- Seamless navigation between screens

### User Management
- Complete authentication flow
- Profile management and order history
- Secure data persistence

## What's New (Latest Updates)

### v1.1.0 - Enhanced User Experience
- **Pull-to-Refresh**: Added refresh functionality to Cart and Favorites screens for real-time data updates
- **Improved Architecture**: Separated React Query hooks into dedicated `queries/` folder for better code organization
- **UI Enhancements**: Better loading states and user feedback across all screens

### v1.0.0 - Initial Release
- Complete e-commerce functionality with authentication, product browsing, cart, and wishlist
- Modern React Native architecture with TypeScript
- Responsive design optimized for mobile devices

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## Usage

1. Register or login to access the app
2. Browse products on the home screen
3. Use search and filters to find products
4. Add products to cart or wishlist
5. Manage cart and favorites from respective tabs
6. Update profile information

## Project Structure

```
app/
  _layout.tsx          # Root layout with navigation and providers
  (tabs)/              # Tab screens
    _layout.tsx        # Tab navigation setup
    index.tsx          # Home screen with products
    search.tsx         # Search screen
    cart.tsx           # Cart screen with pull-to-refresh
    favorites.tsx      # Favorites screen with pull-to-refresh
    profile.tsx        # Profile screen
  login.tsx            # Authentication screens
  register.tsx
  edit-profile.tsx
  forgot-password.tsx
  verify-reset-code.tsx
  reset-password.tsx
  product/[id].tsx     # Product details screen
  brands.tsx           # Brand listing screen
  categories.tsx       # Category listing screen

api/
  auth.ts              # Authentication API functions
  users.ts             # User management APIs
  cart.ts              # Shopping cart operations
  wishlist.ts          # Wishlist/favorites operations
  fetchProducts.ts     # Product data fetching
  fetchCategories.ts   # Categories data
  fetchBrands.ts       # Brands data

queries/
  useFetchProducts.ts  # React Query hooks for products
  useFetchCart.ts      # Cart data hooks
  useFetchWishlist.ts  # Wishlist data hooks
  useFetchCategories.ts # Categories hooks
  useFetchBrands.ts    # Brands hooks
  useFetchOrders.ts    # Orders hooks

components/
  ProductCard.tsx      # Product display component
  ProductImageGallery.tsx # Image carousel component
  CategoryButtons.tsx  # Category selection buttons
  EmptyState.tsx       # Empty state component
  Loader.tsx           # Loading indicators
  ErrorView.tsx        # Error display with retry
  StyledText.tsx       # Custom text component

provider/
  Provider.tsx         # React Query provider setup

constants/
  Colors.ts            # App color palette

types/
  product.ts           # Product type definitions
  Products.ts          # Products API types
  Categories.ts        # Category types

utils/
  toast.ts             # Toast notification utilities
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
