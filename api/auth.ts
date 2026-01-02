import axios from "axios";

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', {
            email,
            password
        });
        return response?.data;
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
