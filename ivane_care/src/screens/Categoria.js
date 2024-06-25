import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity , Image} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Hook de navegación
import Ionicons from '@expo/vector-icons/Ionicons';

const Categorias = () => {
    const navigation = useNavigation(); // Hook de navegación para cambiar entre pantallas

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={60} color="#6C5FFF" />
            </TouchableOpacity>
            <Text style={styles.title}>Categorias</Text>
            <Image
                style={styles.tinyLogo}
                source={require('../img/SpraySplash.png')}
            />
            {/* Aquí puedes agregar más contenido de la pantalla */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 20, // Alinea el botón 20 unidades desde la parte superior
        left: 20, // Alinea el botón 20 unidades desde la izquierda
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 30, // Espacio adicional arriba del título
    },
});

export default Categorias;
