import BannerAd from "@src/features/home/components/BannerAd";
import CategoryButtons from "@src/features/categories/components/CategoryButtons";
import EmptyState from "@src/shared/components/EmptyState";
import ErrorView from "@src/shared/components/ErrorView";
import FeaturedProducts from "@src/features/products/components/FeaturedProducts";
import HeroSection from "@src/features/home/components/HeroSection";
import HomeScreenSkeleton from "@src/components/skeletons/HomeScreenSkeleton";
import ProductsList from "@src/features/products/components/ProductsList";
import SectionTitle from "@src/shared/components/SectionTitle";
import useFetchProducts from "@src/features/products/hooks/useProducts";
import useFetchBrands from "@src/features/brands/hooks/useBrands";
import useFetchCategories from "@src/features/categories/hooks/useCategories";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';

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

  const { data: brandsData } = useFetchBrands();
  const { data: categoriesData } = useFetchCategories();

  const brands = brandsData?.data || [];
  const categories = categoriesData?.data || [];

  const onRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return <HomeScreenSkeleton />;
  }

  if (isError) {
    return <ErrorView onRefetch={refetch} />;
  }

  const allProducts = data?.pages.flatMap((page) => page.data) || [];

  if (allProducts.length === 0 && !isLoading && !isFetchingNextPage) {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 }}>
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
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={{ flex: 1 }}
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

        {/* Brands Section */}
        <View style={styles.sectionWrapper}>
          <View style={styles.sectionHeader}>
            <SectionTitle title="Shop by Brand" />
            <TouchableOpacity onPress={() => router.push('/brands')}>
              <Text style={styles.seeAllText}>See All Brands</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={brands}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.brandCard}
                onPress={() => router.push({ pathname: '/', params: { brand: item._id } })}
                activeOpacity={0.7}
              >
                <Image source={{ uri: item.image }} style={styles.brandImage} resizeMode="contain" />
                <Text style={styles.brandName} numberOfLines={1}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        <BannerAd
          source={{uri: "https://ik.imagekit.io/pieg1rcfk/Viva%20Assests/Gemini_Generated_Image_77eo7777eo7777eo.png"}}
        />
        <View style={{ paddingHorizontal: 20 }}>
          <SectionTitle title="Best Sellers" />
          <ProductsList
            products={allProducts.slice(5, 10)}
            onLoadMore={loadMore}
            isLoadingMore={isFetchingNextPage}
          />
        </View>

        {/* Categories Section */}
        <View style={styles.sectionWrapper}>
          <View style={styles.sectionHeader}>
            <SectionTitle title="Shop by Category" />
            <TouchableOpacity onPress={() => router.push('/categories')}>
              <Text style={styles.seeAllText}>See All Categories</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={categories}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.categoryCard}
                onPress={() => router.push({ pathname: '/', params: { category: item._id } })}
                activeOpacity={0.7}
              >
                <Image source={{ uri: item.image }} style={styles.categoryImage} resizeMode="contain" />
                <Text style={styles.categoryName} numberOfLines={1}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        <BannerAd
          source={{uri: "https://ik.imagekit.io/pieg1rcfk/Viva%20Assests/Gemini_Generated_Image_ulbru1ulbru1ulbr.png"}}
        />
        <FeaturedProducts products={allProducts.slice(1, 2)} title="Hot Deal" />
        <View style={{ paddingHorizontal: 20 }}>
          <View style={styles.sectionHeader}>
            <SectionTitle title="Recommended Products" />
            <TouchableOpacity onPress={() => router.push('/all-products')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ProductsList
            products={allProducts.slice(10, 15)}
            onLoadMore={loadMore}
            isLoadingMore={isFetchingNextPage}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/chat')}
      >
        <LottieView
          source={require('../../../../assets/jsonIcons/AI_logo.json')}
          autoPlay
          loop
          style={styles.aiLogo}
        />
      </TouchableOpacity>
    </View>
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  seeAllText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  sectionWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  horizontalList: {
    gap: 12,
  },
  brandCard: {
    width: 120,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  brandImage: {
    width: 80,
    height: 60,
    marginBottom: 8,
  },
  brandName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  categoryCard: {
    width: 130,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryImage: {
    width: 80,
    height: 60,
    marginBottom: 8,
    borderRadius: 8,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
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
