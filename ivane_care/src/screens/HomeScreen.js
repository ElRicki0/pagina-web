import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Productos from '../components/Data/ProductosMuestra';
import Boton from '../components/Button/Boton'; // Se importa el componente de boton para poder usarlo 


const ip = '192.168.1.15'; // Dirección IP del servidor 

const HomeScreen = ({ logueado, setLogueado }) => {

  const ProductosLista = Productos;

  // Funcion para mostrar productos segun la base
  const [ProductosL, setProductosL] = useState([]);

  useEffect(() => {
    getProductos();
  }, []);


  const getProductos = async () => {
    try {
      const response = await fetch(`http://${ip}/pagina-web/api/services/public/producto.php?action=readAll`, {
        method: 'GET',
      });

      const data = await response.json();
      if (data.status) {
        setProductosL(data.dataset);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error al obtener los productos :', error);
    }
  };


  // constante para renderizar los item de los productos
  const renderProductCard = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardText}><Text style={styles.boldText}>imagen:</Text> {item.imagen_producto}</Text>
        <Text style={styles.cardText}><Text style={styles.boldText}>Nombre:</Text> {item.nombre_producto}</Text>
        <Text style={styles.cardText}><Text style={styles.boldText}>descripcion:</Text> {item.descripcion_producto}</Text>
        <Text style={styles.cardText}><Text style={styles.boldText}>Precio:</Text> {item.precio_producto}</Text>
        <Text style={styles.cardText}><Text style={styles.boldText}>Cantidad:</Text> {item.cantidad_producto}</Text>
      </TouchableOpacity>
    );
  };



  // Estado, para la barra de busqueda 
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (text) => {
    setSearchQuery(text);
    // Aquí podrías implementar la lógica para filtrar o buscar según 'text'
  };

  // Nada mas es prueba para ver como mando a llamar un componente
  const handlePress = () => {
    // Función que maneja el onPress del botón
    console.log('Botón presionado');
  };

  return (
    <ScrollView style={styles.scrollView}
      persistentScrollbar={true}
      showsVerticalScrollIndicator={false} // Oculta el indicador de desplazamiento vertical 
    >
      <View style={styles.container}>
        <View style={styles.containerSearch}>
          <Icon name="magnify" size={30} color="#0A2B32" style={styles.searchIcon} />
          <TextInput
            style={[styles.input, { color: '#155A68' }]}
            placeholder="Buscar..."
            onChangeText={handleSearch}
            value={searchQuery}
          />
        </View>
        <Image source={require('../img/Portadita.png')} />

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 23, marginBottom: 23 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: '#6C5FFF' }} />
          <View>
            <Text style={{
              width: 90, textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#6C5FFF'
            }}>Nuestros productos</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: '#6C5FFF' }} />
        </View>
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          data={ProductosLista}
          horizontal={true}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <Image source={item.src} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.numero}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black', marginTop: 20, marginBottom: 30 }} />
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 23, marginBottom: 23 }}>
        <View style={{ flex: 1, height: 1, backgroundColor: '#6C5FFF' }} />
        <View>
          <Text style={{
            width: 90, textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#6C5FFF'
          }}>Nuestros productos base</Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: '#6C5FFF' }} />
      </View>

      <FlatList
        data={ProductosL}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id_producto.toString()}
      />
    </ScrollView>

  );
}

export default HomeScreen;


// Estilos para los componentes.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 15
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    textTransform: 'uppercase',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: '#155A68',
  },
  descripcion: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'justify',
    marginTop: 10,
  },
  negrita: {
    fontWeight: 'bold'
  },
  scrollView: {
    marginHorizontal: 10,
    backgroundColor: '#fff',
  },
  containerSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 5,
    marginLeft: 5,
  },
  // Estilo de cards
  flatListContainer: {
    height: 250, // Altura fija para evitar el crecimiento automático
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 5,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    width: 150, // Añadido para limitar el ancho de la tarjeta
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Asegura que el texto esté centrado horizontalmente
    marginBottom: 5, // Añadido para espacio entre título y descripción
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    flexWrap: 'wrap', // Permite que el texto se ajuste a múltiples líneas si es necesario
  },


  // estilo de cards prueba base
  card: {
    backgroundColor: '#fff',
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
