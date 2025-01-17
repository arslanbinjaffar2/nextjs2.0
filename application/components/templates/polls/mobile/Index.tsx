import React, { useEffect } from 'react';
import { Box, Divider } from 'native-base'
import RectangleView from 'application/components/atoms/polls/RectangleView';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Button, Container, HStack, Icon, Input, Spacer, Text } from 'native-base';
import UseAuthService from 'application/store/services/UseAuthService';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UsePollService from 'application/store/services/UsePollService';
import MobileLoading from 'application/components/atoms/MobileLoading';
import { Poll } from 'application/models/poll/Poll';
import {useFocusEffect } from '@react-navigation/native'
import in_array from 'in_array'
import UseEventService from 'application/store/services/UseEventService';
import NoRecordFound from 'application/components/atoms/NoRecordFound';


const Index = () => {

    const mounted = React.useRef(false);

    const { processing } = UseLoadingService();

    const [tab, setTab] = React.useState<'pending'| 'completed'>('pending')

    const [query, setQuery] = React.useState('');
    
    const { event  } = UseEventService();
    
    const { FetchPolls, polls, completed_polls, poll_labels } = UsePollService();


    useFocusEffect(React.useCallback(() => {
        FetchPolls();
      }, [])
    );

    const [filteredPendingPolls, setFilteredPendingPolls] = React.useState<string[]>([]);
    const [filteredCompletedPolls, setFilteredCompletedPolls] = React.useState<string[]>([]);


    useEffect(() => {

        if(polls && typeof polls === 'object' && Object.keys(polls).length > 0) {
            
            const filteredPendingPollsKeys =  Object.keys(polls).filter((key)=>{
                                                
                const filteredPolls = polls[key].filter((poll) => {
                     if(query !== ''){
                         if(poll.program.info.topic.toLowerCase().indexOf(query.toLowerCase()) > -1){
                             return poll;
                         }
                     }else{
                         return poll;
                     }
                 });
    
                 if(filteredPolls.length > 0){
                     return key;
                 }
    
             });
            
             setFilteredPendingPolls(filteredPendingPollsKeys)
        }
        
        if(completed_polls && typeof completed_polls === 'object' && Object.keys(completed_polls).length > 0) {
            
            const filteredCompletedPollsKeys =  Object.keys(completed_polls).filter((key)=>{
                                                
                const filteredPolls = completed_polls[key].filter((poll) => {
                     if(query !== ''){
                         if(poll.program.info.topic.toLowerCase().indexOf(query.toLowerCase()) > -1){
                             return poll;
                         }
                     }else{
                         return poll;
                     }
                 });
    
                 if(filteredPolls.length > 0){
                     return key;
                 }
    
             });
            
             setFilteredCompletedPolls(filteredCompletedPollsKeys)
        }
        

    },[query, completed_polls, polls]);

    return (
        <Container maxW="100%" h={'100%'} w="100%">
            {
                in_array('poll-listing', processing) ? (
                    <MobileLoading />
                ):(
                    <Container pt="2" maxW="100%" w="100%">
                        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                            <Text textTransform="uppercase" fontSize="2xl">Polls</Text>
                            <Spacer />
                            <Input rounded="10" w="60%" bg="primary.box" borderWidth={0}onChangeText={(text) => {setQuery(text)}} value={query} placeholder={event.labels?.GENERAL_SEARCH} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
                        </HStack>
                        <HStack mb="3" space={1} justifyContent="center" w="100%">
                            <Button onPress={() => setTab('pending')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={tab ? 'primary.box' : 'primary.darkbox'} w="50%" _text={{ fontWeight: '600' }}>ACTIVE</Button>
                            <Button onPress={() => setTab('completed')} borderWidth="1px" py={0} color="primary.100" borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px" bg={!tab ? 'primary.box' : 'primary.darkbox'} w="50%" _text={{ fontWeight: '600' }}>COMPLETED</Button>
                        </HStack>
                        {tab === 'pending' &&  (
                            <Box overflow="hidden" bg="primary.box" w="100%" rounded="lg">
                                    {(polls && typeof polls === 'object' && Object.keys(polls).length > 0) ? (filteredPendingPolls.length > 0 ? filteredPendingPolls.map((key:string)=>(
                                        <React.Fragment key={key}>
                                            <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                                                <Text fontSize="lg">{polls[key][0]?.agenda_start_date_formatted}</Text>
                                            </HStack>
                                            {polls[key].map((poll)=>(
                                                <RectangleView key={poll.id} poll={poll} completed={false} />
                                            ))}
                                        </React.Fragment>
                                    )) : 
                                    <NoRecordFound/>
                                        
                                    ): (
                                        <Box padding={5}>
                                            <Text>{poll_labels?.NO_POLL_AVAILABLE}</Text>
                                        </Box>
                                    )}
                                    <Divider h="100px" bg="transparent" />
                                </Box>
                            ) }
                        {tab === 'completed' && (
                                <Box overflow="hidden" bg="primary.box" w="100%" rounded="lg">
                                    {polls && typeof completed_polls === 'object' && Object.keys(completed_polls).length > 0 ? (filteredCompletedPolls.length > 0 ? filteredCompletedPolls.map((key:string)=>(
                                        <React.Fragment key={key}>
                                            <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                                                <Text fontSize="lg">{completed_polls[key][0]?.agenda_start_date_formatted}</Text>
                                            </HStack>
                                            {completed_polls[key].map((poll)=>(
                                                <RectangleView key={poll.id} poll={poll} completed={false} />
                                            ))}
                                        </React.Fragment>
                                    )) : 
                                    <NoRecordFound label={event?.labels?.GENERAL_NO_RECORD}/>
                                    ): (
                                        <NoRecordFound label={poll_labels?.NO_POLL_AVAILABLE}/>
                                    )}
                                    <Divider h="100px" bg="transparent" />
                                </Box>
                            )
                        }
                    </Container>
                )
            }
        </Container>
        
    )

}

export default Index


