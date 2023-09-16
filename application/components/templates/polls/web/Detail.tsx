import * as React from 'react';
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Divider, Button } from 'native-base';
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
import MultipleAnswer from 'application/components/atoms/polls/questions/MultipleAnswer';
import SingleAnswer from 'application/components/atoms/polls/questions/SingleAnswer';
import DropdownAnswer from 'application/components/atoms/polls/questions/DropdownAnswer';
import UseEventService from 'application/store/services/UseEventService';


type ScreenParams = { id: string }

const { useParam } = createParam<ScreenParams>()

const Detail = () => {

  const [tabs, settabs] = useState<string | null>('ABOUT');

  const [steps, setsteps] = useState<number>(0);

  const [completed, setcompleted] = useState<boolean>(false);

  const { loading, scroll } = UseLoadingService();

  const { event :{ labels} } = UseEventService();

  const { FetchPollDetail, detail, poll_labels } = UsePollService();

  const [formData, setFormData] = useState<FormData>({});

  const [activeQuestionError, setActiveQuestionError] = useState<string | null>(null);

  const updateFormData = (question_id:number, type:string, answer:any) => {
    setActiveQuestionError(null);
    let newFormData = formData;
    if(newFormData[question_id] === undefined){
      newFormData[question_id] = {
        answer:null,
        comment:null
      };
    }
    if(type === 'multiple'){
       if(newFormData[question_id].answer !== null && newFormData[question_id].answer.length > 0){
        newFormData[question_id].answer = !newFormData[question_id].answer.includes(answer) ?
         [...newFormData[question_id].answer, answer] : 
         newFormData[question_id].answer.filter((id:number)=> ( id !== answer ))
       } else{
          newFormData[question_id].answer = [answer]
       }        
    }
    else if(type === 'single'){
      newFormData[question_id].answer = [answer]
    }
    else if(type === 'dropdown'){
      newFormData[question_id].answer = [answer]
    }
    else if(type === 'comment'){
      newFormData[question_id].comment = answer
    }
    setFormData(newFormData);
    console.log(newFormData);
  }


    const [id] = useParam('id');

    React.useEffect(() => {
        if (id) {
          FetchPollDetail({ id: Number(id) });
        }
    }, [id]);

    const stepIndicatorWidth = detail !== null ? 100/(detail.questions.length) : 10;

    const setNextStep = () => {
        setActiveQuestionError(null);
        const activeQuestion = detail?.questions[steps];
        if(Number(activeQuestion?.required_question) === 1 || (formData[activeQuestion?.id!] !== undefined &&  formData[activeQuestion?.id!].answer !== null)){
          if(activeQuestion?.question_type === 'multiple'){
              if(formData[activeQuestion?.id!] === undefined || formData[activeQuestion?.id!]?.answer === null || formData[activeQuestion?.id!].answer.length <= 0){
                setActiveQuestionError(labels.REGISTRATION_FORM_FIELD_REQUIRED);
                return;
              }
              else if(activeQuestion.min_options > 0 && formData[activeQuestion?.id!].answer.length < activeQuestion.min_options){
                setActiveQuestionError(poll_labels.POLL_SURVEY_MIN_SELECTION_ERROR
                  .replace(/%q/g, activeQuestion.info.question)
                  .replace(/%s/g, activeQuestion.min_options.toString())
                );
                return;
              }
              else if(activeQuestion.max_options > 0 && formData[activeQuestion?.id!].answer.length > activeQuestion.max_options){
                setActiveQuestionError(poll_labels.POLL_SURVEY_MAX_SELECTION_ERROR.replace(/%s/g, activeQuestion.max_options.toString()));
                return;
              }
            }
            else if(activeQuestion?.question_type === 'single') {
              if(formData[activeQuestion?.id!] === undefined || formData[activeQuestion?.id!]?.answer === null || formData[activeQuestion?.id!].answer.length <= 0){
                setActiveQuestionError(labels.REGISTRATION_FORM_FIELD_REQUIRED);
                return;
              }
            }
            else if(activeQuestion?.question_type === 'dropdown') {
              if(formData[activeQuestion?.id!] === undefined || formData[activeQuestion?.id!]?.answer === null || formData[activeQuestion?.id!].answer.length <= 0){
                setActiveQuestionError(labels.REGISTRATION_FORM_FIELD_REQUIRED);
                return;
            }
          }
          
        }
        setsteps(steps + 1);
        
    }

  return (
    <>
      {loading && detail === null ? (
                <WebLoading />
            ) : (
            <Container mb="3" maxW="100%" w="100%">
              <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                <HStack space="3" alignItems="center">
                  <Icon as={AntDesign} name="arrowleft" size="xl" color="primary.text" />
                  <Text fontSize="2xl">BACK</Text>
                </HStack>
                <Spacer />
                <Text isTruncated pr="6" fontSize="lg">{detail?.topic}</Text>
              </HStack>
              <HStack bg="primary.box" overflow="hidden" borderWidth="1" borderColor="primary.bdBox" mb="4" space="0" w="100%" rounded="2xl">
                {detail?.questions.length! > 0 && detail?.questions.map((item, key)=>(
                    <Box key={key} bg={steps >= key ? 'primary.500' : 'transparent'} h="22px" w={`${stepIndicatorWidth}%`} />
                ))}
              </HStack>
              {!completed && <Box w="100%" bg="primary.box" borderWidth="1" borderColor="primary.bdBox" rounded="10">
                {detail?.questions.length! > 0 &&  detail?.questions[steps] !== undefined && (
                  <>
                    {detail?.questions[steps].question_type === 'multiple' && <MultipleAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} error={activeQuestionError} />}
                    {detail?.questions[steps].question_type === 'single' && <SingleAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} error={activeQuestionError} />}
                    {detail?.questions[steps].question_type === 'dropdown' && <DropdownAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} error={activeQuestionError} />}
                    {detail?.questions[steps].question_type === 'open' && "open question"}
                    {detail?.questions[steps].question_type === 'number' && 'number'}
                    {detail?.questions[steps].question_type === 'date' && 'date'}
                    {detail?.questions[steps].question_type === 'date_time' && 'datetime'}
                    {detail?.questions[steps].question_type === 'matrix' && 'matrix'}
                    {detail?.questions[steps].question_type === 'world_cloud' && 'world_cloud'}
                  </>
                )}
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
                        onPress={() => {
                          setcompleted(true)
                        }}
                      />
                    </Box>
                  </Box>}
                </Box>
              </Box>}
              {completed && <Box borderWidth="1" borderColor="primary.bdBox" w="100%" bg="primary.box" p="5" py="8" rounded="10px">
                <VStack alignItems="center" space="5">
                  <Box bg="primary.500" w="67px" h="67px" borderWidth="1" borderColor="primary.text" rounded="100%" alignItems="center" justifyContent="center">
                    <Icon size="4xl" color="primary.text" as={Ionicons} name="checkmark" />
                  </Box>
                  <Text fontSize="lg">Thanks for submitting.</Text>
                </VStack>
              </Box>}
            </Container>
      )}
    </>
  );
};

export default Detail;
