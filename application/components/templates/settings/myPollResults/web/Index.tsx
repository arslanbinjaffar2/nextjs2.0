import React, { useEffect } from 'react';
import { Box, Divider } from 'native-base'
import RectangleView from 'application/components/atoms/polls/RectangleView';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Button, Container, HStack, Icon, Input, Spacer, Text } from 'native-base';
import UseAuthService from 'application/store/services/UseAuthService';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UsePollService from 'application/store/services/UsePollService';
import WebLoading from 'application/components/atoms/WebLoading';
import { Poll, Polls } from 'application/models/poll/Poll';
import in_array from "in_array";
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'solito/router';

const Index = () => {

    const mounted = React.useRef(false);

    const { loading } = UseLoadingService();

    const [tab, setTab] = React.useState<'pending'| 'completed'>('pending')

    const [query, setQuery] = React.useState('');

    const { event, modules, setting_modules  } = UseEventService();

    const { push } = useRouter()
    
    const { FetchMyPollResults, myPollResult, poll_labels } = UsePollService();

    const [polls, setPolls] = React.useState<string[]>([]);

    useEffect(() => {
            FetchMyPollResults();
    }, []);

    useEffect(() => {
        if(myPollResult && typeof myPollResult === 'object' && Object.keys(myPollResult).length > 0) {
            const filteredCompletedPollsKeys =  Object.keys(myPollResult).filter((key)=>{
                     return key;
             });
             setPolls(filteredCompletedPollsKeys)
        }
    },[myPollResult]);

    return (
        <>
            {
                loading ? (
                    <WebLoading />
                ):(
                    <Container pt="2" maxW="100%" w="100%">
                        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                            <Text  fontSize="2xl">{setting_modules?.find((polls)=>(polls.alias == 'myPollResults'))?.name ?? 'My polls results'}</Text>
                        </HStack>
                        
                            <Box overflow="hidden" bg="primary.box" w="100%" rounded="lg">
                                    {(myPollResult && typeof myPollResult === 'object' && Object.keys(myPollResult).length > 0 && polls.length > 0 ? polls.map((key:string)=>(
                                        <React.Fragment key={key}>
                                            <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                                                <Text fontSize="lg">{myPollResult[key] ? myPollResult[key][0]?.agenda_start_date_formatted : ''}</Text>
                                            </HStack>
                                            {myPollResult[key] && myPollResult[key].map((poll)=>(
                                                <RectangleView key={poll.id} poll={poll} completed={true} settings={true} />
                                            ))}
                                        </React.Fragment>
                                    )) : (
                                        <Box padding={5}>
                                            <Text>{poll_labels?.NO_POLL_AVAILABLE}</Text>
                                        </Box>
                                    ))}
                                </Box>
                            
                       
                    </Container>
                )
            }
        </>
        
    )

}

export default Index


