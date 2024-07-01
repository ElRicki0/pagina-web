import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



import Boton from '../components/Button/Boton'; // Se importa el componente de boton para poder usarlo 



const HomeScreen = ({ logueado, setLogueado }) => {

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
      </View>
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
});
