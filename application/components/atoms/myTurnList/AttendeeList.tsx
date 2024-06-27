import React from 'react'
import { Avatar, Box, Button, Center, HStack, Icon, Image, Pressable, Spacer, Text, Tooltip, VStack } from 'native-base'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import { Attendee } from 'application/models/attendee/Attendee'
import UseEnvService from 'application/store/services/UseEnvService';
import { useRouter } from 'solito/router'
import UseAuthService from 'application/store/services/UseAuthService'
import useRequestToSpeakService from 'application/store/services/useRequestToSpeakService';
import UseEventService from 'application/store/services/UseEventService';

type boxItemProps = {
  attendee: Attendee
  border: number
}

const AttendeeList = ({ attendee, border }: boxItemProps) => {

  const { _env } = UseEnvService()

  const { push } = useRouter()
  const { event } = UseEventService();

  const { field_settings, settings } = useRequestToSpeakService();
  const { response } = UseAuthService()

  const loggedInUser = attendee?.id === response.data?.user?.id;

  const isFieldVisible = (fieldName: string) => {
    const field = field_settings.find((field: any) => field.fields_name === fieldName);
    if (!loggedInUser) {
      return field && !field.is_private;
    }
    return !!field;
  };


  const getValueFromAttendeeInfo = (field: string) => {
    if (attendee?.info !== undefined) {
      return attendee?.info.find((item: any) => item.name === field)?.value || null;
    }
    return null;
  }

  const renderDetails = () => {
    let details = '';
    if (getValueFromAttendeeInfo('company_name') && isFieldVisible('company_name')) { 
      details += getValueFromAttendeeInfo('company_name');
    }
    if (getValueFromAttendeeInfo('title') && isFieldVisible('title')) {
      details += (details ? ' - ' : '') + getValueFromAttendeeInfo('title');
    }
    return details;
  };

  return (

    <Pressable
      onPress={() => {  push(`/${event.url}/speakers/detail/${attendee.id}`) }}>
      <HStack px="4" alignItems="flex-start" minH="55px" space={0} justifyContent="flex-start">
        <HStack w="100%" space="5" alignItems="center" justifyContent="space-between">
          {attendee?.image && settings?.show_image_turnlist === 1 ? (
            <Image rounded="25" size="5" source={{ uri: `${_env.eventcenter_base_url}/assets/attendees/${attendee?.image}` }} alt="" w="50px" h="50px" />
          ) : (
            <Avatar
              borderWidth={0}
              borderColor="primary.darkbox"
              textTransform="uppercase"
              bg={'#A5A5A5'}
            >{attendee?.first_name && attendee?.last_name ? attendee?.first_name?.substring(0, 1) + attendee?.last_name?.substring(0, 1) : attendee?.first_name?.substring(0, 1)}</Avatar>
          )}
          <VStack w={['calc(100% - 175px)', 'calc(100% - 300px)']} space="0">
            {(attendee?.first_name || attendee?.last_name) ? (
              <>
                <Text lineHeight="22px" fontSize="lg">{`${attendee?.first_name} ${attendee?.last_name}`}</Text>
                {(getValueFromAttendeeInfo('company_name') || getValueFromAttendeeInfo('title') || getValueFromAttendeeInfo('department')) && (
                  <Text textBreakStrategy='balanced' fontSize="lg">
                    <Text textBreakStrategy='balanced' fontSize="lg">
                      {renderDetails()}
                    </Text>
                  </Text>
                )}
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