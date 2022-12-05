
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from 'application/screens/Welcome';
import FindEventCode from 'application/screens/auth/login/mobile/FindEventCode';
import FindEmail from 'application/screens/auth/login/mobile/FindEmail';
import Events from 'application/screens/auth/login/mobile/Events';
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
      </Stack.Group>
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
    </Stack.Navigator>
  )
}

export default AuthStack