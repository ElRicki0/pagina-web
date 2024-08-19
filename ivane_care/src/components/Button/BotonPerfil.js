import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Importa el paquete de iconos


const Boton = ({ textoBoton, accionBoton, iconName }) => {
    return (
        <TouchableOpacity onPress={accionBoton} style={styles.button}>
            <View style={styles.buttonContent}>
                <Icon name={iconName} size={50} color="#fff" style={styles.icon} />
                <Text style={styles.buttonText}>{textoBoton}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default Boton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#6C5FFF',
        padding: 20,
        margin: 10,
        borderRadius: 10,
        width: 350,
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContent: {
        flexDirection: 'row', // Alinear elementos en fila horizontal
        alignItems: 'center', // Centrar verticalmente los elementos
        justifyContent: 'center', // Centrar horizontalmente los elementos
    },
    icon: {
        marginRight: 10, // Espacio entre el icono y el texto del botón
    },
    buttonText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
    },
});
