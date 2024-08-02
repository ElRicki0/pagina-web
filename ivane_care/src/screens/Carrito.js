import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native';
import Boton from '../components/Button/Boton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const ip = '192.168.1.15'; // Dirección IP del servidor 


const Carrito = () => {
    const navigation = useNavigation();
    const [productos, setProductos] = useState([]);
    const [refreshing, setRefreshing] = useState(false);


    useEffect(() => {
        fetchProductos();
    }, []);


    const fetchProductos = async () => {
        try {
            const response = await fetch(`http://${ip}/pagina-web/api/services/public/carrito.php?action=readDetail`, {
                method: 'GET',
            });
            const data = await response.json();
    
            if (data.status && Array.isArray(data.dataset)) {
                console.log('Productos obtenidos:', data.dataset); // Log para verificar datos
                setProductos(data.dataset); // Asegúrate de que estás accediendo a la propiedad correcta
            } else {
                console.error('Error al obtener productos del carrito:', data.message);
            }
        } catch (error) {
            console.error('Error en la solicitud fetch:', error);
        }
    };
    

    const renderProductCard = ({ item }) => {
        // const imageUrl = `http://${ip}/pagina-web/api/images/productos/${item.imagen_producto}`;

        return (
            <TouchableOpacity style={styles.card}
                onPress={() => navigation.navigate('DetalleProducto', {
                    id: item.id_producto,
                    nombre: item.nombre_producto,
                    descripcion: item.cantidad_pedido,
                    precio: item.precio,
                    precio_pedido: item.precio_pedido
                })}>
                <Text style={styles.cardText}><Text style={styles.boldText}>{item.nombre_producto}</Text></Text>
                <Text style={styles.cardTextDescrip}>Cantidad del pedido: {item.cantidad_pedido}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1, height: 4, borderRadius: 30, backgroundColor: '#6C5FFF', marginTop: 20, marginBottom: 10 }} />
                </View>
                <Text style={styles.cardText}>
                    <Text style={styles.boldText}>Subtotal:  ${item.precio}</Text>
                </Text>
                <Text style={styles.cardText}>
                    <Text style={styles.boldText}>Precio unitario:  ${item.precio_pedido}</Text>
                </Text>
            </TouchableOpacity>
        );
    };



    return (
        <ScrollView style={styles.scrollView}
            persistentScrollbar={true}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                {productos.map((item) => renderProductCard({ item }))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    scrollView: {
        backgroundColor: 'transparent',
        marginHorizontal: 20,
    },
    card: {
        backgroundColor: '#fff',
        width: 330,
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
    cardText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#555',
    },
    cardTextDescrip: {
        fontSize: 16,
        marginBottom: 5,
        color: '#555',
    },

    cartButton: {
        marginTop: 16,
        padding: 10,
        backgroundColor: '#6200EE',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Carrito;