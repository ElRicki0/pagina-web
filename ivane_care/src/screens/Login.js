import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Input from '../components/Input/InputLogin';
import Boton from '../components/Button/Boton';

const LogIn = ({ logueado, setLogueado }) => {
  const navigation = useNavigation();
  const [correo, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const ip = '10.10.0.168';

  const handelLogin = async () => {
    const url = `http://${ip}/pagina-web/api/services/public/cliente.php?action=logIn`;
    const formData = new FormData();
    formData.append('correo', correo);
    formData.append('clave', clave);

    try {
      const fetchApi = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      const datos = await fetchApi.json();

      if (datos.status) {
        // Muestra una alerta de éxito
        Alert.alert( '¡Bienvenido!','Inicio de sesión exitoso', [
          { text: 'OK', onPress: () => {
              
              navigation.navigate('BottomTab');
            }
          }
        ]);
      } else {
        // Muestra una alerta de error de sesión
        Alert.alert('Error de sesión', datos.error);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    }
  };

  const handleLogOut = async () => {
    const url = `http://${ip}/pagina-web/api/services/public/cliente.php?action=logOut`;
    try {
      const fetchApi = await fetch(url);
      const datos = await fetchApi.json();
      if (datos.status) {
        Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente.');
        setLogueado(false); // Actualiza el estado de logueado
      } else {
        Alert.alert('Error al cerrar sesión', datos.error);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    }
  };

  const backgroundImage = require('../img/FondoLogIn.png');

  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>
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
          clave={true} // Esto asegura que sea campo de contraseña
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
