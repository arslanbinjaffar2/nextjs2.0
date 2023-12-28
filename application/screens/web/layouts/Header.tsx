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

const Header = ({ width }: any) => {
  const { _env } = UseEnvService();
  const { event } = UseEventService();
  const { popupCount, setCurrentPopup, currentPopup, clearCurrentPopup } = UseNotificationService();
  
  const router = useRouter();
  
  const [isOpen, setIsOpen] = React.useState(false);

  const [alertData, setAlertData] = React.useState<any>(null);
  
  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);

  React.useEffect(() => {
    if(popupCount > 0){
      setCurrentPopup();
    }
  }, [popupCount])
  
  React.useEffect(() => {
    if(currentPopup !== null){
      setAlertData(currentPopup);
      setIsOpen(true);
    }
  }, [currentPopup])
  

  return (
    <>
      <Container maxW="100%" w="100%">
        <HStack w="100%" alignItems="flex-start" space="5">
          <Center overflow="hidden" alignItems="flex-start" w="100%" maxW={width! > 1200 ? '265px' : '70px'}>
            <Pressable onPress={() => { router.push(`/${event.url}/dashboard`) }}>
              <Image alt='logo' source={{ uri: `${_env.eventcenter_base_url}/assets/event/branding/${event.settings?.header_logo}` }} w="225px" h="48px" alignSelf={'center'} />
            </Pressable>
          </Center>
          <Center w="100%" maxW={width! > 1200 ? '600px' : '40%'}>
            <VStack pb="0" space={0} w="100%">
              <Heading isTruncated fontSize="3xl">{event.name}</Heading>
              <Heading isTruncated pb="1" fontSize="xl">{event.detail?.location_name} {" "} {event?.calendar_date}</Heading>
              <Heading isTruncated fontSize="lg" bold>{event.detail?.location_address}</Heading>
            </VStack>
          </Center>
          <Spacer />
          <Center alignItems="flex-end" w="100%" maxW={width! >= 1201 ? '265px' : '40%'}>
            <HStack space="10">
              <Box><Pressable onPress={() => { router.push(`/${event.url}/settings/editprofile`) }}><Icosettings width={32} height={32} /></Pressable></Box>
              <Box><Pressable onPress={() => { console.log('hello') }}><Icoreload width={34} height={34} /></Pressable></Box>
              <Notification />
            </HStack>
          </Center>
        </HStack>
      </Container>
      {alertData !== null && <AlertPopup
        isOpen={isOpen}
        onClose={()=>{
          clearCurrentPopup();
          onClose();
        }}
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