import { Attendee } from 'application/models/attendee/Attendee'
import DynamicIcon from 'application/utils/DynamicIcon'
import UseEnvService from 'application/store/services/UseEnvService';
import { Text, HStack, View, Avatar, Box, Pressable, Button, Image } from 'native-base'
import React, { useState } from 'react'
import UseAuthService from 'application/store/services/UseAuthService'
import useRequestToSpeakService from 'application/store/services/useRequestToSpeakService';

interface ActiveAttendeeProps {
    activeAttendee: Attendee
    program_id: number
    currentUserStatus: any
    alreadyInSpeech: boolean
}

const ActiveAttendee = ({ activeAttendee, program_id, currentUserStatus, alreadyInSpeech }: ActiveAttendeeProps) => {
    const { _env } = UseEnvService()
    const [sendRequest, setSendRequest] = useState(currentUserStatus.status === 'pending')
    console.log(currentUserStatus, 'currentUserStatus')
    if (!activeAttendee) return null;

    const { image, first_name, last_name = {} } = activeAttendee;

    const { field_settings, settings, RequestToSpeech } = useRequestToSpeakService();
    console.log(settings, 'settings')

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
        <>
            <View height={"105px"} bg={'primary.box'} rounded={'10px'} pl={'10px'} py={'5'} pr={'18px'} my={'14px'} width={'100%'} >
                <HStack justifyContent={'space-between'} width={'100%'} alignItems={'center'}>
                    <Box flexDirection={'row'} alignItems={'center'}>
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
                            <Text textBreakStrategy='balanced' fontSize="lg">
                                {renderDetails()}
                            </Text>
                        </View>
                    </Box>
                    <Box flexDirection={'row'} alignItems={'center'}>
                        {!alreadyInSpeech && currentUserStatus.status !== 'accepted' && (
                            <>
                                <Pressable
                                    mr={'4'}
                                    onPress={() => {
                                        setSendRequest(!sendRequest)
                                        RequestToSpeech({ agenda_id: program_id, action: currentUserStatus.status === 'pending' ? 'cancel' : 'request' })
                                    }}

                                >
                                    {!sendRequest ? <DynamicIcon iconType={'hand'} iconProps={{ width: 20, height: 26 }} />
                                        : settings?.ask_to_speak === 1 ? <Box maxWidth={'120px'} width={'100%'} bg={'primary.100'} rounded={'5px'} p={'2'}>
                                            <Text fontWeight={'semibold'} fontSize={'md'} isTruncated width={'100%'}>Cancel request</Text>
                                        </Box> : null
                                    }
                                </Pressable>
                            </>
                        )}

                        {(isFieldVisible('delegate_number') && getValueFromAttendeeInfo('delegate_number')) && (
                            <Text fontWeight={'medium'} fontSize={'lg'}># {getValueFromAttendeeInfo('delegate_number')}</Text>
                        )}
                    </Box>
                </HStack>
            </View>
        </>

    )
}

export default ActiveAttendee