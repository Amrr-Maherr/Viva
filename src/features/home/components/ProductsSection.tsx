import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import FeaturedProducts from "@src/features/products/components/FeaturedProducts";
import ProductsList from "@src/features/products/components/ProductsList";
import SectionTitle from "@src/shared/components/SectionTitle";
import BannerAd from "@src/features/home/components/BannerAd";
import { Product } from "@src/features/products/types/Product";

interface ProductsSectionProps {
  products: Product[];
}

const bannerSource1 = {
  uri: "https://ik.imagekit.io/pieg1rcfk/Viva%20Assests/Gemini_Generated_Image_77eo7777eo7777eo.png",
};
const bannerSource2 = {
  uri: "https://ik.imagekit.io/pieg1rcfk/Viva%20Assests/Gemini_Generated_Image_ulbru1ulbru1ulbr.png",
};

function ProductsSection({ products }: ProductsSectionProps) {
  if (!products.length) return null;

  return (
    <View>
      <FeaturedProducts products={products.slice(0, 1)} title="Today's Special" />
      <View style={styles.sectionPadding}>
        <SectionTitle title="New Arrivals" />
        <ProductsList products={products.slice(0, 5)} />
      </View>
      <BannerAd source={bannerSource1} />
      <View style={styles.sectionPadding}>
        <SectionTitle title="Best Sellers" />
        <ProductsList products={products.slice(5, 10)} />
      </View>
      <BannerAd source={bannerSource2} />
      <FeaturedProducts products={products.slice(1, 2)} title="Hot Deal" />
      <View style={styles.sectionPadding}>
        <View style={styles.sectionHeader}>
          <SectionTitle title="Recommended Products" />
          <TouchableOpacity onPress={() => router.push("/all-products")}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <ProductsList products={products.slice(10, 15)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionPadding: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  seeAllText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
});

export default React.memo(ProductsSection);
