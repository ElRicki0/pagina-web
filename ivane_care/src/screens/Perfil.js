// ProfileScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const Perfil = () => {
    return (
        <View style={styles.container}>
            <Text>Perfil </Text>
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

export default Perfil;

