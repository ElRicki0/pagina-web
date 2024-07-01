import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importación de las distintas pantallas del sistema 
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import MarcasScreen from './src/screens/Marcas';
import CategoriaScreen from './src/screens/Categoria';
import PerfilScreen from './src/screens/Perfil';
import ProductosScreen from './src/screens/Productos';
import SignUpScreen from './src/screens/SignUp';
import FavoritosScreen from './src/screens/Favoritos';
import CarritoScreen from './src/screens/Carrito';
import LoginScreen from './src/screens/Login';
import LoginNav from './src/navegation/LogInStack';
import BottomTab from './src/navegation/BottonTab';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [logueado, setLogueado] = useState(false);

  useEffect(() => {
    // Simula un tiempo de carga antes de mostrar la pantalla de login
    setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Ajusta el tiempo de espera según necesites
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <Stack.Navigator  screenOptions={{ headerShown: false }}>
          {logueado ? (
            <Stack.Screen name="BottomTab" component={BottomTab} />
          ) : (
            <Stack.Screen name="Auth">
              {props => <LoginNav {...props} setLogueado={setLogueado} />}
            </Stack.Screen>
          )}
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="BottomTab" component={BottomTab} />
          <Stack.Screen name="Marcas" component={MarcasScreen} />
          <Stack.Screen name="Categoria" component={CategoriaScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
