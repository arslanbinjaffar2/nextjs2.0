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

  const { event  } = UseEventService();

  const { response  } = UseAuthService();

  const { push } = useRouter()

  const { FetchMyPollResultDetail, myPollResultDetail } = UsePollService();

  const [id] = useParam('id');

  React.useEffect(() => {
    if (id) {
        FetchMyPollResultDetail({ id: Number(id) });
    }
  }, [id]);



  console.log(myPollResultDetail);


  return (
    <>
      {loading ? (
                <WebLoading />
            ) : (
            <Container mb="3" maxW="100%" w="100%">
              <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                <Text isTruncated pr="6" fontSize="2xl">{myPollResultDetail?.program?.info?.topic}</Text>
              </HStack>
              {/* {!completed && <Box w="100%" bg="primary.box" borderWidth="1" borderColor="primary.bdBox" rounded="10">
                {detail?.questions.length! > 0 &&  detail?.questions[steps] !== undefined && (
                  <>
                    {detail?.questions[steps].question_type === 'matrix' && <MatrixAnswer question={detail?.questions[steps]} key={detail?.questions[steps].id} formData={formData} updateFormData={updateFormData} error={activeQuestionError} labels={event?.labels} forceRender={forceUpdate}/>}
                    {detail?.questions[steps].question_type === 'multiple' && <MultipleAnswer question={detail?.questions[steps]} key={detail?.questions[steps].id} formData={formData} updateFormData={updateFormData} error={activeQuestionError} labels={event?.labels} forceRender={forceUpdate} />}
                    {detail?.questions[steps].question_type === 'single' && <SingleAnswer question={detail?.questions[steps]} key={detail?.questions[steps].id} formData={formData} updateFormData={updateFormData} error={activeQuestionError} labels={event?.labels} forceRender={forceUpdate} />}
                    {detail?.questions[steps].question_type === 'dropdown' && <DropdownAnswer question={detail?.questions[steps]} key={detail?.questions[steps].id} formData={formData} updateFormData={updateFormData} error={activeQuestionError}labels={event?.labels} forceRender={forceUpdate} />}
                    {detail?.questions[steps].question_type === 'open' && <OpenQuestionAnswer question={detail?.questions[steps]} key={detail?.questions[steps].id} formData={formData} updateFormData={updateFormData} error={activeQuestionError}labels={event?.labels} forceRender={forceUpdate} />}
                    {detail?.questions[steps].question_type === 'number' && <NumberAnswer question={detail?.questions[steps]} key={detail?.questions[steps].id} formData={formData} updateFormData={updateFormData} error={activeQuestionError} labels={event?.labels} forceRender={forceUpdate} />}
                    {detail?.questions[steps].question_type === 'date' && <DateAnswer question={detail?.questions[steps]} key={detail?.questions[steps].id} formData={formData} updateFormData={updateFormData} error={activeQuestionError} labels={event?.labels} forceRender={forceUpdate} />}
                    {detail?.questions[steps].question_type === 'date_time' && <DateTimeAnswer question={detail?.questions[steps]} key={detail?.questions[steps].id} formData={formData} updateFormData={updateFormData} error={activeQuestionError}labels={event?.labels} forceRender={forceUpdate} />}
                    {detail?.questions[steps].question_type === 'world_cloud' && <WordCloudAnswer question={detail?.questions[steps]} key={detail?.questions[steps].id} formData={formData} updateFormData={updateFormData} error={activeQuestionError}labels={event?.labels} forceRender={forceUpdate} />}
                  </>
                )}
                {detail?.questions.length! <= 0 &&
                  <Box padding={5}>
                      <Text>{poll_labels?.NO_POLL_AVAILABLE}</Text>
                  </Box>
                }
                <Box py="0" px="4" w="100%">
                  <Divider mb="15" opacity={0.27} bg="primary.text" />
                  <HStack mb="3" space="3" alignItems="center">
                    {steps > 0 && <Button
                      isDisabled={steps <= 0 ? true : false}
                      bg="transparent"
                      p="2"
                      textTransform={'uppercase'}
                      fontSize="lg"
                      leftIcon={<Icon size="md" as={SimpleLineIcons} name="arrow-left" color="primary.text" />}
                      colorScheme="primary"
                      onPress={() => {
                        setActiveQuestionError(null);
                        setsteps(steps - 1);
                      }}
                    >
                      previous
                    </Button>}
                    <Spacer />
                    {steps < (detail?.questions.length! -1)  && <Button
                      bg="transparent"
                      isDisabled={steps >= (detail?.questions.length! -1) ? true : false}
                      p="2"
                      textTransform={'uppercase'}
                      fontSize="lg"
                      rightIcon={<Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />}
                      colorScheme="primary"
                      onPress={() => {
                        setNextStep();
                      }}
                    >
                      next
                    </Button>}
                  </HStack>
                  {steps === (detail?.questions.length! - 1) && <Box w="100%" mb="6">
                    <Box m="auto" w="230px" bg="primary.darkbox" p="0" rounded="sm" overflow="hidden">
                      <Button
                        w="48px"
                        py="3"
                        px="1"
                        leftIcon={<IcoLongArrow />}
                        colorScheme="primary"
                        isLoading={submittingPoll}
                        onPress={() => {
                         setNextStep();
                        }}
                      />
                    </Box>
                  </Box>}
                </Box>
              </Box>} */}
              <Box w="100%" >
                {myPollResultDetail && myPollResultDetail?.question.length > 0 && myPollResultDetail.question.map((question, i) => (
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
