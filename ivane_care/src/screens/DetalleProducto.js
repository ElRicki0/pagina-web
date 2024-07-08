import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Image, FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Input from '../components/Input/InputCarrito';
import Boton from '../components/Button/BotonCarrito';



const ip = '192.168.1.15'; // Dirección IP del servidor 

const DetailProduct = ({ route }) => {

    const [ValorCarrito, setValorCarrito] = useState('');

    const navigation = useNavigation();

    const irACarrito = () => {
        navigation.navigate('Carrito');
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
                    </View>
                </View>
                <Input
                    placeHolder='Valor...'
                    style={styles.input}
                    setValor={ValorCarrito}
                    setTextChange={setValorCarrito}
                />
                <Boton textoBoton="" accionBoton={irACarrito} iconName="cart" />
            </View>
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
