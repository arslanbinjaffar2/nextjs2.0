import * as React from 'react';
import { Avatar, Box, Center, Flex, HStack, Pressable, Text, VStack } from 'native-base';
import IcoDashboard from '@src/assets/icons/IcoDashboard';
import IcoAttendees from '@src/assets/icons/IcoAttendees';
import IcoSpeaker from '@src/assets/icons/IcoSpeaker';
import { useWindowDimensions } from 'react-native';

const Sidebar = ({ navigation }: any) => {
  const {width} = useWindowDimensions();
  return (
    <Center overflow="auto" position="sticky" top="2rem" h="100%"  alignItems="flex-start" w={width > 1200 ? '265px' : '70px'}>
      <Box pb="3">
        <Flex alignItems="center" flexDirection={'row'}>
          <Avatar w="70px" h="70px" bg="green.500">
                        HA
          </Avatar>
          {width > 1200 && <VStack px="5" space="0">
            <Text fontSize="lg" textTransform={'uppercase'} bold>MIKE HECHSON</Text>
            <Text p="0" fontSize="md" mt="0">Marketing sales person</Text>
          </VStack>}
        </Flex>
      </Box>
      <Center px={width > 1200 ? '0' : '1'} w="100%" maxW="100%" >
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{ bg: 'primary.500' }}
          borderRadius="4"
          onPress={() => { navigation.navigate('dashboard') }}>
          <HStack space="4" alignItems="center">
            <Center align="center" w="30px">
              <IcoDashboard width="24" height="24" />
            </Center>
            {width > 1200 && <Text fontSize={'lg'} color="primary.text">Dashboard</Text>}
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{ bg: 'primary.500' }}
          borderRadius="4"
          onPress={() => { navigation.navigate('dashboard') }}>
          <HStack space="4" alignItems="center">
            <Center align="center" w="30px">
              <IcoSpeaker width="15" height="24" />
            </Center>
            {width > 1200 && <Text fontSize={'lg'} color="primary.text">Speaker</Text>}
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{ bg: 'primary.500' }}
          borderRadius="4"
          onPress={() => { navigation.navigate('dashboard') }}>
          <HStack space="4" alignItems="center">
            <Center align="center" w="30px">
              <IcoAttendees width="24" height="21" />
            </Center>
            {width > 1200 && <Text fontSize={'lg'} color="primary.text">Attendees</Text>}
          </HStack>
        </Pressable>
      </Center>
    </Center>
  );
}

export default Sidebar;