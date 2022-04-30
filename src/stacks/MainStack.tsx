import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Barber from '../screens/Barber';
import Preload from '../screens/Preload';
import makeSignIn from '../screens/SignIn/signInFactory';
import makeSignUp from '../screens/SignUp/signUpFactory';
import MainTab from './MainTab';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Preload" component={Preload} />
      <Stack.Screen name="SignIn" component={makeSignIn} />
      <Stack.Screen name="SignUp" component={makeSignUp} />
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="Barber" component={Barber} />
    </Stack.Navigator>
  );
}
