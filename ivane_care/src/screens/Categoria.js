import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Hook de navegación
import Ionicons from '@expo/vector-icons/Ionicons';


const ip = '192.168.137.1'; // Dirección IP del servidor 

const Categorias = () => {

    const navigation = useNavigation(); // Hook de navegación para cambiar entre pantallas


    // Funcion para mostrar categorias segun la base
    const [Categorias, setCategorias] = useState([]);


    // Constante para obtener las categorias
    const getCategorias = async () => {
        try {
            const response = await fetch(`http://${ip}/pagina-web/api/services/public/categoria.php?action=readCategoria`, {
                method: 'GET',
            });

            const data = await response.json();
            if (data.status) {
                setCategorias(data.dataset);
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error('Error al obtener las categorias:', error);
        }
    };

    useEffect(() => {
        getCategorias();
    }, []);


    // constante para renderizar los item de las categorias
    const renderCategoryCard = ({ item }) => {
        const imageUrl = `http://${ip}/pagina-web/api/images/categorias/${item.imagen_categoria_producto}`;

        return (
            <TouchableOpacity style={styles.card}>
                <View style={styles.cardImage}>
                    <Image source={{ uri: imageUrl }} style={styles.productImage} />
                </View>
                <Text style={styles.cardText}><Text style={styles.boldText}>Nombre:</Text> {item.nombre_categoria_producto}</Text>
                <Text style={styles.cardText}><Text style={styles.boldText}>Descripcion:</Text> {item.descripcion_categoria_producto}</Text>
            </TouchableOpacity>
        );
    };

    // constante para refrescar la pagina 
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            getCategorias(); // Se manda a llamar de nuevo a getProductos para refrescar los datos
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={60} color="#6C5FFF" />
            </TouchableOpacity>
            <Text style={styles.title}>Categorias</Text>
            {/* Aquí puedes agregar más contenido de la pantalla */}
            <FlatList
                data={Categorias}
                renderItem={renderCategoryCard}
                keyExtractor={(item) => item.id_categoria_producto.toString()}
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
        width: 190, // Ajusta el tamaño según sea necesario
        height: 150, // Ajusta el tamaño según sea necesario
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

export default Categorias;
