import * as React from 'react';
import { Container, HStack, Spacer, Text } from 'native-base';
import in_array from "in_array";
import { createParam } from 'solito';
import SectionLoading from 'application/components/atoms/SectionLoading';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseAuthService from 'application/store/services/UseAuthService';
import UseEventService from 'application/store/services/UseEventService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import useRequestToSpeakService from 'application/store/services/useRequestToSpeakService';
import { Attendee } from 'application/models/attendee/Attendee';
import AttendeeList from 'application/components/atoms/myTurnList/AttendeeList';

type ScreenParams = { id: string, currentIndex: string }

const { useParam } = createParam<ScreenParams>()

const ShowTurnList = () => {

    const { modules } = UseEventService();

    const { processing } = UseLoadingService();

    const { attendeesToCome, FetchProgramTurnList, agendaDetail } = useRequestToSpeakService();
    console.log(agendaDetail)
    const [_programId] = useParam('id');

    React.useEffect(() => {
        FetchProgramTurnList({ program_id: Number(_programId) })
    }, []);

    const module = modules.find((module) => module.alias === 'myturnlist');
    return (
        <>
            <NextBreadcrumbs module={module} />
            <Container pt="2" maxW="100%" w="100%">
                <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                    <Text fontSize="md">Total Speakers: {attendeesToCome.length}</Text>
                </HStack>
                {in_array('program-turn-list', processing) ? <SectionLoading /> : <>
                    {attendeesToCome.length > 0 &&
                        attendeesToCome.map((item: any) => (
                            <AttendeeList attendee={item.attendee} border={attendeesToCome.length > 0 && attendeesToCome[attendeesToCome.length - 1]?.id !== item?.attendee?.id ? 1 : 0} />
                        ))
                    }
                </>}
            </Container>
        </>
    );
};

export default ShowTurnList;
