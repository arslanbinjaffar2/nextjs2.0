import React from 'react'
import { Avatar, Box, Button, Center, HStack, Icon, Image, Pressable, Spacer, Spinner, Text, Tooltip, VStack } from 'native-base'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import Icoribbon from 'application/assets/icons/Icoribbon'
import { Attendee } from 'application/models/attendee/Attendee'
import UseAttendeeService from 'application/store/services/UseAttendeeService';
import UseEventService from 'application/store/services/UseEventService';
import UseEnvService from 'application/store/services/UseEnvService';
import { useRouter } from 'solito/router'
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native'
import UseAuthService from 'application/store/services/UseAuthService';
import Icobookmeeting from 'application/assets/icons/Icobookmeeting';
import { useSearchParams, usePathname } from 'next/navigation'
import UseLoadingService from 'application/store/services/UseLoadingService';
import in_array from 'in_array';

type boxItemProps = {
  attendee: Attendee
  border: number
  speaker: number
  disableMarkFavroute?: boolean
}

const RectangleView = ({ border, attendee, speaker, disableMarkFavroute }: boxItemProps) => {

  const { MakeFavourite } = UseAttendeeService();

  const { event,modules } = UseEventService();

  const { _env } = UseEnvService()
  const { response } = UseAuthService()

  const { processing }=UseLoadingService();

  const { push } = useRouter()

  const searchParams = useSearchParams()

    const tabQueryParam = searchParams.get('tab')

  const navigation: any = Platform.OS !== "web" ? useNavigation() : false;

  const [isFav, setIsFav] = React.useState<boolean>(false);
  const [isReservationModuleOn] = React.useState<boolean>(
    modules.filter((module: any) => module?.alias === 'reservation').length > 0 ? true : false
  );

  const [isAppointmentTabEnabled] = React.useState<boolean>(
    event?.attendee_tab_settings?.filter((tab: any) => tab?.tab_name === 'appointment' && Number(tab?.status) === 1).length > 0 ? true : false
  );

  React.useMemo(() => {
    setIsFav(attendee?.favourite == 1 ? true : false)
  }, [attendee?.favourite])

  function toggleFav() {
    if(in_array( `attendee-fav-${attendee.id}`,processing)){
            return;
      }
    setIsFav(!isFav);
    MakeFavourite({ attendee_id: attendee.id, screen: 'listing' })
  }

  const attendeeCanBookMeetingWithSpeaker = React.useMemo(() => {
    if (attendee?.event_attendee?.speaker === '1') {
      return event?.speaker_settings?.attendee_can_book_meeting_with_speaker === 1;
    } else {
      return true;
    }
  }, [attendee?.event_attendee?.speaker, event?.speaker_settings?.attendee_can_book_meeting_with_speaker]);

  return (
    <Box w="100%" borderBottomWidth={border === 1 ? 1 : 0} borderColor="primary.bordercolor" py="3">
      <Pressable
        onPress={() => {
          if (Platform.OS === "web") {
            if (speaker) {
              push(`/${event.url}/speakers/detail/${attendee.id}`)
            } else {
              push(`/${event.url}/attendees/detail/${attendee.id}`)
            }
          } else {
            navigation.replace('app', {
              screen: speaker ? 'speaker-detail' : 'attendee-detail',
              params: {
                id: attendee.id
              }
            })
          }
        }}>
        <HStack px={"4"} alignItems="flex-start" minH="55px" space={0} justifyContent="flex-start">
          <HStack w="100%" space="0" alignItems="center" justifyContent="space-between">
            {attendee?.image && attendee.field_settings.profile_picture.is_private == 0 ? (
              <Image mr={5} rounded="25" size="5" source={{ uri: `${_env.eventcenter_base_url}/assets/attendees/${attendee?.image}` }} alt="" w="50px" h="50px" />
            ) : (
              <Avatar
                borderWidth={0}
                mr={5}
                borderColor="primary.darkbox"
                textTransform="uppercase"
                bg={'#A5A5A5'}
              >{attendee?.first_name && attendee?.last_name ? attendee?.first_name?.substring(0, 1) + attendee?.last_name?.substring(0, 1) : attendee?.first_name?.substring(0, 1)}</Avatar>
            )}
            <VStack w={['calc(100% - 120px)','calc(100% - 280px)']} space="0">
              {(attendee?.first_name || attendee?.last_name) ? (
                <>
                  <Text lineHeight="22px" fontSize="lg">{`${attendee?.first_name} ${attendee.field_settings?.last_name?.status === 1 ? attendee?.last_name : ''}`}</Text>
                  {(attendee?.info?.company_name || attendee?.info?.title || attendee?.info?.department) && (
                    <Text textBreakStrategy='balanced' fontSize="lg">
                      {attendee?.info?.title && (
                        <>
                          {`${attendee?.info?.title}`}
                          {attendee?.info?.department || attendee?.info?.company_name ? ', ' : ''}
                        </>
                      )}
                      {attendee?.info?.department && (
                        <>
                          {`${attendee?.info?.department}`}
                          {attendee?.info?.company_name ? ', ' : ''}
                        </>
                      )}
                      {attendee?.info?.company_name && (
                        <>
                          {`${attendee?.info?.company_name}`}
                        </>
                      )}
                    </Text>
                  )}
                </>
              ) : null}
              {event?.attendee_settings?.display_private_address === 1 &&
                <Text pt="1" lineHeight="22px" fontSize="md">
                  {getPrivateFields(attendee)}
                </Text>
              }
              {isReservationModuleOn && isAppointmentTabEnabled && attendeeCanBookMeetingWithSpeaker && response?.data?.user?.id !== attendee?.id && (
               <Button
                  display={['','none']}
                    mt={2}
                    py={2}
                    maxWidth={'120px'}
                    colorScheme="primary"
                    onPress={() => push(`/${event.url}/reservation/${attendee?.id}`)}>
                    <Text color={'primary.hovercolor'} textAlign="center" isTruncated width="95px">{event?.labels?.RESERVATION_BOOK_MEETING_LABEL}</Text>
                    
                  </Button>
              )}
            </VStack>
            <Spacer />
            <HStack space={["0","4"]} alignItems="center">
                {isReservationModuleOn && isAppointmentTabEnabled && attendeeCanBookMeetingWithSpeaker && response?.data?.user?.id !== attendee?.id && ( 
                  <Button
                  display={['none','']}
                    py={2}
                    colorScheme="primary"

                    onPress={() => push(`/${event.url}/reservation/${attendee?.id}`)}>
                    <Text color={'primary.hovercolor'} textAlign="center" isTruncated width="95px">{event?.labels?.RESERVATION_BOOK_MEETING_LABEL}</Text>
                    
                  </Button>
                  
                )} 
              {(!speaker && !disableMarkFavroute && event.attendee_settings?.mark_favorite == 1) && (
                <Box w={'20px'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                  {in_array(`attendee-fav-${attendee.id}`,processing) ? (
                      <Spinner width={20} height={28} color={isFav ? 'secondary.500' : 'primary.text'} size="sm"  />
                  ):(
                  <Pressable
                    onPress={() => toggleFav()}>
                    <Icoribbon width="20" height="28" color={isFav ? event?.settings?.secondary_color : ''} />
                  </Pressable>
                  )}
                </Box>
                
                
              )}
              <Icon size="md" as={SimpleLineIcons} name="arrow-right" color={'primary.text'} />
            </HStack>
          </HStack>
        </HStack>
      </Pressable>
    </Box>
  )
}

export default RectangleView


const getPrivateFields = (attendee: any) => {
  let fields = '';

  if (attendee?.field_settings?.pa_street.is_private == 0 && attendee?.info?.private_street) {
    fields += fields !== '' ? `, ${attendee?.info?.private_street}` : attendee?.info?.private_street;
  }
  if (attendee?.field_settings?.pa_house_no.is_private == 0 && attendee?.info?.private_house_number) {
    fields += fields !== '' ? `, ${attendee?.info?.private_house_number}` : attendee?.info?.private_house_number;
  }
  if (attendee?.field_settings?.pa_post_code.is_private == 0 && attendee?.info?.private_post_code) {
    fields += fields !== '' ? `, ${attendee?.info?.private_post_code}` : attendee?.info?.private_post_code;
  }
  if (attendee?.field_settings?.pa_city.is_private == 0 && attendee?.info?.private_city) {
    fields += fields !== '' ? `, ${attendee?.info?.private_city}` : attendee?.info?.private_city;
  }
  if (attendee?.field_settings?.pa_country.is_private == 0 && attendee?.private_country_display_name) {
    fields += fields !== '' ? `, ${attendee?.private_country_display_name}` : attendee?.private_country_display_name;
  }

  return fields;
}