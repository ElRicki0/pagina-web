import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import Boton from '../components/Button/Boton';
import { useNavigation } from '@react-navigation/native'; // Hook de navegación
import Input from '../components/Input/InputLogin'; // Llama a la plantilla para los input

const LogIn = () => {
    const navigation = useNavigation(); // Hook de navegación para cambiar entre pantallas

    // Estados locales
    const [usuario, setUsuario] = useState(''); // Estado para el nombre de usuario
    const [clave, setClave] = useState(''); // Estado para la contraseña
    const [isContra, setIsContra] = useState(true); // Estado para mostrar/ocultar contraseña

    const irARegistro = () => {
        navigation.navigate('SignUp');
    };

    // Definir la ruta de la imagen de fondo con require
    const backgroundImage = require('../img/FondoLogIn.png');

    return (
        <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
            <View style={styles.container}>
                <Text style={styles.title}>Log in</Text>
                <Input
                    placeHolder='correo...'
                    style={styles.input}
                    setValor={usuario}
                    setTextChange={setUsuario}
                />
                <Input
                    placeHolder='contraseña...'
                    setValor={clave}
                    setTextChange={setClave}
                    clave={isContra}
                />
                <TouchableOpacity>
                    <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
                <View style={styles.containerBoton}>
                    <Boton textoBoton="siguiente" accionBoton={irARegistro} />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.signUp}>crear cuenta</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 60,
        marginTop: 300
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'left',
        color: 'black',
    },
    input: {
        marginBottom: 15,
        backgroundColor: 'white',
        borderRadius: 25,
        paddingHorizontal: 15,
        height: 50,
        fontSize: 16,
        color: '#000',
    },
    forgotPassword: {
        color: '#fff',
        textAlign: 'left',
        marginBottom: 20,
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    signUp: {
        color: '#fff',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    containerBoton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LogIn;
