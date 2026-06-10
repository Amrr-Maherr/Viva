import React from "react";
import { FlatList, Image, Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { Brand } from "@src/features/home/types/HomeResponse";

interface BrandsSectionProps {
  brands: Brand[];
  onSelect?: (brand: Brand) => void;
}

function BrandItem({ brand }: { brand: Brand }) {
  return (
    <TouchableOpacity style={styles.brandCard}>
      <Image source={{ uri: brand.image }} style={styles.brandImage} />
      <Text style={styles.brandName} numberOfLines={1}>
        {brand.name}
      </Text>
    </TouchableOpacity>
  );
}

const BrandItemMemo = React.memo(BrandItem);

function BrandsSection({ brands }: BrandsSectionProps) {
  if (!brands.length) return null;

  return (
    <View style={styles.container}>
      <FlatList
        data={brands}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <BrandItemMemo brand={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  list: {
    paddingHorizontal: 20,
    gap: 12,
  },
  brandCard: {
    alignItems: "center",
    width: 80,
  },
  brandImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f0f0f0",
  },
  brandName: {
    marginTop: 6,
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
});

export default React.memo(BrandsSection);
