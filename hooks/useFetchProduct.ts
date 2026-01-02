import fetchProduct from '@/api/fetchProduct'
import { useQuery } from '@tanstack/react-query'

const useFetchProduct = (id: string) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => fetchProduct(id),
        enabled: !!id,
    })
}

export default useFetchProduct
