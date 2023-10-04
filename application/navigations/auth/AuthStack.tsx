
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from 'application/screens/mobile/auth/Login';
import FindEmail from 'application/screens/mobile/auth/FindEmail';
import Events from 'application/screens/mobile/auth/Events';
import NavigationBack from 'application/components/atoms/NavigationBack';
import ResetPasswordRequest from 'application/screens/mobile/auth/ResetPasswordRequest';
import Verification from 'application/screens/mobile/auth/Verification';
import ChooseProvider from 'application/screens/mobile/auth/ChooseProvider';
import ResetPassword from 'application/screens/mobile/auth/ResetPassword';

const Stack = createNativeStackNavigator();

const AuthStack = () => {

  const _options = {
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
  }

  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="login"
          component={Login}
          options={{ ..._options, title: 'Login' }}
        />
        <Stack.Screen
          name="reset-password-request"
          component={ResetPasswordRequest}
          options={{ ..._options, title: 'Reset password request' }}
        />
        <Stack.Screen
          name="choose-provider"
          component={ChooseProvider}
          options={{ ..._options, title: 'Choose provider' }}
        />
        <Stack.Screen
          name="verification"
          component={Verification}
          options={{ ..._options, title: 'Verification' }}
        />
        <Stack.Screen
          name="reset-password"
          component={ResetPassword}
          options={{ ..._options, title: 'Reset password' }}
        />
        <Stack.Screen
          name="email-login"
          component={FindEmail}
          options={{ ..._options, title: 'Login with email' }}
        />
        <Stack.Screen
          name="events"
          component={Events}
          options={{ ..._options, title: 'Event lists' }}
        />
      </Stack.Group>

    </Stack.Navigator>
  )
}

export default AuthStack