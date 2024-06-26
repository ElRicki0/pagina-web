import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';


const LogIn = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido</Text>
            <TextInput
                label="Usuario"
                value={alias}
                onChangeText={setAlias}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                label="Contraseña"
                value={clave}
                onChangeText={setClave}
                style={styles.input}
                secureTextEntry
            />
            <Button mode="contained" onPress={handleLogin} style={styles.button}>
                Iniciar Sesión
            </Button>
            <Button mode="contained" onPress={handleLogOut} style={styles.button}>
                Cerrar Sesión
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#6200ee',
    },
    input: {
        marginBottom: 15,
        backgroundColor: 'white',
    },
    button: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#6200ee',
    },
});

