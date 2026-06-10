import { getWishlist } from '@src/features/wishlist/api/wishlistApi'
import { useQuery } from '@tanstack/react-query'

const useFetchWishlist = () => {
    return useQuery({
        queryKey: ['wishlist'],
        queryFn: () => getWishlist()
    })
}

export default useFetchWishlist

