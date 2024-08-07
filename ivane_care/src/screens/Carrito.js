import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native';
import Boton from '../components/Button/Boton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const ip = '192.168.137.1'; // Dirección IP del servidor 


const Carrito = ({ route }) => {
    const { idPedido } = route.params || {}; // Obtén idPedido de los parámetros de navegación

    const navigation = useNavigation();
    const [productos, setProductos] = useState([]);
    const [refreshing, setRefreshing] = useState(false);



    useEffect(() => {
        if (idPedido) {
            console.log('idPedido recibido en Carrito:', idPedido);
            fetchProductos();
        }
    }, [idPedido]);


    const fetchProductos = async () => {
        try {
            const response = await fetch(`http://${ip}/pagina-web/api/services/public/carrito.php?action=readDetail&idPedido=${idPedido}`, {
                method: 'GET',
            });
            const data = await response.json();
    
            if (data.status && Array.isArray(data.dataset)) {
                console.log('Productos obtenidos:', data.dataset); // Verifica los datos
                setProductos(data.dataset); // Asegúrate de que el formato sea correcto
                console.log('idPedido recibido en Carrito:', idPedido);

            } else {
                alert('No tiene aún productos en su carrito');
                console.error('Error al obtener productos del carrito:', data.message);
            }
        } catch (error) {
            console.error('Error en la solicitud fetch:', error);
        }
    };
    

    const deleteProduct = async (idDetalle) => {
        console.log('ID a eliminar:', idDetalle); // Verifica que idDetalle tenga un valor

        // Crea un nuevo objeto FormData
        const FORM = new FormData();
        FORM.append('idDetalle', idDetalle); // Usa el nombre correcto del parámetro

        try {
            // Realiza la solicitud fetch usando FormData
            const response = await fetch(`http://${ip}/pagina-web/api/services/public/carrito.php?action=deleteDetail`, {
                method: 'POST',
                body: FORM,
            });

            // Obtén la respuesta como texto y luego como JSON
            const text = await response.text();
            console.log('Respuesta del servidor:', text);

            // Intenta analizar la respuesta como JSON
            const data = JSON.parse(text);

            if (data.status) {
                setProductos((prevProductos) => prevProductos.filter((producto) => producto.id_detalle_entrega !== idDetalle));
                alert('El producto selecionado se ha eliminado de su carrito');
            } else {
                alert('Error al eliminar el producto del carrito');
                console.error('Error al eliminar el producto:', data.error || data.message);
            }
        } catch (error) {
            console.error('Error en la solicitud fetch:', error);
        }
    };


    const finishOrder = async () => {
        if (!idPedido) {
            alert('No hay un pedido para finalizar');
            return;
        }

        const FORM = new FormData();
        FORM.append('idPedido', idPedido);

        try {
            const response = await fetch(`http://${ip}/pagina-web/api/services/public/carrito.php?action=finishOrder`, {
                method: 'POST',
                body: FORM,
            });

            const data = await response.json();
            console.log('idPedido:', idPedido);

            if (data.status) {
                alert('Pedido finalizado correctamente');
            } else {
                alert('Error al finalizar el pedido');
            }
        } catch (error) {
            console.error('Error en la solicitud fetch:', error);
        }
    };


    const renderProductCard = ({ item }) => {
        return (
            <TouchableOpacity key={item.id_detalle_entrega} style={styles.card}
                onPress={() => deleteProduct(item.id_detalle_entrega)} // Asegúrate de que id_detalle_entrega esté pasando correctamente
            >
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

    const calcularTotal = () => {
        return productos.reduce((total, item) => total + parseFloat(item.precio), 0).toFixed(2);
    };


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchProductos().finally(() => setRefreshing(false)); // Refresca los datos y luego establece refreshing en false
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                persistentScrollbar={true}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <Text style={styles.texto}>Para eliminar productos de su carrito, debe de tocarlo y se le eliminaran.</Text>
                <View style={styles.cardsContainer}>
                    {productos.map((item) => (
                        <View key={item.id_producto} style={styles.cardWrapper}>
                            {renderProductCard({ item })}
                        </View>
                    ))}
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <Text style={styles.texto}>Total a pagar : ${calcularTotal()}</Text>
                <TouchableOpacity style={styles.button} onPress={() => { finishOrder() }}>
                    <Text style={styles.buttonText}>Fincalizar pedido</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'transparent',
        marginHorizontal: 20,
    },
    texto: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    cardWrapper: {
        alignItems: 'center', // Centra las tarjetas dentro de su contenedor
    },
    cardsContainer: {
        alignItems: 'center', // Centra el contenedor de las tarjetas
        paddingBottom: 20, // Añade espacio para la parte inferior del ScrollView
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
    footer: {
        backgroundColor: '#ebebeb',
        padding: 10,
        alignItems: 'center',
        borderRadius: 30,
        marginRight: 20,
        marginLeft: 20,
    },
    button: {
        padding: 10,
        backgroundColor: '#6200EE',
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Carrito;