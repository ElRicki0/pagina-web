import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, ImageBackground, RefreshControl} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { Provider as PaperProvider, Button as PaperButton } from 'react-native-paper';
import Boton from '../components/Button/Boton';
import Input from '../components/Input/InputPerfil';
import { TextInputMask } from 'react-native-masked-text'; // Dependencia para el texto de telefono, esto es para poder utilizar una maskara de dijitos
import Ionicons from '@expo/vector-icons/Ionicons';
import { SERVER } from '../../contexts/Network';



const ip = '192.168.1.15'; // Dirección IP del servidor 

const EditarPerfil = () => {
    const [Perfil, setPerfil] = useState({
    });

    const [nombre, setName] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [residencia, setResidencia] = useState('');
    const [alias, setAlias] = useState('');
    const [correo, setCorreo] = useState('');

    //Accion para tomar los valores del cliente
    const getCliente = async () => {
        try {
            const response = await fetch(`${SERVER}services/public/cliente.php?action=readProfile`, {
                method: 'GET',
            });
            const data = await response.json();
            if (data.status === 1 && data.dataset) {
                const profileData = data.dataset;
                setName(profileData.nombre_cliente);
                setApellido(profileData.apellido_cliente);
                setTelefono(profileData.telefono_cliente);
                setResidencia(profileData.residencia_cliente);
                setAlias(profileData.alias_cliente);
                setCorreo(profileData.correo_cliente);
                setPerfil(profileData);
                console.log(data.dataset);
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error('Error al obtener los datos de su cuenta :', error);
        }
    };

    //Accion para tomar actualizar datos del cliente
    const UpdateProfile = async () => {
        const regex = /^[A-Za-z\s]+$/;

        //Validando nombre
        if (nombre.length < 4) {
            Alert.alert('Nombre inválido', 'El nombre debe tener al menos 4 caracteres.');
            return;
        }

        if (!regex.test(nombre)) {
            Alert.alert('Nombre inválido', 'El nombre solo debe contener letras.');
            return false;
        }

        //Validando apellido
        if (apellido.length < 4) {
            Alert.alert('Apellido inválido','El apellido debe tener al menos 4 caracteres.');
            return;
        }

        if (!regex.test(apellido)) {
            Alert.alert('Apellido inválido', 'El nombre solo debe contener letras.');
            return false;
        }

        //Validando alias
        if (alias.length < 6) {
            alert('El alias debe tener al menos una lonjitud de 6 caracteres');
            return;
        }

        //Validando telefono
        if (!/^[267]\d{3}-\d{4}$/.test(telefono)) {
            alert('El teléfono debe tener el formato (2, 6, 7)###-####');
            return;
        }

        try {

            // Si todos los campos son válidos, proceder con la creación del usuario
            //Creamos el forms que mandara los datos a la api
            const form = new FormData();
            form.append('nombreCliente', nombre);
            form.append('apellidoCliente', apellido);
            form.append('direccionCliente', residencia);
            form.append('aliasCliente', alias);
            form.append('telefonoCliente', telefono);


            const response = await fetch(`${SERVER}services/public/cliente.php?action=editProfileMobile`, {
                method: 'POST',
                body: form,
            });

            const data = await response.json();
            console.log(form);

            if (data.status) {
                //Muestra una alerta de exito
                console.log('Tu cuenta se ha actualizado exitosamente');
                Alert.alert('Éxito', 'Perfil actualizado correctamente');
            } else {
                console.log('Sorry');
                console.log('Error:', data.error || 'Ocurrió un error desconocido'); // Muestra el error proporcionado por la API
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Error al actualizar el perfil');
        }
    }


    useEffect(() => {
        getCliente();
    }, []); // Solo se ejecuta al montar el componente


    const navigation = useNavigation();

     // constante para refrescar la pagina 
     const [refreshing, setRefreshing] = React.useState(false);

     const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            getCliente(); // Se manda a llamar de nuevo a getCliente para refrescar los datos
            setRefreshing(false);
        }, 2000);
    }, []);

    // Definir la ruta de la imagen de fondo con require
    const backgroundImage = require('../img/Fondo.png');

    return (
        <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
            <Text style={styles.title}>Editar Perfil</Text>
            <Text style={styles.texto}>El correo no es editable.</Text>

            <ScrollView style={styles.scrollView}
                persistentScrollbar={true}
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <Text style={styles.Text}>Nombre</Text>
                <Input
                    placeHolder='Nombre...'
                    style={styles.input}
                    value={nombre}
                    onChangeText={setName}
                />
                <Text style={styles.Text}>Apellido</Text>
                <Input
                    placeHolder='Apellido...'
                    style={styles.input}
                    value={apellido}
                    onChangeText={setApellido}
                />
                <Text style={styles.Text}>Correo</Text>
                <Input
                    placeHolder='Correo...'
                    style={styles.input}
                    value={correo}
                    onChangeText={setCorreo}
                    setState={false}
                />
                <Text style={styles.Text}>Usuario</Text>
                <Input
                    placeHolder='Usuario...'
                    style={styles.input}
                    value={alias}
                    onChangeText={setAlias}
                />
                <Text style={styles.Text}>Telefono</Text>
                <TextInputMask
                            type={'custom'}
                            options={{
                                mask: '9999-9999'
                            }}
                            style={styles.inputMask}
                            value={telefono}
                            onChangeText={setTelefono}
                            keyboardType="numeric"
                            placeholder='0000-0000'
                            placeholderTextColor='#000'
                        />
                <Text style={styles.Text}>Dirección</Text>
                <Input
                    placeHolder='Direccion...'
                    style={styles.input}
                    value={residencia}
                    onChangeText={setResidencia}
                />
                <View style={styles.containerBoton}>
                    <Boton textoBoton="Guardar" accionBoton={UpdateProfile} iconName={"account-edit-outline"} />
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
    texto: {
        fontSize: 15,
        marginBottom: 20,
        textAlign: 'center',
        backgroundColor: '#ebebeb',
        borderRadius: 20,
        width: 340,
        marginLeft: 30,
        padding: 20,
        justifyContent:'center',
        alignItems:'center',
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
        alignSelf: 'center',
        textAlign: 'center',
        alignContent: 'center',
    },
    scrollViewContent: {
        flexGrow: 1,
    },
});

export default EditarPerfil;
