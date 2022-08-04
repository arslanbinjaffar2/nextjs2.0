import * as React from 'react';
import { Avatar, Box, Center, Flex, HStack, Pressable, Text, VStack } from 'native-base';
import IcoDashboard from '@src/assets/icons/IcoDashboard';
import IcoProgram from '@src/assets/icons/IcoProgram';
import IcoAttendees from '@src/assets/icons/IcoAttendees';
import IcoMyAttendees from '@src/assets/icons/IcoMyAttendees';
import IcoSpeaker from '@src/assets/icons/IcoSpeaker';

const Sidebar = ({navigation}: any) => {
  return (
    <Center alignItems="flex-start" w="265px">
      <Box pb="3">
        <Flex alignItems="center" flexDirection={'row'}>
          <Avatar w="70px" h="70px" bg="green.500">
          HA
          </Avatar>
          <VStack px="5" space="0">
            <Text fontSize="lg" textTransform={'uppercase'} bold>MIKE HECHSON</Text>
            <Text p="0" fontSize="md" mt="0">Marketing sales person</Text>
          </VStack>
        </Flex>
      </Box>
      <Center w="100%" maxW="100%">
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{bg: 'primary.500'}}
          borderRadius="4"
          onPress={() => { navigation.navigate('dashboard') }}>
          <HStack space="4" alignItems="center">
            <IcoDashboard width="24" height="24" />
            <Text fontSize={'lg'} color="primary.text">Dashboard</Text>
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{bg: 'primary.500'}}
          borderRadius="4"
          onPress={() => { navigation.navigate('dashboard') }}>
          <HStack space="4" alignItems="center">
            <IcoSpeaker width="15" height="24" />
            <Text fontSize={'lg'} color="primary.text">Speaker</Text>
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{bg: 'primary.500'}}
          borderRadius="4"
          onPress={() => { navigation.navigate('dashboard') }}>
          <HStack space="4" alignItems="center">
            <IcoAttendees width="24" height="21" />
            <Text fontSize={'lg'} color="primary.text">Attendees</Text>
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{bg: 'primary.500'}}
          borderRadius="4"
          onPress={() => { navigation.navigate('dashboard') }}>
          <HStack space="4" alignItems="center">
            <IcoDashboard width="24" height="24" />
            <Text fontSize={'lg'} color="primary.text">Dashboard</Text>
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{bg: 'primary.500'}}
          borderRadius="4"
          onPress={() => { navigation.navigate('dashboard') }}>
          <HStack space="4" alignItems="center">
            <IcoSpeaker width="15" height="24" />
            <Text fontSize={'lg'} color="primary.text">Speaker</Text>
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{bg: 'primary.500'}}
          borderRadius="4"
          onPress={() => { navigation.navigate('dashboard') }}>
          <HStack space="4" alignItems="center">
            <IcoAttendees width="24" height="21" />
            <Text fontSize={'lg'} color="primary.text">Attendees</Text>
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{bg: 'primary.500'}}
          borderRadius="4"
          onPress={() => { navigation.navigate('dashboard') }}>
          <HStack space="4" alignItems="center">
            <IcoDashboard width="24" height="24" />
            <Text fontSize={'lg'} color="primary.text">Dashboard</Text>
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{bg: 'primary.500'}}
          borderRadius="4"
          onPress={() => { navigation.navigate('dashboard') }}>
          <HStack space="4" alignItems="center">
            <IcoSpeaker width="15" height="24" />
            <Text fontSize={'lg'} color="primary.text">Speaker</Text>
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{bg: 'primary.500'}}
          borderRadius="4"
          onPress={() => { navigation.navigate('dashboard') }}>
          <HStack space="4" alignItems="center">
            <IcoAttendees width="24" height="21" />
            <Text fontSize={'lg'} color="primary.text">Attendees</Text>
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{bg: 'primary.500'}}
          borderRadius="4"
          onPress={() => { navigation.navigate('dashboard') }}>
          <HStack space="4" alignItems="center">
            <IcoDashboard width="24" height="24" />
            <Text fontSize={'lg'} color="primary.text">Dashboard</Text>
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{bg: 'primary.500'}}
          borderRadius="4"
          onPress={() => { navigation.navigate('dashboard') }}>
          <HStack space="4" alignItems="center">
            <IcoSpeaker width="15" height="24" />
            <Text fontSize={'lg'} color="primary.text">Speaker</Text>
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{bg: 'primary.500'}}
          borderRadius="4"
          onPress={() => { navigation.navigate('dashboard') }}>
          <HStack space="4" alignItems="center">
            <IcoAttendees width="24" height="21" />
            <Text fontSize={'lg'} color="primary.text">Attendees</Text>
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{bg: 'primary.500'}}
          borderRadius="4"
          onPress={() => { navigation.navigate('dashboard') }}>
          <HStack space="4" alignItems="center">
            <IcoDashboard width="24" height="24" />
            <Text fontSize={'lg'} color="primary.text">Dashboard</Text>
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{bg: 'primary.500'}}
          borderRadius="4"
          onPress={() => { navigation.navigate('dashboard') }}>
          <HStack space="4" alignItems="center">
            <IcoSpeaker width="15" height="24" />
            <Text fontSize={'lg'} color="primary.text">Speaker</Text>
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{bg: 'primary.500'}}
          borderRadius="4"
          onPress={() => { navigation.navigate('dashboard') }}>
          <HStack space="4" alignItems="center">
            <IcoAttendees width="24" height="21" />
            <Text fontSize={'lg'} color="primary.text">Attendees</Text>
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{bg: 'primary.500'}}
          borderRadius="4"
          onPress={() => { navigation.navigate('dashboard') }}>
          <HStack space="4" alignItems="center">
            <IcoDashboard width="24" height="24" />
            <Text fontSize={'lg'} color="primary.text">Dashboard</Text>
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{bg: 'primary.500'}}
          borderRadius="4"
          onPress={() => { navigation.navigate('dashboard') }}>
          <HStack space="4" alignItems="center">
            <IcoSpeaker width="15" height="24" />
            <Text fontSize={'lg'} color="primary.text">Speaker</Text>
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{bg: 'primary.500'}}
          borderRadius="4"
          onPress={() => { navigation.navigate('dashboard') }}>
          <HStack space="4" alignItems="center">
            <IcoAttendees width="24" height="21" />
            <Text fontSize={'lg'} color="primary.text">Attendees</Text>
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{bg: 'primary.500'}}
          borderRadius="4"
          onPress={() => { navigation.navigate('dashboard') }}>
          <HStack space="4" alignItems="center">
            <IcoDashboard width="24" height="24" />
            <Text fontSize={'lg'} color="primary.text">Dashboard</Text>
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{bg: 'primary.500'}}
          borderRadius="4"
          onPress={() => { navigation.navigate('dashboard') }}>
          <HStack space="4" alignItems="center">
            <IcoSpeaker width="15" height="24" />
            <Text fontSize={'lg'} color="primary.text">Speaker</Text>
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{bg: 'primary.500'}}
          borderRadius="4"
          onPress={() => { navigation.navigate('dashboard') }}>
          <HStack space="4" alignItems="center">
            <IcoAttendees width="24" height="21" />
            <Text fontSize={'lg'} color="primary.text">Attendees</Text>
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{bg: 'primary.500'}}
          borderRadius="4"
          onPress={() => { navigation.navigate('dashboard') }}>
          <HStack space="4" alignItems="center">
            <IcoDashboard width="24" height="24" />
            <Text fontSize={'lg'} color="primary.text">Dashboard</Text>
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{bg: 'primary.500'}}
          borderRadius="4"
          onPress={() => { navigation.navigate('dashboard') }}>
          <HStack space="4" alignItems="center">
            <IcoSpeaker width="15" height="24" />
            <Text fontSize={'lg'} color="primary.text">Speaker</Text>
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{bg: 'primary.500'}}
          borderRadius="4"
          onPress={() => { navigation.navigate('dashboard') }}>
          <HStack space="4" alignItems="center">
            <IcoAttendees width="24" height="21" />
            <Text fontSize={'lg'} color="primary.text">Attendees</Text>
          </HStack>
        </Pressable>
      </Center>
    
    </Center>
  );
}

export default Sidebar;