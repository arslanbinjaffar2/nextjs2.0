
import * as React from 'react';
import {createDrawerNavigator, DrawerContentScrollView} from '@react-navigation/drawer';
import MobileView from '@src/screens/dashboard/MobileView';
import { Box, Text } from 'native-base';
const Drawer = createDrawerNavigator();

// Custom Drawer
const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} safeArea>
      <Box px="4">
        <Text bold color="gray.700">
          Mail
        </Text>
        <Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
          john_doe@gmail.com
        </Text>
      </Box>
    </DrawerContentScrollView>
  );
}

const MobileDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="dashboard" component={MobileView} />
    </Drawer.Navigator>
  )
}
export default  MobileDrawer;