import { getCart } from '@/api/cart'
import { useQuery } from '@tanstack/react-query'

const useFetchCart = () => {
    return useQuery({
        queryKey: ['cart'],
        queryFn: () => getCart()
    })
}

export default useFetchCart
