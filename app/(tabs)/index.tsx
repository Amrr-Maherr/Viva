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
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16}}>
          <TouchableOpacity style={styles.linkButton} onPress={() => (router.push as any)('/categories')}>
            <Text style={styles.linkText}>Categories</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton} onPress={() => (router.push as any)('/brands')}>
            <Text style={styles.linkText}>Brands</Text>
          </TouchableOpacity>
        </View>
        <SearchInput />
        <CategoryButtons onCategorySelect={setSelectedCategoryId} />
        <ProductsList products={data?.data} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  linkButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  linkText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007aff',
  },
});
