import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import Boton from '../components/Button/Boton';
import Ionicons from '@expo/vector-icons/Ionicons';


const ip = '192.168.1.3'; // Dirección IP del servidor 


const Favorito = () => {
    return (
        <ScrollView style={styles.scrollView}
            persistentScrollbar={true}
            showsVerticalScrollIndicator={false} // Oculta el indicador de desplazamiento vertical
        >
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.cardText}><Text style={styles.boldText}>Producto:Delineador lindo</Text> </Text>
                    <Text style={styles.cardText}><Text style={styles.boldText}>precio: $300</Text> </Text>
                    <TouchableOpacity style={styles.cartButton}>
                        <Ionicons name="cart" size={24} color="white" />
                    </TouchableOpacity>
                </View>
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