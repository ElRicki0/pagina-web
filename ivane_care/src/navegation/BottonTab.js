// Utilidades de React Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Importa el paquete de iconos


// Pantallas de navegación
import HomeScreen from '../screens/HomeScreen';
import ProductosScreen from '../screens/Productos';
import CarritoScreen from '../screens/Carrito';
import FavoritoScreen from '../screens/Favoritos';
import PerfilScreen from '../screens/Perfil';
import Marcas from '../screens/Marcas';
import ProductosStack from '../navegation/ProductosStack';



// Navegador Bottom Tabs Navigator
const Tab = createBottomTabNavigator();

export default function BottomTab() {
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

          // Puedes devolver cualquier componente que desees aquí.
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          borderRadius: 15,
          margin: 10,
          backgroundColor: '#0E333B', // Color de fondo del tab bar
        },
        headerStyle: {
          borderRadius: 15,
          backgroundColor: '#0E333B', // Color del header
        },
        headerTintColor: '#fff', // Color del texto en el header
        headerTitleAlign: 'center', // Alinea el texto del título del header al centro
        headerTitleStyle: {
          fontSize: 25, // Tamaño de la fuente del título del header
          fontWeight: 'bold', // Peso de la fuente
          color: '#fff', // Color del texto del título del header
        }
      })}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'ivane Care',
        }}
      />
      <Tab.Screen
        name="ProductosScreen"
        component={ProductosStack}
        options={{
          title: 'Productos',
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
        component={PerfilScreen}
        options={{
          title: 'Perfil',
        }}
      />
    </Tab.Navigator>
  );
}
