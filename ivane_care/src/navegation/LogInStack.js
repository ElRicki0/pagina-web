import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Login';
import SignUpScreen from '../screens/SignUp';

const Stack = createStackNavigator();

const LoginStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='LoginScreen'
        options={{ headerShown: false }}
        initialParams={{ navigation }}
      >
        {(props) => <LoginScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name='SignUp'
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default LoginStackScreen;
