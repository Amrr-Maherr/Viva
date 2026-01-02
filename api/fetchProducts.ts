import { ProductsResponse } from "@/types/Products";
import axios from "axios";

const fetchProducts = async (): Promise<ProductsResponse> => {
    try {
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
        return response?.data
    } catch (error) {
        console.log(error);
    }
}

export default fetchProducts