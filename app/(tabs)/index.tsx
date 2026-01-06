import React, { useState, useCallback } from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import useFetchProducts from "@/queries/useFetchProducts";
import SearchInput from "@/components/SearchInput";
import CategoryButtons from "@/components/CategoryButtons";
import ProductsList from "@/components/ProductsList";
import Loader from "@/components/Loader";
import ErrorView from "@/components/ErrorView";
import EmptyState from "@/components/EmptyState";

export default function HomeScreen() {
  const { category } = useLocalSearchParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState(category as string || "all");
  const { data, isLoading, isError, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = useFetchProducts(selectedCategoryId);

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

  const allProducts = data?.pages.flatMap(page => page.data) || [];

  if (allProducts.length === 0 && !isLoading && !isFetchingNextPage) {
    return (
      <View style={{flex:1,backgroundColor:"#fff",paddingHorizontal:20}}>
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
    <View style={{flex:1,backgroundColor:"#fff",paddingHorizontal:20}}>
      {/* <SearchInput /> */}
      <CategoryButtons onCategorySelect={setSelectedCategoryId} />
      <ProductsList
        products={allProducts}
        onLoadMore={loadMore}
        isLoadingMore={isFetchingNextPage}
        onRefresh={onRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  navigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  navButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  navText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007aff',
  },
});
