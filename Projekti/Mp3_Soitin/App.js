import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import mp3soitin from './mp3soitin';
import quotesApi from './quotesApi';

const Stack = createStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="mp3 soitin" component={mp3soitin} />
        <Stack.Screen name="quotesApi" component={quotesApi} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
