import React from 'react'
import { Box, HStack, Spacer, VStack, Text, Icon, ZStack, Center, IconButton, Pressable } from 'native-base'
import IcoRaiseHand from 'application/assets/icons/IcoRaiseHand';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Program } from 'application/models/program/Program';
import UseProgramService from 'application/store/services/UseProgramService';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'solito/router';
import moment from 'moment'
type AppProps = {
  program: Program,
  k: number,
  border: boolean,
  speaker?:number,
  section?:string,
}

const RectangleDetailView = ({ program, k, border, speaker, section }: AppProps) => {

  const { MakeFavourite, SetFavouriteProgramError, favouriteProgramError } = UseProgramService();

  const { event } = UseEventService();
  
  const { push } = useRouter()

  if(favouriteProgramError !== ''){
    let message = favouriteProgramError;
    SetFavouriteProgramError('');
    alert(message);
  }  

  return (
    <>
    <Box w="100%" key={k} borderBottomWidth={border ? 1 : 0} borderColor="primary.text" py="3">
      <Pressable
              onPress={() => {
                push(`/${event.url}/agendas/detail/${program.id}`)
              }}>

                <HStack pl="30px" alignItems="flex-start" minH="55px" space={0} justifyContent="flex-start">
                  <Box position="absolute" left="0" top="0" w="15px">
                    <ZStack>
                      {program?.program_tracks?.length > 0 && program.program_tracks.map((track: any, i: number) =>
                        <Box key={i} bg={track.color ? track.color : '#fff'} borderWidth="1" borderColor="primary.darkbox" w="15px" mt={`${i * 10}px`} h={`${55 - (i * 10)}px`} borderRightRadius="10" shadow={2} />
                      )}
                    </ZStack>
                  </Box>
                  <HStack pt="2" w="100%" space="5" alignItems="center" justifyContent="space-between">
                    {event.agenda_settings?.agenda_display_time == 1 && <VStack w="60px" space="0">
                      <Text lineHeight="22px">{moment(`${program.date} ${program.start_time}`).format('HH:mm')}</Text>
                      <Text lineHeight="22px">{moment(`${program.date} ${program.end_time}`).format('HH:mm')}</Text>
                    </VStack>}
                    <Center maxW={['62%', '70%', '42%']} alignSelf="flex-start" p="0">
                      <Text alignSelf="flex-start" lineHeight="22px"> {program.topic}</Text>
                    </Center>
                    <Spacer />
                    <HStack pr="3" space="5" alignItems="center">
                      <Pressable
                        onPress={() => {
                          MakeFavourite({ program_id: program.id, screen: speaker === 1 ? 'speaker-program' : (section !== undefined ? section : 'programs')  })
                        }}>
                        <Icon size="xl" as={AntDesign} name={program?.program_attendees_attached?.length ? "heart" : "hearto"} color={program?.program_attendees_attached?.length ? "primary.text" : "primary.text"} />
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
      </Pressable>
    </Box>
    </>
  )
};

export default RectangleDetailView