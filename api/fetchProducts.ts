import { ProductsResponse } from "@/types/Products";
import axios from "axios";

const fetchProducts = async (category?: string, searchQuery?: string): Promise<ProductsResponse> => {
    try {
        let url = 'https://ecommerce.routemisr.com/api/v1/products';
        const params: string[] = [];

        if (category && category !== 'all') {
            params.push(`category[in]=${category}`);
        }

        if (searchQuery && searchQuery.trim()) {
            params.push(`search=${encodeURIComponent(searchQuery.trim())}`);
        }

        if (params.length > 0) {
            url += '?' + params.join('&');
        }

        const response = await axios.get(url);
        return response?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default fetchProducts
