import DynamicIcon from 'application/utils/DynamicIcon'
import { Text, HStack, View, Avatar, Box, Image } from 'native-base'
import React from 'react'
import moment from 'moment';
import UseEnvService from 'application/store/services/UseEnvService';
import UseAuthService from 'application/store/services/UseAuthService'
import useRequestToSpeakService from 'application/store/services/useRequestToSpeakService';

const SpeakerContainer = ({ currentAttendee }: { currentAttendee: any }) => {

  const { attendee } = currentAttendee

  const { response } = UseAuthService()
  const { _env } = UseEnvService()
  const { field_settings, settings } = useRequestToSpeakService();
  const loggedInUser = attendee?.id === response.data?.user?.id;
  const [timeSpent, setTimeSpent] = React.useState('');
  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      const speechStartTime = moment(currentAttendee.speech_start_time);
      if (now.isAfter(speechStartTime)) {
        const duration = moment.duration(now.diff(speechStartTime));
        const formattedTime = `${duration.hours().toString().padStart(2, '0')} : ${duration.minutes().toString().padStart(2, '0')} : ${duration.seconds().toString().padStart(2, '0')}`;
        setTimeSpent(formattedTime);
      } else {
        setTimeSpent('00 : 00 : 00');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentAttendee]);


  const isFieldVisible = (fieldName: string) => {
    const field = field_settings.find((field: any) => field.fields_name === fieldName);
    if (!loggedInUser) {
      return field && !field.is_private;
    }
    return !!field;
  };

  const getInitials = (firstName: any, lastName: any) => {
    if (firstName && lastName) {
      return firstName.substring(0, 1) + lastName.substring(0, 1);
    }
    return firstName ? firstName.substring(0, 1) : '';
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
      details += (details ? ' - ' : "") + getValueFromAttendeeInfo('title');
    }
    return details;
  };

  return (
    <>
      <View rounded={'10px'} bg={'#2C74A0'} width={'100%'} height={"auto"} flexDirection={'column'} justifyContent={'space-between'}>
        <View pl={'4'} pt={'4'} pr={'5'}>

          <HStack alignItems="start" width={'100%'} justifyContent={'space-between'}>
            {(isFieldVisible('delegate_number') && getValueFromAttendeeInfo('delegate_number')) && (
              <Text fontSize={'sm'} flex={'1'}>Delegate Number# {getValueFromAttendeeInfo('delegate_number')}</Text>
            )}
            <Box alignSelf={'center'} flex={'1'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <Avatar
                borderWidth={0}
                borderColor="primary.darkbox"
                textTransform="uppercase"
                source={{ uri: `${_env.eventcenter_base_url}/assets/attendees/${settings?.show_image_turnlist === 1 ? attendee?.image : ''}` }}
                bg={'#A5A5A5'}
                size={'xl'}
              >{getInitials(attendee?.first_name, attendee?.last_name)}</Avatar>
            </Box>

            {(isFieldVisible('network_group') && getValueFromAttendeeInfo('network_group')) && (
              <Text fontSize={'sm'} flex={'1'}>Network group: {getValueFromAttendeeInfo('network_group')}</Text>
            )}
          </HStack>
          <HStack space="3" alignItems="center" flexDirection={'column'} mt={'8px'}>
            <Box flexDirection={'row'} alignItems={'center'}>
              <Text fontSize={'lg'} fontWeight={'medium'}>{attendee?.first_name} {attendee?.last_name}</Text>
              {(isFieldVisible('company_name') && getValueFromAttendeeInfo('company_name')) || (isFieldVisible('title') && getValueFromAttendeeInfo('title')) ?
                <Text fontSize={'lg'} fontWeight={'medium'} mx={'1'}>|</Text>
                : null
              }
              <Text fontSize={'sm'}> {renderDetails()}</Text>
            </Box>
            <Text fontSize={'sm'} py={'10px'} mr={'14px'} color={'#05E0E0'}>(Speaking now)</Text>
          </HStack>
        </View>

        {timeSpent &&
          <HStack bg={"#059DE0"} height={'43px'} width={'100%'} justifyContent={'center'} roundedBottom={'10px'} alignItems={'center'}>
            <DynamicIcon iconType={'checkIn'} iconProps={{ width: 24, height: 24 }} />
            <Text fontSize={'2xl'} ml={'6px'} fontWeight={'semibold'}>{timeSpent}</Text>
          </HStack>
        }
      </View>
    </>

  )
}

export default SpeakerContainer