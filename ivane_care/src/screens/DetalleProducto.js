import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Image, FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Input from '../components/Input/InputCarrito';
import Boton from '../components/Button/BotonCarrito';

import Boton2 from '../components/Button/BotonFavorito';



const ip = '192.168.137.1'; // Dirección IP del servidor 

const DetailProduct = ({ route }) => {

    // Funcion para mostrar productos segun la base
    const [Productos, setProductos] = useState([]);

    useEffect(() => {
        getProductos();
    }, []);

    // Constante para obtener los productos
    const getProductos = async () => {
        try {
            const response = await fetch(`http://${ip}/pagina-web/api/services/public/producto.php?action=read2Products`, {
                method: 'GET',
            });

            const data = await response.json();
            if (data.status) {
                setProductos(data.dataset);
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error('Error al obtener los productos :', error);
        }
    };


    // constante para renderizar los item de los productos
    const renderProductCard = ({ item }) => {
        const imageUrl = `http://${ip}/pagina-web/api/images/productos/${item.imagen_producto}`;

        return (
            <TouchableOpacity style={styles.card}
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



    const [ValorCarrito, setValorCarrito] = useState('');

    const navigation = useNavigation();

    const irACarrito = () => {
        navigation.navigate('Carrito');
    };

    const irAFavorito = () => {
        navigation.navigate('Favorito');
    };


    const { id, nombre, descripcion, precio, imagen } = route.params;
    const imageUrl = `http://${ip}/pagina-web/api/images/productos/${imagen}`;

    return (
        <ScrollView
            style={styles.scrollView}
            persistentScrollbar={true}
            showsVerticalScrollIndicator={false} // Oculta el indicador de desplazamiento vertical 
        >
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={60} color="#6C5FFF" />
                </TouchableOpacity>
                <View style={styles.CardContainer}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: imageUrl }} style={styles.productImage} />
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.productTitle}>{nombre}</Text>
                        <Text style={styles.productDescription}>{descripcion}</Text>
                        <Text style={styles.productPrice}>$ {precio}</Text>
                        <Boton2 textoBoton="" accionBoton={irAFavorito} iconName="heart-circle" />
                    </View>
                </View>
                <View style={styles.CardContainer2}>
                    <Input
                        placeHolder='Cantidad...'
                        style={styles.input}
                        setValor={ValorCarrito}
                        setTextChange={setValorCarrito}
                    />
                    <Boton textoBoton="" accionBoton={irACarrito} iconName="cart" />
                </View>

            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 23, marginBottom: 23 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: '#6C5FFF' }} />
                <View>
                    <Text style={{
                        width: 130, textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#6C5FFF'
                    }}>Algunos de Nuestros productos </Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: '#6C5FFF' }} />
            </View>
            <FlatList
                data={Productos} // Los datos que se van a renderizar en la lista
                renderItem={({ item, index }) => {
                    // Si el índice es par, se renderiza una fila con dos tarjetas
                    if (index % 2 === 0) {
                        return (
                            <View style={styles.row}>
                                {renderProductCard({ item })}
                                {index + 1 < Productos.length && renderProductCard({ item: Productos[index + 1] })}
                            </View>
                        );
                    } else {
                        return null; // Si el índice es impar, no se renderiza nada
                    }
                }}
                keyExtractor={(item) => item.id_producto.toString()} // Clave única para cada elemento de la lista
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    scrollView: {
        backgroundColor: 'transparent',
        marginHorizontal: 10,
    },
    CardContainer: {
        backgroundColor: '#E7E7E7',
        borderRadius: 20,
        flexDirection: 'row',
        width: '100%', // Ajusta el ancho del contenedor de la tarjeta
    },
    CardContainer2: {
        marginTop: 20,
        backgroundColor: '#E7E7E7',
        borderRadius: 20,
        flexDirection: 'row',
        width: '100%', // Ajusta el ancho del contenedor de la tarjeta
    },
    imageContainer: {
        flex: 1, // Ocupa la mitad del espacio disponible
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
    },
    productImage: {
        width: 180,
        height: 180,
        marginBottom: 20,
    },
    detailsContainer: {
        flex: 1, // Ocupa la mitad del espacio disponible
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    productDescription: {
        fontSize: 16,
        marginBottom: 20,
    },
    productPrice: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    // estilo de cards prueba base
    card: {
        backgroundColor: '#E7E7E7',
        width: 165, // Añadido para limitar el ancho de la tarjeta
        height: 430,
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    cardImage: {
        alignItems: 'center',
    },
    cardText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#260035',
        textAlign: 'center',
    },
    cardTextDescrip: {
        fontSize: 13,
        flexWrap: 'wrap', // Permite que el texto se ajuste a múltiples líneas si es necesario
    },
    boldText: {
        fontWeight: 'bold',
    },
    productImage: {
        width: 150, // Ajusta el tamaño según sea necesario
        height: 150, // Ajusta el tamaño según sea necesario
        marginBottom: 10,
        borderRadius: 10, // Opcional, para darle bordes redondeados a la imagen
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20, // Espacio entre las filas
    },
});

export default DetailProduct;
