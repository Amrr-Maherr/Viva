import axios from "axios";

const fetchCategories = async () => {
    try {
        const response = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
        return response?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const fetchCategory = async (id: string) => {
    try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
        return response?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default fetchCategories;
