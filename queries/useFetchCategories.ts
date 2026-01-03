import fetchCategories from '@/api/fetchCategories'
import { useQuery } from '@tanstack/react-query'

const useFetchCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => fetchCategories()
    })
}

export default useFetchCategories
