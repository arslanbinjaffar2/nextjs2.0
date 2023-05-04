import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from 'application/navigations/auth/AuthStack';
import AppStack from 'application/navigations/logged/AppStack';
import AsyncStorageClass from 'application/utils/AsyncStorageClass';
import UseEventService from 'application/store/services/UseEventService';
import Welcome from 'application/screens/mobile/Welcome';
import FindEventCode from 'application/screens/mobile/auth/FindEventCode';
import UseAuthService from 'application/store/services/UseAuthService';

const Stack = createNativeStackNavigator();

const RootStack = () => {

  const { getUser, isLoggedIn } = UseAuthService();

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

  const { FetchEventByCode, event } = UseEventService();

  React.useEffect(() => {
    AsyncStorageClass.getItem('eventbuizz-active-event-id').then((event_id: any) => {
      if (event_id) {
        FetchEventByCode(event_id)
      }
    });
  }, []);

  React.useEffect(() => {
    if (event.id) {
      getUser();
    }
  }, [event.id])

  return (
    <>
      <Stack.Navigator >
        {event.id ? (
          <>
            {isLoggedIn ? (
              <Stack.Screen options={{ headerShown: false }} name="dashboard" component={AppStack} />
            ) : (
              <Stack.Screen options={{ headerShown: false }} name="auth" component={AuthStack} />
            )}
          </>
        ) : (
          <>
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
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

export default RootStack;