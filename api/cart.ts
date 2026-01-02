import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const addToCart = async (productId: string) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
            productId
        }, {
            headers: {
                token
            }
        });
        return response?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getCart = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
            headers: {
                token
            }
        });
        return response?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const useAddToCartMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addToCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
};
