import * as React from 'react';
import { Badge, Box, Button, Center, Container, Heading, HStack, Image, Menu, Pressable, Spacer, Text, VStack } from 'native-base';
import Icosettings from 'app/assets/icons/Icosettings';
import Icoreload from 'app/assets/icons/Icoreload';
import { images } from 'app/styles';
import NotificationMenu from 'app/components/atoms/header/NotificationMenu';

const WebHeader = ({ width, navigation }: any) => {
  return (
    <>
      <Container  maxW="100%" w="100%">
        <HStack w="100%" alignItems="flex-start" space="5">
          <Center overflow="hidden" alignItems="flex-start" w="100%" maxW={width > 1200 ? '265px' : '70px'}>
            <Pressable onPress={() => { console.log('hello') }}>
              <Image alt='logo' source={images.Logo} w="225px" h="48px" alignSelf={'center'} />
            </Pressable>
          </Center>
          <Center w="100%" maxW={width > 1200 ? '600px' : '40%'}>
            <VStack pb="0" space={0} w="100%">
              <Heading isTruncated  fontSize="3xl">JANUAR VISION DANMARK</Heading>
              <Heading isTruncated  pb="1" fontSize="xl">KØBENHAVN 29 JANUAR 11:30 - 16:30</Heading>
              <Heading isTruncated  fontSize="lg" bold>DR Koncerthus STUDIO 2, 2300 København S</Heading>
            </VStack>
          </Center>
          <Spacer />
          <Center alignItems="flex-end" w="100%" maxW={width >= 1201 ? '265px' : '40%'}>
            <HStack space="10">
              <Box><Pressable onPress={() => { console.log('hello') }}><Icosettings width={32} height={32} /></Pressable></Box>
              <Box><Pressable onPress={() => { console.log('hello') }}><Icoreload width={34} height={34} /></Pressable></Box>
              <NotificationMenu />
            </HStack>
          </Center>
        </HStack>
      </Container>
    </>
  );
}

export default WebHeader;