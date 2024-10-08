import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Input from '../components/Input/InputLogin';
import Boton from '../components/Button/Boton';
import Modal from 'react-native-modal';
import { Button as PaperButton } from 'react-native-paper';
import { SERVER } from '../../contexts/Network';


const LogIn = ({ logueado, setLogueado }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [correo, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const ip = '192.168.1.15';


  // Toggling modal visibility
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const goToHome = () => {
    navigation.navigate('BottomTab');
  };

  const gotoRecup = () => {
    navigation.navigate('RecupClave1');
  };

  // Trigger the modal to show
  const handelLogin = async () => {
    if (!correo || !clave) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    const url = `${SERVER}services/public/cliente.php?action=logIn`;
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
        setLogueado(!logueado);
        setModalVisible(true); // Muestra el modal
      } else {
        Alert.alert('Error de sesión', datos.error);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    }
  };


  // const handleLogOut = async () => {
  //   const url = `${SERVER}services/public/cliente.php?action=logOut`;
  //   try {
  //     const fetchApi = await fetch(url);
  //     const datos = await fetchApi.json();
  //     if (datos.status) {
  //       Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente.');
  //       setLogueado(false);
  //     } else {
  //       Alert.alert('Error al cerrar sesión', datos.error);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     Alert.alert('Error', 'No se pudo conectar con el servidor.');
  //   }
  // };

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
          clave={true}
        />
        <TouchableOpacity>
          <Text style={styles.forgotPassword} onPress={gotoRecup}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
        <View style={styles.containerBoton}>
          <Boton textoBoton="Iniciar Sesión" accionBoton={handelLogin} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUp}>crear cuenta</Text>
        </TouchableOpacity>
      </View>
      <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>¡Bienvenido!</Text>
          <Text style={styles.modalMessage}>Inicio de sesión exitoso</Text>
          <PaperButton mode="contained" onPress={goToHome} style={styles.modalButton}>
            OK
          </PaperButton>
        </View>
      </Modal>

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
  // Estilo del modal para alerta
  modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 20,
    },
    modalButton: {
        marginTop: 10,
    },
});

export default LogIn;
