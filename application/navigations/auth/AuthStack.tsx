
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from 'application/screens/mobile/Welcome';
import FindEventCode from 'application/screens/mobile/auth/FindEventCode';
import Login from 'application/screens/mobile/auth/Login';
import FindEmail from 'application/screens/mobile/auth/FindEmail';
import Events from 'application/screens/mobile/auth/Events';
import NavigationBack from 'application/components/atoms/NavigationBack';

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
          name="welcome"
          component={Welcome}
          options={{ title: 'Welcome', headerShown: false }}
        />
        <Stack.Screen
          name="event-code-login"
          component={FindEventCode}
          options={{ ..._options, title: 'Login with event code' }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{ ..._options, title: 'Login' }}
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