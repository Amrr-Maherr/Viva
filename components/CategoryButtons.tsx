import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import CategoryButton from './CategoryButton';
import useFetchCategories from '../hooks/useFetchCategories';
import { Category } from '../types/Categories';

interface CategoryButtonsProps {
    onCategorySelect: (id: string) => void;
}

export default function CategoryButtons({ onCategorySelect }: CategoryButtonsProps) {
    const [selectedId, setSelectedId] = useState("all");
    const { data: categoriesData } = useFetchCategories();
    const buttonsData = categoriesData ? [{ id: "all", name: "All" }, ...categoriesData.data.map((cat: Category) => ({ id: cat._id, name: cat.name }))] : [];
    const renderItem = ({ item }: { item: { id: string; name: string } }) => (
        <CategoryButton
            item={item.name}
            selected={selectedId === item.id}
            onPress={() => {
                setSelectedId(item.id);
                onCategorySelect(item.id);
            }}
        />
    );
    return (
        <View style={styles.container}>
            <FlatList
                data={buttonsData}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    listContainer: {
    },
});
