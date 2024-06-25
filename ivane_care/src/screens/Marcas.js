import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Hook de navegación
import Ionicons from '@expo/vector-icons/Ionicons';



const Marcas = () => {
    const navigation = useNavigation(); // Hook de navegación para cambiar entre pantallas

    return (
        <View style={styles.container}>
            <View style={styles.containerFlecha}>
                {/* Botón para volver a la pantalla anterior (en este caso a la pantalla de VerifUs) */}
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={40} color="black" />
                </TouchableOpacity>
            </View>
            <Text>Marcas </Text>
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
    containerFlecha: {
        flex: 1,
        justifyContent:'flex-start',
        alignItems:'flex-start'
    },
});

export default Marcas;

