import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from 'expo-router';
import useFetchProducts from "@/hooks/useFetchProducts";
import SearchInput from "@/components/SearchInput";
import CategoryButtons from "@/components/CategoryButtons";
import ProductsList from "@/components/ProductsList";
import Loader from "@/components/Loader";
import ErrorView from "@/components/ErrorView";

export default function HomeScreen() {
  const { category } = useLocalSearchParams();
  const router = useRouter();
  const [selectedCategoryId, setSelectedCategoryId] = useState(category as string || "all");
  const { data, isLoading, isError, refetch } = useFetchProducts(selectedCategoryId);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorView onRefetch={refetch} />;
  }

  return (
    <>
      <View style={{flex:1,paddingHorizontal:20,backgroundColor:"#fff"}}>
        <SearchInput />
        <View style={styles.navigationRow}>
          <TouchableOpacity style={styles.navButton} onPress={() => (router.push as any)('/categories')}>
            <Text style={styles.navText}>Categories</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => (router.push as any)('/brands')}>
            <Text style={styles.navText}>Brands</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => (router.push as any)('/my-orders')}>
            <Text style={styles.navText}>Orders</Text>
          </TouchableOpacity>
        </View>
        <CategoryButtons onCategorySelect={setSelectedCategoryId} />
        <ProductsList products={data?.data} />
      </View>
    </>
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
