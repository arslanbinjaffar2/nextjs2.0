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
import UseEnvService from 'application/store/services/UseEnvService';
import UseInfoService from 'application/store/services/UseInfoService';
import UseLoadingService from 'application/store/services/UseLoadingService';

const LeftBar = () => {

  const router = useRouter()

  const { width } = useWindowDimensions();

  const { event, modules } = UseEventService()

  const { logout, response } = UseAuthService();

  const { info, page } = UseInfoService();

  const { _env } = UseEnvService();

  const { setLoading } = UseLoadingService();

  return (
    <Center nativeID='ebs-master-left-bar' overflow="auto" position="sticky" top="2rem" alignItems="flex-start" w={width > 1200 ? '265px' : '70px'}>
      <Box pb="3">
        <Pressable
            w="100%"
            p="1"
            _hover={{ bg: 'primary.500' }}
            borderRadius="8"
            onPress={() => {
              router.push(`/${event.url}/attendees/detail/${response?.data?.user?.id}`)
            }}>

            <Flex w={width > 1200 ? '257px' : '62px'} alignItems="center" flexDirection={'row'}>
              <Avatar w="62px" h="62px" bg="green.500" source={{ uri: `${_env.eventcenter_base_url}/assets/attendees/${response?.attendee_detail?.image}` }}>
                {response?.data?.user?.first_name.charAt(0).toUpperCase() + response?.data?.user?.last_name.charAt(0).toUpperCase()}
              </Avatar>
              {width > 1200 && <VStack w={'calc(100% - 100px)'} pl="3" space="0">
                <Text fontSize="lg" textTransform={'uppercase'} bold isTruncated>{response?.data?.user?.name}</Text>
                <Text p="0" fontSize="md" mt="0" isTruncated>{response?.attendee_detail?.detail?.jobs} {" "} {response?.attendee_detail?.detail?.company_name}</Text>
              </VStack>}
            </Flex>
        </Pressable>
      </Box>
      <VStack space={1} px={width > 1200 ? '0' : '1'} w="100%" maxW="100%" >
        <Pressable
          w="100%"
          px="4"
          py="2"
          bg={`${ router.asPath.includes('/dashboard') && 'primary.500'}`}
          _hover={{ bg: 'primary.500' }}
          borderRadius="4"
          onPress={() => {
            router.push(`/${event.url}/dashboard`)
          }}>
          <HStack space="4" alignItems="center">
            <Center w="30px">
              <IcoDashboard width="24" height="24" />
            </Center>
            {width > 1200 && <Text fontSize={'20px'} fontWeight={400} color="primary.text">Dashboard</Text>}
          </HStack>
        </Pressable>
        {modules.map((row: any, key: any) =>
          <Pressable
            key={key}
            w="100%"
            px="4"
            py="2"
            bg={`${ checkActiveRoute(row, router.asPath, info, page) && 'primary.500'}`}
            _hover={{ bg: 'primary.500' }}
            borderRadius="4"
            onPress={() => {
              if (in_array(row?.alias, ['practical-info', 'general-info', 'additional-info'])) {
                // setLoading(true);
                router.push(`/${event.url}/${row?.alias}/event-info/0`)
              } else if (in_array(row?.alias, ['information_pages'])) {
                // setLoading(true);
                router.push(`/${event.url}/information-pages${row?.section_type === 'child_section' ? '/sub' : ''}/${row?.id}`)
              } else if (row?.alias === 'my-registrations') {
                router.push(`/${event.url}/attendees/detail/${response?.data?.user?.id}`)
              } else {
                router.push(`/${event.url}/${row?.alias}`)
              }
            }}>
            <HStack space="4" alignItems="center">
              <Center w="30px">
                <DynamicIcon iconType={row?.alias.replace('-', '_')} iconProps={{ width: 24, height: 21 }} />
              </Center>
              {width > 1200 && <Text fontSize={'20px'} fontWeight={400} color="primary.text">{row?.name}</Text>}
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
      </VStack>
    </Center>
  );

}

export default LeftBar;

const checkActiveRoute = (row:any, path:any, info:any, page:any) => {
  if(row?.alias == 'information_pages'){
    if(path.includes((`information-pages/${row?.id}`))){
      return true;
    }
    else if(path.includes((`information-pages/sub/${row?.id}`)) ){
      return true;
    }
    else if(info && info[0] && row?.id == info[0]?.section_id ){
      return true;
    }
    else if(path.includes(`information-pages/event-info-detail`) && page && (row?.id == page?.section_id)){
      return true;
    }
  }else{
    if(path.includes(row?.alias)){
      return true;
    };
  }
  
}