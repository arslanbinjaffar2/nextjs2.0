import * as React from 'react';
import { Box, Container, HStack, Text, View } from 'native-base';
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


type ScreenParams = { id: string, currentIndex: string }

const { useParam } = createParam<ScreenParams>()

const ShowTurnList = () => {
    const { modules, event } = UseEventService();
    const { processing, loading } = UseLoadingService();
    const [socketUpdate, setSocketUpdate] = React.useState(false);
    console.log(socketUpdate, 'socketUpdate');

    const { attendeesToCome, FetchProgramTurnList, agendaDetail, currentAttendee, currentUser } = useRequestToSpeakService();
    const [_programId] = useParam('id');

    const checkActiveUserAlreadyRequested = () => {
        if (currentUser && currentUser.id) {
            const isRequested = attendeesToCome.find((item: any) => item.attendee.id === currentUser.id)?.status;
            return isRequested;
        }
    }

    const { socket } = UseSocketService();

    const alreadyInSpeech = currentAttendee && currentAttendee.status === 'inspeech' && currentUser.id === currentAttendee.attendee_id;

    React.useEffect(() => {
        FetchProgramTurnList({ program_id: Number(_programId) })
    }, [socketUpdate]);

    React.useEffect(() => {
        if (socket !== null) {
            socket?.on(`event-buizz:web_app_attendee_to_come_speaker_list_${event.id}_${_programId}`, function (data: any): any {
                console.log(data, 'web_app_attendee_to_come_speaker_list_');
                let action = data?.soket_current_action;
                if (action === 'accepted' || action === 'pending' || action === 'none') {
                    setSocketUpdate(prevState => !prevState);
                }
            });
        }
        return () => {
            if (socket !== null) {
                socket?.off(`event-buizz:web_app_attendee_to_come_speaker_list_${event.id}_${_programId}`);
            }
        }
    }, [socket]);

    const module = modules.find((module) => module.alias === 'myturnlist');
    return (
        <>
            {(loading || in_array('program-turn-list', processing)) ? <SectionLoading /> : (
                <>
                    <NextBreadcrumbs module={module} title={agendaDetail?.info?.topic} />
                    <Container pt="2" maxW="100%" w="100%">
                        <Program details={agendaDetail} />

                        {currentAttendee && currentAttendee.status === 'inspeech' &&
                            <SpeakerContainer currentAttendee={currentAttendee} />
                        }

                        {currentUser &&
                            <ActiveAttendee
                                activeAttendee={currentUser}
                                program_id={Number(_programId)}
                                requestStatus={checkActiveUserAlreadyRequested()}
                                alreadyInSpeech={alreadyInSpeech}
                            />}

                        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                            <Text fontSize="md">Total Speakers: {attendeesToCome?.length ?? 0}</Text>
                        </HStack>
                        <View bg={'primary.box'} rounded={'10px'} width={'100%'}>
                            {attendeesToCome?.length > 0 &&
                                attendeesToCome.map((item: any, key: number) => (
                                    <Box w="100%" borderBottomWidth={attendeesToCome?.length - 1 == key ? 0 : 1} borderColor="primary.bordercolor" py="3">
                                        <AttendeeList attendee={item.attendee} border={attendeesToCome.length > 0 && attendeesToCome[attendeesToCome.length - 1]?.id !== item?.attendee?.id ? 1 : 0} />
                                    </Box>
                                ))
                            }
                        </View>
                    </Container>
                </>
            )}
        </>
    )
}
export default ShowTurnList;
