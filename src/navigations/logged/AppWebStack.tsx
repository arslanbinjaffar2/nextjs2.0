
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from '@src/screens/web/dashboard/Index';
import ProgramsLayout from '@src/screens/web/dashboard/programs/ProgramsLayout';
import ProgramDetails from '@src/screens/web/dashboard/programs/ProgramDetails';

const Stack = createNativeStackNavigator();

const ProgramsModule = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="programs" component={ProgramsLayout} />
      <Stack.Screen options={{ headerShown: false }} name="detail" component={ProgramDetails} />
    </Stack.Navigator>
  )}

const AppWebStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="index" component={Index} />
      <Stack.Screen options={{ headerShown: false }} name="programs" component={ProgramsModule} />
    </Stack.Navigator>
  )
}

export default AppWebStack