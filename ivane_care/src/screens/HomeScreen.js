import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, FlatList, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'; // Se importa la dependencia de navegacion
import Modal from 'react-native-modal';
import { SERVER } from '../../contexts/Network'; // Constante de red para utilizar la API

const HomeScreen = ({ logueado, setLogueado }) => {

  // Constante para mostrar productos segun la base
  const [ProductosL, setProductosL] = useState([]);

  // FConstante para modal de buscador
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleSecondModal = () => {
    setModalVisible(!isModalVisible);
  };

  //Constante de navegación
  const navigation = useNavigation();

  // constante para refrescar la pagina 
  const [refreshing, setRefreshing] = React.useState(false);

  // Constante para la barra de búsqueda 
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    getProductos();
  }, []);


  // Constante para obtener los productos, en este caso aca  solo se obtienen 8 productos
  const getProductos = async () => {
    try {
      const response = await fetch(`${SERVER}services/public/producto.php?action=read8Products`, {
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


  // Constante para poder recargar la pagina
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getProductos(); // Se manda a llamar de nuevo a getProductos para refrescar los datos
      setRefreshing(false);
    }, 200);
  }, []);

  // constante para renderizar los item de los productos
  const renderProductCard = ({ item }) => {
    const imageUrl = `${SERVER}images/productos/${item.imagen_producto}`;

    return (
      <TouchableOpacity style={styles.card}
        onPress={() => navigation.navigate('ProductosScreen', {
          screen: 'DetalleProducto',  // Navega dentro del stack de Productos
          params: {
            id: item.id_producto,
            nombre: item.nombre_producto,
            descripcion: item.descripcion_producto,
            precio: item.precio_producto,
            imagen: item.imagen_producto
          }
        })}>
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

  // constante para renderizar los item de los productos
  const renderProductBuscador = ({ item }) => {
    if (!item) {
      Alert.alert('Error', 'El producto no está disponible.');
      return null;
    }

    console.log('Item en renderProductCard:', item);

    const imageUrl = `${SERVER}images/productos/${item.imagen_producto}`;
    return (
      <TouchableOpacity style={styles.cardBusqueda}
        onPress={() => navigation.navigate('DetalleProducto', {
          id: item.id_producto,
          nombre: item.nombre_producto,
          descripcion: item.descripcion_producto,
          precio: item.precio_producto,
          imagen: item.imagen_producto
        })}>
        <View style={styles.cardImage}>
          <Image source={{ uri: imageUrl }} style={styles.productImage} />
        </View>
        <Text style={styles.cardTextBusqueda}><Text style={styles.boldText}>{item.nombre_producto}</Text></Text>
        <Text style={styles.cardTextDescripBusqueda}>{item.descripcion_producto}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1, height: 4, borderRadius: 30, backgroundColor: '#6C5FFF', marginTop: 20, marginBottom: 10 }} />
        </View>
        <Text style={styles.cardTextBusqueda}>
          <Text style={styles.boldText}>$ {item.precio_producto}</Text>
        </Text>
      </TouchableOpacity>
    );
  };

  const Buscador = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Advertencia', 'Debe de rellenar los campos.');
      return;
    }
    try {
      const form = new FormData();
      form.append('search', searchQuery);

      const response = await fetch(`${SERVER}services/public/producto.php?action=searchRows`, {
        method: 'POST',
        body: form,
      });

      console.log('searchResults:', searchResults);

      const data = await response.json();
      if (data.status) {
        // Verifica la estructura de los datos
        console.log('Resultados de búsqueda recibidos:', data.dataset);
        setSearchResults(data.dataset);
        toggleSecondModal(); // Mostrar el modal con los resultados
      } else {
        console.log(data.error);
        Alert.alert('Error', 'No hay coincidencias');
        setSearchResults([]); // Limpiar resultados de búsqueda
      }
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };
  return (
    <ScrollView
      style={styles.scrollView}
      persistentScrollbar={true}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      showsVerticalScrollIndicator={false} // Oculta el indicador de desplazamiento vertical
    >
      <View style={styles.container}>
        <View style={styles.containerSearch}>
          <TextInput
            style={[styles.input, { color: '#155A68' }]}
            placeholder="Buscar..."
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
          <TouchableOpacity style={styles.button} onPress={Buscador}>

            <Icon name="magnify" size={30} color="#0A2B32" style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
        <Image source={require('../img/Portadita.png')} style={styles.image} />
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
      {ProductosL.map((item, index) => (
        index % 2 === 0 ? (
          <View style={styles.row} key={item.id_producto.toString()}>
            {renderProductCard({ item })}
            {index + 1 < ProductosL.length && renderProductCard({ item: ProductosL[index + 1] })}
          </View>
        ) : null
      ))}
      <Modal isVisible={isModalVisible} onBackdropPress={toggleSecondModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Resultados de Búsqueda</Text>
          {searchResults.length > 0 ? (
            <FlatList
              data={searchResults}
              renderItem={({ item, index }) => {
                // Verifica si el índice es par para crear una fila
                if (index % 2 === 0) {
                  return (
                    <View style={styles.row} key={item.id_producto.toString()}>
                      {renderProductBuscador({ item })}
                      {index + 1 < searchResults.length && renderProductBuscador({ item: searchResults[index + 1] })}
                    </View>
                  );
                }
                return null;
              }}
              keyExtractor={(item) => item.id_producto.toString()}
              numColumns={1} // Solo se utiliza para controlar el FlatList, pero no afecta la disposición
            />
          ) : (
            <Text>No se encontraron productos.</Text>
          )}
          <TouchableOpacity onPress={toggleSecondModal} style={styles.closeButton}>
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </ScrollView>
  );
};

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
  // Estilo card de busqueda 
  // estilo de cards prueba base
  cardBusqueda: {
    backgroundColor: '#E7E7E7',
    width: 145, // Añadido para limitar el ancho de la tarjeta
    height: 430,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    margin: 5,
    elevation: 10,
    shadowColor: '#5f0e4a',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
  },
  cardImage: {
    alignItems: 'center',
  },
  cardTextBusqueda: {
    fontSize: 16,
    marginBottom: 5,
    color: '#260035',
    textAlign: 'center',
  },
  cardTextDescripBusqueda: {
    fontSize: 13,
    flexWrap: 'wrap', // Permite que el texto se ajuste a múltiples líneas si es necesario
    textAlign: 'justify',
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

  // Estilo del modal para alerta
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#6C5FFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
