/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Video } from 'expo-av';
import { Box, Center, HStack, Icon, Text, View } from 'native-base'
import { Pressable, useWindowDimensions } from 'react-native';
import IcoRaiseHand from 'application/assets/icons/IcoRaiseHand';
import Icoexpand from 'application/assets/icons/Icoexpand';
import Icomute from 'application/assets/icons/Icomute';

const StreamBlock = () => {

  const video = React.useRef(null);

  const { width } = useWindowDimensions();

  return (
    <View mb="4" w="100%" bg="primary.box" rounded="10">
      <Box>
        <HStack right="3" top="3" zIndex="99" position="absolute" space="3" alignItems="center">
          <Text color="#fff" fontSize="2xl" bold>LIVE</Text>
          <Icon as={MaterialIcons} size="3xl" color="#fff" name="wifi" />
        </HStack>
        <Video
          ref={video}
          style={{ width: '100%', height: 200 }}
          source={{
            uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
        />
      </Box>
      <HStack px="4" py="5" space="0" alignItems="center">
        <Center alignItems="flex-start" w="40%">
          <Pressable
            onPress={() => {
              console.log('hello')
            }}
          >
            <IcoRaiseHand width="27" height="34" />
          </Pressable>
        </Center>
        <HStack space="5" justifyContent="flex-end" w="60%">
          <Pressable
            onPress={() => {
              console.log('hello')
            }}
          >
            <Icoexpand width={width > 725 ? 36 : 28} height={width > 725 ? 36 : 28} />
          </Pressable>
          <Pressable
            onPress={() => {
              console.log('hello')
            }}
          >
            <Icomute width={width > 725 ? 36 : 28} height={width > 725 ? 36 : 28} />
          </Pressable>
        </HStack>
      </HStack>
    </View>
  )
}

export default StreamBlock
