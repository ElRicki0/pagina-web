import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Image, FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';


const ip = '192.168.1.15'; // Dirección IP del servidor 

const DetailProduct = ({ route }) => {
    const navigation = useNavigation();

    const { id, nombre, descripcion, precio, imagen } = route.params;
    const imageUrl = `http://${ip}/pagina-web/api/images/productos/${imagen}`;

    return (
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
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 10, // Alinea el botón 20 unidades desde la parte superior
        left: 20, // Alinea el botón 20 unidades desde la izquierda
    },
    CardContainer: {
        backgroundColor: '#E7E7E7',
        borderRadius: 20,
        flexDirection: 'row',
        width: '95%', // Ajusta el ancho del contenedor de la tarjeta
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
});

export default DetailProduct;
