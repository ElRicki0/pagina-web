import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import CarritoScreen from '../screens/Carrito';
import FavoritoScreen from '../screens/Favoritos';
import PerfilScreen from '../screens/Perfil';
import ProductosStackScreen from '../navegation/ProductosStack';
import LoginStackScreen from '../navegation/LogInStack';

const Tab = createBottomTabNavigator();

const BottomTab = ({ setLogueado, logueado }) => {
  return (
    <Tab.Navigator
      initialRouteName='HomeScreen'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'HomeScreen':
              iconName = 'home';
              break;
            case 'ProductosScreen':
              iconName = 'store';
              break;
            case 'CarritoScreen':
              iconName = 'cart';
              break;
            case 'FavoritoScreen':
              iconName = 'heart';
              break;
            case 'PerfilScreen':
              iconName = 'account-circle';
              break;
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
      />
      <Tab.Screen
        name="ProductosScreen"
        component={ProductosStackScreen}
        options={{
          title: 'Productos',
        }}
      />
      <Tab.Screen
        name="LoginStackScreen"
        component={LoginStackScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
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
        options={{
          title: 'Perfil',
        }}>
        {props => <PerfilScreen {...props} setLogueado={setLogueado} logueado={logueado} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTab;
