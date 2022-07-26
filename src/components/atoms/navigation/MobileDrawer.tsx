/* eslint-disable @typescript-eslint/restrict-template-expressions */

import * as React from 'react';
import {createDrawerNavigator, DrawerContentScrollView} from '@react-navigation/drawer';
import MobileView from '@src/screens/dashboard/MobileView';
import { Avatar, Box, Flex, HStack, Icon, Text, VStack, Pressable } from 'native-base';
import colors from '@src/styles/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const Drawer = createDrawerNavigator();

// Custom Drawer
const CustomDrawerContent = (props) => {
  console.log(props.state.routeNames);
  return (
    <DrawerContentScrollView {...props} safeArea>
      <Box px="4" py="5">
        <Flex alignItems="center" flexDirection={'row'}>
          <Avatar w="70px" h="70px" bg="green.500">
						HA
          </Avatar>
          <VStack px="4" space="0">
            <Text pr="20px" fontSize="xl" textTransform={'uppercase'} bold>MIKE HECHSON</Text>
            <Text p="0"  fontSize="16" mt="0">Marketing sales person</Text>
          </VStack>
        </Flex>
      </Box>
      <VStack space="3">
        <Box bg={{
          linearGradient: {
            colors: ['primary.400', 'transparent'],
            start: [0, 0],
            end: [1, 0]
          }
        }}>
          <Pressable
            px="5"
            py="3"
            onPress={() => {props.navigation.navigate('dashboard')}}>
            <HStack space="2" alignItems="center">
              <Icon
                color="gray.500"
                size="xl"
                as={<MaterialCommunityIcons name="bookmark" />}
              />
              <Text fontSize={'18px'} color="primary.text" fontWeight="600">Friends</Text>
            </HStack>
          </Pressable>
        </Box>
				
      </VStack>
			
    </DrawerContentScrollView>
  );
}

const MobileDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: `rgba(${colors.darkbox},0.95)`,
          width: '95%',

        }}}
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen  options={{ headerShown: false }} name="dashboard" component={MobileView} />
    </Drawer.Navigator>
  )
}
export default  MobileDrawer;