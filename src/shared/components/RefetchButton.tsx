import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface RefetchButtonProps {
    onPress: () => void;
}

const RefetchButton: React.FC<RefetchButtonProps> = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>Try Again</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#000',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    text: {
        color: '#fff',
        fontSize: 16,
    },
});

export default RefetchButton;
