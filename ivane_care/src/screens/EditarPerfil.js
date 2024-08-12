import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { Provider as PaperProvider, Button as PaperButton } from 'react-native-paper';
import Boton from '../components/Button/Boton';
import Input from '../components/Input/InputPerfil';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SERVER } from '../../contexts/Network';



const ip = '192.168.1.15'; // Dirección IP del servidor 

const EditarPerfil = ({ logueado, setLogueado }) => {
    const [Perfil, setPerfil] = useState({
        nombre_cliente: '',
        apellido_cliente: '',
        telefono_cliente: '',
        residencia_cliente: '',
        alias_cliente: '',
        correo_cliente: ''
    });

    const getCliente = async () => {
        try {
            const response = await fetch(`${SERVER}services/public/cliente.php?action=readProfile`, {
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

    const navigation = useNavigation();

    // constante para cerar sesion (simplemente redirije al login si la accion esta completada)
    const goToEdit = () => {
        navigation.navigate('LoginStackScreen', { screen: 'Perfil' })
    }


    // Definir la ruta de la imagen de fondo con require
    const backgroundImage = require('../img/Fondo.png');

    return (
        <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
            <Text style={styles.title}>Editar Perfil</Text>

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
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 25,
        marginTop: 0,
        backgroundColor: '#0A2B32',
        padding: 22,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        textAlign: 'center',
    },
    Text: {

        marginBottom: 10,
        marginLeft: 30,
        color: '#0B003D',
        textDecorationStyle: 'double',
        fontSize: 24,
        textAlign: 'left',
        alignSelf: 'flex-start',
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
        elevation: 7,
        marginBottom: 20,
        borderRadius: 10,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    inputMask: {
        color: "black",
        fontWeight: '900',
        width: 300,
        height: 50,
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 4,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 19,
        marginBottom: 4,
        fontSize: 17,
    },
    scrollView: {
        flex: 1,
        marginTop: 50,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
});

export default EditarPerfil;
