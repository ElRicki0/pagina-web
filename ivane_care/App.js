import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import LoginNav from './src/navegation/LogInStack';
import BottomTab from './src/navegation/BottonTab';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [logueado, setLogueado] = useState(false);

  useEffect(() => {
    // Simula un tiempo de carga antes de mostrar la pantalla de login
    setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Ajusta el tiempo de espera según necesites
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <Stack.Navigator>
          {logueado ? (
            <Stack.Screen
              name="Main"
              component={BottomTab}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="Auth"
              options={{
                headerShown: false,
              }}
            >
              {props => <LoginNav {...props} setLogueado={setLogueado} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
