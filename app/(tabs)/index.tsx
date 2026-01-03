import React, { useState, useCallback } from "react";
import { StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from 'expo-router';
import useFetchProducts from "@/queries/useFetchProducts";
import SearchInput from "@/components/SearchInput";
import CategoryButtons from "@/components/CategoryButtons";
import ProductsList from "@/components/ProductsList";
import FiltersModal from "@/components/FiltersModal";
import Loader from "@/components/Loader";
import ErrorView from "@/components/ErrorView";

export default function HomeScreen() {
  const { category } = useLocalSearchParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState(category as string || "all");
  const [refreshing, setRefreshing] = useState(false);
  const [isFiltersModalVisible, setIsFiltersModalVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<any>(null);
  const { data, isLoading, isError, refetch } = useFetchProducts(selectedCategoryId);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const handleApplyFilters = (filters: any) => {
    setAppliedFilters(filters);
    // Here you would typically apply the filters to the products
    console.log('Applied filters:', filters);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorView onRefetch={refetch} />;
  }

  return (
    <>
      <ScrollView
        style={{flex:1,backgroundColor:"#fff"}}
        contentContainerStyle={{paddingHorizontal:20}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* <SearchInput /> */}
        <View style={styles.filtersRow}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setIsFiltersModalVisible(true)}
          >
            <Ionicons name="filter-outline" size={20} color="#1A1A1A" />
            <Text style={styles.filterButtonText}>Filters</Text>
            {appliedFilters && (
              <View style={styles.filterBadge}>
                <Text style={styles.filterBadgeText}>
                  {Object.values(appliedFilters).filter(v => v).length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <CategoryButtons onCategorySelect={setSelectedCategoryId} />
        <ProductsList products={data?.data} />
      </ScrollView>

      <FiltersModal
        visible={isFiltersModalVisible}
        onClose={() => setIsFiltersModalVisible(false)}
        onApplyFilters={handleApplyFilters}
      />
    </>
  );
}

const styles = StyleSheet.create({
  navigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  navButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  navText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007aff',
  },
  filtersRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterButtonText: {
    fontSize: 16,
    color: '#1A1A1A',
    marginLeft: 8,
    fontWeight: '500',
  },
  filterBadge: {
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    paddingHorizontal: 6,
  },
  filterBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
