import fetchProducts from '@/api/fetchProducts'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

const useFetchSearchProducts = (searchQuery: string = '') => {
    const { data: allProducts, isLoading, isError, refetch } = useQuery({
        queryKey: ['allProducts'],
        queryFn: () => fetchProducts(),
        enabled: searchQuery.trim().length > 0
    })

    const filteredProducts = useMemo(() => {
        if (!allProducts?.data || !searchQuery.trim()) {
            return allProducts
        }

        const filtered = allProducts.data.filter(product =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )

        return {
            ...allProducts,
            data: filtered
        }
    }, [allProducts, searchQuery])

    return {
        data: filteredProducts,
        isLoading,
        isError,
        refetch
    }
}

export default useFetchSearchProducts
