import React from 'react'
import { Box, HStack, Spacer, VStack, Text, Icon, ZStack, Center, IconButton } from 'native-base'
import IcoRaiseHand from 'application/assets/icons/IcoRaiseHand';
import Ionicons from '@expo/vector-icons/Ionicons';

const RectangleDetailView = (props: any) => {
  return <Box w="100%" key={props?.program.id} borderBottomWidth={props.k === 4 ? 0 : 1} borderColor="primary.text" py="3">
    <HStack pl="30px" alignItems="flex-start" minH="55px" space={0} justifyContent="flex-start">
      <Box position="absolute" left="0" top="0" w="15px">
        <ZStack>
          {props?.program.tracks && <ZStack>
            {props?.program.tracks.map((track: any, i: any) =>
              <Box key={i} bg={track.color} borderWidth="1" borderColor="primary.darkbox" w="15px" mt={`${i * 10}px`} h={`${55 - (i * 10)}px`} borderRightRadius="10" shadow={2} />
            )}
          </ZStack>}
        </ZStack>
      </Box>
      <HStack pt="2" w="100%" space="5" alignItems="center" justifyContent="space-between">
        <VStack w="40px" space="0">
          <Text lineHeight="22px">{props?.program.starttime}</Text>
          <Text lineHeight="22px">{props?.program.endtime}</Text>
        </VStack>
        <Center maxW={['62%', '70%', '42%']} alignSelf="flex-start" p="0">
          <Text alignSelf="flex-start" lineHeight="22px"> {props?.program.text}</Text>
        </Center>
        <Spacer />
        <HStack pr="3" space="5" alignItems="center">
          <Icon size="xl" as={Ionicons} name="heart" color="primary.secondary" />
          <Icon size="xl" as={Ionicons} name="ios-videocam-outline" color="primary.text" />
          <Icon size="xl" as={Ionicons} name="heart" color="primary.text" />
          <IconButton
            mr="2"
            variant="transparent"
            icon={<IcoRaiseHand width={21} height={26} />}
            onPress={() => {
              console.log('hello')
            }}
          />
        </HStack>
      </HStack>
    </HStack>
  </Box>;
};

export default RectangleDetailView