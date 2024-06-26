import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Boton from '../components/Button/Boton'; // Se importa el componente de boton para poder usarlo 



const HomeScreen = () => {

  // Nada mas es prueba para ver como mando a llamar un componente
  const handlePress = () => {
    // Función que maneja el onPress del botón
    console.log('Botón presionado');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Consumo de apis externas
      </Text>
      <Text style={styles.descripcion}>
        Ejemplo de consumo de API externa utilizando la función <Text style={styles.negrita}>FETCH</Text> nativa de JavaScript y <Text style={styles.negrita}>AXIOS</Text> que es una biblioteca de JavaScript utilizada para hacer solicitudes HTTP
      </Text>
      <Boton textoBoton="Aceptar" accionBoton={handlePress} />
    </View>
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
  descripcion: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'justify',
    marginTop: 10,
  },
  negrita: {
    fontWeight: 'bold'
  }
});
