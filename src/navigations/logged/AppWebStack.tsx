
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from '@src/screens/web/dashboard/Index';
import ProgramsLayout from '@src/screens/web/dashboard/ProgramsLayout';

const Stack = createNativeStackNavigator();

const AppWebStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="index" component={Index} />
      <Stack.Screen options={{ headerShown: false }} name="programs" component={ProgramsLayout} />
    </Stack.Navigator>
  )
}

export default AppWebStack