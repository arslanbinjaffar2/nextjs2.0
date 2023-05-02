import * as React from 'react';
import { Avatar, Box, Center, Flex, HStack, Pressable, Text, VStack } from 'native-base';
import IcoDashboard from 'application/assets/icons/IcoDashboard';
import IcoSponsors from 'application/assets/icons/IcoSponsors';
import IcoProgram from 'application/assets/icons/IcoProgram';
import IcoPolls from 'application/assets/icons/IcoPolls';
import IcoQuestionsAnswers from 'application/assets/icons/IcoQuestionsAnswers';
import IcoDocuments from 'application/assets/icons/IcoDocuments';
import IcoFloorPlan from 'application/assets/icons/IcoFloorPlan';
import IcoMap from 'application/assets/icons/IcoMap';
import IcoNetworkInterest from 'application/assets/icons/IcoNetworkInterest';
import IcoSocialWall from 'application/assets/icons/IcoSocialWall';
import IcoPracticalinfo from 'application/assets/icons/IcoPracticalinfo';
import IcoAdditionalInfo from 'application/assets/icons/IcoAdditionalInfo';
import IcoGeneralInfo from 'application/assets/icons/IcoGeneralInfo';
import IcoLogin from 'application/assets/icons/IcoLogin';
import { useWindowDimensions } from 'react-native';
import { useRouter } from 'solito/router'
import UseEventService from 'application/store/services/UseEventService';
import UseAuthService from 'application/store/services/UseAuthService';
import DynamicIcon from 'application/utils/DynamicIcon';

