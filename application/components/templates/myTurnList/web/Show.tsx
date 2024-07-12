import * as React from 'react';
import { Box, Button, Container, HStack, Text, View } from 'native-base';
import in_array from "in_array";
import { createParam } from 'solito';
import SectionLoading from 'application/components/atoms/SectionLoading';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseEventService from 'application/store/services/UseEventService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import useRequestToSpeakService from 'application/store/services/useRequestToSpeakService';
import AttendeeList from 'application/components/atoms/myTurnList/AttendeeList';
import SpeakerContainer from 'application/components/atoms/myTurnList/SpeakerContainer';
import ActiveAttendee from 'application/components/atoms/myTurnList/ActiveAttendee';
import Program from 'application/components/atoms/myTurnList/Program'
import UseSocketService from 'application/store/services/UseSocketService';
import { useRouter } from 'next/router';
import UseAuthService from 'application/store/services/UseAuthService';
import moment from 'moment';


type ScreenParams = { id: string, currentIndex: string }

const { useParam } = createParam<ScreenParams>()

const ShowTurnList = () => {
    const { modules, event } = UseEventService();
    const { response } = UseAuthService();
    const { push } = useRouter()

    const { processing, loading } = UseLoadingService();
    const [socketUpdate, setSocketUpdate] = React.useState(false);
    const [initialLoad, setInitialLoad] = React.useState(true);
    const [timer, setTimer] = React.useState<any>(null);

    const { attendeesToCome, FetchProgramTurnList, agendaDetail, currentAttendee, currentUser, remainingSeconds, timerStartText } = useRequestToSpeakService();
    const [_programId] = useParam('id');

    const { socket } = UseSocketService();

    const gdprSettings = event?.gdpr_settings;

    const checkGdpr = () => {
        if (gdprSettings?.enable_gdpr === 1 && gdprSettings?.attendee_invisible === 1) {
            return response.attendee_detail?.event_attendee?.gdpr === 0;
        }
        return false;
    }

    const alreadyInSpeech = !!currentAttendee && currentAttendee.status === 'inspeech' && currentUser?.id === currentAttendee.attendee_id;

    const fetchData = async () => {
        await FetchProgramTurnList({ program_id: Number(_programId) });
        setTimeout(() => {
            setInitialLoad(false);
        }, 2000);
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const getCurrentUserIndex = () => {
        if (!currentUser || !attendeesToCome) return -1;
        return attendeesToCome.findIndex((attendee: any) => attendee.attendee_id === currentUser.id) + 1;
    };


    React.useEffect(() => {
    }, [socketUpdate]);

    React.useEffect(() => {
        if (socket !== null) {
            socket?.on(`event-buizz:web_app_attendee_to_come_speaker_list_${event.id}_${_programId}`, function (data: any): any {
                console.log(data, 'web_app_attendee_to_come_speaker_list_');
                let action = data?.soket_current_action;
                if (action === 'accepted' || action === 'pending' || action === 'cancel') {
                    fetchData();
                    setSocketUpdate(prevState => !prevState);
                }
            });
            socket?.on(`event-buizz:web_app_in_speach_speaker_list_${event.id}_${_programId}`, function (data: any): any {
                console.log(data, 'web_app_in_speach_speaker_list_');
                let isStop = data?.is_stop;
                let makeLive = data?.make_live;
                if (isStop || makeLive) {
                    fetchData();
                    setTimer(moment.duration(data?.data_timer));
                    setSocketUpdate(prevState => !prevState);
                }
            });
        }
        return () => {
            if (socket !== null) {
                socket?.off(`event-buizz:web_app_attendee_to_come_speaker_list_${event.id}_${_programId}`);
                socket?.off(`event-buizz:web_app_in_speach_speaker_list_${event.id}_${_programId}`);
            }
        }
    }, [socket]);
    
    const module = modules.find((module) => module.alias === 'myturnlist');
    const sameUser = response?.data?.user?.id === currentAttendee?.attendee_id;
    const showActiveAttendee = currentAttendee?.status === 'inspeech' && sameUser;
    return (
        <>
            {(initialLoad && (loading && in_array('program-turn-list', processing))) ? <SectionLoading /> : (
                <>
                    <NextBreadcrumbs module={module} title={agendaDetail?.info?.topic} />
                    <Container pt="2" maxW="100%" w="100%">
                        <Program details={agendaDetail} />

                        {currentAttendee && currentAttendee.status === 'inspeech' &&
                            <SpeakerContainer currentAttendee={currentAttendee}
                                socketUpdate={() => setSocketUpdate(prevState => !prevState)}
                                timer={timerStartText}
                                remainingSeconds={remainingSeconds}
                            />
                        }

                        {checkGdpr() === true &&
                            <Box p={3} bg="primary.box" rounded="lg" w="100%" display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                                <Text>
                                    {event?.labels?.GENERAL_GDPR_ACCEPT_TEXT}
                                </Text>
                                <Button onPress={() => { push(`/${event.url}/settings/editprofile`) }} width={'20%'} bg={'primary.100'} rounded={'5px'} p={'2'}>
                                    <Text color={'primary.hovercolor'} fontWeight={'semibold'} fontSize={'md'} isTruncated textAlign={'center'}>{event?.labels?.GENERAL_EDIT_PROFILE}</Text>
                                </Button>
                            </Box>

                        }

                        {currentUser && checkGdpr() === false && !showActiveAttendee &&
                            <ActiveAttendee
                                activeAttendee={currentUser}
                                program_id={Number(_programId)}
                                alreadyInSpeech={alreadyInSpeech}
                                currentUserIndex={getCurrentUserIndex()}
                            />
                        }

                        {checkGdpr() === false ?
                            <>
                                <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                                    <Text fontSize="md">{event?.labels?.TURNLIST_TOTAL_SPEAKERS ?? 'Total Speakers'}: {attendeesToCome?.length ?? 0}</Text>
                                </HStack>
                                <View bg={'primary.box'} rounded={'10px'} width={'100%'}>
                                    {attendeesToCome?.length > 0 ?
                                        attendeesToCome.map((item: any, key: number) => (
                                            <Box w="100%" borderBottomWidth={attendeesToCome?.length - 1 == key ? 0 : 1} borderColor="primary.bordercolor" py="3">
                                                <AttendeeList attendee={item.attendee} border={attendeesToCome.length > 0 && attendeesToCome[attendeesToCome.length - 1]?.id !== item?.attendee?.id ? 1 : 0} />
                                            </Box>
                                        ))
                                        : <Box p={3} bg="primary.box" rounded="lg" w="100%">
                                            <Text>{event?.labels?.GENERAL_NO_RECORD}</Text>
                                        </Box>}
                                </View>
                            </>
                            : null}

                    </Container>
                </>
            )}
        </>
    )

}
export default ShowTurnList;
