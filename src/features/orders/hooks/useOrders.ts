import fetchOrders from '@src/features/orders/api/orderApi'
import { useQuery } from '@tanstack/react-query'

const useFetchOrders = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: () => fetchOrders()
    })
}

export default useFetchOrders

