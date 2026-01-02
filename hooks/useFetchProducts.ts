import fetchProducts from '@/api/fetchProducts'
import { useQuery } from '@tanstack/react-query'

const useFetchProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: () => fetchProducts()
    })
}

export default useFetchProducts
