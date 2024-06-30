import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import Productos from '../screens/Productos';
import Perfil from '../screens/Perfil';
import Marcas from '../screens/Marcas';

const Stack = createStackNavigator();

const NavStack = ({ route }) => {
  const { logueado, setLogueado } = route.params || {};

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Splash'
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Productos'
        component={Productos}
        options={{ headerShown: false }}
        initialParams={{ logueado, setLogueado }} // Pasa las props a través de initialParams
      />
      <Stack.Screen
        name='Perfil'
        component={Perfil}
        options={{ title: 'Perfil' }}
      />
      <Stack.Screen
        name='Marcas'
        component={Marcas}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default NavStack;
