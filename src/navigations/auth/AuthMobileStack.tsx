
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import Splash from '@src/screens/Splash';
import Login from '@src/screens/auth/login/mobile/Login';
import LoginByEmail from '@src/screens/auth/login/mobile/LoginByEmail';
import Events from '@src/screens/auth/login/mobile/Events';
import NavigationBack from '@src/components/atoms/NavigationBack';

const Stack = createNativeStackNavigator();

const AuthMobileStack = () => {

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
            <Stack.Group>
                <Stack.Screen
                    name="welcome"
                    component={Splash}
                    options={{ title: 'Welcome', headerShown: false }}
                />
                <Stack.Screen
                    name="event-code-login"
                    component={Login}
                    options={{ ..._options, title: 'Login with event code' }}
                />
            </Stack.Group>
            <Stack.Screen
                name="email-login"
                component={LoginByEmail}
                options={{ ..._options, title: 'Login with email' }}
            />
            <Stack.Screen
                name="event-list"
                component={Events}
                options={{ ..._options, title: 'Event list' }}
            />
        </Stack.Navigator>
    )
}

export default AuthMobileStack