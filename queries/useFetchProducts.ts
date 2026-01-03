import fetchProducts from '@/api/fetchProducts'
import { useQuery } from '@tanstack/react-query'

const useFetchProducts = (categoryId: string = 'all') => {
    return useQuery({
        queryKey: ['products', categoryId],
        queryFn: () => fetchProducts(categoryId)
    })
}

export default useFetchProducts
