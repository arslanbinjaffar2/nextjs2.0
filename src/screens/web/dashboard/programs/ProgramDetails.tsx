import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Center, Container, Heading, HStack, Icon, IconButton, Input, Spacer, Text, VStack, ZStack, Image, Divider, Avatar} from 'native-base';
import { AntDesign, Ionicons} from '@expo/vector-icons';
import { SimpleLineIcons  } from '@expo/vector-icons'
import WebMainLayout from '@src/screens/web/dashboard/WebMainLayout';
import { useState } from 'react';
import IcoCheckin from '@src/assets/icons/IcoCheckin';
import IcoSpeaker from '@src/assets/icons/IcoSpeaker';


type indexProps = {
  navigation: unknown
}

const ProgramDetails = ({ navigation }: indexProps)  => {
  const [tabs, settabs]  = useState< string | null>('ABOUT');
  return (
    <WebMainLayout navigation={navigation}>
      <Container mb="3" mt="5" maxW="100%" w="100%" bg="primary.box" rounded="lg">
        <Image
          source={{
            uri:"https://wallpaperaccess.com/full/39050.jpg"
          }}
          alt="Alternate Text"
          size="full"
          w="100%"
          h="160px"
          rounded="lg"
          mb="5"
          
        />
        <Box w="100%" px="5">
          <HStack w="100%" mb="3" space="3" alignItems="flex-start">
            <Text maxW="80%" fontSize="xl">Water cleaning in Africa</Text>
            <Spacer />
            <IcoCheckin width="25" height="24" />
          </HStack>
          <HStack w="100%" mb="3" s pace="10" alignItems="center">
            <Text fontSize="md">12:15 - 13:30</Text>
            <HStack  space="3" alignItems="center">
              <Icon color="primary.text" size="md" as={Ionicons} name="ios-location-sharp"  />
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
          <Button  onPress={() => settabs('ABOUT')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={tabs === 'ABOUT' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{fontWeight: '600'}}>ABOUT</Button>
          <Button onPress={() => settabs('GROUPS')} borderRadius="0" borderWidth="1px" py={0}  borderColor="primary.darkbox" h="42px" bg={tabs === 'GROUPS' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{fontWeight: '600'}}>GROUPS</Button>
          <Button onPress={() => settabs('ATTENDEES')} borderWidth="1px" py={0}  borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8}   h="42px" bg={tabs === 'ATTENDEES' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{fontWeight: '600'}}>ATTENDEES</Button>
        </HStack>
        <Box overflow="hidden" w="100%" bg="primary.box" p="0" rounded="lg">
          <HStack px="3" py="1" bg="primary.darkbox" w="100%"  space="3" alignItems="center">
            <IcoSpeaker width="12" height="18" />
            <Text fontSize="md">Speaker</Text>
          </HStack>
          <HStack py="5" px="4" space="4" alignItems="center">
            <Avatar
              source={{
                uri:"https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg"
              }}
              
            >
              SS
            </Avatar>
            <VStack  space="0">
              <Text  fontSize="lg">Stephen Hendry</Text>
              <Text  fontSize="lg">Global INC - Social media Expert</Text>
            </VStack>
            
          </HStack>
          
        </Box>
        
      </Container>
      
    </WebMainLayout>

  );
};

ProgramDetails.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ProgramDetails;
