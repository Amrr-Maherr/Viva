import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', {
            email,
            password
        });
        const data = response?.data;
        if (data?.token) {
            await AsyncStorage.setItem('token', data.token);
            await AsyncStorage.setItem('user', JSON.stringify(data.user));
        }
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const signup = async (name: string, email: string, password: string, rePassword: string, phone: string) => {
    try {
        const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', {
            name,
            email,
            password,
            rePassword,
            phone
        });
        return response?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const forgotPassword = async (email: string) => {
    try {
        const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {
            email
        });
        return response?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const verifyResetCode = async (resetCode: string) => {
    try {
        const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
            resetCode
        });
        return response?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const resetPassword = async (email: string, newPassword: string) => {
    try {
        const response = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
            email,
            newPassword
        });
        return response?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
