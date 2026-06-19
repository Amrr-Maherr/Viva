import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useProductReviews from '@src/features/reviews/hooks/useProductReviews';
import { createReview } from '@src/features/reviews/api/reviewApi';
import { showToast } from '@src/shared/utils/toast';
import type { Review } from '@src/features/reviews/types/Review';

interface ProductReviewsProps {
    productId: string;
    rating: number;
    ratingsQuantity: number;
}

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
    <View style={styles.reviewCard}>
        <View style={styles.reviewHeader}>
            <View style={styles.reviewAvatar}>
                <Text style={styles.avatarText}>
                    {review.user?.name?.charAt(0)?.toUpperCase() || '?'}
                </Text>
            </View>
            <View style={styles.reviewMeta}>
                <Text style={styles.reviewerName}>{review.user?.name || 'Anonymous'}</Text>
                <Text style={styles.reviewDate}>
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}
                </Text>
            </View>
            <View style={styles.reviewRating}>
                <Ionicons name="star" size={14} color="#ffcc02" />
                <Text style={styles.reviewRatingText}>{review.rating}</Text>
            </View>
        </View>
        <Text style={styles.reviewText}>{review.review}</Text>
    </View>
);

const StarSelector: React.FC<{ value: number; onChange: (v: number) => void }> = ({ value, onChange }) => (
    <View style={styles.starRow}>
        {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => onChange(star)} activeOpacity={0.7}>
                <Ionicons
                    name={star <= value ? 'star' : 'star-outline'}
                    size={28}
                    color={star <= value ? '#ffcc02' : '#ccc'}
                />
            </TouchableOpacity>
        ))}
    </View>
);

const SHOW_INITIAL = 2;

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId, rating, ratingsQuantity }) => {
    const queryClient = useQueryClient();
    const { data: reviewsData, isLoading } = useProductReviews(productId);
    const [showForm, setShowForm] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [reviewRating, setReviewRating] = useState(0);

    const reviews = reviewsData?.data || [];
    const displayedReviews = showAll ? reviews : reviews.slice(0, SHOW_INITIAL);

    const createMutation = useMutation({
        mutationFn: () => createReview(productId, reviewText, reviewRating),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['product-reviews', productId] });
            showToast('success', 'Review submitted!');
            setShowForm(false);
            setReviewText('');
            setReviewRating(0);
        },
        onError: (error: any) => {
            showToast('error', error.response?.data?.message || 'Failed to submit review');
        },
    });

    const handleSubmit = () => {
        if (!reviewText.trim()) {
            showToast('info', 'Please write a review');
            return;
        }
        if (reviewRating === 0) {
            showToast('info', 'Please select a rating');
            return;
        }
        createMutation.mutate();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.sectionTitle}>Reviews</Text>
                <View style={styles.headerRating}>
                    <Ionicons name="star" size={18} color="#ffcc02" />
                    <Text style={styles.headerRatingText}>{rating}</Text>
                    <Text style={styles.reviewsCount}>({ratingsQuantity})</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.writeButton}
                onPress={() => setShowForm(!showForm)}
                activeOpacity={0.7}
            >
                <Ionicons name="create-outline" size={18} color="#1A1A1A" />
                <Text style={styles.writeButtonText}>
                    {showForm ? 'Cancel' : 'Write a Review'}
                </Text>
            </TouchableOpacity>

            {showForm && (
                <View style={styles.formContainer}>
                    <StarSelector value={reviewRating} onChange={setReviewRating} />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Share your experience..."
                        placeholderTextColor="#999"
                        value={reviewText}
                        onChangeText={setReviewText}
                        multiline
                        numberOfLines={3}
                        textAlignVertical="top"
                    />
                    <TouchableOpacity
                        style={[styles.submitButton, createMutation.isPending && styles.submitButtonDisabled]}
                        onPress={handleSubmit}
                        disabled={createMutation.isPending}
                        activeOpacity={0.8}
                    >
                        {createMutation.isPending ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.submitButtonText}>Submit Review</Text>
                        )}
                    </TouchableOpacity>
                </View>
            )}

            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#999" />
                </View>
            ) : reviews.length === 0 ? (
                <Text style={styles.emptyText}>No reviews yet. Be the first!</Text>
            ) : (
                displayedReviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                ))
            )}

            {reviews.length > SHOW_INITIAL && (
                <TouchableOpacity
                    style={styles.showAllButton}
                    onPress={() => setShowAll(!showAll)}
                    activeOpacity={0.7}
                >
                    <Text style={styles.showAllText}>
                        {showAll ? 'Show less' : `Show all ${reviews.length} reviews`}
                    </Text>
                    <Text style={styles.showAllIcon}>{showAll ? '▲' : '▼'}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 24,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#1A1A1A',
    },
    headerRating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    headerRatingText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1A1A1A',
    },
    reviewsCount: {
        fontSize: 14,
        color: '#808080',
        fontWeight: '400',
    },
    writeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        backgroundColor: '#f0f0f5',
        paddingVertical: 12,
        borderRadius: 10,
        marginBottom: 16,
    },
    writeButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1A1A1A',
    },
    formContainer: {
        backgroundColor: '#f9f9fb',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        gap: 12,
    },
    starRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 4,
    },
    textInput: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        padding: 12,
        fontSize: 15,
        color: '#1A1A1A',
        minHeight: 80,
    },
    submitButton: {
        backgroundColor: '#1A1A1A',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    submitButtonDisabled: {
        opacity: 0.6,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
    loadingContainer: {
        paddingVertical: 24,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        paddingVertical: 24,
    },
    reviewCard: {
        backgroundColor: '#f9f9fb',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    reviewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    reviewAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#e8e8ed',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    avatarText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#666',
    },
    reviewMeta: {
        flex: 1,
    },
    reviewerName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1A1A1A',
    },
    reviewDate: {
        fontSize: 12,
        color: '#999',
        marginTop: 2,
    },
    reviewRating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        backgroundColor: '#fff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    reviewRatingText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#1A1A1A',
    },
    reviewText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#444',
        fontWeight: '400',
    },
    showAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 12,
        marginTop: 4,
    },
    showAllText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#667eea',
    },
    showAllIcon: {
        fontSize: 10,
        color: '#667eea',
    },
});

export default ProductReviews;
