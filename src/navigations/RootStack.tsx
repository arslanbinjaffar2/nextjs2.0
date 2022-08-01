import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import AuthMobileStack from '@src/navigations/auth/AuthMobileStack';
import AuthWebStack from '@src/navigations/auth/AuthWebStack';
import AppMobileStack from '@src/navigations/logged/AppMobileStack';
import AppWebStack from '@src/navigations/logged/AppWebStack';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <>
      <NavigationContainer linking>

        <Stack.Navigator initialRouteName="auth">

          {Platform.OS !== 'web' && (
            <>
              <Stack.Screen options={{ headerShown: false }} name="auth" component={AuthMobileStack} />
              <Stack.Screen options={{ headerShown: false }} name="dashboard" component={AppMobileStack} />
            </>
          )}

          {Platform.OS === 'web' && (
            <>
              <Stack.Screen options={{ headerShown: false }} name="auth" component={AuthWebStack} />
              <Stack.Screen options={{ headerShown: false }} name="dashboard" component={AppWebStack} />
            </>
          )}
          
        </Stack.Navigator>

      </NavigationContainer>

    </>
  );
};

export default RootStack;