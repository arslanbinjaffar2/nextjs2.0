import * as React from 'react';
import { Avatar, Box, Center, Flex, HStack, Pressable, ScrollView, Text, VStack } from 'native-base';
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
import {  func } from 'application/styles';

const LeftBarMobile = ({setOpenMenu}:{setOpenMenu:any}) => {
  const router = useRouter()

  const { width, height } = useWindowDimensions();

  const { event, modules } = UseEventService()

  const { logout, response } = UseAuthService();

  const { info, page } = UseInfoService();

  const { _env } = UseEnvService();

  const { setLoading } = UseLoadingService();

  const [dahboardHover, setdahboardHover] = React.useState(false)
  const [logoutHover, setlogoutHover] = React.useState(false)
  const [dashhover, setdashhover] = React.useState(false)
  return (
    <Center overflow="auto" position="sticky" top="2rem" alignItems="flex-start" w='100%'>
      <Box borderBottomWidth={1} mb="3" w="100%" borderBottomColor={'primary.bordercolor'} pb="3" px="3">
      <Pressable
         onHoverIn={() => setdashhover(true)}
         onHoverOut={() => setdashhover(false)}
            onPress={() => {
              router.push(`/${event.url}/attendees/detail/${response?.data?.user?.id}`)
              setTimeout(()=>{
                setOpenMenu(false)
              },800)
            }}>
        <Flex alignItems="center" flexDirection={'row'}>
          <Avatar w="50px" h="50px" bg="#a5a5a5" source={{ uri: `${_env.eventcenter_base_url}/assets/attendees/${response?.attendee_detail?.image}` }}>
            {response?.data?.user?.first_name.charAt(0).toUpperCase() + response?.data?.user?.last_name.charAt(0).toUpperCase()}
          </Avatar>
          <VStack w={'70%'} px="3" space="0">
            <Text fontSize="lg" textTransform={'uppercase'} bold isTruncated>{response?.data?.user?.name}</Text>
            <Text p="0" fontSize="md" mt="0">{response?.attendee_detail?.detail?.title}</Text>
            <Text p="0" fontSize="md" mt="0">{response?.attendee_detail?.detail?.company_name}</Text>
          </VStack>
        <Pressable
            w="100%"
            p="1"
            borderRadius="8"
            width={30}
            h={30}
            onPress={() => {
              router.push(`/${event.url}/settings/editprofile`)
              setTimeout(()=>{
                setOpenMenu(false)
              },800)
            }}>
              <DynamicIcon  iconType={'edit_profile'} iconProps={{ width:18,height:18,  color: dashhover  ? func.colorType(event?.settings?.primary_color) : undefined}}/>
            </Pressable>
        </Flex>
        </Pressable>
       
      </Box>
      <ScrollView w={'100%'} h={height - 150}>
        <VStack px={3} space={1}  w="100%" maxW="100%" >
          <Pressable
            w="100%"
            px="4"
            py="2"
            bg={`${ router.asPath.includes('/dashboard') && 'primary.500'}`}
            _hover={{ bg: 'primary.500' }}
            onHoverIn={() => setdahboardHover(true)}
            onHoverOut={() => setdahboardHover(false)}
            borderRadius="4"
            onPress={() => {
              router.push(`/${event.url}/dashboard`)
              setTimeout(()=>{
                setOpenMenu(false)
              },800)
            }}>
            <HStack space="4" alignItems="center">
              <Center w="30px">
                <IcoDashboard color={dahboardHover || router.asPath.includes('/dashboard') ? func.colorType(event?.settings?.primary_color) : undefined} width="24" height="24" />
              </Center>
              <Text fontSize={'lg'} color={router.asPath.includes('/dashboard') ? func.colorType(event?.settings?.primary_color) : "primary.text"}>{event?.labels?.GENERAL_DASHBOARD ?? 'Dashboard'}</Text>
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
                setTimeout(()=>{
                  setOpenMenu(false)
                },800)
                if (in_array(row?.alias, ['practical-info', 'general-info', 'additional-info'])) {
                  // setLoading(true);
                  if(row?.section_type == 'link'){
                    router.push(`${row?.url}`)
                  }else if(row?.section_type == 'page'){
                    router.push(`/${event.url}/${row?.alias}/event-info-detail/${row?.id}`)
                  }else{
                    router.push(`/${event.url}/${row?.alias}/event-info/0`)
                  }
                } else if (in_array(row?.alias, ['information_pages'])) {
                  // setLoading(true);
                  if(row?.section_type === 'link') {
                    router.push(`${row?.url}`)
                  } else if(row?.section_type === 'page') {
                    router.push(`/${event.url}/information-pages/event-info-detail/${row?.id}`)
                  } else {
                    router.push(`/${event.url}/information-pages/${row?.id}`)
                  }
                } else if (row?.alias === 'my-registrations') {
                  router.push(`/${event.url}/attendees/detail/${response?.data?.user?.id}`)
                } else {
                  router.push(`/${event.url}/${row?.alias}`)
                }
                
              }}>
              <HStack space="4" alignItems="center">
                <Center w="30px">
                  <DynamicIcon iconType={row?.icon?.replace('@2x','').replace('-icon','').replace('-','_').replace('.png', '') } iconProps={{ width: 25, height: 25, color: checkActiveRoute(row, router.asPath, info, page) ? func.colorType(event?.settings?.primary_color) : undefined }} />
                </Center>
                <Text fontSize={'lg'} color={checkActiveRoute(row, router.asPath, info, page) ? 'primary.hovercolor' : 'primary.text'}>
                  {row.name.length>=15?`${row.name.substring(0,23)} ...`:`${row.name}`}
                </Text>
              </HStack>
            </Pressable>
          )}
          {/* <Pressable
            w="100%"
            px="4"
            py="2"
            _hover={{ bg: 'primary.500' }}
            onHoverIn={() => setlogoutHover(true)}
            onHoverOut={() => setlogoutHover(false)}
            borderRadius="4"
            onPress={() => {
              logout();
              setTimeout(()=>{
                setOpenMenu(false)
              },800)
            }}>
            <HStack space="4" alignItems="center">
              <Center w="30px">
                <IcoLogin color={logoutHover ? func.colorType(event?.settings?.primary_color) : undefined} />
              </Center>
              <Text fontSize={'lg'} color="primary.text">Logout</Text>
            </HStack>
          </Pressable> */}
        </VStack>
    </ScrollView>
    </Center>
  );

}

export default LeftBarMobile;

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
    else if(path.includes(`information-pages/event-info-detail`) && page && (row?.id == page?.id)){
      return true;
    }else if(path.includes(`information-pages-sub/event-info-detail/`) && page && (row?.id == page?.section_id)){
      return true;
    }else if(path.includes(`information-pages/event-info-detail/`) && page && (row?.id == page?.section_id)){
      return true;
    }
  }else{
    if(path.includes(row?.alias)){
      return true;
    };
  }
  
}