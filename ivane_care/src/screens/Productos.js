import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Boton from '../components/Button/Boton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Importa el paquete de iconos

const Productos = () => {
  const navigation = useNavigation();

  const irAMarcas = () => {
    navigation.navigate('Marcas');
  };

  const irACategorias = () => {
    navigation.navigate('Categorias');
  };

  // Definir la ruta de la imagen de fondo con require
  const backgroundImage = require('../img/Fondo.png');

  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>

          <View style={styles.containerBoton}>
            <Boton textoBoton="Marcas" accionBoton={irAMarcas} iconName="alpha-r-circle-outline" />
            <Boton textoBoton="Categoria" accionBoton={irACategorias} iconName="label-outline" />
          </View>
        </View>
        <Text style={styles.title}>Nuestros productos</Text>
      </ScrollView>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerBoton: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: 'black', // Color del texto blanco para que se vea sobre la imagen
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Ajusta la imagen para cubrir toda la pantalla
    height: '100%', // Ajusta la imagen para cubrir toda la pantalla
  },
  scrollView: {
    backgroundColor: 'transparent',
    marginHorizontal: 20,
  },
});

export default Productos;
