import { fetchBrand } from '@src/features/brands/api/brandApi';
import { useQuery } from '@tanstack/react-query';

const useFetchBrand = (id: string) => {
    return useQuery({
        queryKey: ['brand', id],
        queryFn: () => fetchBrand(id),
        enabled: !!id,
    });
};

export default useFetchBrand;
