import { NavigationContainer } from "@react-navigation/native";
import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import MainStack from "./src/stacks/MainStack";
import store from './src/store';

export default () => {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor="#63c2d1" />
        <MainStack />
      </NavigationContainer>
    </Provider>
  );
}
