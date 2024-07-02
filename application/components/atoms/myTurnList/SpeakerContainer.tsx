import DynamicIcon from 'application/utils/DynamicIcon'
import { Text, HStack, View, Avatar, Box, Image } from 'native-base'
import React from 'react'
import moment from 'moment';
import UseEventService from 'application/store/services/UseEventService';
import UseEnvService from 'application/store/services/UseEnvService';
import UseAuthService from 'application/store/services/UseAuthService'
import useRequestToSpeakService from 'application/store/services/useRequestToSpeakService';
import { func } from 'application/styles';

interface SpeakerContainerProps {
  currentAttendee: any
  socketUpdate: () => void
}

const SpeakerContainer = ({ currentAttendee, socketUpdate }: SpeakerContainerProps) => {

  const { attendee } = currentAttendee
  const { event } = UseEventService();
  const { response } = UseAuthService()
  const { _env } = UseEnvService()
  const { field_settings, settings } = useRequestToSpeakService();
  const loggedInUser = attendee?.id === response.data?.user?.id;
  const [timeSpent, setTimeSpent] = React.useState('');

  const speechTime = settings?.enable_speech_time;
  const moderatorSpeechTime = settings?.enable_speech_time_for_moderator;

  const countDownTimeSeconds = settings?.speak_time;

  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      const speechStartTime = moment(currentAttendee.speech_start_time);
      if (moderatorSpeechTime) {
        if (now.isAfter(speechStartTime)) {
          const duration = moment.duration(now.diff(speechStartTime));
          const formattedTime = `${duration.hours().toString().padStart(2, '0')} : ${duration.minutes().toString().padStart(2, '0')} : ${duration.seconds().toString().padStart(2, '0')}`;
          setTimeSpent(formattedTime);
        } else {
          setTimeSpent('00 : 00 : 00');
        }
      } else if (speechTime && !moderatorSpeechTime) {
        const endTime = speechStartTime.add(countDownTimeSeconds, 'seconds');
        if (now.isBefore(endTime)) {
          const duration = moment.duration(endTime.diff(now));
          const formattedTime = `${duration.hours().toString().padStart(2, '0')} : ${duration.minutes().toString().padStart(2, '0')} : ${duration.seconds().toString().padStart(2, '0')}`;
          setTimeSpent(formattedTime);
        } else {
          setTimeSpent('00 : 00 : 00');
          socketUpdate();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentAttendee, speechTime, moderatorSpeechTime, countDownTimeSeconds]);


  const isFieldVisible = (fieldName: string) => {
    const field = field_settings ? field_settings.find((field: any) => field.fields_name === fieldName) : [];
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

  const getVisibleFieldsWithValues = () => {
    return field_settings
      .filter((field: any) => {
        const isVisible = loggedInUser ? true : !field.is_private;
        const value = getValueFromAttendeeInfo(field.fields_name);
        return isVisible && value;
      })
      .map((field: any) => field.fields_name);
  };
  
  
  const renderDetails = () => {
    const fields = getVisibleFieldsWithValues(); // Add more fields if needed
    return fields.map((field: any) => {
      const value = getValueFromAttendeeInfo(field);
      if (value) {
        return <Text color={'primary.hovercolor'} key={field} textBreakStrategy='balanced' fontSize="lg">{value}</Text>;
      }
      return null;
    });
  };

  return (
    <>
      <View  rounded={'10px'} bg={'primary.100'} width={'100%'} height={"auto"} flexDirection={'column'} justifyContent={'space-between'}>
        <View pl={'4'} pt={'4'} pr={'5'}>

          <HStack alignItems="start" width={'100%'} justifyContent={'space-between'}>
          {/* <Text color={'primary.hovercolor'} fontSize={'sm'} flex={'1'}>
              {isFieldVisible('delegate_number') && getValueFromAttendeeInfo('delegate_number') ? `Delegate Number# ${getValueFromAttendeeInfo('delegate_number')}` : ''}
            </Text> */}
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

            {/* <Text color={'primary.hovercolor'} fontSize={'sm'} flex={'1'}>
              {isFieldVisible('network_group') && getValueFromAttendeeInfo('network_group') ? `Network group: ${getValueFromAttendeeInfo('network_group')}` : ''}
            </Text> */}
          </HStack>
          <HStack space="3" alignItems="center" flexDirection={'column'} mt={'8px'}>
            <Box flexDirection={'row'} alignItems={'center'}>
              <Text color={'primary.hovercolor'} fontSize={'lg'} fontWeight={'medium'}>{attendee?.first_name} {attendee?.last_name}</Text>
            </Box>
            <Box alignItems={'center'}>
                {renderDetails()}
            </Box>
            <Text color={'primary.hovercolor'} fontSize={'sm'} py={'10px'} mr={'14px'} >({event?.labels?.NOW_SPEAKING ?? "Speaking Now"})</Text>
          </HStack>
        </View>

        {timeSpent && settings?.display_time ?
          <HStack bg={"secondary.100"} height={'43px'} width={'100%'} justifyContent={'center'} roundedBottom={'10px'} alignItems={'center'}>
            <DynamicIcon iconType={'checkIn'} iconProps={{ width: 24, height: 24, color: func.colorType(event?.settings?.secondary_color) ? func.colorType(event?.settings?.secondary_color) : undefined }} />
            <Text color={'primary.bordersecondary'} fontSize={'2xl'} ml={'6px'} fontWeight={'semibold'}>{timeSpent}</Text>
          </HStack>
        : null}
      </View>
    </>

  )
}

export default SpeakerContainer