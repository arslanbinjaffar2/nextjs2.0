import * as React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, Center, Container, Heading, HStack, Icon, IconButton, Input, Spacer, Text, VStack, ZStack} from 'native-base';
import { AntDesign, Ionicons} from '@expo/vector-icons';
import { SimpleLineIcons  } from '@expo/vector-icons'
import WebMainLayout from '@src/screens/web/dashboard/WebMainLayout';
import { useState } from 'react';
import Icoribbon from '@src/assets/icons/Icoribbon';


type indexProps = {
  navigation: unknown
}

const AttendeeLayout = ({ navigation }: indexProps)  => {
  const [tabs, settabs]  = useState< string | null>('PROGRAM');
  return (
    <WebMainLayout navigation={navigation}>
      <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
        <Text fontSize="2xl">ATTENDEES</Text>
        <Spacer />
        <Input  rounded="lg" w="60%" bg="primary.box" borderWidth={0} placeholder="Search" leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1"  />}  />
      </HStack>
      <HStack mb="3" space={1} justifyContent="center" w="100%">
        <Button  onPress={() => settabs('PROGRAM')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={tabs === 'PROGRAM' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{fontWeight: '600'}}>ALL</Button>
        <Button onPress={() => settabs('MY_PROGRAM')} borderRadius="0" borderWidth="1px" py={0}  borderColor="primary.darkbox" h="42px" bg={tabs === 'MY_PROGRAM' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{fontWeight: '600'}}>MY ATTENDEES</Button>
        <Button onPress={() => settabs('TRACKS')} borderWidth="1px" py={0}  borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8}   h="42px" bg={tabs === 'TRACKS' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{fontWeight: '600'}}>GROUPS</Button>
      </HStack>
      <>
        {tabs === 'PROGRAM' && <Container overflow="hidden" mb="3" rounded="lg" bg="primary.box" w="100%" maxW="100%">
          <Text w="100%" pl="18px" bg="primary.darkbox">A</Text>
          {[...Array(3)].map((item,k) => 
            <Box w="100%" key={k} borderBottomWidth={k===2 ? 0 : 1} borderColor="primary.text" py="3">
              <HStack px="4" alignItems="flex-start" minH="55px" space={0} justifyContent="flex-start">
                <HStack pt="2" w="100%" space="5" alignItems="center" justifyContent="space-between">
                  <Avatar
                    source={{
                      uri:'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                    }}
                    
                  >
                    AA
                  </Avatar>
                  <VStack maxW={['62%','70%','40%']} space="0">
                    <Text lineHeight="22px" fontSize="lg">Stephen Hendry</Text>
                    <Text lineHeight="22px" fontSize="lg">Global INC - Social media Expert</Text>
                    <Text pt="1" lineHeight="22px" fontSize="md">Private address: New york</Text>
                  </VStack>
                    
                 
                  <Spacer />
                  <HStack space="4" alignItems="center">
                    <Icoribbon width="20" height="28" />
                    <Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text"  />
                  </HStack>
                </HStack>
              </HStack>
            </Box>)}
        </Container>}
      </>
      <>
        {tabs === 'MY_PROGRAM' && <Container mb="3" rounded="lg" bg="primary.box" w="100%" maxW="100%">
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
                    <Icon style={{WebkitTextStroke: '2px #fff'}} size="xl" as={Ionicons } name="heart" color="primary.secondary"  />
                  </HStack>
                </HStack>
              </HStack>
            </Box>)}
        </Container>}
      </>
      <>
        {tabs === 'TRACKS' && <Container mb="3" rounded="lg" bg="primary.box" w="100%" maxW="100%">
          {[...Array(5)].map((item,k) => 
            <Box w="100%" key={k} borderBottomWidth={k===4 ? 0 : 1} borderColor="primary.text" py="3">
              <HStack pl="30px" alignItems="center" minH="55px" space={0} justifyContent="flex-start">
                <Box position="absolute" left="0" top="0" w="15px">
                  <ZStack>
                    {[...Array(1)].map((track,i) =>
                      <Box key={i} bg={`green.${i+1}00`} borderWidth="1" borderColor="primary.darkbox" w="15px" mt={`${i*10}px`} h={`${55 - (i*10)}px`} borderRightRadius="10" shadow={2} />
                    )}
                  </ZStack>
                </Box>
                <HStack pt="02" w="100%" space="5" alignItems="center" justifyContent="space-between">
                  <Center  maxW={['62%','70%','42%']} alignSelf="flex-start" p="0">
                    <Text alignSelf="flex-start" lineHeight="22px">Technology</Text>
                  </Center>
                </HStack>
              </HStack>
            </Box>)}
        </Container>}
      </>
    </WebMainLayout>

  );
};

AttendeeLayout.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AttendeeLayout;
