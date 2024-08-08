import * as React from 'react';
import { Box, Center, Container, Heading, HStack, Image, Pressable, Spacer, VStack } from 'native-base';
import Icosettings from 'application/assets/icons/Icosettings';
import Icoreload from 'application/assets/icons/Icoreload';
import { images } from 'application/styles';
import UseEnvService from 'application/store/services/UseEnvService';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'next/router';

const Header = ({ width }: any) => {
  const { _env } = UseEnvService();
  const { event } = UseEventService();  
  const router = useRouter();
  

  return (
    <>
      <Container maxW="100%" w="100%">
        <HStack w="100%" alignItems="flex-start" space="5">
          <Center overflow="hidden" alignItems="flex-start" w="100%" maxW={width! > 1200 ? '265px' : '70px'}>
            <Pressable onPress={() => { router.asPath.includes('/auth/gdpr') ? null : router.push(`/${event.url}/dashboard`) }}>
             <Image
                  alt='logo' mb={{ base: 5, lg: 10 }} resizeMode='contain' source={{ uri: event.settings?.app_header_logo ? `${_env.eventcenter_base_url}/assets/event/branding/${event.settings.app_header_logo}`
                        : event.settings?.header_logo !== undefined && event.settings?.header_logo !== ''
                          ? `${_env.eventcenter_base_url}/assets/event/branding/${event.settings.header_logo}`
                          : images.Logo }} w="180px" h="61px" alignSelf={'center'} />
            </Pressable>
          </Center>
          <Center w="100%" maxW={width! > 1200 ? '600px' : 'calc(100% - 200px)'}>
            <VStack pb="0" space={0} w="100%">
              <Heading textTransform={'uppercase'} fontWeight={500} isTruncated fontSize="3xl">{event.name}</Heading>
              <Heading textTransform={'uppercase'} fontWeight={500} isTruncated pb="1" fontSize="xl">{event.detail?.location_name}</Heading>
              <Heading fontWeight={600} isTruncated fontSize="lg">{event.detail?.location_address}</Heading>
            </VStack>
          </Center>
          <Spacer />
          <Center alignItems="flex-end" w="100%" maxW={width! >= 1201 ? '265px' : '70px'}>
            <HStack space="6">
              <Box><Pressable onPress={() => { router.asPath.includes('/auth/gdpr') ? null : router.push(`/${event.url}/settings`) }}><Icosettings width={28} height={28} /></Pressable></Box>
              {/* <Box><Pressable onPress={() => { console.log('hello') }}><Icoreload width={28} height={28} /></Pressable></Box> */}
              {/* <Notification /> */}
            </HStack>
          </Center>
        </HStack>
      </Container>
    </>
  );
}

export default Header;