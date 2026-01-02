import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useFetchProducts from "@/hooks/useFetchProducts";
import SearchInput from "@/components/SearchInput";
import CategoryButtons from "@/components/CategoryButtons";
import ProductsList from "@/components/ProductsList";

export default function HomeScreen() {
  const { data } = useFetchProducts();

  return (
    <>
      <View style={{flex:1,paddingHorizontal:20,backgroundColor:"#fff"}}>
        <SearchInput />
        <CategoryButtons/>
        <ProductsList products={data?.data} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
