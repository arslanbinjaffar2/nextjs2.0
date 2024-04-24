import React, { useEffect } from 'react';
import { Box, Divider, Image } from 'native-base'
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
import BannerAds from 'application/components/atoms/banners/BannerAds'
import UseEnvService from 'application/store/services/UseEnvService'
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';

const Index = () => {

    const mounted = React.useRef(false);

    const { processing } = UseLoadingService();

    const [tab, setTab] = React.useState<'pending'| 'completed'>('pending')

    const [query, setQuery] = React.useState('');

    const { event, modules  } = UseEventService();
    const { push } = useRouter()

    const { FetchPolls, polls, completed_polls, poll_labels, polls_count, pollSettings } = UsePollService();


    useEffect(() => {
            FetchPolls();
    }, []);


    const [filteredPendingPolls, setFilteredPendingPolls] = React.useState<string[]>([]);
    const [filteredCompletedPolls, setFilteredCompletedPolls] = React.useState<string[]>([]);
    useEffect(() => {
        
        if(polls_count == 1 && (completed_polls && typeof completed_polls === 'object' && Object.keys(completed_polls).length == 0)){
            let keys = polls[Object.keys(polls)[0]];
            if (keys && keys.length == 1){
                push(`/${event.url}/polls/detail/${keys[0].agenda_id}`);
            }
        }

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
    const module = modules.find((module) => module.alias === 'polls');

    return (
        <>
            {
                in_array('poll-listing', processing) ? (
                    <WebLoading />
                ):(

                    <>
                    <NextBreadcrumbs module={module} />
                    <Container pt="2" maxW="100%" w="100%">
                        <HStack display={["block","flex"]} mb="3" pt="2" w="100%" space="0" alignItems="center">
                            <Text fontSize="2xl">{modules?.find((polls)=>(polls.alias == 'polls'))?.name ?? 'Polls'}</Text>
                            <Spacer   />
                            <Input rounded="10" w={['100%',"60%"]} bg="primary.box" borderWidth={0}onChangeText={(text) => {setQuery(text)}} value={query} placeholder={event?.labels?.GENERAL_SEARCH} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
                        </HStack>
                        <HStack mb="3" space={1} justifyContent="center" w="100%">
                            <Button _hover={{_text: {color: 'primary.hovercolor'}}} onPress={() => setTab('pending')} borderWidth="0px" py={0} borderColor="primary.boxbutton" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={tab == 'pending' ? 'primary.boxbutton' : 'primary.box'} w="50%" _text={{ fontWeight: '600' }}>{poll_labels?.NATIVE_APP_SURVEY_NOT_ATTENDED}</Button>
                            <Button isDisabled={pollSettings?.user_settings == 1 ? false:true } _hover={{_text: {color: 'primary.hovercolor'}}} onPress={() => setTab('completed')} borderWidth="0px" py={0} color="primary.100" borderColor="primary.boxbutton" borderLeftRadius="0" borderRightRadius={8} h="42px" bg={tab == 'completed' ? 'primary.boxbutton' : 'primary.box'} w="50%" _text={{ fontWeight: '600' }}>{poll_labels?.NATIVE_APP_SURVEY_COMPLETED}</Button>
                        </HStack>
                        {tab === 'pending' &&  (
                            <Box overflow="hidden" bg="primary.box" w="100%" rounded="lg">
                                    {(polls && typeof polls === 'object' && Object.keys(polls).length > 0) ? (filteredPendingPolls.length > 0 ? filteredPendingPolls.map((key:string)=>(
                                        <React.Fragment key={key}>
                                            <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                                                <Text fontSize="lg">{polls[key] ? polls[key][0]?.agenda_start_date_formatted : ''}</Text>
                                            </HStack>
                                            {polls[key] && polls[key].map((poll)=>(
                                                <RectangleView key={poll.id} poll={poll} completed={false} />
                                            ))}
                                        </React.Fragment>
                                    )) : 
                                        <Box padding={5}>
                                            <Text>{event?.labels?.GENERAL_NO_RECORD}</Text>
                                        </Box>
                                    ): (
                                        <Box padding={5}>
                                            <Text>{poll_labels?.NO_POLL_AVAILABLE}</Text>
                                        </Box>
                                    )}
                                  {Object.keys(polls).length > 0 &&  <Divider h="20px" bg="transparent" />}
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
                                                <RectangleView key={poll.id} poll={poll} completed={true} />
                                            ))}
                                        </React.Fragment>
                                    )) : 
                                        <Box padding={5}>
                                            <Text>{event?.labels?.GENERAL_NO_RECORD}</Text>
                                        </Box>
                                    ): (
                                        <Box padding={5}>
                                            <Text>{poll_labels?.NO_POLL_AVAILABLE}</Text>
                                        </Box>
                                    )}
                                {Object.keys(completed_polls).length > 0 &&  <Divider h="20px" bg="transparent" />}
                                </Box>
                            )
                        }
                    </Container>
                    </>
                )
            }
            <BannerAds module_name={'polls'} module_type={'listing'} />
        </>
        
    )

}

export default Index


