import { ProductsResponse } from "@/types/Products";
import axios from "axios";

const fetchProducts = async (category?: string): Promise<ProductsResponse> => {
    try {
        let url = 'https://ecommerce.routemisr.com/api/v1/products';
        if (category && category !== 'all') {
            url += `?category[in]=${category}`;
        }
        const response = await axios.get(url);
        return response?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default fetchProducts
