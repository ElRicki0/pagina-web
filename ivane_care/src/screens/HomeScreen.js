import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Boton from '../components/Button/Boton'; // Se importa el componente de boton para poder usarlo 
import Ionicons from '@expo/vector-icons/Ionicons';


const ip = '192.168.1.15'; // Dirección IP del servidor 

const HomeScreen = ({ logueado, setLogueado }) => {

  // Funcion para mostrar productos segun la base
  const [ProductosL, setProductosL] = useState([]);

  useEffect(() => {
    getProductos();
  }, []);


  const getProductos = async () => {
    try {
      const response = await fetch(`http://${ip}/pagina-web/api/services/public/producto.php?action=read8Products`, {
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

  // constante para refrescar la pagina 
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getProductos(); // Se manda a llamar de nuevo a getProductos para refrescar los datos
      setRefreshing(false);
    }, 2000);
  }, []);

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
        <TouchableOpacity style={styles.cartButton}>
          <Ionicons name="cart" size={24} color="white" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };



  // Estado, para la barra de busqueda 
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (text) => {
    setSearchQuery(text);
    // Aquí podrías implementar la lógica para filtrar o buscar según 'text'
  };

  return (
    <ScrollView
      style={styles.scrollView}
      persistentScrollbar={true}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
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
      </View>


      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 23, marginBottom: 23 }}>
        <View style={{ flex: 1, height: 1, backgroundColor: '#6C5FFF' }} />
        <View>
          <Text style={{
            width: 130, textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#6C5FFF'
          }}>Algunos de Nuestros productos </Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: '#6C5FFF' }} />
      </View>
      <FlatList
        data={ProductosL} // Los datos que se van a renderizar en la lista
        renderItem={({ item, index }) => {
          // Si el índice es par, se renderiza una fila con dos tarjetas
          if (index % 2 === 0) {
            return (
              <View style={styles.row}>
                {renderProductCard({ item })}
                {index + 1 < ProductosL.length && renderProductCard({ item: ProductosL[index + 1] })}
              </View>
            );
          } else {
            return null; // Si el índice es impar, no se renderiza nada
          }
        }}
        keyExtractor={(item) => item.id_producto.toString()} // Clave única para cada elemento de la lista
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
  cartButton: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#6200EE',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // estilo de cards prueba base
  card: {
    backgroundColor: '#E7E7E7',
    width: 180, // Añadido para limitar el ancho de la tarjeta
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
