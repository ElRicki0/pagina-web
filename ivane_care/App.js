import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importación de las distintas pantallas del sistema 
import SplashScreen from './src/screens/SplashScreen';
import MarcasScreen from './src/screens/Marcas';
import CategoriaScreen from './src/screens/Categoria';
import SignUpScreen from './src/screens/SignUp';
import LoginNav from './src/navegation/LogInStack';
import BottomTab from './src/navegation/BottonTab';

const Stack = createStackNavigator();


export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  const [logueado, setLogueado] = useState(false);


  const ip = '192.168.1.15';

  // Realizando constante para poder cerrar la sesion
  const sesionActiva = async () => {
    const url = await fetch(`http://${ip}/pagina-web/api/services/public/cliente.php?action=getUser`, {
        method: 'GET'
    });
    const data = await url.json();
    console.log(data);
    if (data.session) {
      setLogueado(true);
      console.log(data.session)
    } else {
      setLogueado(false);
    }
  }


  useEffect(() => {
    sesionActiva();
    console.log(logueado)
  }, [logueado]);

  return (
    <NavigationContainer>
          {logueado ? (
            <BottomTab logueado={logueado} setLogueado={setLogueado} />
          ) : (
            <LoginNav logueado={logueado} setLogueado={setLogueado} />
          )}
    </NavigationContainer>
  );
};

export default App;
