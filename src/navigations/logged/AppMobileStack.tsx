
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Platform } from 'react-native';
import MobileView from '@src/screens/dashboard/MobileView';
import colors from '@src/styles/colors';
import DrawerLayout from '@src/containers/DrawerLayout';

const Drawer = createDrawerNavigator();

const AppMobileStack = () => {
    return (
        Platform.OS !== 'web' && (
            <Drawer.Navigator
                screenOptions={{
                    drawerStyle: {
                        backgroundColor: `rgba(${colors.darkbox},0.95)`,
                        width: '80%'
                    }
                }}
                drawerContent={(props: any) => <DrawerLayout {...props} />}>
                <Drawer.Screen options={{ headerShown: false }} name="home" component={MobileView} />
            </Drawer.Navigator>
        )

    )
}

export default AppMobileStack