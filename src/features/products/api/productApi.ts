import { Product } from "@src/features/products/types/Product";
import { ProductsResponse } from "@src/features/products/types/Product";
import axios from "axios";

const fetchProduct = async (id: string): Promise<Product> => {
    try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
        return response?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const fetchProducts = async (category?: string, searchQuery?: string, page: number = 1, limit: number = 20): Promise<ProductsResponse> => {
    try {
        let url = 'https://ecommerce.routemisr.com/api/v1/products';
        const params: string[] = [];

        params.push(`page=${page}`);
        params.push(`limit=${limit}`);

        if (category && category !== 'all') {
            params.push(`category[in]=${category}`);
        }

        if (searchQuery && searchQuery.trim()) {
            params.push(`search=${encodeURIComponent(searchQuery.trim())}`);
        }

        url += '?' + params.join('&');

        const response = await axios.get(url);
        return response?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default fetchProducts;
export { fetchProduct };
