import React, { useEffect } from 'react';
import { Box, Divider } from 'native-base'
import RectangleView from 'application/components/atoms/polls/RectangleView';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Button, Container, HStack, Icon, Input, Spacer, Text } from 'native-base';
import UseAuthService from 'application/store/services/UseAuthService';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UsePollService from 'application/store/services/UsePollService';
import WebLoading from 'application/components/atoms/WebLoading';
import { Poll } from 'application/models/poll/Poll';

const Index = () => {

    const mounted = React.useRef(false);

    const { loading } = UseLoadingService();

    const [tab, setTab] = React.useState<'pending'| 'completed'>('pending')

    const [query, setQuery] = React.useState('');
    
    const { FetchPolls, polls, completed_polls } = UsePollService();


    useEffect(() => {
            FetchPolls();
    }, []);

    return (
        <>
            {
                loading ? (
                    <WebLoading />
                ):(
                    <Container pt="2" maxW="100%" w="100%">
                        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                            <Text textTransform="uppercase" fontSize="2xl">Polls</Text>
                            <Spacer />
                            <Input rounded="10" w="60%" bg="primary.box" borderWidth={0}onChangeText={(text) => {setQuery(text)}} value={query} placeholder="Search" leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
                        </HStack>
                        <HStack mb="3" space={1} justifyContent="center" w="100%">
                            <Button onPress={() => setTab('pending')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={tab ? 'primary.box' : 'primary.darkbox'} w="50%" _text={{ fontWeight: '600' }}>ACTIVE</Button>
                            <Button onPress={() => setTab('completed')} borderWidth="1px" py={0} color="primary.100" borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px" bg={!tab ? 'primary.box' : 'primary.darkbox'} w="50%" _text={{ fontWeight: '600' }}>COMPLETED</Button>
                        </HStack>
                        {tab === 'pending' &&  (
                            <Box overflow="hidden" bg="primary.box" w="100%" rounded="lg">
                                    {Object.keys(polls).reduce((ack:Poll[] | [], key) => ( [...ack, ...polls[key]]), []).filter((poll)=>{
                                        if(query !== ''){
                                            if(poll.program.info.topic.toLowerCase().indexOf(query.toLowerCase()) > -1){
                                                return poll;
                                            }
                                        }else{
                                            return poll;
                                        }
                                    }).map((poll:Poll)=>(
                                        <RectangleView key={poll.id} poll={poll} />
                                    ))}
                                    <Divider h="100px" bg="transparent" />
                                </Box>
                            ) }
                        {tab === 'completed' && (
                                <Box overflow="hidden" bg="primary.box" w="100%" rounded="lg">
                                    {Object.keys(completed_polls).reduce((ack:Poll[] | [], key) => ( [...ack, ...completed_polls[key]]), []).filter((poll)=>{
                                        if(query !== ''){
                                            if(poll.program.info.topic.toLowerCase().indexOf(query.toLowerCase()) > -1){
                                                return poll;
                                            }
                                        }else{
                                            return poll;
                                        }
                                    }).map((poll:Poll)=>(
                                        <RectangleView key={poll.id} poll={poll} />
                                    ))}
                                    <Divider h="100px" bg="transparent" />
                                </Box>
                            )
                        }
                    </Container>
                )
            }
        </>
        
    )

}

export default Index


