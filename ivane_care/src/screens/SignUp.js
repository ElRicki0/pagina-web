import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text'; // Dependencia para el texto de telefono, esto es para poder utilizar una maskara de dijitos
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
            <ScrollView style={styles.scrollView}
                persistentScrollbar={true}
                showsVerticalScrollIndicator={false} // Oculta el indicador de desplazamiento vertical 
            >
                <View style={styles.container}>
                    <View style={styles.containerInput}>
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
                            placeholder='Teléfono...'
                            placeholderTextColor='#000'
                        />
                        <Text style={styles.Text}>Correo electroníco</Text>
                        <Input
                            placeHolder='correo...'
                            style={styles.input}
                            setValor={correo}
                            setTextChange={setCorreo}
                        />
                        <Text style={styles.Text}>contraseña</Text>
                        <Input
                            placeHolder='contraseña...'
                            setValor={clave}
                            setTextChange={setClave}
                            clave={true} // Esto asegura que sea campo de contraseña
                        />
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
        marginTop: 20,
    },
    containerInput: {
        marginVertical: 135,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    Text: {
        marginVertical: 12,
        marginLeft: 30,
        color: '#B8B8B8',
        textDecorationStyle:'double',
        fontSize: 24,
        textAlign: 'left', // Alinea el texto a la izquierda
        alignSelf: 'flex-start', // Asegura que el contenedor también se alinee a la izquierda 
    },
    tittle: {
        fontSize: 40,
        textAlign: 'center',
        top: 70, // Alinea el botón 20 unidades desde la parte superior
        color: 'white',
        marginBottom:20,
    },
    inputMask: {
        color: "black",
        fontWeight: '900',
        width: 280,
        height: 60, // Ajusta la altura según sea necesario
        borderRadius: 20, // Redondeo de los bordes
        borderColor: 'black',
        borderWidth: 4,
        backgroundColor: '#FFFFFF', // Color de fondo del input
        paddingHorizontal: 19,
        marginBottom: 4,
        fontSize: 17,
    }
});

export default SignUp;

