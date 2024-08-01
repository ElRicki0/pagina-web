// ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import Boton from '../components/Button/Boton';
import Input from '../components/Input/InputPerfil';



const Perfil = ({ logueado, setLogueado }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);


    const [Perfil, setPerfil] = useState({
        nombre_cliente: '',
        apellido_cliente: '',
        telefono_cliente: '',
        residencia_cliente: '',
        alias_cliente: '',
        correo_cliente: ''
    });

    // Constante para obtener los datos del cliente
    const getCliente = async () => {
        try {
            const response = await fetch(`http://${ip}/pagina-web/api/services/public/cliente.php?action=readProfile`, {
                method: 'GET',
            });

            const data = await response.json();
            if (data.status === 1 && data.dataset) {
                setPerfil(data.dataset);
                console.log(data.dataset);
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error('Error al obtener los datos de su cuenta :', error);
        }
    };

    useEffect(() => {
        getCliente();
    }, []);


    console.log(logueado)

    const ip = '192.168.1.3';
    const navigation = useNavigation();

    // constante para cerar sesion (simplemente redirije al login si la accion esta completada)
    const goToEdit = () => {
        navigation.navigate('LoginStackScreen', { screen: 'EditarPerfil' })
    }



    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        setTimeout(() => {
            handleLogOut();
        }, 1000);
    };

    // console.log(goToLogin());
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

    const toggleModalData = () => {
        setIsSecondModalVisible(!isSecondModalVisible);
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
                <Text style={styles.Text}>Nombre</Text>
                <Input
                    placeHolder='Nombre...'
                    style={styles.input}
                    value={Perfil.nombre_cliente}
                    editable={false}
                />
                <Text style={styles.Text}>Apellido</Text>
                <Input
                    placeHolder='Nombre...'
                    style={styles.input}
                    value={Perfil.apellido_cliente}
                    editable={false}
                />
                <Text style={styles.Text}>Correo</Text>
                <Input
                    placeHolder='Correo...'
                    style={styles.input}
                    value={Perfil.correo_cliente}
                    editable={false}
                />
                <Text style={styles.Text}>Usuario</Text>
                <Input
                    placeHolder='Usuario...'
                    style={styles.input}
                    value={Perfil.alias_cliente}
                    editable={false}
                />
                <Text style={styles.Text}>telefono</Text>
                <Input
                    placeHolder='Telefono...'
                    style={styles.input}
                    value={Perfil.telefono_cliente}
                    editable={false}
                />
                <Text style={styles.Text}>Dirección</Text>
                <Input
                    placeHolder='Direccion...'
                    style={styles.input}
                    value={Perfil.residencia_cliente}
                    editable={false}
                />
                <View style={styles.containerBoton}>
                    <Boton textoBoton="Editar" accionBoton={toggleModalData} iconName={"account-edit-outline"} />
                </View>
            </ScrollView>

            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Sesión cerrada</Text>
                    <Text style={styles.modalMessage}>Has cerrado sesión correctamente</Text>
                </View>
            </Modal>

            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Actualizacion de datos</Text>
                    <Text style={styles.modalMessage}>Has cerrado sesión correctamente</Text>
                    <ScrollView
                        style={styles.scrollView}
                        persistentScrollbar={true}
                        contentContainerStyle={styles.scrollViewContent}
                        showsVerticalScrollIndicator={false}
                    >
                        <Text style={styles.Text}>Nombre</Text>
                        <Input
                            placeHolder='Nombre...'
                            style={styles.input}
                            value={Perfil.nombre_cliente}
                            editable={false}
                        />
                        <Text style={styles.Text}>Apellido</Text>
                        <Input
                            placeHolder='Apellido...'
                            style={styles.input}
                            value={Perfil.apellido_cliente}
                            editable={false}
                        />
                        <Text style={styles.Text}>Correo</Text>
                        <Input
                            placeHolder='Correo...'
                            style={styles.input}
                            value={Perfil.correo_cliente}
                            editable={false}
                        />
                        <Text style={styles.Text}>Usuario</Text>
                        <Input
                            placeHolder='Usuario...'
                            style={styles.input}
                            value={Perfil.alias_cliente}
                            editable={false}
                        />
                        <Text style={styles.Text}>Telefono</Text>
                        <Input
                            placeHolder='Telefono...'
                            style={styles.input}
                            value={Perfil.telefono_cliente}
                            editable={false}
                        />
                        <Text style={styles.Text}>Dirección</Text>
                        <Input
                            placeHolder='Direccion...'
                            style={styles.input}
                            value={Perfil.residencia_cliente}
                            editable={false}
                        />
                        <View style={styles.containerBoton}>
                            <Boton textoBoton="Guardar" accionBoton={goToEdit} iconName={"account-edit-outline"} />
                        </View>
                    </ScrollView>
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
    // Estilo inputs
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
        marginTop: 20,
    },

});

export default Perfil;

