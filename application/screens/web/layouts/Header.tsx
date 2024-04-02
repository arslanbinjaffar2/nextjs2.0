import * as React from 'react';
import { Badge, Box, Button, Center, Container, Heading, HStack, Image, Menu, Pressable, Spacer, Text, VStack } from 'native-base';
import Icosettings from 'application/assets/icons/Icosettings';
import Icoreload from 'application/assets/icons/Icoreload';
import { images } from 'application/styles';
import Notification from 'application/components/atoms/header/Notification';
import { Event } from 'application/models/Event'
import UseEnvService from 'application/store/services/UseEnvService';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'next/router';
import AlertPopup from 'application/components/atoms/AlertPopup';
import UseNotificationService from 'application/store/services/UseNotificationService';
import UseAlertService from 'application/store/services/UseAlertService';


const Header = ({ width }: any) => {
  const { _env } = UseEnvService();

  const { event } = UseEventService();

  const { popupCount, setCurrentPopup, currentPopup, clearCurrentPopup } = UseNotificationService();

  const { unread, setUnreadCount } = UseAlertService();
  
  const router = useRouter();
  
  const [alertCount, setAlertCount] = React.useState(0);

  const [isOpen, setIsOpen] = React.useState(false);

  const [alertData, setAlertData] = React.useState<any>(null);
  
  const onClose = () => setIsOpen(false);

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

  const cancelRef = React.useRef(null);

  React.useEffect(() => {
    if(popupCount > 0 && currentPopup == null){
      setCurrentPopup();
    }
  }, [popupCount])
  
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
      <Container maxW="100%" w="100%">
        <HStack w="100%" alignItems="flex-start" space="5">
          <Center overflow="hidden" alignItems="flex-start" w="100%" maxW={width! > 1200 ? '265px' : '70px'}>
            <Pressable onPress={() => { router.push(`/${event.url}/dashboard`) }}>
             <Image
                  alt='logo' mb={{ base: 5, lg: 10 }} source={{ uri: event.settings?.app_header_logo ? `${_env.eventcenter_base_url}/assets/event/branding/${event.settings.app_header_logo}`
                        : event.settings?.header_logo !== undefined && event.settings?.header_logo !== ''
                          ? `${_env.eventcenter_base_url}/assets/event/branding/${event.settings.header_logo}`
                          : images.Logo }} w="180px" h="61px" alignSelf={'center'} />
            </Pressable>
          </Center>
          <Center w="100%" maxW={width! > 1200 ? '600px' : '40%'}>
            <VStack pb="0" space={0} w="100%">
              <Heading textTransform={'uppercase'} fontWeight={500} isTruncated fontSize="3xl">{event.name}</Heading>
              <Heading textTransform={'uppercase'} fontWeight={500} isTruncated pb="1" fontSize="xl">{event.detail?.location_name} {" "} {event?.calendar_date}</Heading>
              <Heading fontWeight={600} isTruncated fontSize="lg">{event.detail?.location_address}</Heading>
            </VStack>
          </Center>
          <Spacer />
          <Center alignItems="flex-end" w="100%" maxW={width! >= 1201 ? '265px' : '40%'}>
            <HStack space="6">
              <Box><Pressable onPress={() => { router.push(`/${event.url}/settings/editprofile`) }}><Icosettings width={28} height={28} /></Pressable></Box>
              <Box><Pressable onPress={() => { console.log('hello') }}><Icoreload width={28} height={28} /></Pressable></Box>
              {/* <Notification /> */}
            </HStack>
          </Center>
        </HStack>
      </Container>
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

export default Header;