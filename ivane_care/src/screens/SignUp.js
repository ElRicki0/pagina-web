import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Boton from '../components/Button/Boton';
import Input from '../components/Input/InputSignUp';


const backgroundImage = require('../img/FondoSigUp.png');


const SignUp = () => {
    return (
        <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
            <View style={styles.container}>
                <Text style={styles.tittle}>Crear cuenta</Text>
                {/* Aquí puedes agregar más contenido de la pantalla */}
            </View>
        </ImageBackground>

    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    tittle: {
        fontSize: 30,
        textAlign:'center',
        position: 'absolute',
        top: 70, // Alinea el botón 20 unidades desde la parte superior
        color: 'white',
    },
});

export default SignUp;

