import { Attendee } from 'application/models/attendee/Attendee'
import DynamicIcon from 'application/utils/DynamicIcon'
import UseEnvService from 'application/store/services/UseEnvService';
import { Text, HStack, View, Avatar, Box, Pressable, Button, Image, Modal, TextArea, Spinner } from 'native-base'
import React, { useState } from 'react'
import UseEventService from 'application/store/services/UseEventService';
import UseAuthService from 'application/store/services/UseAuthService'
import useRequestToSpeakService from 'application/store/services/useRequestToSpeakService';
import { func } from 'application/styles';

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

    const [sendRequest, setSendRequest] = useState<boolean>(false);

    React.useEffect(() => {
        setSendRequest(userStatus === "pending" || userStatus === "accepted");
    }, [userStatus]);
    
    const [status, setStatus] = useState<boolean>(false)
    const [noteBox, setNoteBox] = useState<boolean>(false)
    const [note, setNote] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

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
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    }, [status])

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    }, [userStatus])

    const statusLabel = getStatusLabel();

    const { image, first_name, last_name = {} } = activeAttendee;

    const { field_settings, settings, RequestToSpeech } = useRequestToSpeakService();

    const { response } = UseAuthService()

    const loggedInUser = activeAttendee?.id === response.data?.user?.id;

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
        const fields = getVisibleFieldsWithValues();
        return fields.map((field: any) => {
            const value = getValueFromAttendeeInfo(field);
            if (value) {
                return <Text key={field} textBreakStrategy='balanced' fontSize="lg">{value}</Text>;
            }
            return null;
        });
    };

    const submitRequestToSpeak = () => {

        let action = userStatus === "pending" || userStatus === "accepted" ? "cancel" : "request";
        if(action === "request" && settings?.ask_to_speak_notes === 1){
            setNoteBox(true)
        }else{
            setLoading(true);
            setSendRequest(!sendRequest)
            RequestToSpeech({ agenda_id: program_id, action: action })
            setStatus(prev => !prev)
            setNote('')
        }
    };

    const submitRequestToSpeakWithNote = () => {
        setLoading(true);
        setNoteBox(false)
        setSendRequest(!sendRequest)
        RequestToSpeech({ agenda_id: program_id, action: 'request', notes: note })
        setStatus(prev => !prev)
        setNote('')
    }

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
                            {userStatus !== "accepted" && renderDetails()}
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
                                                submitRequestToSpeak();
                                            }}
                                        >
                                            {loading ? <Spinner color="primary.hovercolor" /> : 
                                                (!sendRequest || userStatus === '' ? <DynamicIcon iconType={'hand'} iconProps={{ width: 20, height: 26 }} />
                                                : settings?.ask_to_speak === 1 ? <Box maxWidth={'120px'} width={'100%'} bg={'primary.100'} rounded={'5px'} p={'2'}>
                                                    <Text color={'primary.hovercolor'} fontWeight={'500'} fontSize={'md'} isTruncated width={'100%'}>{event?.labels?.RQS_CANCEL ?? event?.labels?.GENERAL_CANCEL}</Text>
                                                </Box> : null)
                                            }
                                        </Pressable>
                                        : null
                                ) : (
                                    <Pressable
                                        mr={'4'}
                                        onPress={() => {
                                            submitRequestToSpeak();
                                        }}
                                    >
                                        {loading ? <Spinner color="primary.hovercolor" /> : 
                                            (!sendRequest || userStatus === '' ? <DynamicIcon iconType={'hand'} iconProps={{ width: 20, height: 26 }} />
                                            : settings?.ask_to_speak === 1 ? <Box maxWidth={'120px'} width={'100%'} bg={'primary.100'} rounded={'5px'} p={'2'}>
                                                <Text color={'primary.hovercolor'} fontWeight={'500'}isTruncated width={'100%'}>{event?.labels?.RQS_CANCEL ?? event?.labels?.GENERAL_CANCEL}</Text>
                                            </Box> : null)
                                        }
                                    </Pressable>
                                )}
                            </>
                        )}

                        {currentUserIndex && !loading ? <Text fontWeight={'medium'} fontSize={'lg'}>#{currentUserIndex}</Text> : null}
                    </Box>
                </HStack>
            </View>
            <Modal
							
                isOpen={noteBox}
                onClose={() => {
                    setNoteBox(false)
                }}
            >
                <Modal.Header bg={'primary.boxsolid'} borderWidth={0} borderColor={'transparent'} px={'16px'} py={4} flexDirection={'row'} maxWidth={'450px'} width={['80%', '90%']} roundedTop={'10px'} alignItems={'center'} mx={'auto'}>
                    <DynamicIcon iconType={'my_notes'} iconProps={{ width: 30, height: 30, color: func.colorType(event?.settings?.app_background_color) ? func.colorType(event?.settings?.app_background_color) : undefined  }} />
                    <Text color={'primary.backgroundtext'} fontSize={'2xl'} ml={2}>{event?.labels?.WRITE_NOTE_TO_MODRATOR}</Text>
                </Modal.Header>
                <Modal.Content bg={'primary.boxsolid'} p={0} maxWidth={'450px'} width={['80%', '90%']} roundedBottom={'10px'} roundedTop={0} mx={'auto'}>
                    <Modal.Body position={'relative'} zIndex={1} p={4} >
                        <View flexDirection={'column'}>
                            <TextArea
                                p="0"
                                h="150px"
                                value={note}
                                onChangeText={(text) => setNote(text)}
                                focusOutlineColor="transparent"
																color={'primary.backgroundtext'}
                                placeholder={event?.labels?.WRITE_NOTES}
                                _focus={{ bg: 'transparent' }}
																_light={{
																		placeholderTextColor: "primary.backgroundtext",
																	}}
																	_dark={{
																		placeholderTextColor: "primary.backgroundtext",
																	}}
                                borderWidth="0" fontSize="md" autoCompleteType={undefined} />
                            <Text>
                            </Text>
                            <HStack  flexDirection={'row'}  alignItems={'center'} mt={'4'} space={2}>
                                    <Button
																		_text={{color: 'primary.hovercolor'}}
                                    flex={1}
                                        onPress={() => {
                                            submitRequestToSpeakWithNote()
                                        }}
                                    >
                                        {event?.labels?.RQS_SKIP ?? event?.labels?.GENERAL_SKIP}
                                    </Button>
                                    <Button
																		_text={{color: 'primary.hovercolor'}}
                                    flex={1}

                                        onPress={() => {
                                            submitRequestToSpeakWithNote()
                                        }}
                                    >
                                        {event?.labels?.RQS_SUBMIT ?? event?.labels?.GENERAL_SUBMIT}
                                    </Button>
                            </HStack>
                        </View>

                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </>

    )
}

export default ActiveAttendee