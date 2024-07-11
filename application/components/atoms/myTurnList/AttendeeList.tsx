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

  const getVisibleFieldsWithValues = () => {
    return field_settings
      .filter((field: any) => {
        const isVisible = loggedInUser ? true : !field.is_private;
        const value = getValueFromAttendeeInfo(field.fields_name);
        return isVisible && value;
      })
      .map((field: any) => field.fields_name);
  };

  const gdprSettings = event?.gdpr_settings;

  const notShowProfileImage = () => {
    if (gdprSettings?.enable_gdpr === 1 && gdprSettings?.attendee_invisible === 0) {
      return attendee?.current_event_attendee?.gdpr === 0;
    }
    return false;
  }

  const getValueFromAttendeeInfo = (field: string) => {
    if (attendee?.info !== undefined) {
      const infoValue = attendee?.info.find((item: any) => item.name === field)?.value;
      if (infoValue) {
        return infoValue;
      }
    }
    const notFields = ['date_of_issue_passport', 'EMPLOYMENT_DATE', 'date_of_expiry_passport'];
    if (notFields.includes(field)) {
      return null;
    }
    return (attendee as any)?.[field] || null;
  }

  const renderDetails = () => {
    const fields = getVisibleFieldsWithValues(); // Add more fields if needed
    return fields.map((field: any) => {
      const value = getValueFromAttendeeInfo(field);
      if (value) {
        return <Text key={field} textBreakStrategy='balanced' fontSize="lg">{value}</Text>;
      }
      return null;
    });
  };

  return (

    <Pressable
      onPress={() => { push(`/${event.url}/speakers/detail/${attendee.id}`) }}>
      <HStack px="4" alignItems="flex-start" minH="55px" space={0} justifyContent="flex-start">
        <HStack w="100%" space="5" alignItems={'center'} justifyContent="space-between">

          <Box alignSelf={renderDetails() !== null ? 'flex-start' : 'center'}>
            {attendee?.image && settings?.show_image_turnlist === 1 && !notShowProfileImage() ? (
              <Image rounded="25" size="5" source={{ uri: `${_env.eventcenter_base_url}/assets/attendees/${attendee?.image}` }} alt="" w="50px" h="50px" />
            ) : (
              <Avatar
                borderWidth={0}
                borderColor="primary.darkbox"
                textTransform="uppercase"
                bg={'#A5A5A5'}
              >{attendee?.first_name && attendee?.last_name ? attendee?.first_name?.substring(0, 1) + attendee?.last_name?.substring(0, 1) : attendee?.first_name?.substring(0, 1)}</Avatar>
            )}
          </Box>

          <VStack w={['calc(100% - 175px)', 'calc(100% - 300px)']} space="0">
            {(attendee?.first_name || attendee?.last_name) ? (
              <>
                <Text lineHeight="22px" fontWeight={'medium'} fontSize="lg">{`${attendee?.first_name} ${attendee?.last_name}`}</Text>
                {renderDetails()}
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