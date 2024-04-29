import * as React from 'react';
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Divider, Button, Pressable } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import { useState } from 'react';
import IcoLongArrow from 'application/assets/icons/IcoLongArrow';
import { createParam } from 'solito';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseSurveyService from 'application/store/services/UseSurveyService';
import { FormData } from 'application/models/survey/Detail';
import WebLoading from 'application/components/atoms/WebLoading';
import InputTypeResult from 'application/components/atoms/surveys/resultBlocks/InputTypeResult';
import SingleOptionTypeResult from 'application/components/atoms/surveys/resultBlocks/SingleOptionTypeResult';
import MultiOptionTypeResult from 'application/components/atoms/surveys/resultBlocks/MultipleOptionTypeResult';
import WordCloudOptionTypeResult from 'application/components/atoms/surveys/resultBlocks/WordCloudOptionTypeResult';
import MatrixTypeResult from 'application/components/atoms/surveys/resultBlocks/MatrixTypeResult';
import UseEventService from 'application/store/services/UseEventService';
import UseEnvService from 'application/store/services/UseEnvService';
import UseAuthService from 'application/store/services/UseAuthService';
import { SubmittedQuestion } from 'application/models/survey/Survey';
import { useRouter } from 'solito/router'


type ScreenParams = { id: string }

const { useParam } = createParam<ScreenParams>()

const Detail = () => {

  const [tabs, settabs] = useState<string | null>('ABOUT');

  const [forceUpdate, setForceUpdate] = useState<number>(0);

  const [steps, setsteps] = useState<number>(0);

  const [completed, setcompleted] = useState<boolean>(false);

  const [submittingSurvey, setSubmittingSurvey] = useState(false);

  const { loading, scroll } = UseLoadingService();

  const { _env } = UseEnvService();

  const { event  } = UseEventService();

  const { response  } = UseAuthService();

  const { push, back } = useRouter()

  const { FetchMySurveyResultDetail, mySurveyResultDetail, mySurveyResultScore,mySurveyTotalScore } = UseSurveyService();

  const [id] = useParam('id');

  React.useEffect(() => {
    if (id) {
        FetchMySurveyResultDetail({ id: Number(id) });
    }
  }, [id]);

  return (
    <>
      {loading ? (
                <WebLoading />
            ) : (
            <Container mb="3" maxW="100%" w="100%">
              <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                <Pressable onPress={()=> back()}>
                  <HStack space="3" alignItems="center">
                        <Icon as={AntDesign} name="arrowleft" size="xl" color="primary.text" />
                        <Text fontSize="2xl">{event?.labels?.GENERAL_BACK}</Text>
                  </HStack>
                </Pressable>
                <Spacer />
                <Text isTruncated  fontSize="xl">{`${mySurveyResultScore}/${mySurveyTotalScore} Points(s)`}</Text>
              </HStack>
              <HStack mb="3" pt="2" w="100%" space="3" alignItems="center" justifyContent={'space-between'}>
                <Text textAlign={'center'} w={'100%'} fontSize="2xl">{mySurveyResultDetail?.info?.name}</Text>
              </HStack>
              <Box w="100%" >
                {mySurveyResultDetail && mySurveyResultDetail?.question.length > 0 && mySurveyResultDetail.question.filter((question) => question.is_anonymous === 0
                  && question.results && question.results.length > 0).map((question, i) => (
                        <>
                        {(question.question_type == 'open' 
                        || question.question_type == 'number'
                        || question.question_type == 'date'
                        || question.question_type == 'date_time') &&
                            <InputTypeResult question={question} key={i} questionNumber={i} />
                        }
                        {(question.question_type == 'single' 
                        || question.question_type == 'dropdown') &&
                            <SingleOptionTypeResult question={question} key={i} questionNumber={i} />
                        }
                        {(question.question_type == 'multiple') &&
                            <MultiOptionTypeResult question={question} key={i} questionNumber={i} />
                        }
                        {(question.question_type == 'world_cloud') &&
                            <WordCloudOptionTypeResult question={question} key={i} questionNumber={i} />
                        }
                        {(question.question_type == 'matrix') &&
                            <MatrixTypeResult question={question} key={i} questionNumber={i} />
                        }
                        </>
                ))}
              </Box>
              
            </Container>
      )}
    </>
  );
};

export default Detail;
