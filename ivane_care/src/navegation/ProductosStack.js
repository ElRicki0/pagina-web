import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Productos from '../screens/Productos';
import Marcas from '../screens/Marcas';
import Categorias from '../screens/Categoria';
import DetalleProducto from '../screens/DetalleProducto';
import Carrito from '../screens/Carrito';
import Favorito from '../screens/Favoritos';

const ProductosStack = createStackNavigator();

const ProductosStackScreen = ({ route }) => (
  <ProductosStack.Navigator>
    <ProductosStack.Screen
      name="Productos"
      component={Productos}
      options={{ headerShown: false }}
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
    <ProductosStack.Screen
      name="DetalleProducto"
      component={DetalleProducto}
      options={{ headerShown: false }}
    />
    <ProductosStack.Screen
      name="Carrito"
      component={Carrito}
      options={{ headerShown: false }}
    />
    <ProductosStack.Screen
      name="Favorito"
      component={Favorito}
      options={{ headerShown: false }}
    />
  </ProductosStack.Navigator>
);

export default ProductosStackScreen;
