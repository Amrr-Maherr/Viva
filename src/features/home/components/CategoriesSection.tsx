import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import CategoryButton from "@src/features/categories/components/CategoryButton";
import { Category } from "@src/features/categories/types/Category";

interface CategoriesSectionProps {
  categories: Category[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const allItem = { _id: "all", name: "All", slug: "", image: "" } as Category;

function CategoriesSection({ categories, selectedId, onSelect }: CategoriesSectionProps) {
  const items = [allItem, ...categories];

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <CategoryButton
            item={item.name}
            selected={selectedId === item._id}
            onPress={() => onSelect(item._id)}
          />
        )}
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
    gap: 8,
  },
});

export default React.memo(CategoriesSection);
