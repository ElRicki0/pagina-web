import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Productos from '../screens/Productos';
import Marcas from '../screens/Marcas';
import Categorias from '../screens/Categoria';

const ProductosStack = createStackNavigator();

const ProductosStackScreen = ({ route }) => (
  <ProductosStack.Navigator>
    <ProductosStack.Screen
      name="Productos"
      component={Productos}
      options={{ headerShown: false }}
      initialParams={{ logueado: route.params?.logueado, setLogueado: route.params?.setLogueado }}
    />
    <ProductosStack.Screen
      name="Marcas"
      component={Marcas}
      options={{ headerShown: false }}
    />
    <ProductosStack.Screen
      name="Categorias"
      component={Categorias}
      options={{ headerShown: false }}
    />
  </ProductosStack.Navigator>
);

export default ProductosStackScreen;