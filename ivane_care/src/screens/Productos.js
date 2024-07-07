import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Boton from '../components/Button/Boton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Importa el paquete de iconos


const ip = '192.168.1.15'; // Dirección IP del servidor 

const Productos = () => {

  const navigation = useNavigation();


  // Funcion para mostrar productos segun la base
  const [Productos, setProductos] = useState([]);

  useEffect(() => {
    getProductos();
  }, []);

  // Constante para obtener los productos
  const getProductos = async () => {
    try {
      const response = await fetch(`http://${ip}/pagina-web/api/services/public/producto.php?action=readAll`, {
        method: 'GET',
      });

      const data = await response.json();
      if (data.status) {
        setProductos(data.dataset);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error al obtener los productos :', error);
    }
  };


  // constante para renderizar los item de los productos
  const renderProductCard = ({ item }) => {
    const imageUrl = `http://${ip}/pagina-web/api/images/productos/${item.imagen_producto}`;

    return (
      <TouchableOpacity style={styles.card}>
        <View style={styles.cardImage}>
          <Image source={{ uri: imageUrl }} style={styles.productImage} />
        </View>
        <Text style={styles.cardText}><Text style={styles.boldText}>{item.nombre_producto}</Text></Text>
        <Text style={styles.cardTextDescrip}>{item.descripcion_producto}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1, height: 4, borderRadius: 30, backgroundColor: '#6C5FFF', marginTop: 20, marginBottom: 10 }} />
        </View>
        <Text style={styles.cardText}>
          <Text style={styles.boldText}>$ {item.precio_producto}</Text>
        </Text>
      </TouchableOpacity>
    );
  };


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
      <ScrollView style={styles.scrollView}
        persistentScrollbar={true}
        showsVerticalScrollIndicator={false} // Oculta el indicador de desplazamiento vertical 
      >
        <View style={styles.container}>

          <View style={styles.containerBoton}>
            <Boton textoBoton="Marcas" accionBoton={irAMarcas} iconName="alpha-r-circle-outline" />
            <Boton textoBoton="Categoria" accionBoton={irACategorias} iconName="label-outline" />
          </View>
        </View>
        <Text style={styles.title}>Nuestros productos</Text>
        <FlatList
          data={Productos} // Los datos que se van a renderizar en la lista
          renderItem={({ item, index }) => {
            // Si el índice es par, se renderiza una fila con dos tarjetas
            if (index % 2 === 0) {
              return (
                <View style={styles.row}>
                  {renderProductCard({ item })}
                  {index + 1 < Productos.length && renderProductCard({ item: Productos[index + 1] })}
                </View>
              );
            } else {
              return null; // Si el índice es impar, no se renderiza nada
            }
          }}
          keyExtractor={(item) => item.id_producto.toString()} // Clave única para cada elemento de la lista
        />

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
    marginBottom: 20,
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
  // estilo de cards prueba base
  card: {
    backgroundColor: '#E7E7E7',
    width: 165, // Añadido para limitar el ancho de la tarjeta
    height: 430,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardImage: {
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#260035',
    textAlign: 'center',
  },
  cardTextDescrip: {
    fontSize: 13,
    flexWrap: 'wrap', // Permite que el texto se ajuste a múltiples líneas si es necesario
  },
  boldText: {
    fontWeight: 'bold',
  },
  productImage: {
    width: 150, // Ajusta el tamaño según sea necesario
    height: 150, // Ajusta el tamaño según sea necesario
    marginBottom: 10,
    borderRadius: 10, // Opcional, para darle bordes redondeados a la imagen
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20, // Espacio entre las filas
  },
});

export default Productos;
