// ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



const Perfil = (logueado, setLogueado) => {
    const ip = '192.168.137.1';
    const navigation = useNavigation();

    const goToLogin = () => {
        navigation.navigate('LoginScreen')
    }

    // console.log(goToLogin());
    //Constante de cierre de sesión
    const handleLogOut = async () => {
        const url = `http://${ip}/pagina-web/api/services/public/cliente.php?action=logOut`;
        try {
            const fetchApi = await fetch(url);
            const datos = await fetchApi.json();
            if (datos.status) {
                goToLogin();
                Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente.'); -9 *
                setLogueado(false); // Actualiza el estado de logueado
            } else {
                Alert.alert('Error al cerrar sesión', datos.error);
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'No se pudo conectar con el servidor.');
        }
    };


    return (
        <View style={styles.container}>
            <Text>Perfil </Text>
            <TouchableOpacity onPress={handleLogOut}>
                <Text style={styles.signUp}>Cerrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={handleLogOut}>
                <Icon name="logout" size={60} color="#6C5FFF" />
            </TouchableOpacity>
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUp: {
        color: 'black',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});

export default Perfil;

