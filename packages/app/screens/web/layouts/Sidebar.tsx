import * as React from 'react';
import { Avatar, Box, Center, Flex, HStack, Pressable, Text, VStack } from 'native-base';
import IcoDashboard from 'app/assets/icons/IcoDashboard';
import IcoAttendees from 'app/assets/icons/IcoAttendees';
import IcoSponsors from 'app/assets/icons/IcoSponsors';
import IcoProgram from 'app/assets/icons/IcoProgram';
import IcoPolls from 'app/assets/icons/IcoPolls';
import IcoQuestionsAnswers from 'app/assets/icons/IcoQuestionsAnswers';
import IcoCheckin from 'app/assets/icons/IcoCheckin';
import IcoDocuments from 'app/assets/icons/IcoDocuments';
import IcoChat from 'app/assets/icons/IcoChat';
import IcoFloorPlan from 'app/assets/icons/IcoFloorPlan';
import IcoMap from 'app/assets/icons/IcoMap';
import IcoNetworkInterest from 'app/assets/icons/IcoNetworkInterest';
import IcoSocialWall from 'app/assets/icons/IcoSocialWall';
import IcoPracticalinfo from 'app/assets/icons/IcoPracticalinfo';
import IcoAdditionalInfo from 'app/assets/icons/IcoAdditionalInfo';
import IcoGeneralInfo from 'app/assets/icons/IcoGeneralInfo';
import { useWindowDimensions } from 'react-native';
import { useRouter } from 'solito/router'

const Sidebar = ({ navigation }: any) => {

  const { push, replace, back, parseNextPath } = useRouter()

  const { width } = useWindowDimensions();

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
            push('/event/dashboard')
          }}>
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
          onPress={() => {
            push('/event/sponsors')
          }}>
          <HStack space="4" alignItems="center">
            <Center align="center" w="30px">
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
            push('/event/attendees')
          }}>
          <HStack space="4" alignItems="center">
            <Center align="center" w="30px">
              <IcoAttendees width="24" height="21" />
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
            push('/event/programs')
          }}>
          <HStack space="4" alignItems="center">
            <Center align="center" w="30px">
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
            push('/event/polls')
          }}>
          <HStack space="4" alignItems="center">
            <Center align="center" w="30px">
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
            push('/event/qa')
          }}>
          <HStack space="4" alignItems="center">
            <Center align="center" w="30px">
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
            push('/event/checkin')
          }}>
          <HStack space="4" alignItems="center">
            <Center align="center" w="30px">
              <IcoCheckin width="24" height="21" />
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
            push('/event/documents')
          }}>
          <HStack space="4" alignItems="center">
            <Center align="center" w="30px">
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
            push('/event/chat')
          }}>
          <HStack space="4" alignItems="center">
            <Center align="center" w="30px">
              <IcoChat width="24" height="21" />
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
            push('/event/floor-plan')
          }}>
          <HStack space="4" alignItems="center">
            <Center align="center" w="30px">
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
            push('/event/map')
          }}>
          <HStack space="4" alignItems="center">
            <Center align="center" w="30px">
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
            push('/event/map')
          }}>
          <HStack space="4" alignItems="center">
            <Center align="center" w="30px">
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
            push('/event/social-media')
          }}>
          <HStack space="4" alignItems="center">
            <Center align="center" w="30px">
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
            push('/event/social-wall')
          }}>
          <HStack space="4" alignItems="center">
            <Center align="center" w="30px">
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
            push('/event/practical-information')
          }}>
          <HStack space="4" alignItems="center">
            <Center align="center" w="30px">
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
            push('/event/general-information')
          }}>
          <HStack space="4" alignItems="center">
            <Center align="center" w="30px">
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
            push('/event/additional-information')
          }}>
          <HStack space="4" alignItems="center">
            <Center align="center" w="30px">
              <IcoAdditionalInfo width="24" height="21" />
            </Center>
            {width > 1200 && <Text fontSize={'lg'} color="primary.text">Additional information</Text>}
          </HStack>
        </Pressable>
      </Center>
    </Center>
  );

}

export default Sidebar;