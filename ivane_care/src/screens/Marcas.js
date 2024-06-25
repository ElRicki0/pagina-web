import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Hook de navegación
import Ionicons from '@expo/vector-icons/Ionicons';

const Marcas = () => {
    const navigation = useNavigation(); // Hook de navegación para cambiar entre pantallas

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={50} color="#6C5FFF" />
            </TouchableOpacity>
            <Text style={styles.title}>Marcas</Text>
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
    backButton: {
        position: 'absolute',
        top: 20, // Alinea el botón 20 unidades desde la parte superior
        left: 20, // Alinea el botón 20 unidades desde la izquierda
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20, // Espacio adicional arriba del título
    },
});

export default Marcas;
