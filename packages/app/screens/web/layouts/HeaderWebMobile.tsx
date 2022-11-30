
import * as React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Center, Flex, Image, Pressable, Icon, Box, View, VStack, HStack, Divider, Heading } from 'native-base';
import { images } from 'app/styles'
import NotificationMenu from 'app/components/atoms/header/NotificationMenu';
import BlockNotification from 'app/components/atoms/notifications/BlockNotification';

const HeaderWebMobile = ({ navigation, minimal }: any) => {

  return (
    <View w="100%">
      <Flex direction="row" alignItems="center" safeAreaTop>
        <Center alignItems="flex-start" pt="10px" w="75px">
          <Pressable
            onPress={() => {
              console.log('here')
            }}
          >
            <Icon size="3xl" color="primary.text" as={MaterialIcons} name="menu" />
          </Pressable>
        </Center>
        <Center w="calc(100% - 150px)"><Image alt='logo' source={images.Logo} w="180px" h="39px" alignSelf={'center'} /></Center>
        <Center alignItems="flex-end" w="75px">
          <NotificationMenu />
        </Center>
      </Flex>
      <Divider mx="auto" w="160px" bg="primary.text" my="5" />
      <VStack pb="2" space={0} alignItems="center" w="100%">
        <Heading fontSize="3xl">JANUAR VISION DANMARK</Heading>
        <Heading fontSize="xl">KØBENHAVN 29 JANUAR 11:30 - 16:30</Heading>
      </VStack>
      <VStack mb="3" space={0} alignItems="center" w="100%">
        <Heading fontSize="lg" bold>DR Koncerthus</Heading>
        <Heading fontSize="lg" bold>STUDIO 2, 2300 København S</Heading>
      </VStack>
      <HStack w="100%" space="4%">
        <Center w="48%">
          <BlockNotification title="UPCOMING SESSION" desc="Workshop 2 - The right path" location="Room 242" date="11-03-2022" time="11-00 to 13-00" />
        </Center>
        <Center w="48%">
          <BlockNotification title="UPCOMING SESSION" desc="Workshop 2 - The right path" location="Room 242" date="11-03-2022" time="11-00 to 13-00" />
        </Center>
      </HStack>
    </View>
  )
}

export default HeaderWebMobile;