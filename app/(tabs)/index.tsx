import React, { useState, useCallback } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import useFetchProducts from "@/queries/useFetchProducts";
import SearchInput from "@/components/SearchInput";
import CategoryButtons from "@/components/CategoryButtons";
import ProductsList from "@/components/ProductsList";
import Loader from "@/components/Loader";
import ErrorView from "@/components/ErrorView";

export default function HomeScreen() {
  const { category } = useLocalSearchParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState(category as string || "all");
  const [refreshing, setRefreshing] = useState(false);
  const { data, isLoading, isError, refetch } = useFetchProducts(selectedCategoryId);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorView onRefetch={refetch} />;
  }

  return (
    <View style={{flex:1,backgroundColor:"#fff",paddingHorizontal:20}}>
      {/* <SearchInput /> */}
      <CategoryButtons onCategorySelect={setSelectedCategoryId} />
      <ProductsList products={data?.data} refreshing={refreshing} onRefresh={onRefresh} />
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
