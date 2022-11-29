
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Platform } from 'react-native';
import Index from 'app/screens/mobile/dashboard/Index';
import colors from 'app/styles/colors';
import DrawerLayout from 'app/containers/mobile/DrawerLayout';

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
        <Drawer.Screen options={{ headerShown: false }} name="index" component={Index} />
      </Drawer.Navigator>
    )
  )
}

export default AppMobileStack