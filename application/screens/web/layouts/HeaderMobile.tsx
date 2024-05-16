import * as React from 'react';
import { Badge, Box, Button, Center, Container, Heading, HStack, Image, Menu, Pressable, Spacer, Text, VStack, Icon, Drawer, Divider } from 'native-base';
import LeftBarMobile from 'application/screens/web/layouts/LeftBarMobile';
import Ionicons from '@expo/vector-icons/Ionicons';
import UseEnvService from 'application/store/services/UseEnvService';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'next/router';
import { images } from 'application/styles';
import Icosettings from '../../../assets/icons/Icosettings';
import LeftBarProfileMobile from './LeftBarProfileMobile';

const HeaderMobile = ({ width }: any) => {
  const { _env } = UseEnvService();

  const { event } = UseEventService();
const [open, setOpen] = React.useState(false)
  const router = useRouter();
const [openProfileBar,setOpenProfileBar]=React.useState(false)
console.log(open,"open mneu")
  
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
          <Box>
          <Pressable onPress={() => { 
            setOpenProfileBar(true)
           }}>
            <Icosettings width={28} height={28} /></Pressable>
            </Box>
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
            
          
          <LeftBarMobile setOpenMenu={setOpen}/>
        </Container>
        
      </Drawer>   
      <Drawer isOpen={openProfileBar} placement='left'>
        <Container alignItems={'flex-start'} w="375px" h={'100%'} bg={'secondary.500'}>
            <Center w="100%" justifyContent={'flex-end'}  alignItems={'flex-end'} p="1">
              <Pressable
                alignItems={'flex-end'}
                p="0"
                borderWidth="0"
                onPress={()=>{
                  setOpenProfileBar(false)
                }}
              
              >
                <Icon size={'3xl'} as={Ionicons} name="close-outline" color={'primary.text'}  />
              </Pressable>
            </Center>
            
          
          <LeftBarProfileMobile setProfileBar={setOpenProfileBar}/>

        </Container>
        
      </Drawer>       
    </>
  );
}

export default HeaderMobile;