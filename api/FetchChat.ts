
import axios from "axios";
import { GeminiResponse } from '@/types/RequsetType';

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

const FetchChat = async (chatMessage: string): Promise<GeminiResponse | { error: string } | null> => {
    if (!API_KEY) {
        console.error('Gemini API key is not set. Please set EXPO_PUBLIC_GEMINI_API_KEY in your environment variables.');
        return { error: 'API key not configured. Please contact the administrator.' };
    }

    try {
        const requestBody = {
            "contents": [{
                "role": "user",
                "parts": [
                    {
                        "text": "You are Viva, a highly intelligent and friendly AI assistant for the Viva e-commerce app. You know everything about the app and the shopping experience: products, categories, prices, discounts, promotions, offers, payment methods, shipping options, delivery times, return policies, order tracking, and customer support.\n\nYour role is to help users browse products, compare items, check availability, suggest best deals, provide shopping tips, recommend related or similar products, and answer questions about the app, payments, or delivery. Always provide accurate and up-to-date information.\n\nSpeak clearly and simply in English or Arabic. Be polite, professional, concise, and friendly. Make the user feel guided and supported throughout their shopping experience.\n\nUser message: " + chatMessage
                    }
                ]
            }]
        };

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
            requestBody,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 30000, // 30 second timeout
            }
        );

        console.log('Server response:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching chat:', error);

        // More detailed error logging
        if (error.response) {
            console.error('Response error:', error.response.status, error.response.data);
            if (error.response.status === 429) {
                return { error: 'Rate limit exceeded. Please try again later.' };
            } else if (error.response.status === 400) {
                return { error: 'Bad request. Please check your input.' };
            } else if (error.response.status === 401) {
                return { error: 'Unauthorized. Please check your API key.' };
            } else if (error.response.status === 403) {
                return { error: 'Access forbidden. Please check your API key permissions.' };
            } else if (error.response.status >= 500) {
                return { error: 'Server error. Please try again later.' };
            }
        } else if (error.request) {
            console.error('Request error:', error.request);
            return { error: 'Network error. Please check your connection.' };
        } else {
            console.error('General error:', error.message);
        }

        return { error: 'Failed to fetch response. Please try again.' };
    }
}

export default FetchChat
