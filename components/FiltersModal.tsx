import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FiltersModalProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
}

export default function FiltersModal({ visible, onClose, onApplyFilters }: FiltersModalProps) {
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedSort, setSelectedSort] = useState('');

  const priceRanges = [
    { label: 'Under $50', value: '0-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: '$100 - $200', value: '100-200' },
    { label: 'Over $200', value: '200+' },
  ];

  const ratings = [
    { label: '4.5 & above', value: '4.5' },
    { label: '4.0 & above', value: '4.0' },
    { label: '3.5 & above', value: '3.5' },
    { label: '3.0 & above', value: '3.0' },
  ];

  const brands = [
    { label: 'All Brands', value: '' },
    { label: 'Nike', value: 'nike' },
    { label: 'Adidas', value: 'adidas' },
    { label: 'Puma', value: 'puma' },
    { label: 'Reebok', value: 'reebok' },
  ];

  const sortOptions = [
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Rating: High to Low', value: 'rating_desc' },
    { label: 'Newest First', value: 'newest' },
  ];

  const handleApplyFilters = () => {
    const filters = {
      priceRange: selectedPriceRange,
      rating: selectedRating,
      brand: selectedBrand,
      sort: selectedSort,
    };
    onApplyFilters(filters);
    onClose();
  };

  const handleClearFilters = () => {
    setSelectedPriceRange('');
    setSelectedRating('');
    setSelectedBrand('');
    setSelectedSort('');
  };

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const FilterOption = ({
    label,
    selected,
    onPress,
  }: {
    label: string;
    selected: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      style={[styles.option, selected && styles.selectedOption]}
      onPress={onPress}
    >
      <Text style={[styles.optionText, selected && styles.selectedOptionText]}>
        {label}
      </Text>
      {selected && <Ionicons name="checkmark" size={16} color="#1A1A1A" />}
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#666" />
          </TouchableOpacity>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity onPress={handleClearFilters}>
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <FilterSection title="Price Range">
            {priceRanges.map((range) => (
              <FilterOption
                key={range.value}
                label={range.label}
                selected={selectedPriceRange === range.value}
                onPress={() => setSelectedPriceRange(range.value)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Rating">
            {ratings.map((rating) => (
              <FilterOption
                key={rating.value}
                label={rating.label}
                selected={selectedRating === rating.value}
                onPress={() => setSelectedRating(rating.value)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Brand">
            {brands.map((brand) => (
              <FilterOption
                key={brand.value}
                label={brand.label}
                selected={selectedBrand === brand.value}
                onPress={() => setSelectedBrand(brand.value)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Sort By">
            {sortOptions.map((sort) => (
              <FilterOption
                key={sort.value}
                label={sort.label}
                selected={selectedSort === sort.value}
                onPress={() => setSelectedSort(sort.value)}
              />
            ))}
          </FilterSection>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  closeButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  clearText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  selectedOption: {
    borderColor: '#1A1A1A',
    backgroundColor: '#f8f8f8',
  },
  optionText: {
    fontSize: 16,
    color: '#666',
  },
  selectedOptionText: {
    color: '#1A1A1A',
    fontWeight: '500',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  applyButton: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
