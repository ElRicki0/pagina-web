import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text'; // Dependencia para el texto de telefono, esto es para poder utilizar una maskara de dijitos
import Boton from '../components/Button/Boton';
import Input from '../components/Input/InputSignUp';
import { SERVER } from '../../contexts/Network';



const backgroundImage = require('../img/FondoSigUp.png'); // Fondo de pantalla
const ip = '192.168.1.15'; // Dirección IP del servidor 


const SignUp = () => {
    const navigation = useNavigation();



    // constante para cerar sesion (simplemente redirije al login si la accion esta completada)
    const goToLogin = () => {
        navigation.navigate('LoginScreen')
    }


    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [alias, setAlias] = useState('');
    const [direccion, setDireccion] = useState('');
    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');
    const [claveConfirmar, setClaveConfirmar] = useState('');
    const [clavesCoinciden, setClavesCoinciden] = useState(true); // Nuevo estado

    // Función para verificar si las contraseñas coinciden
    useEffect(() => {
        setClavesCoinciden(clave === claveConfirmar);
    }, [clave, claveConfirmar]);


    // Logica para crear un nuevo cliente
    const handelagregarCliente = async () => {

        if (!nombre || !apellido || !telefono || !alias || !direccion || !correo || !clave || !claveConfirmar) {
            alert('Todos los campos son obligatorios.');
            return;
        }

        // Pequeñas validaciones para que al momento de crear una cuenta, el usuario pueda distinguir de una mejor forma
        // cual es el problema por el que no puede crear su cuenta

        if (nombre.length < 4) {
            Alert.alert('Nombre inválido', 'El nombre debe tener al menos 4 caracteres.');
            return;
        }

        if (apellido.length < 4) {
            Alert.alert('Apellido inválido', 'El apellido debe tener al menos 4 caracteres.');
            return;
        }

        if (alias.length < 6) {
            alert('El alias debe tener al menos una lonjitud de 6 caracteres');
            return;
        }

        if (!/^[267]\d{3}-\d{4}$/.test(telefono)) {
            alert('El teléfono debe tener el formato (2, 6, 7)###-####');
            return;
        }

        if (clave.length < 8) {
            alert('La contraseña debe de ser de al menos 8 carecteres');
            return;
        }


        // /\S+@\S+\.\S+/: Esta es la expresión regular utilizada para validar el formato de un correo electrónico.
        if (!/\S+@\S+\.\S+/.test(correo)) {
            Alert.alert('Correo inválido', 'Ingrese un correo electrónico válido.');
            return;
        }



        if (!clavesCoinciden) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        try {
            const url = `${SERVER}services/public/cliente.php?action=signUpMovil`;


            // Se crea un nuevo objeto de "FormData" y se agrega los datos
            const formData = new FormData();
            formData.append('nombreCliente', nombre);
            formData.append('apellidoCliente', apellido);
            formData.append('correoCliente', correo);
            formData.append('direccionCliente', direccion);
            formData.append('telefonoCliente', telefono);
            formData.append('aliasCliente', alias);
            formData.append('claveCliente', clave);
            formData.append('confirmarClave', claveConfirmar);


            // Se realiza la peticion HTTP (El protocolo de transferencia de hipertexto)
            //"es un protocolo o conjunto de reglas de comunicación para la comunicación cliente-servidor"
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });

            // Analiza la respuesta
            const responseData = await response.text();

            if (responseData === 'success') {
                console.log('Cliente agregado exitosamente');
            } else {
                console.error(responseData);
                alert('Se ha creado su cuenta con exito');
                goToLogin();
            }
        } catch (error) {
            console.error('Error al enviar la solucitud: ', error);
            alert('Error al enviar la solicitud');
        }
        // Limpia los campos después de agregar un administrador
        setNombre('');
        setApellido('');
        setCorreo('');
        setTelefono('');
        setDireccion('');
        setAlias('');
        setClave('');
        setClaveConfirmar('');
    }

    return (
        <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
            <View style={styles.containerTittle}>
                <Text style={styles.tittle}>Crear cuenta</Text>
            </View>

            <ScrollView style={styles.scrollView}
                persistentScrollbar={true}
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false} // Oculta el indicador de desplazamiento vertical 
            >
                <View style={styles.container}>
                    <View style={[styles.containerInput, styles.shadowProp]}>
                        <Text style={styles.Text}>Nombre</Text>
                        <Input
                            placeHolder='Nombre...'
                            style={styles.input}
                            setValor={nombre}
                            setTextChange={setNombre}
                        />
                        <Text style={styles.Text}>Apellido</Text>
                        <Input
                            placeHolder='Apellido...'
                            style={styles.input}
                            setValor={apellido}
                            setTextChange={setApellido}
                        />
                        <Text style={styles.Text}>Teléfono</Text>
                        <TextInputMask
                            type={'custom'}
                            options={{
                                mask: '9999-9999'
                            }}
                            style={styles.inputMask}
                            value={telefono}
                            onChangeText={setTelefono}
                            keyboardType="numeric"
                            placeholder='0000-0000'
                            placeholderTextColor='#000'
                        />
                        <Text style={styles.Text}>Dirección</Text>
                        <Input
                            placeHolder='Dirección...'
                            style={styles.input}
                            setValor={direccion}
                            setTextChange={setDireccion}
                        />
                        <Text style={styles.Text}>Correo electroníco</Text>
                        <Input
                            placeHolder='correo...'
                            style={styles.input}
                            setValor={correo}
                            setTextChange={setCorreo}
                        />
                        <Text style={styles.Text}>Nombre de Usuario</Text>
                        <Input
                            placeHolder='Usuario...'
                            style={styles.input}
                            setValor={alias}
                            setTextChange={setAlias}
                        />
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
                        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                            <Text style={styles.signUp}>Ya tienes una cuenta?</Text>
                        </TouchableOpacity>
                        <View style={styles.containerBoton}>
                            <Boton textoBoton="Crear cuenta" accionBoton={handelagregarCliente} />
                        </View>
                    </View>

                </View>
            </ScrollView>
        </ImageBackground>

    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'col',
    },
    containerTittle: {
        marginVertical: 20,
        marginBottom: 138,
    },
    containerInput: {
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#7759FF',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 7, // Solo para Android
        marginBottom: 20,
        borderRadius: 10,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    Text: {
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 30,
        color: '#0B003D',
        textDecorationStyle: 'double',
        fontSize: 24,
        textAlign: 'left', // Alinea el texto a la izquierda
        alignSelf: 'flex-start', // Asegura que el contenedor también se alinee a la izquierda 
    },
    tittle: {
        fontSize: 40,
        textAlign: 'center',
        top: 70, // Alinea el botón 20 unidades desde la parte superior
        color: 'white',
    },
    inputMask: {
        color: "black",
        fontWeight: '900',
        width: 300,
        height: 50, // Ajusta la altura según sea necesario
        borderRadius: 20, // Redondeo de los bordes
        borderColor: 'black',
        borderWidth: 4,
        backgroundColor: '#FFFFFF', // Color de fondo del input
        paddingHorizontal: 19,
        marginBottom: 4,
        fontSize: 17,
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    signUp: {
        color: '#444444',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        textDecorationLine: 'underline',
        marginBottom: 20,
    },
});

export default SignUp;

