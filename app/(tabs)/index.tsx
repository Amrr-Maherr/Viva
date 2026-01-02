import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useFetchProducts from "@/hooks/useFetchProducts";
import SearchInput from "@/components/SearchInput";

export default function HomeScreen() {
  // const { error, data, isLoading, isError, refetch } = useFetchProducts();
  // console.log(data);

  return (
    <>
      <View style={{flex:1,paddingHorizontal:20,backgroundColor:"#fff"}}>
        <SearchInput />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
