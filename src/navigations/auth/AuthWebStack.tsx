
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import WebLogin from '@src/screens/auth/login/web/Login';
import NavigationBack from '@src/components/atoms/NavigationBack';

const Stack = createNativeStackNavigator();

const AuthWebStack = () => {

    const _options = {
        headerShown: Platform.OS === 'web' ? false : true,
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
            <Stack.Screen
                name="event-code-login"
                component={WebLogin}
                options={{ ..._options, title: 'Login' }}
            />
        </Stack.Navigator>
    )
}

export default AuthWebStack