import * as React from 'react';

import { DrawerContentScrollView } from '@react-navigation/drawer';

import { Avatar, Box, Flex, HStack, Text, VStack, Pressable } from 'native-base';

import IcoMyEvents from 'applications/app/assets/icons/IcoMyEvents';

const DrawerLayout = (props: any) => {

  return (
    <DrawerContentScrollView {...props} safeArea>
      <Box px="4" py="5">
        <Flex alignItems="center" flexDirection={'row'}>
          <Avatar w="70px" h="70px" bg="green.500">
            HA
          </Avatar>
          <VStack px="4" space="0">
            <Text isTruncated w="200px" pr="20px" fontSize="xl" textTransform={'uppercase'} bold> MIKE HECHSON</Text>
            <Text p="0" fontSize="16" mt="0">Marketing sales person</Text>
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
            onPress={() => { props.navigation.navigate('dashboard') }}>
            <HStack space="2" alignItems="center">
              <IcoMyEvents width="24" height="24" />
              <Text fontSize={'18px'} color="primary.text" fontWeight="600">Dashboard</Text>
            </HStack>
          </Pressable>
        </Box>
      </VStack>

    </DrawerContentScrollView>
  );
}

export default DrawerLayout;