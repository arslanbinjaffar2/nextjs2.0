import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Center, Container, Heading, HStack, Icon, IconButton, Input, Spacer, Text, VStack, ZStack, Image, Divider, Avatar, Pressable } from 'native-base';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons'
import Master from '@src/screens/web/layouts/Master';
import { useState } from 'react';
import IcoCheckin from '@src/assets/icons/IcoCheckin';
import IcoSpeaker from '@src/assets/icons/IcoSpeaker';
import IcoPolls from '@src/assets/icons/IcoPolls';
import IcoRaiseHand from '@src/assets/icons/IcoRaiseHand';

type indexProps = {
  navigation: unknown
}

const Detail = ({ navigation }: indexProps) => {
  const [tabs, settabs] = useState<string | null>('ABOUT');
  return (
    <Master navigation={navigation}>
      <Container mb="3" mt="5" maxW="100%" w="100%" bg="primary.box" rounded="10">
        <Image
          source={{
            uri: 'https://wallpaperaccess.com/full/39050.jpg'
          }}
          alt="Alternate Text"
          size="full"
          w="100%"
          h="160px"
          rounded="10"
          mb="5"
        />
        <Box w="100%" px="5">
          <HStack w="100%" mb="3" space="3" alignItems="flex-start">
            <Text maxW="80%" fontSize="xl">Water cleaning in Africa</Text>
            <Spacer />
            <IcoCheckin width="25" height="24" />
          </HStack>
          <HStack w="100%" mb="3" space="10" alignItems="center">
            <Text fontSize="md">12:15 - 13:30</Text>
            <HStack space="3" alignItems="center">
              <Icon color="primary.text" size="md" as={Ionicons} name="ios-location-sharp" />
              <Text pt="2px" fontSize="md">Room 105</Text>
            </HStack>
          </HStack>
          <Box mb="4" w="100%">
            <Text mb="3" fontSize="md">Track: Aid to 3rd world children</Text>
            <Divider mb="4" bg="primary.text" />
            <Text maxW="60%" fontSize="md">Lorem ipsum dolor sit amet, eos ex tamquam praesent scriptorem, nec autem definitiones at. Cu vis sumo oratio. praesent scriptorem, nec autem definitiones at.</Text>
          </Box>
        </Box>
      </Container>
      <Container mb="3" maxW="100%" w="100%">
        <HStack mb="3" space={1} justifyContent="center" w="100%">
          <Button onPress={() => settabs('ABOUT')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={tabs === 'ABOUT' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{ fontWeight: '600' }}>ABOUT</Button>
          <Button onPress={() => settabs('GROUPS')} borderRadius="0" borderWidth="1px" py={0} borderColor="primary.darkbox" h="42px" bg={tabs === 'GROUPS' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{ fontWeight: '600' }}>GROUPS</Button>
          <Button onPress={() => settabs('ATTENDEES')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px" bg={tabs === 'ATTENDEES' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{ fontWeight: '600' }}>ATTENDEES</Button>
        </HStack>
        <Box overflow="hidden" w="100%" bg="primary.box" p="0" rounded="10">
          <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
            <IcoSpeaker width="12" height="18" />
            <Text fontSize="md">Speaker</Text>
          </HStack>
          <HStack py="5" px="4" space="4" alignItems="center">
            <Avatar
              source={{
                uri: 'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
              }}
            >
              SS
            </Avatar>
            <VStack space="0">
              <Text fontSize="lg">Stephen Hendry</Text>
              <Text fontSize="lg">Global INC - Social media Expert</Text>
            </VStack>
            <Spacer />
            <Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />
          </HStack>
          <Box p="0">
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
              <IcoPolls width="17" height="17" />
              <Text fontSize="md">Polls</Text>
            </HStack>
            {[...Array(2)].map((item, k) =>
              <Pressable
                key={k}
                p="0"
                w="100%"
                _hover={{ bg: 'primary.500' }}
                onPress={() => { console.log('hello') }}>
                <Box w="100%" borderBottomWidth={k === 1 ? 0 : 1} borderColor="primary.text" py="4">
                  <HStack px="5" w="100%" space="0" alignItems="center" justifyContent="space-between">
                    <VStack bg="red" w="100%" maxW={['95%', '80%', '70%']} space="0">
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
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
              <IcoRaiseHand width="14" height="17" />
              <Text fontSize="md">Request to speak</Text>
            </HStack>
            <Box w="100%" py="4">
              <HStack px="5" w="100%" space="0" alignItems="center" justifyContent="space-between">
                <VStack bg="red" w="100%" maxW={['95%', '80%', '70%']} space="0">
                  <Text fontSize="md">Request to speak</Text>
                </VStack>
                <Spacer />
                <IcoRaiseHand width="20" height="26" />
              </HStack>
            </Box>
          </Box>
          <Box p="0">
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
              <Icon size="sm" as={AntDesign} name="download" color="primary.text" />
              <Text fontSize="md">Downloads</Text>
            </HStack>
            <Box w="100%" py="4">
              <HStack px="5" w="100%" space="0" alignItems="center" justifyContent="space-between">
                <VStack bg="red" w="100%" maxW={['95%', '80%', '70%']} space="0">
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

Detail.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Detail;
