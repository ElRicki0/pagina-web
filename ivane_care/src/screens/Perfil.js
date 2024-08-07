// ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import Boton from '../components/Button/BotonPerfil';



const Perfil = ({ logueado, setLogueado }) => {
    const [isModalVisible, setModalVisible] = useState(false);

    console.log(logueado)

    const ip = '172.20.10.4';
    const navigation = useNavigation();

    // constante para cerar sesion (simplemente redirije al login si la accion esta completada)
    const goToEdit = () => {
        navigation.navigate('LoginStackScreen', { screen: 'EditarPerfil' })
    }


    const goToHistory = () => {
        navigation.navigate('LoginStackScreen', { screen: 'Historial' })
    }


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        setTimeout(() => {
            handleLogOut();
        }, 1000);
    };

    //Constante de cierre de sesión
    const handleLogOut = async () => {
        const url = `http://${ip}/pagina-web/api/services/public/cliente.php?action=logOut`;
        try {
            const fetchApi = await fetch(url);
            const datos = await fetchApi.json();
            if (datos.status) {
                toggleModal(); // Muestra el modal
                setLogueado(false); // Actualiza el estado de logueado
            } else {
                console.log('Error al cerrar sesión');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'No se pudo conectar con el servidor.');
        }
    };



    // Definir la ruta de la imagen de fondo con require
    const backgroundImage = require('../img/Fondo.png');

    return (
        <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>

            <TouchableOpacity style={styles.LogOutButton} onPress={toggleModal}>
                <Icon name="logout" size={60} color="#6C5FFF" />
            </TouchableOpacity>

            <ScrollView style={styles.scrollView}
                persistentScrollbar={true}
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.containerBoton}>
                    <Boton textoBoton="Editar" accionBoton={goToEdit} iconName={"account-edit-outline"} />
                    <Boton textoBoton="Historial" accionBoton={goToHistory} iconName={"clipboard-text-clock-outline"} />
                </View>
            </ScrollView>

            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Sesión cerrada</Text>
                    <Text style={styles.modalMessage}>Has cerrado sesión correctamente</Text>
                </View>
            </Modal>
        </ImageBackground>

    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerBoton:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'col', // Para alinear los botones en una fila
        marginTop: 50,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', // Ajusta la imagen para cubrir toda la pantalla
        height: '100%', // Ajusta la imagen para cubrir toda la pantalla
    },
    signUp: {
        color: 'black',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    LogOutButton: {
        position: 'absolute',
        top: 20, // Alinea el botón 20 unidades desde la parte superior
        right: 20, // Alinea el botón 20 unidades desde la izquierda
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
    scrollView: {
        flex: 1,
        marginTop: 20,
    },

});

export default Perfil;

