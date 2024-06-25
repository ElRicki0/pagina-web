import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './src/navegation/BottonTab';
import NavStack from './src/navegation/NavStack';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function inicia() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 4000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    inicia();
  }, []);

  return (
    <NavigationContainer>
      {appIsReady ? <BottomTab /> : <NavStack />}
    </NavigationContainer>
  );
}
