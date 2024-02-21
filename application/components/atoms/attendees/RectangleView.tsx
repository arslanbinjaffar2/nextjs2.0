import React from 'react'
import { Box, HStack, Icon, Image, Pressable, Spacer, Text, VStack } from 'native-base'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import Icoribbon from 'application/assets/icons/Icoribbon'
import { Attendee } from 'application/models/attendee/Attendee'
import UseAttendeeService from 'application/store/services/UseAttendeeService';
import UseEventService from 'application/store/services/UseEventService';
import UseEnvService from 'application/store/services/UseEnvService';
import { useRouter } from 'solito/router'
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native'
import UserPlaceholderImage from 'application/assets/images/user-placeholder.jpg';

type boxItemProps = {
  attendee: Attendee
  border: number
  speaker: number
  disableMarkFavroute?: boolean
}

const RectangleView = ({ border, attendee, speaker, disableMarkFavroute }: boxItemProps) => {

  const { MakeFavourite } = UseAttendeeService();

  const { event } = UseEventService();

  const { _env } = UseEnvService()

  const { push } = useRouter()

  const navigation: any = Platform.OS !== "web" ? useNavigation() : false;

  return (
    <Box w="100%" borderBottomWidth={border === 1 ? 1 : 0} borderColor="primary.box" py="3">
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
        <HStack px="4" alignItems="flex-start" minH="55px" space={0} justifyContent="flex-start">
          <HStack pt="2" w="100%" space="5" alignItems="center" justifyContent="space-between">
            {attendee?.image ? (
              <Image rounded="25" size="5" source={{ uri: `${_env.eventcenter_base_url}/assets/attendees/${attendee?.image}` }} alt="Alternate Text" w="50px" h="50px" />
            ) : (
              <Image rounded="25" size="5" source={UserPlaceholderImage} alt="Alternate Text" w="50px" h="50px" />
            )}
            <VStack maxW={['62%', '70%', '40%']} space="0">
              {(attendee?.first_name || attendee?.last_name) && (
                <>
                  <Text lineHeight="22px" fontSize="lg">{`${attendee?.first_name} ${attendee?.last_name}`}</Text>
                  {attendee?.info &&
                    (attendee?.info.company_name ||
                      attendee?.info.title) && (
                      <>
                        
                          <Text lineHeight="22px" fontSize="lg">{attendee?.info?.title}&nbsp;{attendee?.info?.company_name &&
                            attendee?.info?.title &&
                            ", "}
                            { attendee?.field_settings?.department.is_private == 0 && attendee?.info?.department && `${attendee?.info?.department} ${attendee?.info?.company_name && ', '}`}
                            {attendee?.info?.company_name && attendee?.info?.company_name}
                            </Text>
                        
                      </>
                    )}
                </>
              )}
              {
                <Text pt="1" lineHeight="22px" fontSize="md"> 
                  {getPrivateFields(attendee)}
                 </Text>
              }
              
            </VStack>
            <Spacer />
              <HStack space="4" alignItems="center">
              {(!speaker && !disableMarkFavroute && event.attendee_settings?.mark_favorite == 1) && (
                <Pressable
                  onPress={() => {
                    MakeFavourite({ attendee_id: attendee.id, screen: 'listing' })
                  }}>
                  <Icoribbon width="20" height="28" color={attendee?.favourite ? event?.settings?.primary_color : ''} />
                </Pressable>
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


const getPrivateFields = (attendee:any) => {
  let fields = '';

  if(attendee?.field_settings?.pa_street.is_private == 0 && attendee?.info?.private_street){
    fields += fields !== '' ? `, ${attendee?.info?.private_street}` : attendee?.info?.private_street;
  }
  if(attendee?.field_settings?.pa_house_no.is_private == 0 && attendee?.info?.private_house_number){
    fields += fields !== '' ? `, ${attendee?.info?.private_house_number}` : attendee?.info?.private_house_number;
  }
  if(attendee?.field_settings?.pa_post_code.is_private == 0 && attendee?.info?.private_post_code){
    fields += fields !== '' ? `, ${attendee?.info?.private_post_code}` : attendee?.info?.private_post_code;
  }
  if(attendee?.field_settings?.pa_city.is_private == 0 && attendee?.info?.private_city){
    fields += fields !== '' ? `, ${attendee?.info?.private_city}` : attendee?.info?.private_city;
  }
  if(attendee?.field_settings?.pa_country.is_private == 0 && attendee?.private_country_display_name){
    fields += fields !== '' ? `, ${attendee?.private_country_display_name}` : attendee?.private_country_display_name;
  }

  return fields;
}