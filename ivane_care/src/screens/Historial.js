import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, RefreshControl, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ip = '172.20.10.4'; // Dirección IP del servidor 

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
            const response = await fetch(`http://${ip}/pagina-web/api/services/public/historial.php?action=readAll`, {
                method: 'GET',
            });

            const data = await response.json();
            if (data.status) {
                setHistorial(data.dataset);
                console.log(data.dataset);
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error('Error al obtener los datos :', error);
        }
    };

    // constante para renderizar los item de los productos
    const renderHistorylCard = ({ item }) => {
        const imageUrl = `http://${ip}/pagina-web/api/images/productos/${item.imagen_producto}`;

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
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={60} color="#6C5FFF" />
                </TouchableOpacity>
                <Text style={styles.title}>Historial de compras</Text>

                <FlatList
                    data={Historial}
                    renderItem={renderHistorylCard}
                    keyExtractor={(item) => item.id_cliente}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
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
        marginTop: 70, // Espacio adicional arriba del título
        marginBottom: 20,
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
});

export default Historial;
