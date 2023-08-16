import React from 'react'
import { Box, HStack, Icon, Image, Pressable, Spacer, Text, VStack } from 'native-base'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import Icoribbon from 'application/assets/icons/Icoribbon'
import { Attendee } from 'application/models/attendee/Attendee'
import UseAttendeeService from 'application/store/services/UseAttendeeService';
import UseEventService from 'application/store/services/UseEventService';
import UseEnvService from 'application/store/services/UseEnvService';
import { useRouter } from 'solito/router'

type boxItemProps = {
  attendee: Attendee
  border: number
}

const RectangleView = ({ border, attendee }: boxItemProps) => {

  const { MakeFavourite } = UseAttendeeService();

  const { event } = UseEventService();

  const { _env } = UseEnvService()

  const { push } = useRouter()

  return (
    <Box w="100%" borderBottomWidth={border === 1 ? 1 : 0} borderColor="primary.text" py="3">
      <Pressable
        onPress={() => {
          push(`/${event.url}/attendees/detail/${attendee.id}`)
        }}>
        <HStack px="4" alignItems="flex-start" minH="55px" space={0} justifyContent="flex-start">
          <HStack pt="2" w="100%" space="5" alignItems="center" justifyContent="space-between">
            {attendee?.image ? (
              <Image rounded="25" size="5" source={{ uri: `${_env.eventcenter_base_url}/assets/attendees/${attendee?.image}` }} alt="Alternate Text" w="50px" h="50px" />
            ) : (
              <Image rounded="25" size="5" source={{ uri: 'https://wallpaperaccess.com/full/31751.jpg' }} alt="Alternate Text" w="50px" h="50px" />
            )}
            <VStack maxW={['62%', '70%', '40%']} space="0">
              {(attendee?.first_name || attendee?.last_name) && (
                <>
                  <Text lineHeight="22px" fontSize="lg">{`${attendee?.first_name} ${attendee?.last_name}`}</Text>
                  {attendee?.info &&
                    (attendee?.info.company_name ||
                      attendee?.info.title) && (
                      <>
                        {attendee?.info.title && (
                          <Text lineHeight="22px" fontSize="lg">{attendee?.info?.title}&nbsp;{attendee?.info?.company_name &&
                            attendee?.info?.title &&
                            ", "}
                            {attendee?.info?.company_name && attendee?.info?.company_name}</Text>
                        )}
                      </>
                    )}
                </>
              )}
              {attendee?.info?.private_street && (
                <Text pt="1" lineHeight="22px" fontSize="md">Private address: {attendee?.info?.private_street}</Text>
              )}
            </VStack>
            <Spacer />
            <HStack space="4" alignItems="center">
              <Pressable
                onPress={() => {
                  MakeFavourite({ attendee_id: attendee.id, screen: 'listing' })
                }}>
                <Icoribbon width="20" height="28" color={attendee?.favourite ? event?.settings?.primary_color : ''} />
              </Pressable>
              <Icon size="md" as={SimpleLineIcons} name="arrow-right" color={'primary.text'} />
            </HStack>
          </HStack>
        </HStack>
      </Pressable>
    </Box>
  )
}

export default RectangleView