import * as React from 'react';
import { Avatar, Box, Center, Flex, HStack, Pressable, Text, VStack, Badge } from 'native-base';
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
import UseAlertService from 'application/store/services/UseAlertService';
import {  func } from 'application/styles';

const PressableElement = ({row}: any) => {
  const router = useRouter()
  const { event, modules,event_detail } = UseEventService()
  const { width } = useWindowDimensions();
  const { unread, setUnreadCount } = UseAlertService();
  const { info, page } = UseInfoService();
  const { logout, response } = UseAuthService();
    const [isHovered, setIsHovered] = React.useState(false);
    React.useEffect(() => {
    const alertsModule: any = modules.find((module: any) => module.alias === 'alerts');
    if (alertsModule && alertsModule.alerts) {
      setUnreadCount(alertsModule.alerts);
    }
  }, []);
  return (
   <Pressable
    w="100%"
    px="4"
    py="2"
    bg={`${ checkActiveRoute(row, router.asPath, info, page) && 'primary.500'}`}
    _hover={{ bg: 'primary.500' }}
    onHoverIn={() => setIsHovered(true)}
    onHoverOut={() => setIsHovered(false)}
    borderRadius="4"
    onPress={() => {
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
        // if(row?.section_type === 'link') {
        //   router.push(`${row?.url}`)
        //  if(row?.section_type === 'page') {
        //   router.push(`/${event.url}/information-pages/event-info-detail/${row?.id}`)
        // } else {
          router.push(`/${event.url}/information-pages${row?.section_type === 'child_section' ? '/sub' : ''}/${row?.id}`)
        // }
      } else if (row?.alias === 'my-registrations') {
        router.push(`/${event.url}/attendees/detail/${response?.data?.user?.id}`)
      } 
      else if (row?.alias === 'upcomingEvents') {
        router.push(`/${event.url}/upcoming-events`)
      }
      else if (row?.alias === 'homeMyevents') {
        router.push(`/${event.url}/home-events`)
      }
      else if (row?.alias === 'homeMyevents') {
        router.push(`/${event.url}/home-events/detail/${event?.id}`)
      }
      else {
        router.push(`/${event.url}/${row?.alias}`)
      }
    }}>
    <HStack space="4" alignItems="center">
      <Center w="30px">
        {/* <Text>{row.icon}</Text> */}
        <DynamicIcon iconType={row?.icon?.replace('@2x','').replace('-icon','').replace('-','_').replace('.png', '') }
        
        iconProps={{ width: 26, height: 26, color: isHovered || checkActiveRoute(row, router.asPath, info, page) ? func.colorType(event?.settings?.primary_color) : undefined }} />
        {/* <DynamicIcon iconType={row?.icon?.replace('@2x','').replace('-icon','').replace('-','_').replace('.png', '') } iconProps={{ width: 24, height: 21 }} /> */}
      </Center>

      {width > 1200 && 
  
      <Text fontSize={'20px'} fontWeight={400} color={isHovered || checkActiveRoute(row, router.asPath, info, page) ? 'primary.hovercolor' : 'primary.text'}>
        {row?.name.substring(0,22)}...</Text>
 
      }
      {row?.alias === 'alerts' && unread > 0 &&
        <Badge // bg="red.400"
          bg="secondary.500" rounded="full" mr={-4} zIndex={1} variant="solid"  _text={{
          fontSize: 12
        }}>
            {unread}
        </Badge>
      }

    </HStack>
    
  </Pressable>
    
  )
}

const LeftBar = () => {

  const router = useRouter()

  const { width } = useWindowDimensions();

  const { event, modules } = UseEventService()

  const { logout, response } = UseAuthService();

  const { info, page } = UseInfoService();

  const { unread, setUnreadCount } = UseAlertService();

  const { _env } = UseEnvService();

  const { setLoading, scroll } = UseLoadingService();

  const [dahboardHover, setdahboardHover] = React.useState(false)
  const [logoutHover, setlogoutHover] = React.useState(false)
  const [dashhover, setdashhover] = React.useState(false)


  return (
    <Center nativeID='ebs-master-left-bar' overflowX="hidden" overflowY="auto" alignItems="flex-start" w={width > 1200 ? '265px' : '70px'}>
      <Center nativeID='ebs-master-left-bar-wrapper'>
      <Box pb="3">
        <Pressable
            w="100%"
            p="1"
            _hover={{ bg: 'primary.500' }}
            onHoverIn={() => setdashhover(true)}
            onHoverOut={() => setdashhover(false)}
            borderRadius="8"
            onPress={() => {
              router.push(`/${event.url}/attendees/detail/${response?.data?.user?.id}`)
            }}>

            <Flex w={width > 1200 ? '257px' : '62px'} alignItems="center" flexDirection={'row'}>
              <Avatar w="62px" h="62px" bg="#a5a5a5" source={{ uri: `${_env.eventcenter_base_url}/assets/attendees/${response?.attendee_detail?.image}` }}>
                {response?.data?.user?.first_name.charAt(0).toUpperCase() + response?.data?.user?.last_name.charAt(0).toUpperCase()}
              </Avatar>
              

              {width > 1200 && <VStack w={'calc(100% - 100px)'} pl="3" space="0">
                <Text  color={dashhover ? func.colorType(event?.settings?.primary_color) : "primary.text"} fontSize="lg" textTransform={'uppercase'} bold isTruncated>{response?.data?.user?.name}</Text>
                <Text color={dashhover ? func.colorType(event?.settings?.primary_color) : "primary.text"}  p="0" fontSize="md" mt="0" isTruncated>{response?.attendee_detail?.detail?.title} {" "} {response?.attendee_detail?.detail?.company_name}</Text>
              </VStack>}

            <Pressable
            w="100%"
            p="1"
            borderRadius="8"
            onPress={() => {
              router.push(`/${event.url}/settings/editprofile`)
            }}>
              <DynamicIcon  iconType={'edit_profile'} iconProps={{ width:18,height:18,  color: dashhover  ? func.colorType(event?.settings?.primary_color) : undefined}}/>
            </Pressable>
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
          onHoverIn={() => setdahboardHover(true)}
          onHoverOut={() => setdahboardHover(false)}
          borderRadius="4"
          onPress={() => {
            router.push(`/${event.url}/dashboard`)
          }}>
          <HStack space="4" alignItems="center">
            <Center w="30px">
              <IcoDashboard color={dahboardHover || router.asPath.includes('/dashboard') ? func.colorType(event?.settings?.primary_color) : undefined} width="24" height="24" />
            </Center>
            {width > 1200 && <Text  color={dahboardHover || router.asPath.includes('/dashboard') ? 'primary.hovercolor' : 'primary.text'} fontSize={'20px'} fontWeight={400}>{event?.labels?.GENERAL_DASHBOARD ?? 'Dashboard'}</Text>}
          </HStack>
        </Pressable>
        {modules.map((row: any, key: any) => {
            if (row.alias == 'certificate' && row.certificate_setting == 0) {
                return null;
            } else {
                return (row.alias !== 'information_pages' || row.is_page_empty !== true) ? (
                    <PressableElement key={key} row={row} />
                ) : null;
            }
        })}
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
          }}>
          <HStack space="4" alignItems="center">
            <Center w="30px">
              <IcoLogin color={logoutHover ? func.colorType(event?.settings?.primary_color) : undefined} />
            </Center>
            {width > 1200 && <Text fontSize={'lg'} color={logoutHover ? func.colorType(event?.settings?.primary_color) : "primary.text"}>Logout</Text>}
          </HStack>
        </Pressable> */}
      </VStack>
    </Center>
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
  }else {
    // Check if the path exactly matches the alias and not just includes it as part of another word
    const regex = new RegExp(`/${row?.alias}(?![a-z0-9_-])`, 'i');
    if (regex.test(path) && !path.includes('/dashboard')) {
      return true;
    }
  }
  
}