import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RefetchButton from './RefetchButton';

interface ErrorViewProps {
    onRefetch: () => void;
}

const ErrorView: React.FC<ErrorViewProps> = ({ onRefetch }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Something went wrong. Please try again.</Text>
            <RefetchButton onPress={onRefetch} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 18,
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default ErrorView;
