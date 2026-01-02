import { CategoriesResponse } from "@/types/Categories";
import axios from "axios";

const fetchCategories = async (): Promise<CategoriesResponse> => {
    try {
        const response = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
        return response?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default fetchCategories;
