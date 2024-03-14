import React, { useEffect } from 'react';
import { Box, Divider } from 'native-base'
import RectangleView from 'application/components/atoms/surveys/RectangleView';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Button, Container, HStack, Icon, Input, Spacer, Text } from 'native-base';
import UseAuthService from 'application/store/services/UseAuthService';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseSurveyService from 'application/store/services/UseSurveyService';
import MobileLoading from 'application/components/atoms/MobileLoading';
import { Survey } from 'application/models/survey/Survey';
import {useFocusEffect } from '@react-navigation/native'
import UseEventService from 'application/store/services/UseEventService';
const Index = () => {

    const mounted = React.useRef(false);

    const { loading } = UseLoadingService();

    const [tab, setTab] = React.useState<'pending'| 'completed'>('pending')

    const [query, setQuery] = React.useState('');
    
    const { FetchSurveys, surveys, completed_surveys } = UseSurveyService();
    const { event } = UseEventService();


    useFocusEffect(React.useCallback(() => {
        FetchSurveys();
      }, [])
    );

    return (
        <Container maxW="100%" h={'100%'} w="100%">
            {
                loading ? (
                    <MobileLoading />
                ):(
                    <Container pt="2" maxW="100%" w="100%">
                        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                            <Text textTransform="uppercase" fontSize="2xl">Surveys</Text>
                            <Spacer />
                            <Input rounded="10" w="60%" bg="primary.box" borderWidth={0}onChangeText={(text) => {setQuery(text)}} value={query} placeholder={event.labels?.GENERAL_SEARCH} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
                        </HStack>
                        <HStack mb="3" space={1} justifyContent="center" w="100%">
                            <Button onPress={() => setTab('pending')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={tab ? 'primary.box' : 'primary.darkbox'} w="50%" _text={{ fontWeight: '600' }}>ACTIVE</Button>
                            <Button onPress={() => setTab('completed')} borderWidth="1px" py={0} color="primary.100" borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px" bg={!tab ? 'primary.box' : 'primary.darkbox'} w="50%" _text={{ fontWeight: '600' }}>COMPLETED</Button>
                        </HStack>
                        {tab === 'pending' &&  (
                            <Box overflow="hidden" bg="primary.box" w="100%" rounded="lg">
                                    {surveys.filter((survey)=>{
                                        if(query !== ''){
                                            if(survey.info.name.toLowerCase().indexOf(query.toLowerCase()) > -1){
                                                return survey;
                                            }
                                        }else{
                                            return survey;
                                        }
                                    }).map((survey:Survey)=>(
                                        <RectangleView key={survey.id} survey={survey} completed={false} />
                                    ))}
                                    <Divider h="100px" bg="transparent" />
                                </Box>
                            ) }
                        {tab === 'completed' && (
                                <Box overflow="hidden" bg="primary.box" w="100%" rounded="lg">
                                    {completed_surveys.filter((survey)=>{
                                        if(query !== ''){
                                            if(survey.info.name.toLowerCase().indexOf(query.toLowerCase()) > -1){
                                                return survey;
                                            }
                                        }else{
                                            return survey;
                                        }
                                    }).map((survey:Survey)=>(
                                        <RectangleView key={survey.id} survey={survey} completed={true} />
                                    ))}
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


