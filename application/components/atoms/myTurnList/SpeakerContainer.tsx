"use client";

import DynamicIcon from 'application/utils/DynamicIcon'
import { Text, HStack, View, Avatar, Box } from 'native-base'
import React, {useCallback, useRef} from 'react'
import moment from 'moment';
import UseEventService from 'application/store/services/UseEventService';
import UseEnvService from 'application/store/services/UseEnvService';
import UseAuthService from 'application/store/services/UseAuthService'
import useRequestToSpeakService from 'application/store/services/useRequestToSpeakService';
import { func } from 'application/styles';

interface SpeakerContainerProps {
  currentAttendee: any
  socketUpdate: () => void
  timer: any
  remainingSeconds: number
}

const SpeakerContainer = ({ currentAttendee, socketUpdate, timer, remainingSeconds }: SpeakerContainerProps) => {

  const { attendee } = currentAttendee
  const { event } = UseEventService();
  const { response } = UseAuthService()
  const { _env } = UseEnvService()
  const { field_settings, settings } = useRequestToSpeakService();
  const loggedInUser = attendee?.id === response.data?.user?.id;
  const [timeSpent, setTimeSpent] = React.useState('00:00:00');

  const speechTime = settings?.enable_speech_time;
  const moderatorSpeechTime = settings?.enable_speech_time_for_moderator;

  const workerRef = useRef<Worker>();

  React.useEffect(() => {
    workerRef.current = new Worker(new URL("../../../wokers/timer-worker.ts", import.meta.url ), { type: 'module' })
    workerRef.current.onmessage = (event: MessageEvent) => {
      if (event.data.type === 'update') {
        setTimeSpent(event.data.timeSpent);
      }
    };
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const startTimer = useCallback((initialTimer: number) => {
    workerRef.current?.postMessage({ type: 'start', timer: initialTimer });
  }, []);

  const startCountdownTimer = useCallback((initialTimer: number) => {
    workerRef.current?.postMessage({ type: 'countdown', timer: initialTimer });
  }, []);

  const updateTimer = () => {
    if (moderatorSpeechTime) {
      startTimer(moment.duration(timer).asSeconds());
    } else if (speechTime && !moderatorSpeechTime) {
      startCountdownTimer(remainingSeconds);
    }
  }

  React.useEffect(() => {

    if (timer || remainingSeconds) {
      updateTimer();
    }

    return () => {
      setTimeSpent('');
    };

  }, []);

  const getInitials = (firstName: any, lastName: any) => {
    if (firstName && lastName) {
      return firstName.substring(0, 1) + lastName.substring(0, 1);
    }
    return firstName ? firstName.substring(0, 1) : '';
  };

  const getValueFromAttendeeInfo = (field: string) => {
    if (field === 'EMPLOYMENT_DATE') {
      return (attendee as any)?.[field] || null;
    }
    if (attendee?.info !== undefined) {
      const infoValue = attendee?.info.find((item: any) => item.name === field)?.value;
      if (infoValue) {
        return infoValue;
      }
    }
    const notFields = ['date_of_issue_passport', 'date_of_expiry_passport'];
    if (notFields.includes(field)) {
      return null;
    }
    return (attendee as any)?.[field] || null;
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

  const gdprSettings = event?.gdpr_settings;
  const notShowProfileImageAndInfo = () => {
    if (gdprSettings?.enable_gdpr === 1 && gdprSettings?.attendee_invisible === 0) {
      return attendee?.current_event_attendee?.gdpr === 0;
    }
    return false;
  }

  const renderDetails = () => {
    const fields = getVisibleFieldsWithValues();
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
      <View rounded={'10px'} bg={'primary.100'} width={'100%'} height={"auto"} flexDirection={'column'} justifyContent={'space-between'}>
        <View pl={'4'} pt={'4'} pr={'5'}>

          <HStack alignItems="start" width={'100%'} justifyContent={'space-between'}>
            <Box alignSelf={'center'} flex={'1'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <Avatar
                borderWidth={0}
                borderColor="primary.darkbox"
                textTransform="uppercase"
                source={{ uri: `${_env.eventcenter_base_url}/assets/attendees/${settings?.show_image_turnlist === 1 && !notShowProfileImageAndInfo() ? attendee?.image : ''}` }}
                bg={'#A5A5A5'}
                size={'xl'}
              >{getInitials(attendee?.first_name, attendee?.last_name)}</Avatar>
            </Box>
          </HStack>
          <HStack space="3" alignItems="center" flexDirection={'column'} mt={'8px'}>
            <Box flexDirection={'row'} alignItems={'center'}>
              <Text color={'primary.hovercolor'} fontSize={'lg'} fontWeight={'medium'}>{attendee?.first_name} {attendee?.last_name}</Text>
            </Box>
            <Box alignItems={'center'}>
              {!notShowProfileImageAndInfo() && renderDetails()}
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