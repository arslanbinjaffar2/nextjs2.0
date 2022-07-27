import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from '@src/navigations/auth/AuthStack';
import DrawerStack from '@src/navigations/logged/DrawerStack';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <>
      <NavigationContainer linking>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={AuthStack} />
          <Stack.Screen
            name="Root"
            component={DrawerStack}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default RootStack;