import React, { useEffect } from 'react';
import { Box, Divider, Image } from 'native-base'
import RectangleView from 'application/components/atoms/surveys/RectangleView';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Button, Container, HStack, Icon, Input, Spacer, Text } from 'native-base';
import UseAuthService from 'application/store/services/UseAuthService';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseSurveyService from 'application/store/services/UseSurveyService';
import WebLoading from 'application/components/atoms/WebLoading';
import { Survey } from 'application/models/survey/Survey';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'solito/router';
import UseEnvService from 'application/store/services/UseEnvService'
import { Banner } from 'application/models/Banner'
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import BannerAds from 'application/components/atoms/banners/BannerAds'

const Index = () => {

    const mounted = React.useRef(false);

    const { loading } = UseLoadingService();

    const [tab, setTab] = React.useState<'pending'| 'completed'>('pending')

    const [query, setQuery] = React.useState('');
    
    const { FetchSurveys, surveys, completed_surveys, survey_labels, survey_settings } = UseSurveyService();

    const { event, modules  } = UseEventService();
    const { _env } = UseEnvService()
    const { push } = useRouter()
    useEffect(() => {
            FetchSurveys();
    }, []);

    const [filteredPendingSurveys, setFilteredPendingSurveys] = React.useState<Survey[]>([]);
    const [filteredCompletedSurveys, setFilteredCompletedSurveys] = React.useState<Survey[]>([]);

    useEffect(() => {
        
        // if(surveys.length == 1 && completed_surveys.length == 0){
        //     push(`/${event.url}/survey/detail/${surveys[0]?.id}`);
        // }

        if(surveys && surveys.length > 0) {

                const filteredSurveys = surveys.filter((survey) => {
                     if(query !== ''){
                         if(survey.info.name.toLowerCase().indexOf(query.toLowerCase()) > -1){
                             return survey;
                         }
                     }else{
                         return survey;
                     }
                 });

                 setFilteredPendingSurveys(filteredSurveys);
        }
        
        if(completed_surveys &&  completed_surveys.length > 0) {
                        
                const filteredSurveys = completed_surveys.filter((survey) => {
                     if(query !== ''){
                         if(survey.info.name.toLowerCase().indexOf(query.toLowerCase()) > -1){
                             return survey;
                         }
                     }else{
                         return survey;
                     }
                 });

             setFilteredCompletedSurveys(filteredSurveys)
        }
        
    },[query, completed_surveys, surveys]);
    const module = modules.find((module) => module.alias === 'survey');
    return (
        <>
            {
                loading ? (
                    <WebLoading />
                ):(
                    <>
                    <NextBreadcrumbs module={module} />
                    <Container pt="2" maxW="100%" w="100%">
                        <HStack display={["block","flex"]} mb="3" pt="2" w="100%" space="3" alignItems="center">
                            <Text  fontSize="2xl">{modules?.find((polls)=>(polls.alias == 'survey'))?.name ?? 'surveys'}</Text>
                            <Spacer />
                            <Input rounded="10" w={["100%","60%" ]}bg="primary.box" borderWidth={0}onChangeText={(text) => {setQuery(text)}} value={query} placeholder={event?.labels?.GENERAL_SEARCH} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
                        </HStack>
                        <HStack mb="3" space={1} justifyContent="center" w="100%">
                            <Button onPress={() => setTab('pending')} borderWidth="0px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={tab == 'pending' ? 'primary.boxbutton' : 'primary.box'} w="50%" _text={{ fontWeight: '600' }}>{survey_labels?.NATIVE_APP_SURVEY_NOT_ATTENDED}</Button>
                            <Button isDisabled={survey_settings?.user_settings == 1 ? false:true} onPress={() => setTab('completed')} borderWidth="0px" py={0} color="primary.100" borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px" bg={tab == 'completed' ? 'primary.boxbutton' : 'primary.box'} w="50%" _text={{ fontWeight: '600' }}>{survey_labels?.NATIVE_APP_SURVEY_COMPLETED}</Button>
                        </HStack>
                        {tab === 'pending' &&  (
                            <Box overflow="hidden" bg="primary.box" w="100%" rounded="lg">
                                    {surveys && surveys.length > 0 ? (filteredPendingSurveys.length > 0 ? filteredPendingSurveys.map((survey:Survey)=>(
                                        <RectangleView key={survey.id} survey={survey} completed={false} />
                                    )) : <Box padding={5}>
                                            <Text>{event?.labels?.GENERAL_NO_RECORD}</Text>
                                        </Box>
                                    ) : (
                                        <Box padding={5}>
                                            <Text>{survey_labels?.NO_SURVEY_AVAILABL}</Text>
                                        </Box>
                                    )
                                
                                }
                                 {surveys.length > 0  &&   <Divider h="20px" bg="transparent" />}
                                </Box>
                            ) }
                        {tab === 'completed' && (
                                <Box overflow="hidden" bg="primary.box" w="100%" rounded="lg">
                                    {completed_surveys && completed_surveys.length > 0 ? ( filteredCompletedSurveys.length > 0 ? filteredCompletedSurveys.map((survey:Survey)=>(
                                        <RectangleView key={survey.id} survey={survey} completed={true} />
                                    )) : <Box padding={5}>
                                            <Text>{event?.labels?.GENERAL_NO_RECORD}</Text>
                                        </Box> 
                                    ) : (
                                        <Box padding={5}>
                                            <Text>{survey_labels?.NO_SURVEY_AVAILABL}</Text>
                                        </Box>
                                    )}
                                  {completed_surveys.length > 0  &&  <Divider h="20px" bg="transparent" />}
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


