/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from 'react';
import {createDrawerNavigator, DrawerContentScrollView} from '@react-navigation/drawer';
import MobileView from '@src/screens/dashboard/MobileView';
import { Avatar, Box, Flex, HStack, Text, VStack, Pressable } from 'native-base';
import colors from '@src/styles/colors';
import IcoMyEvents from '@src/assets/icons/IcoMyEvents';
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: JSX.IntrinsicAttributes) => {
  return (
    <DrawerContentScrollView {...props} safeArea>
      <Box px="4" py="5">
        <Flex alignItems="center" flexDirection={'row'}>
          <Avatar w="70px" h="70px" bg="green.500">
						HA
          </Avatar>
          <VStack px="4" space="0">
            <Text isTruncated w="200px" pr="20px" fontSize="xl" textTransform={'uppercase'} bold> MIKE HECHSON MIKE HECHSON MIKE HECHSON</Text>
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
              <IcoMyEvents width="24" height="24" />
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
          width: '80%',

        }}}
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen  options={{ headerShown: false }} name="dashboard" component={MobileView} />
    </Drawer.Navigator>
  )
}
export default  MobileDrawer;