import fetchBrands from '@/api/fetchBrands'
import { useQuery } from '@tanstack/react-query'

const useFetchBrands = () => {
    return useQuery({
        queryKey: ['brands'],
        queryFn: () => fetchBrands()
    })
}

export default useFetchBrands
