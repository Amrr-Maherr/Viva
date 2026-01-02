import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
