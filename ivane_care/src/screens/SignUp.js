import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Boton from '../components/Button/Boton';
import Input from '../components/Input/InputSignUp';


const backgroundImage = require('../img/FondoSigUp.png');


const SignUp = () => {
    const navigation = useNavigation();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [alias, setAlias] = useState('');
    const [direccion, setDireccion] = useState('');
    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');
    const [claveConfirmar, setClaveConfirmar] = useState('');

    return (
        <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
            <Text style={styles.tittle}>Crear cuenta</Text>
            <View style={styles.container}>
                <View style={styles.containerInput}>
                    <Input
                        placeHolder='correo...'
                        style={styles.input}
                        setValor={correo}
                        setTextChange={setCorreo}
                    />
                    <Text style={styles.Text}>Crear cuenta</Text>
                    <Input
                        placeHolder='Nombre...'
                        style={styles.input}
                        setValor={correo}
                        setTextChange={setCorreo}
                    />
                    <Input
                        placeHolder='contraseña...'
                        setValor={clave}
                        setTextChange={setClave}
                        clave={true} // Esto asegura que sea campo de contraseña
                    />
                </View>
            </View>
        </ImageBackground>

    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'col',
        marginTop: 20,
    },
    containerInput: {
        marginVertical: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    Text:{
        fontSize: 20,
        textAlign: 'left', // Alinea el texto a la izquierda
        alignSelf: 'flex-start', // Asegura que el contenedor también se alinee a la izquierda 
    },
    tittle: {
        fontSize: 40,
        textAlign: 'center',
        top: 70, // Alinea el botón 20 unidades desde la parte superior
        color: 'white',
    },
});

export default SignUp;

