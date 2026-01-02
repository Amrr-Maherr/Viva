import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useFetchProducts from "@/hooks/useFetchProducts";
import SearchInput from "@/components/SearchInput";
import CategoryButtons from "@/components/CategoryButtons";
import ProductsList from "@/components/ProductsList";
import Loader from "@/components/Loader";
import ErrorView from "@/components/ErrorView";

export default function HomeScreen() {
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");
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
        <CategoryButtons onCategorySelect={setSelectedCategoryId} />
        <ProductsList products={data?.data} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
