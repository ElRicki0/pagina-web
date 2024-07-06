import React, { useState } from 'react';
import { View, Text, StyleSheet,Button  } from 'react-native';
import Modal from 'react-native-modal';
import { Provider as PaperProvider, Button as PaperButton } from 'react-native-paper';
import Boton from '../components/Button/Boton';


const Carrito = () => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <Boton  textoBoton="Crear cuenta" accionBoton={toggleModal} />

                <Modal isVisible={isModalVisible}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Custom Alert</Text>
                        <Text style={styles.modalMessage}>This is a custom alert message.</Text>
                        <PaperButton mode="contained" onPress={toggleModal} style={styles.modalButton}>
                            OK
                        </PaperButton>
                    </View>
                </Modal>
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
    },
    modalButton: {
        marginTop: 10,
    },
});

export default Carrito;