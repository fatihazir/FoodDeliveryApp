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
  View,
} from 'react-native';
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import Restaurant from './screens/Restaurant';
import OrderDelivery from './screens/OrderDelivery';
import Tabs from './navigation/Tabs';

const Stack = createStackNavigator()

const App = () => {

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}
          initialRouteName="MainTab">
          <Stack.Screen name='MainTab' component={Tabs} />
          <Stack.Screen name='Restaurant' component={Restaurant} />
          <Stack.Screen name='OrderDelivery' component={OrderDelivery} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
