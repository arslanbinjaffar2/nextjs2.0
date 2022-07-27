
import * as React from 'react';
import MobileView from '@src/screens/dashboard/MobileView';
import colors from '@src/styles/colors';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerLayout from '@src/containers/DrawerLayout';

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerStyle: {
                    backgroundColor: `rgba(${colors.darkbox},0.95)`,
                    width: '95%',
                }
            }}
            drawerContent={(props) => <DrawerLayout {...props} />}>
            <Drawer.Screen options={{ headerShown: false }} name="dashboard" component={MobileView} />
        </Drawer.Navigator>
    )
}

export default DrawerStack