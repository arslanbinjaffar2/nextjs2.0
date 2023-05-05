
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Index from 'application/screens/mobile/dashboard/Index';
import Program from 'application/screens/mobile/program/Index';
import colors from 'application/styles/colors';
import DrawerLayout from 'application/screens/mobile/layouts/Drawer';

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
      <Drawer.Screen options={{ headerShown: false }} name="dashboard" component={Index} />
      <Drawer.Screen options={{ headerShown: false }} name="agendas" component={Program} />
    </Drawer.Navigator>
  )
}

export default AppStack