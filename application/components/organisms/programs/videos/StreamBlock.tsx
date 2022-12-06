/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Video, AVPlaybackStatus } from 'expo-av';
import { Box, Center, Flex, HStack, Icon, Text, View, Image } from 'native-base'
import { Pressable, useWindowDimensions } from 'react-native';
import IcoRaiseHand from 'application/assets/icons/IcoRaiseHand';
import Icoexpand from 'application/assets/icons/Icoexpand';
import Icomute from 'application/assets/icons/Icomute';
import { ScrollView } from 'react-native-gesture-handler';

const StreamBlock = () => {
  const video = React.useRef(null);
  const { width } = useWindowDimensions();
  return (
    <View mb="3" w="100%">
      <View mb="4" overflow="hidden" w="100%" bg="primary.box" rounded="10">
        <Box overflow="hidden" rounded="10" position="relative">
          <HStack right="3" top="3" zIndex="99" position="absolute" space="3" alignItems="center">
            <Text color="#fff" fontSize="2xl" bold>LIVE</Text>
            <Icon as={MaterialIcons} size="3xl" color="#fff" name="wifi" />
          </HStack>
          <Video
            ref={video}
            style={{ width: 320, height: 200 }}
            source={{
              uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
            }}
            useNativeControls={false}
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
      <ScrollView horizontal={true} contentContainerStyle={{
        paddingLeft: '20',
        paddingRight: '20',
        marginBottom: '4',
        minWidth: '72'
      }}>
        <HStack space="3">
          <Box position="relative" alignItems="center" justifyContent="center" rounded="md" w="150px" h="85" overflow="hidden" bg="rgba(0,0,0,0.5)">
            <Icon position="relative" zIndex="9" as={MaterialIcons} size="3xl" color="#fff" name="play-arrow" />
            <Image
              opacity="0.5"
              position="absolute"
              w="100%"
              h="100%"
              source={{ uri: 'https://wallpaperaccess.com/full/317501.jpg' }}
              alt="Alternate Text"
            />
          </Box>
          <Box position="relative" alignItems="center" justifyContent="center" rounded="md" w="150px" h="85" overflow="hidden" bg="rgba(0,0,0,0.5)">
            <Icon position="relative" zIndex="9" as={MaterialIcons} size="3xl" color="#fff" name="play-arrow" />
            <Image
              opacity="0.5"
              position="absolute"
              w="100%"
              h="100%"
              source={{ uri: 'https://wallpaperaccess.com/full/317501.jpg' }}
              alt="Alternate Text"
            />
          </Box>
          <Box position="relative" alignItems="center" justifyContent="center" rounded="md" w="150px" h="85" overflow="hidden" bg="rgba(0,0,0,0.5)">
            <Icon position="relative" zIndex="9" as={MaterialIcons} size="3xl" color="#fff" name="play-arrow" />
            <Image
              opacity="0.5"
              position="absolute"
              w="100%"
              h="100%"
              source={{ uri: 'https://wallpaperaccess.com/full/317501.jpg' }}
              alt="Alternate Text"
            />
          </Box>
        </HStack>
      </ScrollView>
    </View>
  )
}

export default StreamBlock