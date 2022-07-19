/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking'
import SplashScreen from '@src/screens/auth/login/SplashScreen';
import Login from '@src/screens/auth/login/login';
import LoginByEmail from '@src/screens/auth/login/LoginByEmail';
import EventList from '@src/screens/auth/login/EventList';
import NavigationBack from '@src/components/atoms/NavigationBack';

const Stack = createNativeStackNavigator();
const RootStack = () => {
  const _options = {
    headerShown: Platform.OS === 'web' ? false : true,
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
  }
  return (
    <NavigationContainer linking>
      <Stack.Navigator>
        <Stack.Screen
          name="welcome"
          component={SplashScreen}
          options={{ title: 'Welcome', headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{..._options,title: 'Login with event code'}}
        />
        <Stack.Screen
          name="login-by-email"
          component={LoginByEmail}
          options={{..._options,title: 'Login with email'}}
        />
        <Stack.Screen
          name="event-list"
          component={EventList}
          options={{..._options,title: 'Event list'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootStack;