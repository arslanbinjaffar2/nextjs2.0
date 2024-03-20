import * as React from 'react';
import { Badge, Box, Button, Center, Container, Heading, HStack, Image, Menu, Pressable, Spacer, Text, VStack, Icon, Drawer, Divider } from 'native-base';
import LeftBarMobile from 'application/screens/web/layouts/LeftBarMobile';
import MobileNavigation from 'application/screens/web/layouts/MobileNavigation';
import Notification from 'application/components/atoms/header/Notification';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Event } from 'application/models/Event'
import UseEnvService from 'application/store/services/UseEnvService';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'next/router';
import UseNotificationService from 'application/store/services/UseNotificationService';
import UpcomingBlock from 'application/components/atoms/programs/UpcomingBlock';

const HeaderMobile = ({ width }: any) => {
  const { _env } = UseEnvService();

  const { event } = UseEventService();
const [open, setOpen] = React.useState(false)
  const { popupCount, setCurrentPopup, currentPopup, clearCurrentPopup } = UseNotificationService();


  const router = useRouter();
  





  React.useEffect(() => {
    if(popupCount > 0 && currentPopup == null){
      setCurrentPopup();
    }
  }, [popupCount])
  
  React.useEffect(() => {
    setOpen(false)
  }, [router])
  
  return (
    <>
      <Container mb="3"  maxW="100%" w="100%">
        <HStack w="100%" alignItems="center" space="5">
          <Center>
           <Pressable
            p="0"
            borderWidth="0"
            onPress={()=>{
              setOpen(true)
            }}
           
           >
           <Icon size={'3xl'} as={Ionicons} name="menu-outline" color={'primary.text'}  />
           </Pressable>
           
          </Center>
           <Spacer />
          <Center overflow="hidden" alignItems="flex-start">
            <Pressable onPress={() => { router.push(`/${event.url}/dashboard`) }}>
              <Image alt='logo' source={{ uri: `${_env.eventcenter_base_url}/assets/event/branding/${event.settings?.header_logo}` }} w="180px" h="60px" alignSelf={'center'} />
            </Pressable>
          </Center>
          <Spacer />
          <Center alignItems="flex-end">
            <HStack space="0">
              <Notification />
            </HStack>
          </Center>
        </HStack>
        {router.asPath.includes('/dashboard') && <Box pt={'4'} w={'100%'}>
          <Divider bg={'primary.text'} w={'90px'} mx={'auto'} mb={4} />
          
           <VStack pb="0" space={0} w="100%">
              <Heading textAlign={'center'} textTransform={'uppercase'} fontWeight={500} fontSize="3xl">{event.name}</Heading>
              <Heading textAlign={'center'} textTransform={'uppercase'} fontWeight={500} pb="1" fontSize="xl">{event.detail?.location_name} {" "} {event?.calendar_date}</Heading>
              <Heading textAlign={'center'} fontWeight={600} fontSize="lg">{event.detail?.location_address}</Heading>
            </VStack>
        </Box>}
        <MobileNavigation />
            
      </Container>
      
      <Drawer isOpen={open} placement='left'>
        <Container alignItems={'flex-start'} w="375px" h={'100%'} bg={'secondary.500'}>
            <Center w="100%" justifyContent={'flex-end'}  alignItems={'flex-end'} p="1">
              <Pressable
                alignItems={'flex-end'}
                p="0"
                borderWidth="0"
                onPress={()=>{
                  setOpen(false)
                }}
              
              >
                <Icon size={'3xl'} as={Ionicons} name="close-outline" color={'primary.text'}  />
              </Pressable>
            </Center>
            
          
          <LeftBarMobile />
        </Container>
        
      </Drawer>
      <HStack w={'100%'} space={'3'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} px={'1.5'}>
        <Box width={'50%'}>
        <UpcomingBlock title="UPCOMING SESSION" desc="Workshop 2 - The right path" location="Room 242" date="11-03-2022" time="11-00 to 13-00" />
        </Box>
        <Box width={'50%'}>
          <UpcomingBlock title="NOTIFICATIONS" desc="Talk on world health is rescheduled " location="..." date="11-03-2022" time="11-00"  />
        </Box>
      </HStack>
    </>
  );
}

export default HeaderMobile;