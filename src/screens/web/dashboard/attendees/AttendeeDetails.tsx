import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Center, Container, Heading, HStack, Icon, IconButton, Input, Spacer, Text, VStack, ZStack, Image, Divider, Avatar, Pressable} from 'native-base';
import { AntDesign,SimpleLineIcons} from '@expo/vector-icons';
import Master from '@src/screens/web/layouts/Master';
import { useState } from 'react';
import IcoSpeaker from '@src/assets/icons/IcoSpeaker';
import IcoPolls from '@src/assets/icons/IcoPolls';
import IcoRaiseHand from '@src/assets/icons/IcoRaiseHand';
import Icoribbon from '@src/assets/icons/Icoribbon';
import Icoresume from '@src/assets/icons/Icoresume';
import Icohotelbed from '@src/assets/icons/Icohotelbed';


type indexProps = {
  navigation: unknown
}

const AttendeeDetails = ({ navigation }: indexProps)  => {
  const [tabs, settabs]  = useState< string | null>('ABOUT');
  return (
    <Master navigation={navigation}>
      
      <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
        <HStack  space="3" alignItems="center">
          <Icon as={AntDesign} name="arrowleft" size="xl" color="primary.text"  />
          <Text  fontSize="2xl">BACK</Text>
        </HStack>
        <Spacer />
        <Input  rounded="lg" w="60%" bg="primary.box" borderWidth={1} borderColor="primary.darkbox" placeholder="Search" leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1"  />}  />
      </HStack>

      <Container borderWidth="1" borderColor="primary.darkbox" bg="primary.500" rounded="lg" overflow="hidden" mb="3" maxW="100%" w="100%">
        <Box w="100%" p="4" py="5" rounded="lg">
          <HStack mb="4" space="5">
            <Avatar
              size="lg"
              borderWidth="1"
              borderColor="primary.darkbox"
              source={{
                uri:"https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg"
              }}
            >
              BB
            </Avatar>
            <VStack maxW="70%" space="0">
              <Text lineHeight="sm" fontSize="xl">Marie Solbakke</Text>
              <Text lineHeight="sm" fontSize="md">Transportfirmaet HT</Text>
              <Text lineHeight="sm" fontSize="md">Marketing CEO</Text>
            </VStack>
            <Spacer />
            <Box w="20px" h="100%">
              <Icoribbon width="20" height="28" />
            </Box> 
          </HStack>
          <HStack w="100%" space="0">
            <Center alignItems="flex-start" pl="0" w="33.33%">
              <VStack space="0">
                <Text lineHeight="sm" fontSize="sm">Initials</Text>
                <Text lineHeight="sm" fontSize="sm">MSA</Text>
              </VStack>
            </Center>
            <Center borderLeftWidth="1" borderColor="primary.text" alignItems="flex-start" pl="8"  w="33.33%">
              <VStack space="0">
                <Text lineHeight="sm" fontSize="sm">Delegate nr:</Text>
                <Text lineHeight="sm" fontSize="sm">21405</Text>
              </VStack>
            </Center>
            <Center borderLeftWidth="1" borderColor="primary.text" alignItems="flex-start" pl="8" w="33.33%">
              <VStack space="0">
                <Text lineHeight="sm" fontSize="sm">Table nr:</Text>
                <Text lineHeight="sm" fontSize="sm">00212</Text>
              </VStack>
            </Center>
          </HStack>
        </Box>
        <Box w="100%" bg="primary.secondary" px="5" py="3" borderTopWidth="1" borderColor="primary.darkbox">
          <HStack w="100%" space="0">
            <Center w="20%" alignItems="flex-start">
              <Icoresume width="22" height="25" />
            </Center>
            <Center w="20%"  borderLeftWidth="1" borderColor="primary.text" alignItems="center">
              <Icohotelbed width="24" height="18" />
            </Center>
          </HStack>
        </Box>
      </Container>
      
      <Container mb="3" maxW="100%" w="100%">
        <HStack mb="3" space={1} justifyContent="center" w="100%">
          <Button onPress={() => settabs('ABOUT')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={tabs === 'ABOUT' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{fontWeight: '600'}}>ALL</Button>
          <Button onPress={() => settabs('GROUPS')} borderRadius="0" borderWidth="1px" py={0}  borderColor="primary.darkbox" h="42px" bg={tabs === 'GROUPS' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{fontWeight: '600'}}>MY ATTENDEES</Button>
          <Button onPress={() => settabs('ATTENDEES')} borderWidth="1px" py={0}  borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8}   h="42px" bg={tabs === 'ATTENDEES' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{fontWeight: '600'}}>GROUPS</Button>
        </HStack>
        <Box overflow="hidden" w="100%" bg="primary.box" p="0" rounded="lg">
          <HStack px="3" py="1" bg="primary.darkbox" w="100%"  space="3" alignItems="center">
            <Icon as={AntDesign} name="infocirlceo" size="md" color="primary.text" />
            <Text fontSize="md">About</Text>
          </HStack>
          <VStack py="5" px="4" space="0" alignItems="center">
            <Text fontSize="md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim eniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </Text>
          </VStack>
          <Box p="0">
            <HStack px="3" py="1" bg="primary.darkbox" w="100%"  space="3" alignItems="center">
              <IcoPolls width="17" height="17" />
              <Text fontSize="md">Polls</Text>
            </HStack>
            {[...Array(2)].map((item,k) =>
              <Pressable
                key={k}
                p="0"
                w="100%"
                _hover={{bg: 'primary.500'}}
                onPress={()=>{console.log('hello')}}>
                <Box w="100%" borderBottomWidth={k === 1 ? 0  : 1} borderColor="primary.text" py="4">
                  <HStack px="5" w="100%" space="0" alignItems="center" justifyContent="space-between">
                    <VStack bg="red" w="100%" maxW={['95%','80%','70%']} space="0">
                      <Text fontSize="md">This is a great example of a yes or no poll.</Text>
                      <Text fontSize="md">Do you prefer the color blue or red?</Text>
                    </VStack>
                    <Spacer />
                    <Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />
                  </HStack>
                </Box>
              </Pressable>
            )}
          </Box>
          <Box p="0">
            <HStack px="3" py="1" bg="primary.darkbox" w="100%"  space="3" alignItems="center">
              <IcoRaiseHand width="14" height="17" />
              <Text fontSize="md">Request to speak</Text>
            </HStack>
            <Box w="100%" py="4">
              <HStack px="5" w="100%" space="0" alignItems="center" justifyContent="space-between">
                <VStack bg="red" w="100%" maxW={['95%','80%','70%']} space="0">
                  <Text fontSize="md">Request to speak</Text>
                </VStack>
                <Spacer />
                <IcoRaiseHand width="20" height="26" />
              </HStack>
            </Box>
          </Box>
          <Box p="0">
            <HStack px="3" py="1" bg="primary.darkbox" w="100%"  space="3" alignItems="center">
              <Icon size="sm" as={AntDesign} name="download" color="primary.text" />
              <Text fontSize="md">Downloads</Text>
            </HStack>
            <Box w="100%" py="4">
              <HStack px="5" w="100%" space="0" alignItems="center" justifyContent="space-between">
                <VStack bg="red" w="100%" maxW={['95%','80%','70%']} space="0">
                  <Text fontSize="md">10 things we can do to help</Text>
                </VStack>
                <Spacer />
                <Icon size="lg" as={AntDesign} name="pdffile1" color="primary.text" />
              </HStack>
            </Box>
          </Box>
        </Box>
      </Container>

    </Master>

  );
};

AttendeeDetails.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AttendeeDetails;
