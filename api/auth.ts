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
