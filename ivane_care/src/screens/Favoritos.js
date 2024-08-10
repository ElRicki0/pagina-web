import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ip = '192.168.1.3'; // Dirección IP del servidor 

const Favorito = () => {
    const navigation = useNavigation();
    const [productos, setProductos] = useState([]);
    const [refreshing, setRefreshing] = useState(false);


    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        try {
            const response = await fetch(`http://${ip}/pagina-web/api/services/public/lista_deseo.php?action=readOne`, {
                method: 'GET',
            });
            const data = await response.json();

            if (data.status && Array.isArray(data.dataset)) {
                setProductos(data.dataset); // Asegúrate de que estás accediendo a la propiedad correcta
            } else {
                console.error('Error al obtener productos favoritos:', data.message);
            }
        } catch (error) {
            console.error('Error en la solicitud fetch:', error);
        }
    };

    const renderProductCard = ({ item }) => {
        const imageUrl = `http://${ip}/pagina-web/api/images/productos/${item.imagen_producto}`;

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
        <ScrollView style={styles.scrollView}
            persistentScrollbar={true}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
});

export default Favorito;
