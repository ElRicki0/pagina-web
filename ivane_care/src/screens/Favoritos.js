import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, RefreshControl, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { SERVER } from '../../contexts/Network';


const ip = '192.168.1.15'; // Dirección IP del servidor 

const Favorito = () => {
    const navigation = useNavigation();
    const [productos, setProductos] = useState([]);
    const [refreshing, setRefreshing] = useState(false);


    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        try {
            const response = await fetch(`${SERVER}services/public/lista_deseo.php?action=readOne`, {
                method: 'GET',
            });
            const data = await response.json();

            if (data.status && Array.isArray(data.dataset)) {
                setProductos(data.dataset); // Asegúrate de que estás accediendo a la propiedad correcta
            } else {
                console.log('Error al obtener productos favoritos:', data.message);
            }
        } catch (error) {
            console.error('Error en la solicitud fetch:', error);
        }
    };

    const renderProductCard = ({ item }) => {
        const imageUrl = `${SERVER}images/productos/${item.imagen_producto}`;

        return (
            <TouchableOpacity  key={item.id_producto} style={styles.card}
                onPress={() => navigation.navigate('DetalleProducto', {
                    id: item.id_producto,
                    nombre: item.nombre_producto,
                    descripcion: item.descripcion_producto,
                    precio: item.precio_producto,
                    imagen: item.imagen_producto
                })}>
                <View style={styles.cardImage}>
                    <Image source={{ uri: imageUrl }} style={styles.productImage} />
                </View>
                <Text style={styles.cardText}><Text style={styles.boldText}>{item.nombre_producto}</Text></Text>
                <Text style={styles.cardTextDescrip}>{item.descripcion_producto}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1, height: 4, borderRadius: 30, backgroundColor: '#6C5FFF', marginTop: 20, marginBottom: 10 }} />
                </View>
                <Text style={styles.cardText}>
                    <Text style={styles.boldText}>$ {item.precio_producto}</Text>
                </Text>
            </TouchableOpacity>
        );
    };


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchProductos().finally(() => setRefreshing(false)); // Refresca los datos y luego establece refreshing en false
    }, []);

    return (
        <View style={styles.container}>
            {productos.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Image source={require('../img/NoFavorito.png')} style={styles.image} />
                    <Text style={styles.texto3}>No tiene productos favoritos</Text>
                </View>
            ) : (
                <FlatList
                    data={productos}
                    renderItem={renderProductCard}
                    keyExtractor={(item) => item.id_producto.toString()}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                />
            )}
        </View>
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
    cardImage: {
        alignItems: 'center',
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    cardText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#555',
    },
    cardTextDescrip: {
        fontSize: 14,
        marginBottom: 5,
        color: '#777',
    },
    boldText: {
        fontWeight: 'bold',
    },
    cartButton: {
        marginTop: 16,
        padding: 10,
        backgroundColor: '#6200EE',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    // Estilo para la imagen al no tener favoritos
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

export default Favorito;
