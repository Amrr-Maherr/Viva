import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { categories } from '../data/categories';
import CategoryButton from './CategoryButton';

export default function CategoryButtons() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const buttonsData = ["All", ...categories];
    const renderItem = ({ item }: { item: string }) => (
        <CategoryButton
            item={item}
            selected={selectedCategory === item}
            onPress={() => setSelectedCategory(item)}
        />
    );
    return (
        <View style={styles.container}>
            <FlatList
                data={buttonsData}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item}
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
