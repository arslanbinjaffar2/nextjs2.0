import * as React from 'react';
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Divider, Button, Pressable } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import { useState } from 'react';
import IcoLongArrow from 'application/assets/icons/IcoLongArrow';
import { createParam } from 'solito';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UsePollService from 'application/store/services/UsePollService';
import { FormData } from 'application/models/poll/Detail';
import WebLoading from 'application/components/atoms/WebLoading';
import InputTypeResult from 'application/components/atoms/polls/resultBlocks/InputTypeResult';
import SingleOptionTypeResult from 'application/components/atoms/polls/resultBlocks/SingleOptionTypeResult';
import MultiOptionTypeResult from 'application/components/atoms/polls/resultBlocks/MultipleOptionTypeResult';
import WordCloudOptionTypeResult from 'application/components/atoms/polls/resultBlocks/WordCloudOptionTypeResult';
import MatrixTypeResult from 'application/components/atoms/polls/resultBlocks/MatrixTypeResult';
import UseEventService from 'application/store/services/UseEventService';
import UseEnvService from 'application/store/services/UseEnvService';
import UseAuthService from 'application/store/services/UseAuthService';
import { SubmittedQuestion } from 'application/models/poll/Poll';
import { useRouter } from 'solito/router'
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';


type ScreenParams = { id: string }

const { useParam } = createParam<ScreenParams>()

const Detail = () => {

  const [tabs, settabs] = useState<string | null>('ABOUT');

  const [forceUpdate, setForceUpdate] = useState<number>(0);

  const [steps, setsteps] = useState<number>(0);

  const [completed, setcompleted] = useState<boolean>(false);

  const [submittingPoll, setSubmittingPoll] = useState(false);

  const { loading, scroll } = UseLoadingService();

  const { _env } = UseEnvService();

  const { event, modules  } = UseEventService();

  const { response  } = UseAuthService();

  const { back } = useRouter()

  const { FetchMyPollResultDetail, myPollResultDetail, myPollResultScore, poll_labels } = UsePollService();

  const [id] = useParam('id');
  const [totalPoints,setTotalPoints] = useState<number>(0);   

  React.useEffect(() => {
    if (id) {
        FetchMyPollResultDetail({ id: Number(id) });
    }
  }, [id]);

  React.useEffect(() => {
    let totalPoints = 0;
    if(myPollResultDetail && myPollResultDetail?.question.length > 0){
      totalPoints = myPollResultDetail.question.filter(question => question.is_anonymous === 0).length;
    }
    setTotalPoints(totalPoints);
  }
  , [myPollResultDetail]);



  console.log(myPollResultDetail);

  const module = modules.find((module) => module.alias === "polls");
  return (
    <>
      {loading ? (
                <WebLoading />
            ) : (
            <Container mb="3" maxW="100%" w="100%">
              <NextBreadcrumbs module={module} title={myPollResultDetail?.program?.info?.topic}/>
              <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                {/* <Pressable onPress={()=> back()}>
                  <HStack space="3" alignItems="center">
                        <Icon as={AntDesign} name="arrowleft" size="xl" color="primary.text" />
                        <Text fontSize="2xl">BACK</Text>
                  </HStack>
                </Pressable> */}
                <Spacer />
                <Text isTruncated  fontSize="xl">{`${myPollResultScore}/${totalPoints} Points(s)`}</Text>
              </HStack>
              <HStack mb="3" pt="2" w="100%" space="3" alignItems="center" justifyContent={'space-between'}>
                <Text textAlign={'center'} fontSize="2xl">{myPollResultDetail?.program?.info?.topic}</Text>
              </HStack>
              <Box w="100%" >
                {myPollResultDetail && myPollResultDetail?.question.length > 0 && myPollResultDetail.question.filter((question) => question.is_anonymous === 0 && question.results && question.results.length > 0).map((question, i) => (
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

                {myPollResultDetail &&( myPollResultDetail?.question.length <= 0 || myPollResultDetail?.question.filter((q)=>( q?.results && q?.results?.length > 0)).length <= 0) && <Box overflow="hidden" bg="primary.box" w="100%" rounded="lg" p={5}>
                    <Text>{poll_labels?.NO_POLL_AVAILABLE}</Text>
                </Box>}
              </Box>
              
            </Container>
      )}
    </>
  );
};

export default Detail;
