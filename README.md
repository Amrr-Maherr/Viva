# E-Commerce App

A full-featured e-commerce mobile application built with React Native, Expo, and React Query.

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
  _layout.tsx          # Root layout with navigation
  (tabs)/              # Tab screens
    _layout.tsx        # Tab navigation
    index.tsx          # Home screen
    search.tsx         # Search screen
    cart.tsx           # Cart screen
    favorites.tsx      # Favorites screen
    profile.tsx        # Profile screen
  login.tsx            # Login screen
  register.tsx         # Register screen
  edit-profile.tsx     # Edit profile screen
  forgot-password.tsx  # Forgot password screen
  verify-reset-code.tsx # Verify reset code screen
  reset-password.tsx   # Reset password screen
  product/[id].tsx     # Product details screen

api/
  auth.ts              # Authentication APIs
  users.ts             # User management APIs
  cart.ts              # Cart APIs
  wishlist.ts          # Wishlist APIs
  fetchProducts.ts     # Product fetching APIs

components/
  ProductCard.tsx      # Product card component
  Loader.tsx           # Loading component
  ErrorView.tsx        # Error display component

hooks/
  useFetch*.ts         # Custom hooks for data fetching

constants/
  Colors.ts            # Color constants

types/
  product.ts           # TypeScript types
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
