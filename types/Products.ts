import { Product } from "./product";

export type ProductsResponse = {
    results: number;
    metadata: {
        currentPage: number;
        numberOfPages: number;
        limit: number;
        nextPage?: number;
    };
    data: Product[];
}