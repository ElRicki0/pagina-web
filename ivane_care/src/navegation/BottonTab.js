import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import CarritoScreen from '../screens/Carrito';
import FavoritoScreen from '../screens/Favoritos';
import PerfilScreen from '../screens/Perfil';
import ProductosStack from '../navegation/ProductosStack';

const Tab = createBottomTabNavigator();

export default function BottomTab({ logueado, setLogueado }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'HomeScreen') {
            iconName = 'home';
          } else if (route.name === 'ProductosScreen') {
            iconName = 'store';
          } else if (route.name === 'CarritoScreen') {
            iconName = 'cart';
          } else if (route.name === 'FavoritoScreen') {
            iconName = 'heart';
          } else if (route.name === 'PerfilScreen') {
            iconName = 'account-circle';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'gray',
        tabBarActiveBackgroundColor: 'rgba(255, 255, 255, 0.3)',
        tabBarStyle: {
          borderRadius: 15,
          margin: 10,
          backgroundColor: '#0E333B',
        },
        headerStyle: {
          borderRadius: 15,
          backgroundColor: '#0E333B',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 25,
          fontWeight: 'bold',
          color: '#fff',
        }
      })}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Inicio',
        }}
        initialParams={{ logueado, setLogueado }}
      />
      <Tab.Screen
        name="ProductosScreen"
        component={ProductosStack}
        options={{
          title: 'Productos',
        }}
        initialParams={{ logueado, setLogueado }}
      />
      <Tab.Screen
        name="CarritoScreen"
        component={CarritoScreen}
        options={{
          title: 'Carrito',
        }}
      />
      <Tab.Screen
        name="FavoritoScreen"
        component={FavoritoScreen}
        options={{
          title: 'Favoritos',
        }}
      />
      <Tab.Screen
        name="PerfilScreen"
        component={PerfilScreen}
        options={{
          title: 'Perfil',
        }}
      />
    </Tab.Navigator>
  );
}