import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from 'application/navigations/auth/AuthStack';
import AppStack from 'application/navigations/logged/AppStack';
import Welcome from 'application/screens/mobile/Welcome';
import FindEventCode from 'application/screens/mobile/auth/FindEventCode';

const Stack = createNativeStackNavigator();

const RootStack = () => {

  const _options = {
    headerShown: true,
    headerTransparent: true,
    headerTitleAlign: 'center',
    headerStyle: { height: 80 },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 24,
      fontFamily: 'avenir-medium'
    }
  }

  return (
    <>
      <Stack.Navigator >
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
        <Stack.Screen options={{ headerShown: false }} name="dashboard" component={AppStack} />
        <Stack.Screen options={{ headerShown: false }} name="auth" component={AuthStack} />
      </Stack.Navigator>
    </>
  );
};

export default RootStack;