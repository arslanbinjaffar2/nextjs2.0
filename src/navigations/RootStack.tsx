/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '@src/screens/auth/login/SplashScreen';
import Login from '@src/screens/auth/login/login';
import NavigationBack from './NavigationBack';

const Stack = createNativeStackNavigator();
const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ title: 'Welcome', headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Login with event code',
            headerShown: true,
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerStyle: {height: 80},
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 24,
              fontFamily: 'avenir-medium'
            },
            
            headerLeft: () => (
              <NavigationBack />
            )
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootStack;