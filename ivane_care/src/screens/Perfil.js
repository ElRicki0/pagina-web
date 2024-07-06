// ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import { Provider as PaperProvider, Button as PaperButton } from 'react-native-paper';




const Perfil = (logueado, setLogueado) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const ip = '192.168.1.15';
    const navigation = useNavigation();

    // constante para cerar sesion (simplemente redirije al login si la accion esta completada)
    const goToLogin = () => {
        navigation.navigate('LoginScreen')
    }

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
                Alert.alert('Error al cerrar sesión', datos.error);
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'No se pudo conectar con el servidor.');
        }
    };


    return (
        <View style={styles.container}>
            <Text>Perfil </Text>
            <TouchableOpacity style={styles.LogOutButton} onPress={handleLogOut}>
                <Icon name="logout" size={60} color="#6C5FFF" />
            </TouchableOpacity>
            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Sesión cerrada</Text>
                    <Text style={styles.modalMessage}>Has cerrado sesión correctamente</Text>
                    <PaperButton mode="contained" onPress={goToLogin} style={styles.modalButton}>
                        OK
                    </PaperButton>
                </View>
            </Modal>
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
});

export default Perfil;

