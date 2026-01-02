import axios from "axios";

const fetchOrders = async () => {
    try {
        const response = await axios.get('https://ecommerce.routemisr.com/api/v1/orders/');
        return response?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default fetchOrders;
