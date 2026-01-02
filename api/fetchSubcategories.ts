import axios from "axios";

const fetchSubcategories = async () => {
    try {
        const response = await axios.get('https://ecommerce.routemisr.com/api/v1/subcategories');
        return response?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default fetchSubcategories;
