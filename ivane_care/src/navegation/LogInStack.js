import { createStackNavigator } from '@react-navigation/stack';
import LogInScreen from '../screens/Login';
import SignUpScreen from '../screens/SignUp';


const LoginStack = createStackNavigator();

const LoginStackScreen = () => (
    <LoginStack.Navigator>
        <LoginStack.Screen name="LogIn" component={LogInScreen} options={{ headerShown: false }}// Oculta el encabezado en la pantalla Productos 
        />
        <LoginStack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }}// Oculta el encabezado en la pantalla Productos 
        />
    </LoginStack.Navigator>
);

export default LoginStackScreen;
