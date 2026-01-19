import fetchProducts from "@/api/fetchProducts";
import EmptyState from "@/components/EmptyState";
import ErrorView from "@/components/ErrorView";
import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AllProductsScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  // Fetch all products with infinite pagination
  const {
    data: productsData,
    isLoading,
    isError,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["allProducts", debouncedSearchQuery],
    queryFn: ({ pageParam = 1 }) =>
      fetchProducts(undefined, debouncedSearchQuery, pageParam, 20),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = lastPage.metadata.numberOfPages;
      const currentPage = lastPage.metadata.currentPage;

      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // Handle search with debounce effect
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const allProducts = productsData?.pages.flatMap((page) => page.data) || [];

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading && !isRefetching) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorView onRetry={refetch} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {allProducts.length === 0 ? (
          <EmptyState
            title="No Products Found"
            subtitle={
              searchQuery
                ? "Try adjusting your search"
                : "No products available at the moment"
            }
            icon="cube-outline"
          />
        ) : (
          <FlatList
            data={allProducts}
            renderItem={({ item }) => <ProductCard product={item} />}
            keyExtractor={(item) => item._id}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isFetchingNextPage ? (
                <View style={styles.footerLoader}>
                  <ActivityIndicator size="large" color="#1A1A1A" />
                </View>
              ) : (
                <Text style={styles.endOfListText}>You have seen all products</Text>
              )
            }
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f8f8f8",
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
  },
  listContent: {
    // paddingTop: 16,
    // paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-evenly",
    // gap: 12,
    // paddingHorizontal: 6,
  },
  footerLoader: {
    marginVertical: 20,
    alignItems: "center",
  },
  endOfListText: {
    textAlign: "center",
    paddingVertical: 20,
    fontSize: 14,
    color: "#888888",
  },
});

export default AllProductsScreen;
