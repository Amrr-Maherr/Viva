import { getWishlist } from '@/api/wishlist'
import { useQuery } from '@tanstack/react-query'

const useFetchWishlist = () => {
    return useQuery({
        queryKey: ['wishlist'],
        queryFn: () => getWishlist()
    })
}

export default useFetchWishlist
