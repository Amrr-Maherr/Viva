import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Review, ReviewsResponse } from '../types/Review';

export const fetchProductReviews = async (productId: string, page: number = 1): Promise<ReviewsResponse> => {
    try {
        const response = await axios.get(
            `https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`,
            { params: { page, limit: 20 } }
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const createReview = async (productId: string, review: string, rating: number): Promise<Review> => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.post(
            `https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`,
            { review, rating },
            { headers: { token } }
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
