import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text'; // Dependencia para el texto de telefono, esto es para poder utilizar una maskara de dijitos
import Boton from '../components/Button/Boton';
import Input from '../components/Input/InputSignUp';
import { SERVER } from '../../contexts/Network';
import Ionicons from '@expo/vector-icons/Ionicons';



const RecupClave2 = () => {

    const navigation = useNavigation(); // Hook de navegación para cambiar entre pantallas

    const [respuesta, setRespuesta] = useState('');
    const route = useRoute(); // Hook para acceder a los parámetros de la ruta
    // Accede a los parámetros
    const { id_cliente, nombre_cliente, alias_cliente, pregunta_seguridad, respuesta_seguridad } = route.params || {};

    // Muestra los parámetros en la consola
    console.log('Parámetros recibidos en RecupClave2:', {
        id_cliente,
        nombre_cliente,
        alias_cliente,
        pregunta_seguridad,
        respuesta_seguridad
    });

    // Función para verificar la respuesta de seguridad
    const VerifyResponse = () => {
        if (respuesta.trim() === respuesta_seguridad) {
            // Respuesta correcta
            console.log('Respuesta correcta');
            Alert.alert('Correcto', 'Respuesta correcta. Puede proceder a la recuperación de contraseña.');
            // Aquí puedes navegar a la siguiente pantalla o realizar otra acción
            //navigation.navigate('SiguientePantalla', { id_cliente }); // Reemplaza 'SiguientePantalla' con el nombre de la siguiente pantalla
        } else {
            // Respuesta incorrecta
            console.log('Respuesta incorrecta');
            Alert.alert('Incorrecto', 'La respuesta de seguridad es incorrecta. Inténtelo de nuevo.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recuperación de contraseña </Text>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={60} color="#6C5FFF" />
            </TouchableOpacity>
            <Image source={require('../img/RecupClave1.png')} style={styles.image} />
            <Text style={styles.texto}>
                Porfavor, responda a la pregunta :
                "{pregunta_seguridad}"
            </Text>

            <Input // Input para colocar el valor de correo o de alias de un usuario
                placeHolder='Respuesta...'
                style={styles.input}
                setValor={respuesta}
                setTextChange={setRespuesta}
            />
            <View style={styles.containerBoton}>
                <Boton textoBoton="Siguiente" accionBoton={VerifyResponse} />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 160, // Alinea el botón 20 unidades desde la parte superior
        left: 20, // Alinea el botón 20 unidades desde la izquierda
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 25,
        marginTop: -20,
        backgroundColor: '#0A2B32',
        padding: 35,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        textAlign: 'center',
    },
    image: {
        width: 300,
        height: 300,
    },
    texto: {
        fontSize: 15,
        marginBottom: 20,
        textAlign: 'center',
        backgroundColor: '#ebebeb',
        borderRadius: 20,
        width: 340,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RecupClave2;

