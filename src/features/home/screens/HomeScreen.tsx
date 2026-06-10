import React, { useState, useCallback } from "react";
import { View, RefreshControl, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { router } from "expo-router";
import useHome from "@src/features/home/hooks/useHome";
import HomeHeader from "@src/features/home/components/HomeHeader";
import HomeBanner from "@src/features/home/components/HomeBanner";
import CategoriesSection from "@src/features/home/components/CategoriesSection";
import BrandsSection from "@src/features/home/components/BrandsSection";
import ProductsSection from "@src/features/home/components/ProductsSection";
import Loader from "@src/shared/components/Loader";
import ErrorView from "@src/shared/components/ErrorView";

export default function HomeScreen() {
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");
  const { data, isLoading, isError, refetch } = useHome(selectedCategoryId);

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorView onRefetch={refetch as () => void} />;
  }

  const products = data?.products ?? [];
  const categories = data?.categories ?? [];
  const brands = data?.brands ?? [];

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
      >
        <HomeHeader />
        <HomeBanner />
        <CategoriesSection
          categories={categories}
          selectedId={selectedCategoryId}
          onSelect={setSelectedCategoryId}
        />
        <BrandsSection brands={brands} />
        <ProductsSection products={products} />
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/chat")}
      >
        <LottieView
          source={require("../../../../assets/jsonIcons/AI_logo.json")}
          autoPlay
          loop
          style={styles.aiLogo}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    borderRadius: 30,
    zIndex: 999,
  },
  aiLogo: {
    width: 100,
    height: 100,
  },
});
