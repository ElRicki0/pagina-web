import { createStackNavigator } from '@react-navigation/stack';
import Productos from '../screens/Productos';
import Marcas from '../screens/Marcas';

const ProductosStack = createStackNavigator();

const ProductosStackScreen = () => (
  <ProductosStack.Navigator>
    <ProductosStack.Screen name="Productos" component={Productos} options={{ headerShown: false }} // Oculta el encabezado en la pantalla Productos
    />
    <ProductosStack.Screen name="Marcas" component={Marcas} options={{ headerShown: false }} // Oculta el encabezado en la pantalla Productos
    />
  </ProductosStack.Navigator>
);

export default ProductosStackScreen;
