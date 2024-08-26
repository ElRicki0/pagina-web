import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Login';
import SignUpScreen from '../screens/SignUp';
import PerfilScreen from '../screens/Perfil';
import EditarPerfil from '../screens/EditarPerfil';
import Historial from '../screens/Historial';
import SplashScreen from '../screens/SplashScreen';
import RecupClave1 from '../screens/RecupClave1';
import RecupClave2 from '../screens/RecupClave2';
import RecupClave3 from '../screens/RecupClave3';
import BottomTab from '../navegation/BottonTab';

const Stack = createStackNavigator();

const LoginStackScreen = ({ logueado, setLogueado }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='SplashScreen'
        component={SplashScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name='LoginScreen'
        options={{ headerShown: false }}
      >
        {(props) => <LoginScreen {...props} setLogueado={setLogueado} />}
      </Stack.Screen>
      <Stack.Screen
        name='BottomTab'
        options={{ headerShown: false }}>
        {(props) => <BottomTab {...props} logueado={logueado} setLogueado={logueado} />}
      </Stack.Screen>
      <Stack.Screen
        name='SignUp'
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Perfil'
        options={{ headerShown: false }}
      >
        {(props) => <PerfilScreen {...props} setLogueado={setLogueado} />}
      </Stack.Screen>
      <Stack.Screen
        name='EditarPerfil'
        component={EditarPerfil}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Historial'
        component={Historial}
        options={{
          headerShown: false
        }} // Mantener consistencia en las opciones
      />
      <Stack.Screen
        name='RecupClave1'
        component={RecupClave1}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='RecupClave2'
        component={RecupClave2}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='RecupClave3'
        component={RecupClave3}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};

export default LoginStackScreen;
