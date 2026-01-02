import { Product } from "@/types/product";
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

export default fetchProduct;
