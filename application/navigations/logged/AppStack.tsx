
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Index from 'applications/app/screens/mobile/dashboard/Index';
import colors from 'applications/app/styles/colors';
import DrawerLayout from 'applications/app/containers/mobile/DrawerLayout';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
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
}

export default AppStack