import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import useFetchOrders from '@/queries/useFetchOrders';
import Loader from '@/components/Loader';
import ErrorView from '@/components/ErrorView';
import EmptyCardScreen from '@/components/EmptyCart';

export default function MyOrdersScreen() {
    const { data, isLoading, isError, refetch } = useFetchOrders();

    console.log('Orders data:', data);
    console.log('Loading:', isLoading);
    console.log('Error:', isError);

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <ErrorView onRefetch={refetch} />;
    }

    const renderOrder = ({ item }: { item: any }) => (
        <View style={styles.orderCard}>
            <Text style={styles.orderId}>Order #{item.id}</Text>
            <Text style={styles.totalPrice}>Total: ${item.totalOrderPrice}</Text>
            <Text style={styles.status}>
                {item.isPaid ? 'Paid' : 'Unpaid'} • {item.isDelivered ? 'Delivered' : 'Not Delivered'}
            </Text>
            <Text style={styles.date}>Created: {new Date(item.createdAt).toLocaleDateString()}</Text>
            <Text style={styles.itemsTitle}>Items:</Text>
            {item.cartItems.map((cartItem: any, index: number) => (
                <View key={index} style={styles.itemRow}>
                    <Image source={{ uri: cartItem.product.imageCover }} style={styles.itemImage} />
                    <View style={styles.itemDetails}>
                        <Text style={styles.itemTitle}>{cartItem.product.title}</Text>
                        <Text style={styles.itemPrice}>${cartItem.price} x {cartItem.count}</Text>
                    </View>
                </View>
            ))}
        </View>
    );

    if (!data || data.length === 0) {
        return (
            <EmptyCardScreen/>
        );
    }

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>My Orders</Text> */}
            <FlatList
                data={data}
                renderItem={renderOrder}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f7',
        paddingTop: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        color: '#1A1A1A',
    },
    list: {
        paddingHorizontal: 16,
    },
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    orderId: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 8,
    },
    totalPrice: {
        fontSize: 16,
        color: '#1A1A1A',
        marginBottom: 4,
    },
    status: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    date: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    itemsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 8,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 12,
    },
    itemDetails: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 14,
        color: '#1A1A1A',
        marginBottom: 2,
    },
    itemPrice: {
        fontSize: 14,
        color: '#666',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});
