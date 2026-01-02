import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const addToWishlist = async (productId: string) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
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

export const removeFromWishlist = async (productId: string) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
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

export const getWishlist = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
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
