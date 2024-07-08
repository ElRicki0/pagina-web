// ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import { Provider as PaperProvider, Button as PaperButton } from 'react-native-paper';
import Boton from '../components/Button/Boton';
import Input from '../components/Input/InputPerfil';


const ip = '192.168.137.1'; // Dirección IP del servidor 

const Perfil = (logueado, setLogueado) => {
    const [isModalVisible, setModalVisible] = useState(false);

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

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

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
            <TouchableOpacity style={styles.LogOutButton} onPress={handleLogOut}>
                <Icon name="logout" size={60} color="#6C5FFF" />
            </TouchableOpacity>
            <ScrollView style={styles.scrollView}
                persistentScrollbar={true}
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false} // Oculta el indicador de desplazamiento vertical 
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
                            <Boton textoBoton="Editar Perfil" accionBoton={goToLogin} />
                        </View>
            </ScrollView>
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
        flexDirection: 'col',
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
});

export default Perfil;

