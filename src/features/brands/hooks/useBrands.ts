import fetchBrands from '@src/features/brands/api/brandApi'
import { useQuery } from '@tanstack/react-query'

const useFetchBrands = () => {
    return useQuery({
        queryKey: ['brands'],
        queryFn: () => fetchBrands()
    })
}

export default useFetchBrands

