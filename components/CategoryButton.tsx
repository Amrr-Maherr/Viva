import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CategoryButtonProps {
    item: string;
    selected: boolean;
    onPress: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ item, selected, onPress }) => {
    return (
        <TouchableOpacity
            style={selected ? styles.chosenButton : styles.button}
            onPress={onPress}
        >
            <Text style={selected ? styles.chosenButtonText : styles.buttonText}>
                {item}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        marginVertical: 10,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginHorizontal: 4,
        borderRadius: 10,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#E6E6E6",
        borderWidth: 1,
    },
    buttonText: {
        fontSize: 14,
        color: "#000",
    },
    chosenButton: {
        marginVertical: 10,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginHorizontal: 4,
        borderRadius: 10,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#E6E6E6",
        borderWidth: 1,
        backgroundColor: "#000",
    },
    chosenButtonText: {
        fontSize: 14,
        color: "#fff",
    },
});

export default CategoryButton;
