import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ImageBackground, Animated, Easing } from 'react-native';

export default function SplashScreen() {
  const [counter, setCounter] = useState(3);
  const translateXValue = useRef(new Animated.Value(130)).current; // Añadir valor animado para la traslación

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter(prevCounter => prevCounter - 1);
    }, 1000);

    // Configura la animación de traslación
    Animated.loop(
      Animated.timing(translateXValue, {
        toValue: -100, // Mover a la izquierda 100 unidades
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    return () => clearInterval(timer);
  }, []);

  // Definir la ruta de la imagen de fondo con require
  const backgroundImage = require('../img/FondoSplash.png');

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
        <View style={styles.iconContainer}>
          <Animated.Image
            source={require('../img/HearthSplash.png')}
            style={{
              width: 250,
              height: 250,
              transform: [{ translateX: translateXValue }] // Aplicar traslación
            }}
          />
          <Animated.Image
            source={require('../img/SpraySplash.png')}
            style={{ width: 250, height: 250 }}
          />
        </View>
        <Text style={styles.title}>BIENVENIDOS</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    margin: 24,
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0A2B32',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
