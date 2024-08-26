import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text'; // Dependencia para el texto de telefono, esto es para poder utilizar una maskara de dijitos
import Boton from '../components/Button/Boton';
import Input from '../components/Input/InputSignUp';
import { SERVER } from '../../contexts/Network';
import Ionicons from '@expo/vector-icons/Ionicons';



const RecupClave3 = () => {

    const navigation = useNavigation(); // Hook de navegación para cambiar entre pantallas

    const route = useRoute(); // Hook para acceder a los parámetros de la ruta
    // Accede a los parámetros
    const { id_cliente } = route.params || {};

    // Muestra los parámetros en la consola
    console.log('Parámetros recibidos en RecupClave3:', {
        id_cliente,
    });

        // constante para cerar sesion (simplemente redirije al login si la accion esta completada)
        const goToLogin = () => {
            navigation.navigate('LoginScreen')
        }

    const [clave, setClave] = useState('');
    const [claveConfirmar, setClaveConfirmar] = useState('');
    const [clavesCoinciden, setClavesCoinciden] = useState(true); // Nuevo estado

    // Función para verificar si las contraseñas coinciden
    useEffect(() => {
        setClavesCoinciden(clave === claveConfirmar);
    }, [clave, claveConfirmar]);

    const UpdatePasword = async () => {
        if (!clavesCoinciden) {
            alert('Las contraseñas no coinciden.');
            return;
        }
    
        if (clave.length < 8) {
            alert('La contraseña debe de ser de al menos 8 caracteres');
            return;
        }
    
        try {
            const url = `${SERVER}services/public/cliente.php?action=changePasswordMovil`;
    
            const formData = new FormData();
            formData.append('claveNueva', clave);
            formData.append('confirmarClave', claveConfirmar);
            formData.append('id_cliente', id_cliente);
    
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });
    
            const responseData = await response.json();
            console.log(responseData); // Verifica qué datos estás recibiendo
            if (responseData.status === 1) {
                console.log('Claves cambiadas exitosamente');
                alert(responseData.message || 'Contraseña cambiada correctamente');
                goToLogin();
            } else {
                console.log(responseData.error);
                alert(responseData.error || 'Error desconocido al cambiar la contraseña');
            }
        } catch (error) {
            console.error('Error al enviar la solicitud: ', error);
            alert('Error al enviar la solicitud');
        }
    
        setClave('');
        setClaveConfirmar('');
    }
    
    
    




    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recuperación de contraseña</Text>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={60} color="#6C5FFF" />
            </TouchableOpacity>
            <Image source={require('../img/RecupClave1.png')} style={styles.image} />
            <Text style={styles.texto}>Ingrese su nueva contraseña</Text>
            <Text style={styles.Text}>contraseña</Text>
            <Input
                placeHolder='********'
                setValor={clave}
                setTextChange={setClave}
                clave={true} // Esto asegura que sea campo de contraseña
            />

            <Text style={styles.Text}>Confirmar contraseña</Text>
            <Input
                placeHolder='********'
                setValor={claveConfirmar}
                setTextChange={setClaveConfirmar}
                clave={true} // Esto asegura que sea campo de contraseña
            />
            <View style={styles.containerBoton}>
                <Boton textoBoton="Siguiente" accionBoton={UpdatePasword} />
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
    Text: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        color: '#0B003D',
        textDecorationStyle: 'double',
        fontSize: 24,
        textAlign: 'left', // Alinea el texto a la izquierda
        alignSelf: 'flex-start', // Asegura que el contenedor también se alinee a la izquierda 
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
        width: 270,
        height: 270,
    },
    texto: {
        fontSize: 15,
        textAlign: 'center',
        backgroundColor: '#ebebeb',
        borderRadius: 20,
        width: 340,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RecupClave3;

