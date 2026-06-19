import { fetchProductReviews } from '../api/reviewApi';
import { useQuery } from '@tanstack/react-query';

const useProductReviews = (productId: string) => {
    return useQuery({
        queryKey: ['product-reviews', productId],
        queryFn: () => fetchProductReviews(productId),
        enabled: !!productId,
    });
};

export default useProductReviews;
