import React from 'react'
import { Box, HStack, Spacer, VStack, Text, Icon, ZStack, Center, IconButton, Pressable } from 'native-base'
import IcoRaiseHand from 'application/assets/icons/IcoRaiseHand';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Program } from 'application/models/program/Program';
import UseProgramService from 'application/store/services/UseProgramService';

type AppProps = {
  program: Program,
  k: number,
  border: boolean,
  speaker?:number
}

const RectangleDetailView = ({ program, k, border, speaker }: AppProps) => {

  const { MakeFavourite } = UseProgramService();

  return <Box w="100%" key={k} borderBottomWidth={border ? 1 : 0} borderColor="primary.text" py="3">
    <HStack pl="30px" alignItems="flex-start" minH="55px" space={0} justifyContent="flex-start">
      <Box position="absolute" left="0" top="0" w="15px">
        <ZStack>
          {program?.program_tracks?.length > 0 && program.program_tracks.map((track: any, i: number) =>
            <Box key={i} bg={track.color ? track.color : '#fff'} borderWidth="1" borderColor="primary.darkbox" w="15px" mt={`${i * 10}px`} h={`${55 - (i * 10)}px`} borderRightRadius="10" shadow={2} />
          )}
        </ZStack>
      </Box>
      <HStack pt="2" w="100%" space="5" alignItems="center" justifyContent="space-between">
        <VStack w="40px" space="0">
          <Text lineHeight="22px">{program.start_time}</Text>
          <Text lineHeight="22px">{program.end_time}</Text>
        </VStack>
        <Center maxW={['62%', '70%', '42%']} alignSelf="flex-start" p="0">
          <Text alignSelf="flex-start" lineHeight="22px"> {program.topic}</Text>
        </Center>
        <Spacer />
        <HStack pr="3" space="5" alignItems="center">
          <Pressable
            onPress={() => {
              MakeFavourite({ program_id: program.id, screen: speaker === 1 ? 'speaker-program' :'my-program' })
            }}>
            <Icon size="xl" as={Ionicons} name="heart" color={program?.program_attendees_attached?.length ? "primary.secondary" : "primary.text"} />
          </Pressable>
          {program?.videos?.length ? (
            <Icon size="xl" as={Ionicons} name="ios-videocam-outline" color="primary.text" />
          ) : ''}
          {program?.session?.length && program?.enable_speakerlist ? (
            <IconButton
              mr="2"
              variant="transparent"
              icon={<IcoRaiseHand width={21} height={26} />}
              onPress={() => {
                console.log('hello')
              }}
            />
          ) : ''}
        </HStack>
      </HStack>
    </HStack>
  </Box>;
};

export default RectangleDetailView