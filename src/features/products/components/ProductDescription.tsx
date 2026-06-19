import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ProductDescriptionProps {
    description: string;
}

const MAX_LENGTH = 120;

const ProductDescription: React.FC<ProductDescriptionProps> = ({ description }) => {
    const [expanded, setExpanded] = useState(false);
    const isLong = description.length > MAX_LENGTH;

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description} numberOfLines={expanded ? undefined : 3}>
                {description}
            </Text>
            {isLong && (
                <TouchableOpacity
                    onPress={() => setExpanded(!expanded)}
                    activeOpacity={0.7}
                    style={styles.toggleButton}
                >
                    <Text style={styles.toggleText}>
                        {expanded ? 'Show less' : 'Show more'}
                    </Text>
                    <Text style={styles.toggleIcon}>{expanded ? '▲' : '▼'}</Text>
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
    sectionTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 12,
    },
    description: {
        fontSize: 15,
        lineHeight: 24,
        color: '#444',
        fontWeight: '400',
    },
    toggleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginTop: 8,
        gap: 4,
    },
    toggleText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#667eea',
    },
    toggleIcon: {
        fontSize: 10,
        color: '#667eea',
    },
});

export default ProductDescription;
