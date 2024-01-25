import React from 'react'
import { Box, HStack, Spacer, VStack, Text, Icon, ZStack, Center, IconButton, Pressable } from 'native-base'
import IcoRaiseHand from 'application/assets/icons/IcoRaiseHand';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Program } from 'application/models/program/Program';
import UseProgramService from 'application/store/services/UseProgramService';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'solito/router';
import { Platform } from 'react-native';
import moment from 'moment'
import in_array from 'in_array';
type AppProps = {
  program: Program,
  k: number,
  border: boolean,
  speaker?:number,
  section?:string,
}

const RectangleDetailView = ({ program, k, border, speaker, section }: AppProps) => {

  const { MakeFavourite, SetFavouriteProgramError, favouriteProgramError, agendas_attached_via_group } = UseProgramService();

  const { event } = UseEventService();

  const { push } = useRouter()

  if(favouriteProgramError !== ''){
    let message = favouriteProgramError;
    SetFavouriteProgramError('');
    alert(message);
  }  
  const _condtion = (program?.session?.length && program?.enable_speakerlist) || (program?.videos?.length) || (event?.agenda_settings?.admin_fav_attendee == 1 && !in_array(program?.id, agendas_attached_via_group) )
  return (
    <>
    <Box w="100%" key={k} borderBottomWidth={border ? 1 : 0} borderColor="primary.box" py="3">
      <Pressable
              onPress={() => {
                push(`/${event.url}/agendas/detail/${program.id}`)
              }}>

                <HStack pl="30px" alignItems="flex-start" minH="55px" space={0} justifyContent="flex-start">
                  <HStack pt="2" w="100%" space="0" minH={'55px'} alignItems="flex-start" justifyContent="space-between">
                  {Platform.OS === 'web' && event?.agenda_settings?.show_tracks == 1 && <Box width={['38px','45px']} h={'55px'} ml="-30px">
                    <ZStack reversed>
                      {program?.program_tracks?.length > 0 && program.program_tracks.slice(0,3).map((track: any, i: number) =>
                        <Box key={i} bg={track.color ? track.color : '#fff'} borderWidth="1" borderColor="primary.darkbox" h={'55px'}   w={`${15 + (i * 10)}px`} borderRightRadius="10" shadow={2} />
                      )}
                    </ZStack>
                  </Box>}
                    {(event.agenda_settings?.agenda_display_time == 1 && program?.hide_time == 0)  && <VStack w={["45px","60px"]} space="0">
                      <Text lineHeight="22px">{moment(`${program.date} ${program.start_time}`).format('HH:mm')}</Text>
                      <Text lineHeight="22px">{moment(`${program.date} ${program.end_time}`).format('HH:mm')}</Text>
                    </VStack>}
                    <Center maxW={[_condtion ? '55%' : '75%', _condtion ? '70%' : '80%']} alignSelf="flex-start" p="0">
                      <Text alignSelf="flex-start" lineHeight="22px"> {program.topic}</Text>
                    </Center>
                    <Spacer />
                    
                    {_condtion && <HStack pr="3" space={['2','3']} alignItems="flex-end">
                      {program?.session?.length && program?.enable_speakerlist ? (
                        <IconButton
                          p={0}
                          mr="0"
                          variant="transparent"
                          icon={<IcoRaiseHand width={21} height={26} />}
                          onPress={() => {
                            console.log('hello')
                          }}
                        />
                      ): ''}
                      {program?.videos?.length ? (
                        <Icon size="xl" as={Ionicons} name="ios-videocam-outline" color="primary.text" />
                      ) : ''}
                       {event?.agenda_settings?.admin_fav_attendee == 1 && !in_array(program?.id, agendas_attached_via_group) && <Pressable
                        onPress={() => {
                          MakeFavourite({ program_id: program.id, screen: speaker === 1 ? 'speaker-program' : (section !== undefined ? section : 'programs')  })
                        }}>
                        <Icon size="xl" as={AntDesign} name={program?.program_attendees_attached?.length ? "heart" : "hearto"} color={'primary.text'} />
                      </Pressable>}
                      
                    </HStack>}
                  </HStack>
                </HStack>
      </Pressable>
    </Box>
    </>
  )
};

export default RectangleDetailView