import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import useFetchCategories from '@/hooks/useFetchCategories';
import Loader from '@/components/Loader';
import ErrorView from '@/components/ErrorView';

const { width } = Dimensions.get('window');
const itemWidth = (width - 32) / 2 - 8; // 2 columns with padding

export default function CategoriesScreen() {
    const { data, isLoading, isError, refetch } = useFetchCategories();
    const router = useRouter();

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <ErrorView onRefetch={refetch} />;
    }

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => router.push({ pathname: '/(tabs)/index', params: { category: item._id } })}
        >
            <Image source={{ uri: item.image }} style={styles.categoryImage} />
            <Text style={styles.categoryName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Categories</Text>
            <FlatList
                data={data?.data}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                numColumns={2}
                contentContainerStyle={styles.grid}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f7',
        paddingTop: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        color: '#1A1A1A',
    },
    grid: {
        paddingHorizontal: 16,
    },
    categoryCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        margin: 8,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: itemWidth,
    },
    categoryImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 12,
    },
    categoryName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A1A1A',
        textAlign: 'center',
    },
});
