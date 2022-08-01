
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DesktopView from '@src/screens/dashboard/DesktopView';

const Stack = createNativeStackNavigator();

const AppWebStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="home" component={DesktopView} />
        </Stack.Navigator>
    )
}

export default AppWebStack