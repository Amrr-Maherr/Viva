import BannerAd from "@/components/BannerAd";
import CategoryButtons from "@/components/CategoryButtons";
import EmptyState from "@/components/EmptyState";
import ErrorView from "@/components/ErrorView";
import FeaturedProducts from "@/components/FeaturedProducts";
import HeroSection from "@/components/HeroSection";
import Loader from "@/components/Loader";
import ProductsList from "@/components/ProductsList";
import SectionTitle from "@/components/SectionTitle";
import useFetchProducts from "@/queries/useFetchProducts";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const { category } = useLocalSearchParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    (category as string) || "all"
  );
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchProducts(selectedCategoryId);

  const onRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorView onRefetch={refetch} />;
  }

  const allProducts = data?.pages.flatMap((page) => page.data) || [];

  if (allProducts.length === 0 && !isLoading && !isFetchingNextPage) {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 }}>
        {/* <SearchInput /> */}
        <CategoryButtons onCategorySelect={setSelectedCategoryId} />
        <EmptyState
          title="No products found"
          subtitle="Try selecting a different category"
          icon="shopping-outline"
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={onRefresh} />
      }
    >
      <HeroSection />
      <FeaturedProducts products={allProducts.slice(0, 1)} title="Today's Special" />
      <View style={{ paddingHorizontal: 20 }}>
        <SectionTitle title="New Arrivals" />
        <ProductsList
          products={allProducts.slice(0, 5)}
          onLoadMore={loadMore}
          isLoadingMore={isFetchingNextPage}
        />
      </View>
      <BannerAd
        source={require("../../assets/images/Gemini_Generated_Image_77eo7777eo7777eo.png")}
      />
      <View style={{ paddingHorizontal: 20 }}>
        <SectionTitle title="Best Sellers" />
        <ProductsList
          products={allProducts.slice(5, 10)}
          onLoadMore={loadMore}
          isLoadingMore={isFetchingNextPage}
        />
      </View>
      <BannerAd
        source={require("../../assets/images/Gemini_Generated_Image_ulbru1ulbru1ulbr.png")}
      />
      <FeaturedProducts products={allProducts.slice(1, 2)} title="Hot Deal" />
      <View style={{ paddingHorizontal: 20 }}>
        <SectionTitle title="Recommended Products" />
        <ProductsList
          products={allProducts.slice(10, 15)}
          onLoadMore={loadMore}
          isLoadingMore={isFetchingNextPage}
        />
      </View>
      {/* </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  navigationRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  navButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    alignItems: "center",
  },
  navText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007aff",
  },
});
