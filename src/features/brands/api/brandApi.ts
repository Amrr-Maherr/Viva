import axios from "axios";

const fetchBrands = async () => {
    try {
        const response = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
        return response?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default fetchBrands;
