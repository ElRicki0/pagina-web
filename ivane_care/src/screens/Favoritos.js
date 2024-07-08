// ProfileScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Carrito() {
    return (
        <View style={styles.container}>
            <Text>Favoritos </Text>
            {/* Aquí puedes agregar más contenido de la pantalla */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
