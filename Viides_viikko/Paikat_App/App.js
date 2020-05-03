import * as React from 'react';
import { View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import koti from './Ensimmainen_sivu';
import historia from './Toinen_sivu';

const Stack = createStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Laskin" component={koti} />
        <Stack.Screen name="historia" component={historia} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

