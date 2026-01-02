import fetchOrders from '@/api/fetchOrders'
import { useQuery } from '@tanstack/react-query'

const useFetchOrders = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: () => fetchOrders()
    })
}

export default useFetchOrders
