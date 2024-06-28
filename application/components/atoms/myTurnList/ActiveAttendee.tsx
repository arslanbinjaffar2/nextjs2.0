import { Attendee } from 'application/models/attendee/Attendee'
import DynamicIcon from 'application/utils/DynamicIcon'
import UseEnvService from 'application/store/services/UseEnvService';
import { Text, HStack, View, Avatar, Box, Pressable, Button, Image } from 'native-base'
import React, { useState } from 'react'
import UseEventService from 'application/store/services/UseEventService';
import UseAuthService from 'application/store/services/UseAuthService'
import useRequestToSpeakService from 'application/store/services/useRequestToSpeakService';

interface ActiveAttendeeProps {
    activeAttendee: Attendee
    program_id: number
    alreadyInSpeech: boolean
    currentUserIndex: number
}

const ActiveAttendee = ({ activeAttendee, program_id, alreadyInSpeech, currentUserIndex }: ActiveAttendeeProps) => {

    const { event } = UseEventService();
    const { _env } = UseEnvService()
   

    const { FetchProgramTurnList, currentUserStatus } = useRequestToSpeakService();

    const userStatus = currentUserStatus.status;

    const [sendRequest, setSendRequest] = useState<boolean>(currentUserStatus.status === 'pending' || currentUserStatus.status === 'accepted' ? true : false)
    const [status, setStatus] = useState<boolean>(false)

    if (!activeAttendee) return null;

    const getStatusLabel = () => {
        switch (currentUserStatus.status) {
            case 'accepted':
                return event?.labels?.SPEAKER_LIST_STATUS_ACCEPTED;
            case 'pending':
                return event?.labels?.SPEAKER_LIST_STATUS_WAITING;
            default:
                return '';
        }
    };

    React.useEffect(() => {
        FetchProgramTurnList({ program_id: Number(program_id) });
    }, [status])

    React.useEffect(() => {
    }, [userStatus])

    const statusLabel = getStatusLabel();

    const { image, first_name, last_name = {} } = activeAttendee;

    const { field_settings, settings, RequestToSpeech } = useRequestToSpeakService();

    const { response } = UseAuthService()

    const loggedInUser = activeAttendee?.id === response.data?.user?.id;

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
        if (activeAttendee?.info !== undefined) {
            return activeAttendee?.info.find((item: any) => item.name === field)?.value || null;
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
        return fields.map((field:any) => {
          const value = getValueFromAttendeeInfo(field);
          if (value) {
            return <Text key={field} textBreakStrategy='balanced' fontSize="lg">{value}</Text>;
          }
          return null;
        });
      };
    
    return (
        <>
            <View bg={'primary.box'} rounded={'10px'} pl={'10px'} py={'5'} pr={'18px'} my={'14px'} width={'100%'} >
                <HStack justifyContent={'space-between'} width={'100%'} alignItems={'center'}>
                    <Box flexDirection={'row'}>
                        {activeAttendee?.image && settings?.show_image_turnlist === 1 ? (
                            <Image rounded="25" size="lg" borderWidth="0" borderColor="primary.darkbox" source={{ uri: `${_env.eventcenter_base_url}/assets/attendees/${image}` }} alt="" w="50px" h="50px" />
                        ) : (
                            <Avatar
                                borderWidth={0}
                                borderColor="primary.darkbox"
                                textTransform="uppercase"
                                bg={'#A5A5A5'}
                            >{getInitials(first_name, last_name)}</Avatar>
                        )}
                        <View flexDirection={'column'} ml={'14px'}>
                            <Text fontWeight={'medium'} fontSize={'lg'}>{activeAttendee.first_name} {activeAttendee.last_name}</Text>
                            {statusLabel &&
                                <Text textBreakStrategy='balanced' fontSize="lg">
                                    {event?.labels?.GENERAL_STATUS}: {statusLabel}
                                </Text>
                            }
                            {renderDetails()}
                        </View>
                    </Box>
                    <Box flexDirection={'row'} alignItems={'center'}>
                        {!alreadyInSpeech && (
                            <>
                                {settings.use_group_to_control_request_to_speak ? (
                                    activeAttendee.attendee_program_groups && activeAttendee.attendee_program_groups > 0 ?
                                        <Pressable
                                            mr={'4'}
                                            onPress={() => {
                                                setSendRequest(!sendRequest)
                                                RequestToSpeech({ agenda_id: program_id, action: userStatus === 'pending' ? 'cancel' : 'request' })
                                                setStatus(prev => !prev)
                                            }}
                                        >
                                            {!sendRequest || userStatus === '' ? <DynamicIcon iconType={'hand'} iconProps={{ width: 20, height: 26 }} />
                                                : settings?.ask_to_speak === 1 ? <Box maxWidth={'120px'} width={'100%'} bg={'primary.100'} rounded={'5px'} p={'2'}>
                                                    <Text fontWeight={'semibold'} fontSize={'md'} isTruncated width={'100%'}>{event?.labels?.GENERAL_CANCEL}</Text>
                                                </Box> : null
                                            }
                                        </Pressable>
                                        : null
                                ) : (
                                    <Pressable
                                        mr={'4'}
                                        onPress={() => {
                                            setSendRequest(!sendRequest)
                                            RequestToSpeech({ agenda_id: program_id, action: userStatus === 'pending' ? 'cancel' : 'request' })
                                            setStatus(prev => !prev)
                                        }}
                                    >
                                        {!sendRequest || userStatus === '' ? <DynamicIcon iconType={'hand'} iconProps={{ width: 20, height: 26 }} />
                                            : settings?.ask_to_speak === 1 ? <Box maxWidth={'120px'} width={'100%'} bg={'primary.100'} rounded={'5px'} p={'2'}>
                                                <Text fontWeight={'semibold'} fontSize={'md'} isTruncated width={'100%'}>{event?.labels?.GENERAL_CANCEL}</Text>
                                            </Box> : null
                                        }
                                    </Pressable>
                                )}
                            </>
                        )}

                        {currentUserIndex ? <Text fontWeight={'medium'} fontSize={'lg'}>#{currentUserIndex}</Text> : null}
                    </Box>
                </HStack>
            </View>
        </>

    )
}

export default ActiveAttendee