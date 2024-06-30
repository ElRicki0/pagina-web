import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground, Alert, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Hook de navegación
import Input from '../components/Input/InputLogin'; // Llama a la plantilla para los input
import Boton from '../components/Button/Boton';
// import { useAuth } from '../../contexts/AuthContext';
// import { useUser } from '../../contexts/UserContext';
// import { SERVER } from '../../contexts/Network'; // URL del servidor para realizar solicitudes


const LogIn = ({ logueado, setLogueado }) => {
    const navigation = useNavigation(); // Hook de navegación para cambiar entre pantallas

    // Estados locales
    const [correo, setUsuario] = useState(''); // Estado para el correo
    const [clave, setClave] = useState(''); // Estado para la contraseña
    const [isContra, setIsContra] = useState(true); // Estado para mostrar/ocultar contraseña

    const ip = '192.168.1.3'; // Dirección IP del servidor

    // Función para la acción de inicio de sesión
    const handelLogin = async () => {
        const url = `http://${ip}/pagina-web/api/services/public/cliente.php?action=logIn`;

        const formData = new FormData();
        formData.append('correo', correo);
        formData.append('clave', clave);

        try {
            // Realizar la petición HTTP
            const fetchApi = await fetch(url, {
                method: 'POST',
                body: formData,
            });
            const datos = await fetchApi.json();

            if (datos.status) {
                setLogueado(true);
            } else {
                console.log(datos);
                // Alert the user about the error
                Alert.alert('Error de sesión', datos.error);
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'No se pudo conectar con el servidor.');
        }
    };

    const handleLogOut = async () => {
        const url = `http://${ip}/pagina-web/api/services/public/cliente.php?action=logOut`; // Correct action parameter
        try {
            const fetchApi = await fetch(url);
            const datos = await fetchApi.json();
            if (datos.status) {
                setLogueado(false);
            } else {
                console.log(datos);
                Alert.alert('Error al cerrar sesión', datos.error);
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'No se pudo conectar con el servidor.');
        }

    //const { setIsLoggedIn } = useAuth(); // Método para establecer si el usuario está logueado
    //const { setIdUsuario } = useUser(); // Método para establecer el ID del usuario

    // const irARegistro = () => {
    //     navigation.navigate('SignUp');
    // };


    // Función para la acción de inicio de sesión

        // try {
        //     const response = await fetch(url, {
        //         method: 'POST',
        //         body: formData,
        //     });

        //     if (!response.ok) {
        //         throw new Error('Network response was not ok');
        //     }

        //     const datos = await response.json();
        //     console.log('Respuesta del servidor:', datos); // Verifica qué datos se están recibiendo

        //     if (datos.status) {
        //         setIsLoggedIn(true);
        //         setLogueado(true);
        //         setIdUsuario(datos.id);
        //     } else {
        //         Alert.alert('Error de sesión', datos.error || 'Error desconocido');
        //     }
        // } catch (error) {
        //     console.error('Error:', error);
        //     Alert.alert('Error', 'No se pudo conectar con el servidor.');
        // }
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
                    setValor={correo}
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
                    <Boton textoBoton="Iniciar Sesión" accionBoton={handelLogin} />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.signUp}>crear cuenta</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogOut}>
                    <Text style={styles.signUp}>cerrar</Text>
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
