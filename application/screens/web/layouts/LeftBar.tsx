import * as React from 'react';
import { Avatar, Box, Center, Flex, HStack, Pressable, Text, VStack } from 'native-base';
import IcoDashboard from 'application/assets/icons/IcoDashboard';
import IcoLogin from 'application/assets/icons/IcoLogin';
import { useWindowDimensions } from 'react-native';
import { useRouter } from 'next/router';
import UseEventService from 'application/store/services/UseEventService';
import UseAuthService from 'application/store/services/UseAuthService';
import DynamicIcon from 'application/utils/DynamicIcon';
import in_array from "in_array";

const LeftBar = () => {

  const router = useRouter()

  const { width } = useWindowDimensions();

  const { event, modules } = UseEventService()

  const { logout, response } = UseAuthService();

  return (
    <Center overflow="auto" position="sticky" top="2rem" alignItems="flex-start" w={width > 1200 ? '265px' : '70px'}>
      <Box pb="3">
        <Flex alignItems="center" flexDirection={'row'}>
          <Avatar w="70px" h="70px" bg="green.500">
            HA
          </Avatar>
          {width > 1200 && <VStack px="5" space="0">
            <Text fontSize="lg" textTransform={'uppercase'} bold>{response?.data?.user?.name}</Text>
            <Text p="0" fontSize="md" mt="0">{response?.attendee_detail?.detail?.jobs} {" "} {response?.attendee_detail?.detail?.company_name}</Text>
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
            router.push(`/${event.url}/dashboard`)
          }}>
          <HStack space="4" alignItems="center">
            <Center w="30px">
              <IcoDashboard width="24" height="24" />
            </Center>
            {width > 1200 && <Text fontSize={'lg'} color="primary.text">Dashboard</Text>}
          </HStack>
        </Pressable>
        {modules.map((row: any, key: any) =>
          <Pressable
            key={key}
            w="100%"
            px="4"
            py="2"
            bg={`${router.pathname.includes(row?.alias) && 'primary.500'}`}
            _hover={{ bg: 'primary.500' }}
            borderRadius="4"
            onPress={() => {
              if (in_array(row?.alias, ['practical-info', 'general-info', 'additional-info'])) {
                router.push(`/${event.url}/${row?.alias}/event-info/0`)
              } else {
                router.push(`/${event.url}/${row?.alias}`)
              }
            }}>
            <HStack space="4" alignItems="center">
              <Center w="30px">
                <DynamicIcon iconType={row?.alias.replace('-', '_')} iconProps={{ width: 24, height: 21 }} />
              </Center>
              {width > 1200 && <Text fontSize={'lg'} color="primary.text">{row?.name}</Text>}
            </HStack>
          </Pressable>
        )}
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
              <IcoLogin />
            </Center>
            {width > 1200 && <Text fontSize={'lg'} color="primary.text">Logout</Text>}
          </HStack>
        </Pressable>
      </Center>
    </Center>
  );

}

export default LeftBar;