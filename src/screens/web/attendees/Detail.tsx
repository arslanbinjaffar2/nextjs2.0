import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Center, Container, Heading, HStack, Icon, IconButton, Input, Spacer, Text, VStack, ZStack, Image, Divider, Avatar, Pressable} from 'native-base';
import { AntDesign,SimpleLineIcons,Ionicons} from '@expo/vector-icons';
import Master from '@src/screens/web/layouts/Master';
import { useState } from 'react';
import IcoRaiseHand from '@src/assets/icons/IcoRaiseHand';
import Icoribbon from '@src/assets/icons/Icoribbon';
import Icoresume from '@src/assets/icons/Icoresume';
import Icohotelbed from '@src/assets/icons/Icohotelbed';
import IcoSurvey from '@src/assets/icons/IcoSurvey';


type indexProps = {
  navigation: unknown
}

const Detail = ({ navigation }: indexProps)  => {
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
                uri:'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
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
        <>
          {tabs === 'ABOUT' &&<Box overflow="hidden" w="100%" bg="primary.box" p="0" rounded="lg">
            <HStack px="3" py="1" bg="primary.darkbox" w="100%"  space="3" alignItems="center">
              <Icon as={AntDesign} name="infocirlceo" size="md" color="primary.text" />
              <Text fontSize="md">About</Text>
            </HStack>
            <VStack py="5" px="4" space="0" alignItems="center">
              <Text fontSize="md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim eniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </Text>
            </VStack>
            <Box p="0">
              <HStack px="3" py="1" bg="primary.darkbox" w="100%"  space="3" alignItems="center">
                <Icon as={AntDesign} name="infocirlceo" size="md" color="primary.text" />
                <Text fontSize="md">More info</Text>
              </HStack>
              <VStack px="3" py="4" w="100%" space="3">
                <HStack space="0" alignItems="flex-start">
                  <Box w="15%">
                    <Heading fontSize="md" lineHeight="lg">Job task :</Heading>
                  </Box>
                  <Box w="84%" pl="1">
                    <Text fontSize="md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                  </Box>
                </HStack>
                <HStack space="0" alignItems="flex-start">
                  <Box w="15%">
                    <Heading fontSize="md" lineHeight="lg">Interests :</Heading>
                  </Box>
                  <Box w="84%" pl="1">
                    <Text fontSize="md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</Text>
                  </Box>
                </HStack>
                <HStack space="0" alignItems="flex-start">
                  <Box w="15%">
                    <Heading fontSize="md" lineHeight="lg">Network Group :</Heading>
                  </Box>
                  <Box w="84%" pl="1">
                    <Text fontSize="md">My network</Text>
                  </Box>
                </HStack>
                <HStack space="0" alignItems="flex-start">
                  <Box w="15%">
                    <Heading fontSize="md" lineHeight="lg">Age:</Heading>
                  </Box>
                  <HStack space="24" w="84%" pl="1" alignItems="flex-start">
                    <Text fontSize="md">25 years</Text>
                    <HStack space="4">
                      <Heading fontSize="md" lineHeight="lg">Private post code :</Heading>
                      <Text fontSize="md">76765</Text>
                    </HStack>
                    
                  </HStack>
                </HStack>
                
              </VStack>
              
            </Box>
            <Box p="0">
              <HStack px="3" py="1" bg="primary.darkbox" w="100%"  space="3" alignItems="center">
                <IcoSurvey width="14" height="17" />
                <Text fontSize="md">Sub-registrations</Text>
              </HStack>
              <Box w="100%" py="4">
                <HStack px="5" w="100%" space="0" alignItems="center" justifyContent="space-between">
                  <VStack bg="red" w="100%" maxW={['95%','80%','70%']} space="0">
                    <Text fontSize="md">10 things we can do to help</Text>
                  </VStack>
                  <Spacer />
                  <Icon as={SimpleLineIcons} name="arrow-right" size="md"  />
                </HStack>
              </Box>
            </Box>
          </Box>}
        </>
        <>
          {tabs === 'GROUPS' && <Container mb="3" rounded="lg" bg="primary.box" w="100%" maxW="100%">
            {[...Array(5)].map((item,k) => 
              <Box w="100%" key={k} borderBottomWidth={k===4 ? 0 : 1} borderColor="primary.text" py="3">
                <HStack pl="30px" alignItems="flex-start" minH="55px" space={0} justifyContent="flex-start">
                  <Box position="absolute" left="0" top="0" w="15px">
                    <ZStack>
                      {[...Array(1)].map((track,i) =>
                        <Box key={i} bg={`green.${i+1}00`} borderWidth="1" borderColor="primary.darkbox" w="15px" mt={`${i*10}px`} h={`${55 - (i*10)}px`} borderRightRadius="10" shadow={2} />
                      )}
                    </ZStack>
                  </Box>
                  <HStack pt="2" w="100%" space="5" alignItems="center" justifyContent="space-between">
                    <VStack w="40px" space="0">
                      <Text lineHeight="22px">08:50</Text>
                      <Text lineHeight="22px">09:45</Text>
                    </VStack>
                    <Center  maxW={['62%','70%','42%']} alignSelf="flex-start" p="0">
                      <Text alignSelf="flex-start" lineHeight="22px">First point in the agenda, with room for two lines of text.</Text>
                  
                    </Center>
                
                    <Spacer />
                    <HStack pr="5" space="2" alignItems="center">
                      <Icon style={{WebkitTextStroke: '2px #fff'}} size="xl" as={Ionicons} name="heart" color="primary.secondary"  />
                    </HStack>
                  </HStack>
                </HStack>
              </Box>)}
          </Container>}
        </>
        <>
          {tabs === 'ATTENDEES' && <Container mb="3" rounded="lg" bg="primary.box" w="100%" maxW="100%">
            {[...Array(7)].map((item,k) => 
              <Box w="100%" key={k} borderBottomWidth={k===6 ? 0 : 1} borderColor="primary.text" py="4">
                <HStack px="4" alignItems="flex-start" space={0} justifyContent="flex-start">
                  <HStack  w="100%" space="5" alignItems="center" justifyContent="space-between">
                    <Avatar
                      borderWidth={1}
                      borderColor="primary.darkbox"
                      bg={`danger.${k+1}00`}
                      source={{
                        uri:'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                      }}>MC</Avatar>
                    <VStack maxW={['62%','70%','40%']} space="0">
                      <Text lineHeight="22px" fontSize="lg">Marketing CEO</Text>
                    </VStack>
          
       
                    <Spacer />
                    <HStack space="4" alignItems="center">
                      <Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text"  />
                    </HStack>
                  </HStack>
                </HStack>
              </Box>)}
          </Container>}
        </>
      </Container>

    </Master>

  );
};

Detail.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Detail;
