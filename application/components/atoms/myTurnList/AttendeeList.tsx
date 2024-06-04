import React from 'react'
import { Avatar, Box, Button, Center, HStack, Icon, Image, Pressable, Spacer, Text, Tooltip, VStack } from 'native-base'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import { Attendee } from 'application/models/attendee/Attendee'
import UseEnvService from 'application/store/services/UseEnvService';
import { useRouter } from 'solito/router'

type boxItemProps = {
  attendee: Attendee
  border: number
}

const AttendeeList = ({ attendee, border }: boxItemProps) => {

  const { _env } = UseEnvService()

  const { push } = useRouter()

  return (

      <Pressable
        onPress={() => { }}>
        <HStack px="4" alignItems="flex-start" minH="55px" space={0} justifyContent="flex-start">
          <HStack w="100%" space="5" alignItems="center" justifyContent="space-between">
            {attendee?.image && attendee?.field_settings?.profile_picture.is_private == 0 ? (
              <Image rounded="25" size="5" source={{ uri: `${_env.eventcenter_base_url}/assets/attendees/${attendee?.image}` }} alt="" w="50px" h="50px" />
            ) : (
              <Avatar
                borderWidth={0}
                borderColor="primary.darkbox"
                textTransform="uppercase"
                bg={'#A5A5A5'}
              >{attendee?.first_name && attendee?.last_name ? attendee?.first_name?.substring(0, 1) + attendee?.last_name?.substring(0, 1) : attendee?.first_name?.substring(0, 1)}</Avatar>
            )}
            <VStack w={['calc(100% - 175px)','calc(100% - 300px)']} space="0">
              {(attendee?.first_name || attendee?.last_name) ? (
                <>
                  <Text lineHeight="22px" fontSize="lg">{`${attendee?.first_name} ${attendee.field_settings?.last_name?.status === 1 ? attendee?.last_name : ''}`}</Text>
                  {/* {(attendee?.info?.company_name || attendee?.info?.title || attendee?.info?.department) && (
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
                  )} */}
                </>
              ) : null}
            </VStack>
            <Spacer />
            <HStack space="4" alignItems="center">
              <Icon size="md" as={SimpleLineIcons} name="arrow-right" color={'primary.text'} />
            </HStack>
          </HStack>
        </HStack>
      </Pressable>
  )
}

export default AttendeeList