import axios from "axios";

export const changeMyPassword = async (currentPassword: string, password: string, rePassword: string) => {
    try {
        const response = await axios.put('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword', {
            currentPassword,
            password,
            rePassword
        });
        return response?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateMe = async (name: string, email: string, phone: string) => {
    try {
        const response = await axios.put('https://ecommerce.routemisr.com/api/v1/users/updateMe/', {
            name,
            email,
            phone
        });
        return response?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
