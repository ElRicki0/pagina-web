import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Hook de navegación
import Ionicons from '@expo/vector-icons/Ionicons';
import { SERVER } from '../../contexts/Network';



const ip = '192.168.1.15'; // Dirección IP del servidor 

const Marcas = () => {
    const navigation = useNavigation(); // Hook de navegación para cambiar entre pantallas

    // Funcion para mostrar marcas segun la base
    const [Marcas, setMarcas] = useState([]);


    // Constante para obtener los marcas
    const getMarcas = async () => {
        try {
            const response = await fetch(`${SERVER}services/public/marca.php?action=readMarcas`, {
                method: 'GET',
            });

            const data = await response.json();
            if (data.status) {
                setMarcas(data.dataset);
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error('Error al obtener las marcas :', error);
        }
    };

    useEffect(() => {
        getMarcas();
    }, []);


    // constante para renderizar los item de las marcas
    const renderMarkCard = ({ item }) => {
        const imageUrl = `${SERVER}images/marcas/${item.imagen_marca}`;

        return (
            <TouchableOpacity style={styles.card}
                onPress={() => navigation.navigate('ProductosMarca', {
                    id: item.id_marca,
                    nombre: item.nombre_marca,
                    descripcion: item.descripcion_marca,
                    imagen: item.imagen_marca
                })}>
                <View style={styles.cardImage}>
                    <Image source={{ uri: imageUrl }} style={styles.productImage} />
                </View>
                <Text style={styles.cardText}><Text style={styles.boldText}>Nombre:</Text> {item.nombre_marca}</Text>
                <Text style={styles.cardText}><Text style={styles.boldText}>Descripcion:</Text> {item.descripcion_marca}</Text>
            </TouchableOpacity>
        );
    };


    // constante para refrescar la pagina 
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            getMarcas(); // Se manda a llamar de nuevo a getProductos para refrescar los datos
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={60} color="#6C5FFF" />
            </TouchableOpacity>
            <Text style={styles.title}>Marcas</Text>
            {/* Aquí puedes agregar más contenido de la pantalla */}
            <FlatList
                data={Marcas}
                renderItem={renderMarkCard}
                keyExtractor={(item) => item.id_marca.toString()}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    backButton: {
        position: 'absolute',
        top: 20, // Alinea el botón 20 unidades desde la parte superior
        left: 20, // Alinea el botón 20 unidades desde la izquierda
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 30, // Espacio adicional arriba del título
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

export default Marcas;
