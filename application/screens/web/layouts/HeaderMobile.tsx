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
import { images } from 'application/styles';
import UseNotificationService from 'application/store/services/UseNotificationService';
import UpcomingBlock from 'application/components/atoms/programs/UpcomingBlock';
import UseAlertService from 'application/store/services/UseAlertService';
import AlertPopup from 'application/components/atoms/AlertPopup';

const HeaderMobile = ({ width }: any) => {
  const { _env } = UseEnvService();

  const { event } = UseEventService();
const [open, setOpen] = React.useState(false)
  const { popupCount, setCurrentPopup, currentPopup, clearCurrentPopup } = UseNotificationService();
  const { unread, setUnreadCount } = UseAlertService();
  const router = useRouter();
  
  const [alertCount, setAlertCount] = React.useState(0);

  const [isOpen, setIsOpen] = React.useState(false);

  const [alertData, setAlertData] = React.useState<any>(null);
  
  const onClose = () => setIsOpen(false)
  
  const cancelRef = React.useRef(null);



  const onBtnLeftClick = () => {
    console.log(alertData);
    clearCurrentPopup();
    onClose();
  };

  const onBtnRightClick = () =>{
    
    if(alertData.type == 'alert'){
      router.push(`/${event.url}/alerts/detail/${alertData.id}`)
    }else {
      if(alertData.url !== undefined){
        router.push(`/${event.url}${alertData.url}`)
      }
    }
    clearCurrentPopup();
    onClose();
  };


  React.useEffect(() => {
    if(popupCount > 0 && currentPopup == null){
      setCurrentPopup();
    }
  }, [popupCount])
  
  React.useEffect(() => {
    setOpen(false)
  }, [router])

    React.useEffect(() => {
    if(currentPopup !== null){
      setAlertData(currentPopup);
      if(currentPopup.type == 'alert'){
        setUnreadCount(unread + 1);
      }
      setAlertCount(alertCount+1);
      setIsOpen(true);
    }else{
      setAlertData(null);
    }
  }, [currentPopup])
  
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
              <Image
                  alt='logo' mb={{ base: 5, lg: 10 }} source={{ uri: event.settings?.app_header_logo ? `${_env.eventcenter_base_url}/assets/event/branding/${event.settings.app_header_logo}`
                        : event.settings?.header_logo !== undefined && event.settings?.header_logo !== ''
                          ? `${_env.eventcenter_base_url}/assets/event/branding/${event.settings.header_logo}`
                          : images.Logo }} w="180px" h="61px" alignSelf={'center'} />
            </Pressable>
          </Center>
          <Spacer />
          <Center alignItems="flex-end">
            <HStack space="0">
              {/* <Notification /> */}
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
       {alertData !== null && <AlertPopup
        key={alertCount}
        isOpen={isOpen}
        onClose={()=>{
          clearCurrentPopup();
          onClose();
        }}
        btnLeftFunc={onBtnLeftClick}
        btnRightFunc={onBtnRightClick}
        cancelRef ={cancelRef}
        title={alertData?.title}
        text={alertData?.text}
        btnLeftText={alertData?.btnLeftText ? alertData?.btnLeftText : 'OK'}
        btnRightText={alertData?.btnRightText ? alertData?.btnRightText : 'Detail'}
      />}         
    </>
  );
}

export default HeaderMobile;