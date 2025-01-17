import React, { useEffect, useState } from 'react'
import { Box, HStack, Spacer, VStack, Text, Icon, ZStack, Center, IconButton, Pressable, Divider } from 'native-base'
import IcoRaiseHand from 'application/assets/icons/IcoRaiseHand';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Program } from 'application/models/program/Program';
import UseProgramService from 'application/store/services/UseProgramService';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'solito/router';
import { Platform } from 'react-native';
import moment from 'moment'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import in_array from 'in_array';
import FavProgramToggle from 'application/components/atoms/programs/FavProgramToggle';
import UseAuthService from 'application/store/services/UseAuthService';
import ModuleEnabled from 'application/utils/ModuleEnabled';

type AppProps = {
  program: Program,
  k: number,
  border: boolean,
  workshop: boolean,
  speaker?:number,
  section?:string,
  currentIndex?:number,
  screen?: string
}

const RectangleDetailView = ({ program, k, border, speaker, section, workshop,currentIndex, screen }: AppProps) => {

  const { MakeFavourite,agendas_attached_via_group } = UseProgramService();

  const { event,modules } = UseEventService();
  const { response } = UseAuthService();

  const [isFav,setFav] = useState(false);

  const { push } = useRouter()
  
  useEffect(()=>{
    setFav(program?.program_attendees_attached?.length > 0);
    console.log("isFav state: ", isFav);
  }
  ,[program, program?.program_attendees_attached])

  function toggleFav(){
    // setFav(prevIsFav => !prevIsFav);
    MakeFavourite({ program_id: program.id, screen: speaker === 1 ? 'speaker-program' : (section !== undefined ? section : 'programs')  })
  }
  
  const _condtion = (program?.session?.length && program?.enable_speakerlist) || (program?.videos?.length) || (event?.agenda_settings?.admin_fav_attendee == 1 && !in_array(program?.id, agendas_attached_via_group) )
  return (
    <>
    <Box w="100%" key={k} borderBottomWidth={border ? 1 : 0} borderColor="primary.bordercolor" py="3">
      {workshop && <Divider w={'5px'} bg={'primary.500'}  position={'absolute'} right={0} height={'calc(100% + 1px)'} top={0} />}
      <Pressable
              onPress={() => {
                if(screen && screen === 'qa'){
                  push(`/${event.url}/qa/detail/${program.id}`)
                }else if(section === 'myturnlist'){
                  push(`/${event.url}/myturnlist/show/${program.id}`)
                }else{
                  push(`/${event.url}/agendas/detail/${program.id}?currentIndex=${currentIndex}`)
                }
              }}>

                <HStack pl="30px" alignItems="flex-start" minH="55px" space={0} justifyContent="flex-start">
                  <HStack pt="2" pr={1} w="100%" space="0" minH={'55px'} alignItems="flex-start" justifyContent="space-between">
                  {Platform.OS === 'web' && event?.agenda_settings?.show_tracks == 1 && <Box  width={['35px','35px']} h={'55px'} ml="-30px">
                    <ZStack top={'50%'} mt={`-${program.program_tracks.slice(0,3).length === 3 ?  10 : program.program_tracks.slice(0,3).length === 2 ? 20 : 30 }px`}  reversed>
                      {program?.program_tracks?.length > 0 && program.program_tracks.slice(0,3).map((track: any, i: number) =>
                        <Box key={i} bg={track.color ? track.color : '#fff'} borderWidth="1" borderColor="primary.darkbox" w={'15px'} top={`-${i*10}px`}   height={`${i === 0 && program?.program_tracks?.length === 1 ? '55px' : '35px'}`} borderRightRadius="10" shadow={2} />
                      )}
                    </ZStack>
                  </Box>}
                     <VStack w={["45px","60px"]} space="0">
                      {(event.agenda_settings?.agenda_display_time == 1 && program?.hide_time == 0)  &&<>
                      <Text lineHeight="22px">{moment(`${program.date} ${program.start_time}`).format('HH:mm')}</Text>
                      <Text lineHeight="22px">{moment(`${program.date} ${program.end_time}`).format('HH:mm')}</Text>
                      </>}
                    </VStack>
                    <Center maxW={[_condtion ? '55%' : '75%', _condtion ? '68%' : '78%']} alignSelf="flex-start" p="0">
                      <Text alignSelf="flex-start" lineHeight="22px">{program.topic}</Text>
                    </Center>
                    <Spacer />
                    
                    {_condtion && section !== 'myturnlist' && <HStack pr="3" space={['2','4']} alignItems="center" justifyContent={'flex-end'}>
                      {ModuleEnabled('myturnlist',modules) && program?.session?.length && program?.enable_speakerlist && (event?.myturnlist_setting?.ask_to_apeak == 1 || (event?.myturnlist_setting?.ask_to_apeak == 0 && response?.attendee_detail?.event_attendee?.ask_to_apeak == 1)) && program?.request_to_speak_common_group === true ? (
                        <IconButton
                          p={0}
                          mr="0"
                          variant="transparent"
                          icon={<IcoRaiseHand width={21} height={26} />}
                          onPress={() => {
                            push(`/${event.url}/myturnlist/show/${program.id}`)
                          }}
                        />
                      ): null}
                      {program?.videos?.length ? (
                        <Icon size="xl" as={Ionicons} name="ios-videocam-outline" color="primary.text" />
                      ) : ''}
                       {event?.agenda_settings?.admin_fav_attendee == 1 && !in_array(program?.id, agendas_attached_via_group) && program?.is_attatched_with_subregistration !== 1 && <FavProgramToggle program_id={program.id} key={program.id} />}
                      
                    </HStack>}
                      {section === 'myturnlist' && <HStack pr="3" space="5" alignItems="center">
                              <IconButton
                                bg="transparent"
                                p="1"
                                _hover={{ bg: 'transparent' }}
                                icon={<Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />}
                                onPress={() => {
                                  push(`/${event.url}/myturnlist/show/${program.id}`)
                                }}

                              />
                            </HStack>
                            }
                  </HStack>
                </HStack>
      </Pressable>
    </Box>
    </>
  )
};

export default RectangleDetailView