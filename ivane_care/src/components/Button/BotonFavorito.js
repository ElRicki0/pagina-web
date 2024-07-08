import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Importa el paquete de iconos


const Boton = ({ accionBoton, iconName }) => {
    return (
        <TouchableOpacity onPress={accionBoton} style={styles.button}>
            <View style={styles.buttonContent}>
                <Icon name={iconName} size={35} color="#fff" style={styles.icon} />
            </View>
        </TouchableOpacity>
    );
}

export default Boton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#AD002F',
        padding: 7,
        margin: 10,
        borderRadius: 10,
        width: 140,
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContent: {
        flexDirection: 'row', // Alinear elementos en fila horizontal
        alignItems: 'center', // Centrar verticalmente los elementos
        justifyContent: 'center', // Centrar horizontalmente los elementos
    },
});
