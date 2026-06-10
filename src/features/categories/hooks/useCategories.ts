import fetchCategories from '@src/features/categories/api/categoryApi'
import { useQuery } from '@tanstack/react-query'

const useFetchCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => fetchCategories()
    })
}

export default useFetchCategories

