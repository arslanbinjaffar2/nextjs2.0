import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '@src/screens/Splash';
import Login from '@src/screens/auth/login/login';
import NavigationBack from './NavigationBack';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
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
            headerStyle: { height: 80 },
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