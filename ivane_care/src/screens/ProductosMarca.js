import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Hook de navegación
import Ionicons from '@expo/vector-icons/Ionicons';
import { SERVER } from '../../contexts/Network';



const ProductosMarca = ({ route }) => {
    const navigation = useNavigation(); // Hook de navegación para cambiar entre pantallas

    // Funcion para mostrar marcas segun la base
    const [Marcas, setMarcas] = useState([]);
    const [Productos, setProductos] = useState([]);

    const getProductosM = async () => {
        try {
            const formData = new FormData();
            formData.append('idMarca', id);

            const response = await fetch(`${SERVER}services/public/producto.php?action=readProductosMarca`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (data.status) {
                setProductos(data.dataset);
                console.log(data.dataset);
            } else {
                console.log(data.error);
            }
        } catch (error) {
            console.error('Error al obtener los productos :', error);
        }
    };

    useEffect(() => {
        getProductosM();
    }, []);


    // constante para renderizar los item de las marcas
    const renderProductCard = ({ item }) => {
        const imageUrl = `${SERVER}images/productos/${item.imagen_producto}`;

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

    // constante para refrescar la pagina 
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            getProductosM(); // Se manda a llamar de nuevo a getProductos para refrescar los datos
            setRefreshing(false);
        }, 2000);
    }, []);

    const { id, nombre, descripcion, imagen } = route.params;
    const imageUrl = `${SERVER}images/marcas/${imagen}`;


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={60} color="#6C5FFF" />
            </TouchableOpacity>
            <View style={styles.imageContainer}>
                <Image source={{ uri: imageUrl }} style={styles.markImage} />
            </View>
            <Text style={styles.title}>{nombre}</Text>
            <Text style={styles.productDescription}>{descripcion}</Text>

            {Productos.length === 0 ? (
                <Text style={styles.texto2}>No existen productos de esta marca</Text>
            ) : (
                <FlatList
                    data={Productos}
                    renderItem={({ item, index }) => {
                        if (index % 2 === 0) {
                            return (
                                <View style={styles.row}>
                                    {renderProductCard({ item })}
                                    {index + 1 < Productos.length && renderProductCard({ item: Productos[index + 1] })}
                                </View>
                            );
                        } else {
                            return null;
                        }
                    }}
                    keyExtractor={(item) => item.id_producto.toString()}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    ListFooterComponent={<View style={{ height: 150 }} />} // Añade espacio al final de la lista
                />
            )}
        </View>

    );
}

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
        textAlign: 'center',
        marginTop: 90, // Espacio adicional arriba del título
        marginBottom: 20,
    },
    texto2: {
        fontSize: 30,
        marginBottom: 10,
        textAlign: 'center',
        color:'black',
        backgroundColor: '#E8E5FF',
        borderRadius: 20,
        width: 300,
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
    markImage: {
        width: 80, // Ajusta el tamaño según sea necesario
        height: 80, // Ajusta el tamaño según sea necesario
        marginBottom: 10,
        borderRadius: 100, // Opcional, para darle bordes redondeados a la imagen
        alignItems: 'center',
        borderColor: '#6C5FFF',
        borderWidth: 4,
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
    CardContainer: {
        backgroundColor: '#E7E7E7',
        borderRadius: 20,
        flexDirection: 'row',
        width: '100%',
    },
    imageContainer: {
        position: 'absolute',
        top: 10, // Alinea el botón 20 unidades desde la parte superior
        right: 20, // Alinea el botón 20 unidades desde la izquierda
    },
    productImage: {
        width: 180,
        height: 180,
        marginBottom: 20,
    },
    detailsContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    productDescription: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    productPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    FlatList: {
        marginBottom: 90,
    },
});

export default ProductosMarca;
