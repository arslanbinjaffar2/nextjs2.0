import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from 'app/navigations/auth/AuthStack';
import AppStack from 'app/navigations/logged/AppStack';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="auth">
        <Stack.Screen options={{ headerShown: false }} name="auth" component={AuthStack} />
        <Stack.Screen options={{ headerShown: false }} name="dashboard" component={AppStack} />
      </Stack.Navigator>
    </>
  );
};

export default RootStack;