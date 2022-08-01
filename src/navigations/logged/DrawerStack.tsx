
import * as React from 'react';
import colors from '@src/styles/colors';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerLayout from '@src/containers/DrawerLayout';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MobileView from '@src/screens/dashboard/MobileView';
import DesktopView from '@src/screens/dashboard/DesktopView';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DrawerStack = () => {
  return (
    <React.Fragment>
      {Platform.OS !== 'web' && <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: `rgba(${colors.darkbox},0.95)`,
            width: '80%',

          }
        }}
        drawerContent={(props: any) => <DrawerLayout {...props} />}>
        <Drawer.Screen options={{ headerShown: false }} name="home" component={MobileView} />
      </Drawer.Navigator>}
      {Platform.OS === 'web' && <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="home" component={DesktopView} />
      </Stack.Navigator>}

    </React.Fragment>
  )
}

export default DrawerStack