import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAddToCartMutation } from "@src/features/cart/api/cartApi";
import { useAddToWishlistMutation, useRemoveFromWishlistMutation } from "@src/features/wishlist/api/wishlistApi";
import { showToast } from "@src/shared/utils/toast";
import { Product } from "@src/features/products/types/Product";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const addToCartMutation = useAddToCartMutation();
  const addToWishlistMutation = useAddToWishlistMutation();
  const removeFromWishlistMutation = useRemoveFromWishlistMutation();
  const [isFavorite, setIsFavorite] = React.useState(false);

  const isWishlistLoading = addToWishlistMutation.isPending || removeFromWishlistMutation.isPending;
  const isCartLoading = addToCartMutation.isPending;

  const hasDiscount = !!product.priceAfterDiscount && product.priceAfterDiscount < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.priceAfterDiscount!) / product.price) * 100)
    : 0;

  const handleAddToCart = async () => {
    try {
      await addToCartMutation.mutateAsync(product._id);
      showToast("success", "Added to cart!");
    } catch (error: any) {
      showToast("error", error?.response?.data?.message || "Failed to add to cart");
    }
  };

  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        await removeFromWishlistMutation.mutateAsync(product._id);
        showToast("info", "Removed from wishlist");
      } else {
        await addToWishlistMutation.mutateAsync(product._id);
        showToast("success", "Added to wishlist");
      }
      setIsFavorite(!isFavorite);
    } catch (error: any) {
      showToast("error", error?.response?.data?.message || "Failed to update wishlist");
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => router.push({ pathname: "/product/[id]", params: { id: product._id } })}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.imageCover }} style={styles.image} />
        {hasDiscount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{discountPercent}%</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={handleToggleFavorite}
          disabled={isWishlistLoading}
        >
          {isWishlistLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={18}
              color={isFavorite ? "#ff3b30" : "#fff"}
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {product.brand?.name && (
          <Text style={styles.brand} numberOfLines={1}>
            {product.brand.name}
          </Text>
        )}
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>

        {product.ratingsAverage > 0 && (
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color="#FFC107" />
            <Text style={styles.ratingText}>{product.ratingsAverage}</Text>
            <Text style={styles.ratingCount}>({product.ratingsQuantity})</Text>
          </View>
        )}

        <View style={styles.bottomRow}>
          <View style={styles.priceCol}>
            <Text style={styles.currentPrice}>
              ${product.priceAfterDiscount ?? product.price}
            </Text>
            {hasDiscount && (
              <View style={styles.oldPriceRow}>
                <Text style={styles.oldPrice}>${product.price}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
            disabled={isCartLoading}
          >
            {isCartLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Ionicons name="bag-outline" size={18} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  imageContainer: {
    position: "relative",
    aspectRatio: 1,
    backgroundColor: "#f8f8f8",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#ff3b30",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  discountText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  wishlistButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 12,
    gap: 4,
  },
  brand: {
    fontSize: 11,
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    lineHeight: 18,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
  },
  ratingCount: {
    fontSize: 11,
    color: "#999",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
  priceCol: {
    flex: 1,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  oldPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  oldPrice: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
  },
  addToCartButton: {
    backgroundColor: "#1A1A1A",
    borderRadius: 8,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default React.memo(ProductCard);
