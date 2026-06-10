import { getCart } from '@src/features/cart/api/cartApi'
import { useQuery } from '@tanstack/react-query'

const useFetchCart = () => {
    return useQuery({
        queryKey: ['cart'],
        queryFn: () => getCart()
    })
}

export default useFetchCart

