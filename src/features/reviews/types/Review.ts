export type Review = {
    _id: string;
    review: string;
    rating: number;
    product: string;
    user: {
        _id: string;
        name: string;
    };
    createdAt: string;
    updatedAt: string;
};

export type ReviewsResponse = {
    results: number;
    metadata: {
        currentPage: number;
        numberOfPages: number;
        limit: number;
    };
    data: Review[];
};
