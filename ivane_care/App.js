import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import BottomTab from './src/navegation/BottonTab'; // Importa el BottomTab correcto
import LogInStack from './src/navegation/LogInStack'; // Importa el LogInStack correcto
import SplashScreen from './src/screens/SplashScreen';

const Stack = createStackNavigator();

const AppContent = ({ isLoggedIn, logueado, setLogueado }) => {
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la pantalla de carga

  useEffect(() => {
    // Simula un tiempo de carga antes de mostrar la pantalla de login
    setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Cambia el tiempo de espera según tus necesidades
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <UserProvider>
          <Stack.Navigator>
            {isLoggedIn ? (
              <Stack.Screen
                name="Main"
                component={BottomTab} // Cambiado a BottomTab para la navegación principal
                options={{ headerShown: false }}
                initialParams={{ logueado, setLogueado }} // Pasa los parámetros
              />
            ) : (
              <Stack.Screen
                name="Auth"
                component={LogInStack}
                options={{
                  headerShown: false,
                  initialParams: { logueado, setLogueado },
                }}
              />

            )}
          </Stack.Navigator>
        </UserProvider>
      )}
    </NavigationContainer>
  );
};

const App = () => {
  const { isLoggedIn } = useAuth();
  const [logueado, setLogueado] = useState(false); // Estado para manejar la sesión

  return (
    <AppContent isLoggedIn={isLoggedIn} logueado={logueado} setLogueado={setLogueado} />
  );
};

const AppWrapper = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default AppWrapper;
