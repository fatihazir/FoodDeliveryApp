/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import Restaurant from './screens/Restaurant';
import OrderDelivery from './screens/OrderDelivery';
import Tabs from './navigation/Tabs';
import { Routes } from './constants';

const Stack = createStackNavigator()

const App = () => {

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false,
        }}
          initialRouteName={Routes.MainTab}>
          <Stack.Screen name={Routes.MainTab} component={Tabs} />
          <Stack.Screen name={Routes.Restaurant} component={Restaurant} />
          <Stack.Screen name={Routes.OrderDelivery} component={OrderDelivery} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
