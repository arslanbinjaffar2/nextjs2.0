
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from '@src/screens/web/dashboard/Index';

const Stack = createNativeStackNavigator();

const AppWebStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="dashboard" component={Index} />
        </Stack.Navigator>
    )
}

export default AppWebStack