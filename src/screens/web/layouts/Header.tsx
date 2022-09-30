import * as React from 'react';
import { Badge, Box, Button, Center, Container, Heading, HStack, Image, Menu, Pressable, Text, VStack } from 'native-base';
import Icosettings from '@src/assets/icons/Icosettings';
import Icoreload from '@src/assets/icons/Icoreload';
import IcoBell from '@src/assets/icons/IcoBell';
import IcoChat from '@src/assets/icons/IcoChat';
import { gStyle } from '@src/styles';
import { images } from '@src/styles';

const WebHeader = ({ navigation }: any) => {
  return (
    <>
      <Container maxW="100%" w="100%">
        <HStack w="100%" alignItems="flex-start" space="5">
          <Center alignItems="flex-start" w="265px">
            <Pressable onPress={() => { console.log('hello') }}>
              <Image alt='logo' source={images.Logo} w="225px" h="48px" alignSelf={'center'} />
            </Pressable>
          </Center>
          <Center w="600px">
            <VStack pb="0" space={0} w="100%">
              <Heading fontSize="3xl">JANUAR VISION DANMARK</Heading>
              <Heading pb="1" fontSize="xl">KØBENHAVN 29 JANUAR 11:30 - 16:30</Heading>
              <Heading fontSize="lg" bold>DR Koncerthus STUDIO 2, 2300 København S</Heading>
            </VStack>
          </Center>
          <Center alignItems="flex-end" w="265px">
            <HStack space="10">
              <Box><Pressable onPress={() => { console.log('hello') }}><Icosettings width={32} height={32} /></Pressable></Box>
              <Box><Pressable onPress={() => { console.log('hello') }}><Icoreload width={34} height={34} /></Pressable></Box>
              <Menu
                w="400px"
                placement="bottom right"
                bg="primary.darkbox"
                borderWidth={1}
                borderColor="#707070"
                shouldFlip={true}
                maxH="400px"
                h="400px"
                mt="3"
                p="0"
                style={{ ...gStyle.blur }}
                rounded="10"
                overflow={'hidden'}
                trigger={(triggerProps) => {
                  return <Button bg="transparent" colorScheme='transparent' p="0" {...triggerProps} >
                    <IcoBell width={32} height={32} />
                    <Badge position="absolute" right="4px" top="-4px" bg="#FF4C41" shadow="1" w="14px" h="14px" p="0" rounded="100%" />
                  </Button>
                }}
              >
                <Menu.Item p="0">
                  <HStack borderBottomWidth="1px" borderBottomColor="primary.text" px="6" py="3" w="100%" space="1" alignItems="center">
                    <Box w="50px">
                      <IcoChat width="30" height="26" />
                    </Box>
                    <VStack w="80%" space="0">
                      <Text fontSize="md">Emraan khan sent you a text massage. Emraan khan sent you a text massage.</Text>
                      <Text color="black" fontSize="sm">10 minutes ago</Text>
                    </VStack>
                    <Badge bg="black" shadow="1" w="4" h="4" p="0" rounded="100%" />
                  </HStack>
                </Menu.Item>
                <Menu.Item p="0">
                  <HStack borderBottomWidth="1px" borderBottomColor="primary.text" px="6" py="3" w="100%" space="1" alignItems="center">
                    <Box w="50px">
                      <IcoChat width="30" height="26" />
                    </Box>
                    <VStack w="80%" space="0">
                      <Text fontSize="md">Emraan khan sent you a text massage. Emraan khan sent you a text massage.</Text>
                      <Text color="black" fontSize="sm">10 minutes ago</Text>
                    </VStack>
                    <Badge bg="black" shadow="1" w="4" h="4" p="0" rounded="100%" />
                  </HStack>
                </Menu.Item>
              </Menu>
            </HStack>
          </Center>
        </HStack>
      </Container>
    </>
  );
}

export default WebHeader;