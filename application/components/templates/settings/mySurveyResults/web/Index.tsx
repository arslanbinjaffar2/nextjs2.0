import React, { useEffect } from 'react';
import { Box, Divider } from 'native-base'
import RectangleView from 'application/components/atoms/surveys/RectangleView';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Button, Container, HStack, Icon, Input, Spacer, Text } from 'native-base';
import UseAuthService from 'application/store/services/UseAuthService';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseSurveyService from 'application/store/services/UseSurveyService';
import WebLoading from 'application/components/atoms/WebLoading';
import { Survey, Surveys } from 'application/models/survey/Survey';
import in_array from "in_array";
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'solito/router';
import SectionLoading from 'application/components/atoms/SectionLoading';

const Index = () => {

    const mounted = React.useRef(false);

    const { loading } = UseLoadingService();

    const [tab, setTab] = React.useState<'pending'| 'completed'>('pending')

    const [query, setQuery] = React.useState('');

    const { event, modules, setting_modules  } = UseEventService();

    const { push } = useRouter()
    
    const { FetchMySurveyResults, mySurveyResult, survey_labels } = UseSurveyService();

    const [surveys, setSurveys] = React.useState<string[]>([]);

    useEffect(() => {
            FetchMySurveyResults();
    }, []);

    useEffect(() => {
        if(mySurveyResult && typeof mySurveyResult === 'object' && Object.keys(mySurveyResult).length > 0) {
            const filteredCompletedSurveysKeys =  Object.keys(mySurveyResult).filter((key)=>{
                     return key;
             });
             setSurveys(filteredCompletedSurveysKeys)
        }
    },[mySurveyResult]);

    return (
        <>
            {
                loading ? (
                    <SectionLoading />
                ):(
                    <Container pt="2" maxW="100%" w="100%">
                        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                            <Text  fontSize="2xl">{setting_modules?.find((surveys)=>(surveys.alias == 'mySurveyResults'))?.name ?? 'My surveys results'}</Text>
                        </HStack>
                        
                            <Box overflow="hidden" bg="primary.box" w="100%" rounded="lg">
                                    {mySurveyResult.length > 0 ? mySurveyResult?.map((survey,k)=>(
                                                <RectangleView index={k}  key={survey.id} survey={survey} completed={true} settings={true} />
                                            )) : (
                                        <Box padding={3}>
                                            <Text>{survey_labels?.NO_SURVEY_AVAILABL}</Text>
                                        </Box>
                                    )}
                                </Box>
                            
                       
                    </Container>
                )
            }
        </>
        
    )

}

export default Index


