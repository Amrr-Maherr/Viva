import fetchProducts from '@/api/fetchProducts'
import { useInfiniteQuery } from '@tanstack/react-query'

const useFetchProducts = (categoryId: string = 'all') => {
    return useInfiniteQuery({
        queryKey: ['products', categoryId],
        queryFn: ({ pageParam = 1 }) => fetchProducts(categoryId, undefined, pageParam, 20),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const totalPages = Math.ceil(lastPage.results / 20);
            return allPages.length < totalPages ? allPages.length + 1 : undefined;
        },
    })
}

export default useFetchProducts
