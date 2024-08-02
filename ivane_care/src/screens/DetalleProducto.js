import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Input from '../components/Input/InputCarrito';
import Boton from '../components/Button/BotonCarrito';
import Modal from 'react-native-modal';

import Boton2 from '../components/Button/BotonFavorito';

const ip = '192.168.1.15'; // Dirección IP del servidor 

const DetailProduct = ({ route }) => {
    console.log('Route params:', route.params); // Agrega este console.log para verificar los parámetros

    const [Productos, setProductos] = useState([]);
    const [Cantidad, setCantidad] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const { idProducto } = route.params;

    useEffect(() => {
        getProductos();
    }, []);

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

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getProductos().finally(() => setRefreshing(false));
    }, []);

    const SendToFavorite = async () => {
        if (!id) {
            console.error("idProducto está indefinido");
            return;
        }

        try {
            const form = new FormData();
            form.append('idProducto', id);

            const response = await fetch(`http://${ip}/pagina-web/api/services/public/lista_deseo.php?action=createRow`, {
                method: 'POST',
                body: form,
            });

            const data = await response.json();
            console.log('Response data:', data);
            console.log('idProducto:', id);

            if (data.status) {
                setModalVisible(true); // Muestra el modal cuando el producto se agrega a favoritos
                setTimeout(() => {
                    setModalVisible(false); // Oculta el modal después de 2 segundos
                    irAFavorito();
                }, 2000);
            } else {
                alert('Ocurrió un error.');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const [ValorCarrito, setValorCarrito] = useState('');

    const navigation = useNavigation();

    const irACarrito = () => {
        navigation.navigate('Carrito');
    };

    const irAFavorito = () => {
        const producto = { id, nombre, descripcion, precio, imagen };
        console.log('Navegando a Favorito con producto:', JSON.stringify(producto));

        navigation.navigate('Favorito', { producto });
    };

    const { id, nombre, descripcion, precio, imagen } = route.params;
    const imageUrl = `http://${ip}/pagina-web/api/images/productos/${imagen}`;

    return (
        <>
            <FlatList
                style={styles.flatList}
                ListHeaderComponent={
                    <>
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
                                    <Boton2 textoBoton="" accionBoton={SendToFavorite} iconName="heart-circle" />
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
                    </>
                }
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
            />

            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Producto agregado</Text>
                    <Text style={styles.modalMessage}>Producto agregado a su lista de deseos</Text>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    flatList: {
        backgroundColor: 'transparent',
        marginHorizontal: 10,
    },
    container: {
        flex: 1,
        marginTop: 20,
    },
    CardContainer: {
        backgroundColor: '#E7E7E7',
        borderRadius: 20,
        flexDirection: 'row',
        width: '100%',
    },
    CardContainer2: {
        marginTop: 20,
        backgroundColor: '#E7E7E7',
        borderRadius: 20,
        flexDirection: 'row',
        width: '100%',
    },
    imageContainer: {
        flex: 1,
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
    card: {
        backgroundColor: '#E7E7E7',
        width: 175,
        height: 470,
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
        alignItems: 'center',
    },
    cardImage: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
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
        flexWrap: 'wrap',
    },
    boldText: {
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
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
        textAlign: 'center',
    },
    modalButton: {
        marginTop: 10,
    },
});

export default DetailProduct;
