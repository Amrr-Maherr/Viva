import { fetchCategory } from '@src/features/categories/api/categoryApi';
import { useQuery } from '@tanstack/react-query';

const useFetchCategory = (id: string) => {
    return useQuery({
        queryKey: ['category', id],
        queryFn: () => fetchCategory(id),
        enabled: !!id,
    });
};

export default useFetchCategory;