const LeftBar = ({ navigation }: any) => {

  const { push, replace, back, parseNextPath } = useRouter()

  const { width } = useWindowDimensions();

  const { event } = UseEventService()

  const { logout } = UseAuthService();

  return (
    <Center overflow="auto" position="sticky" top="2rem" h="100%" alignItems="flex-start" w={width > 1200 ? '265px' : '70px'}>
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
          onPress={() => {
            push(`/${event.url}/dashboard`)
          }}>
          <HStack space="4" alignItems="center">
            <Center w="30px">
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
          onPress={() => {
            push(`/${event.url}/sponsors`)
          }}>
          <HStack space="4" alignItems="center">
            <Center w="30px">
              <IcoSponsors width="15" height="24" />
            </Center>
            {width > 1200 && <Text fontSize={'lg'} color="primary.text">Sponsors</Text>}
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{ bg: 'primary.500' }}
          borderRadius="4"
          onPress={() => {
            push(`/${event.url}/attendees`)
          }}>
          <HStack space="4" alignItems="center">
            <Center w="30px">
              <DynamicIcon iconType="attendees" iconProps={{ width: 24, height: 21 }} />
            </Center>
            {width > 1200 && <Text fontSize={'lg'} color="primary.text">Attendees</Text>}
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{ bg: 'primary.500' }}
          borderRadius="4"
          onPress={() => {
            push(`/${event.url}/programs`)
          }}>
          <HStack space="4" alignItems="center">
            <Center w="30px">
              <IcoProgram width="24" height="21" />
            </Center>
            {width > 1200 && <Text fontSize={'lg'} color="primary.text">Programs</Text>}
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{ bg: 'primary.500' }}
          borderRadius="4"
          onPress={() => {
            push(`/${event.url}/polls`)
          }}>
          <HStack space="4" alignItems="center">
            <Center w="30px">
              <IcoPolls width="24" height="21" />
            </Center>
            {width > 1200 && <Text fontSize={'lg'} color="primary.text">Polls</Text>}
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{ bg: 'primary.500' }}
          borderRadius="4"
          onPress={() => {
            push(`/${event.url}/qa`)
          }}>
          <HStack space="4" alignItems="center">
            <Center w="30px">
              <IcoQuestionsAnswers width="24" height="21" />
            </Center>
            {width > 1200 && <Text fontSize={'lg'} color="primary.text">QA</Text>}
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{ bg: 'primary.500' }}
          borderRadius="4"
          onPress={() => {
            push(`/${event.url}/checkin`)
          }}>
          <HStack space="4" alignItems="center">
            <Center w="30px">
              <DynamicIcon iconType="checkIn" iconProps={{ width: 24, height: 21 }} />
            </Center>
            {width > 1200 && <Text fontSize={'lg'} color="primary.text">Check-in</Text>}
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{ bg: 'primary.500' }}
          borderRadius="4"
          onPress={() => {
            push(`/${event.url}/documents`)
          }}>
          <HStack space="4" alignItems="center">
            <Center w="30px">
              <IcoDocuments width="24" height="21" />
            </Center>
            {width > 1200 && <Text fontSize={'lg'} color="primary.text">Documents</Text>}
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{ bg: 'primary.500' }}
          borderRadius="4"
          onPress={() => {
            push(`/${event.url}/chat`)
          }}>
          <HStack space="4" alignItems="center">
            <Center w="30px">
              <DynamicIcon iconType="chat" iconProps={{ width: 24, height: 21 }} />
            </Center>
            {width > 1200 && <Text fontSize={'lg'} color="primary.text">Chat</Text>}
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{ bg: 'primary.500' }}
          borderRadius="4"
          onPress={() => {
            push(`/${event.url}/floor-plan`)
          }}>
          <HStack space="4" alignItems="center">
            <Center w="30px">
              <IcoFloorPlan width="24" height="21" />
            </Center>
            {width > 1200 && <Text fontSize={'lg'} color="primary.text">Floor plan</Text>}
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{ bg: 'primary.500' }}
          borderRadius="4"
          onPress={() => {
            push(`/${event.url}/map`)
          }}>
          <HStack space="4" alignItems="center">
            <Center w="30px">
              <IcoMap width="24" height="21" />
            </Center>
            {width > 1200 && <Text fontSize={'lg'} color="primary.text">Map</Text>}
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{ bg: 'primary.500' }}
          borderRadius="4"
          onPress={() => {
            push(`/${event.url}/map`)
          }}>
          <HStack space="4" alignItems="center">
            <Center w="30px">
              <IcoNetworkInterest width="24" height="21" />
            </Center>
            {width > 1200 && <Text fontSize={'lg'} color="primary.text">Network interest</Text>}
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{ bg: 'primary.500' }}
          borderRadius="4"
          onPress={() => {
            push(`/${event.url}/social-media`)
          }}>
          <HStack space="4" alignItems="center">
            <Center w="30px">
              <IcoNetworkInterest width="24" height="21" />
            </Center>
            {width > 1200 && <Text fontSize={'lg'} color="primary.text">Social media</Text>}
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{ bg: 'primary.500' }}
          borderRadius="4"
          onPress={() => {
            push(`/${event.url}/social-wall`)
          }}>
          <HStack space="4" alignItems="center">
            <Center w="30px">
              <IcoSocialWall width="24" height="21" />
            </Center>
            {width > 1200 && <Text fontSize={'lg'} color="primary.text">Social wall</Text>}
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{ bg: 'primary.500' }}
          borderRadius="4"
          onPress={() => {
            push(`/${event.url}/practical-information`)
          }}>
          <HStack space="4" alignItems="center">
            <Center w="30px">
              <IcoPracticalinfo width="24" height="21" />
            </Center>
            {width > 1200 && <Text fontSize={'lg'} color="primary.text">Practical information</Text>}
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{ bg: 'primary.500' }}
          borderRadius="4"
          onPress={() => {
            push(`/${event.url}/general-information`)
          }}>
          <HStack space="4" alignItems="center">
            <Center w="30px">
              <IcoGeneralInfo width="24" height="21" />
            </Center>
            {width > 1200 && <Text fontSize={'lg'} color="primary.text">General information</Text>}
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{ bg: 'primary.500' }}
          borderRadius="4"
          onPress={() => {
            push(`/${event.url}/additional-information`)
          }}>
          <HStack space="4" alignItems="center">
            <Center w="30px">
              <IcoAdditionalInfo width="24" height="21" />
            </Center>
            {width > 1200 && <Text fontSize={'lg'} color="primary.text">Additional information</Text>}
          </HStack>
        </Pressable>
        <Pressable
          w="100%"
          px="4"
          py="2"
          _hover={{ bg: 'primary.500' }}
          borderRadius="4"
          onPress={() => {
            logout();
          }}>
          <HStack space="4" alignItems="center">
            <Center w="30px">
              <IcoLogin width="24" height="21" />
            </Center>
            {width > 1200 && <Text fontSize={'lg'} color="primary.text">Logout</Text>}
          </HStack>
        </Pressable>
      </Center>
    </Center>
  );

}

export default LeftBar;