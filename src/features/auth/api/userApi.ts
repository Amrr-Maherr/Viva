import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const changeMyPassword = async (currentPassword: string, password: string, rePassword: string) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.put('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword', {
            currentPassword,
            password,
            rePassword
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

export const updateMe = async (name: string, email: string, phone: string) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.put('https://ecommerce.routemisr.com/api/v1/users/updateMe/', {
            name,
            email,
            phone
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
