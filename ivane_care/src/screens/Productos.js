import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Boton from '../components/Button/Boton';

const Productos = () => {
  const navigation = useNavigation();

  const irAMarcas = () => {
    navigation.navigate('Marcas');
  };

  return (
    <View style={styles.container}>
      <Text>Productos</Text>
      <Boton textoBoton="Marcas" accionBoton={irAMarcas} />
      <Boton textoBoton="Categoria" accionBoton={irAMarcas} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Productos;
