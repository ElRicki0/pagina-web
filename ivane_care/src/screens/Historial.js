import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, RefreshControl, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { SERVER } from '../../contexts/Network';


const ip = '192.168.1.15'; // Dirección IP del servidor 

const Historial = () => {
    const navigation = useNavigation();
    // Funcion para mostrar productos segun la base
    const [Historial, setHistorial] = useState([]);

    useEffect(() => {
        getHistorial();
    }, []);

    // Constante para obtener los productos
    const getHistorial = async () => {
        try {
            const response = await fetch(`${SERVER}services/public/historial.php?action=readAll`, {
                method: 'GET',
            });

            const data = await response.json();
            if (data.status) {
                setHistorial(data.dataset);
                console.log(data.dataset);
            } else {
                console.log(data.error);
            }
        } catch (error) {
            console.error('Error al obtener los datos :', error);
        }
    };

    // constante para renderizar los item de los productos
    const renderHistorylCard = ({ item }) => {
        const imageUrl = `${SERVER}images/productos/${item.imagen_producto}`;

        return (
            <View style={styles.card}
                onPress={() => navigation.navigate('DetalleProducto', {
                    id: item.id_producto,
                    nombre: item.nombre_producto,
                    direccionP: item.direccion_pedido,
                    fecha: item.fecha_registro,
                    imagen: item.imagen_producto
                })}>
                <View style={styles.cardImage}>
                    <Image source={{ uri: imageUrl }} style={styles.productImage} />
                </View>
                <Text style={styles.cardText}><Text style={styles.boldText}>Uno de los productos: {item.nombre_producto}</Text></Text>
                <Text style={styles.cardTextDescrip}>Direccion del pedido: {item.direccion_pedido}</Text>
                <Text style={styles.cardTextDescrip}>Fecha del pedido: {item.fecha_registro}</Text>
            </View>
        );
    };

    // constante para refrescar la pagina 
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            getHistorial(); // Se manda a llamar de nuevo a getProductos para refrescar los datos
            setRefreshing(false);
        }, 2000);
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Historial de compras</Text>
            {Historial.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Image source={require('../img/NoHistorial.png')} style={styles.image} />
                    <Text style={styles.texto3}>No tiene historial de compras</Text>
                </View>
            ) : (
                <FlatList
                    data={Historial}
                    renderItem={renderHistorylCard}
                    keyExtractor={(item) => item.id_cliente}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 20, // Alinea el botón 20 unidades desde la parte superior
        left: 20, // Alinea el botón 20 unidades desde la izquierda
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 25,
        marginTop: -20,
        backgroundColor: '#0A2B32',
        padding: 22,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        width: 330, // Añadido para limitar el ancho de la tarjeta
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        elevation: 10,
        shadowColor: '#7600A5',
        shadowOffset: {
            width: 5,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.0,
    },
    cardImage: {
        alignItems: 'center',
    },
    productImage: {
        width: 170, // Ajusta el tamaño según sea necesario
        height: 170, // Ajusta el tamaño según sea necesario
        marginBottom: 10,
        borderRadius: 10, // Opcional, para darle bordes redondeados a la imagen
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    cardText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#555',
    },
    boldText: {
        fontWeight: 'bold',
    },
    // Estilo para la imagen al no tener historial
    texto3: {
        fontSize: 25,
        textAlign: 'center',
        color: 'black',
    },
    image: {
        width: 300,
        height: 300,
    },
    emptyContainer: {
        marginTop:20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 20,
        width: 340,
    },
});

export default Historial;
