import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import Productos from '../screens/Productos';
import Perfil from '../screens/Perfil';
import Marcas from '../screens/Marcas';
import Categorias from '../screens/Categorias';

const Stack = createStackNavigator();

const NavStack = () => {

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
      <Stack.Screen
        name='Categorias'
        component={Categorias}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default NavStack;
