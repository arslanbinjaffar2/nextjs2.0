import * as React from 'react';
import { Badge, Box, Button, Center, Container, Heading, HStack, Image, Menu, Pressable, Spacer, Text, VStack, Icon, Drawer } from 'native-base';
import LeftBarMobile from 'application/screens/web/layouts/LeftBarMobile';
import Notification from 'application/components/atoms/header/Notification';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Event } from 'application/models/Event'
import UseEnvService from 'application/store/services/UseEnvService';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'next/router';
import UseNotificationService from 'application/store/services/UseNotificationService';

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
      </Container>
      
      <Drawer isOpen={open} placement='left'>
        <Container  alignItems={'flex-start'} w="375px" h={'100%'} bg={'primary.bdBox'}>
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
    </>
  );
}

export default HeaderMobile;