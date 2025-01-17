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
import MobileLoading from 'application/components/atoms/MobileLoading';
import MultipleAnswer from 'application/components/atoms/polls/questions/MultipleAnswer';
import SingleAnswer from 'application/components/atoms/polls/questions/SingleAnswer';
import DropdownAnswer from 'application/components/atoms/polls/questions/DropdownAnswer';
import WordCloudAnswer from 'application/components/atoms/polls/questions/WordCloudAnswer';
import MatrixAnswer from 'application/components/atoms/polls/questions/MatrixAnswer';
import OpenQuestionAnswer from 'application/components/atoms/polls/questions/OpenQuestionAnswer';
import NumberAnswer from 'application/components/atoms/polls/questions/NumberAnswer';
import DateAnswer from 'application/components/atoms/polls/questions/mobile/DateAnswer';
import DateTimeAnswer from 'application/components/atoms/polls/questions/mobile/DateTimeAnswer';
import UseEventService from 'application/store/services/UseEventService';
import UseEnvService from 'application/store/services/UseEnvService';
import UseAuthService from 'application/store/services/UseAuthService';
import { SubmittedQuestion } from 'application/models/poll/Poll';
import { useRouter } from 'solito/router'
import {useFocusEffect } from '@react-navigation/native'


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

  const { FetchPollDetail, detail, poll_labels, submitSuccess, SubmitPoll } = UsePollService();

  const [formData, setFormData] = useState<FormData>({});

  const [activeQuestionError, setActiveQuestionError] = useState<string | null>(null);

  const [id] = useParam('id');

    useFocusEffect(React.useCallback(() => {
      if (id) {
        FetchPollDetail({ id: Number(id) });
      }
    }, [id])
    );

  const updateFormData = (question_id:number, type:string, answer:any, index?:number) => {
    setActiveQuestionError(null);
    let newFormData = formData;
    if(newFormData[question_id] === undefined){
      newFormData[question_id] = {
        answer:null,
        comment:""
      };
    }
    if(type === 'multiple'){
          newFormData[question_id].answer = answer       
    }
    else if(type === 'single'){
      newFormData[question_id].answer = [answer]
    }
    else if(type === 'dropdown'){
      newFormData[question_id].answer = [answer]
    }
    else if(type === 'world_cloud'){
      if(newFormData[question_id].answer === null){
        newFormData[question_id].answer = {}
      }
      newFormData[question_id].answer[index!] = answer
    }
    else if(type === 'matrix'){
      if(newFormData[question_id].answer === null){
        newFormData[question_id].answer = {}
      }
      newFormData[question_id].answer[index!] = answer
    }
    else if(type === 'comment'){
      newFormData[question_id].comment = answer
    }
    else{
      newFormData[question_id].answer = answer
    }
    setFormData(newFormData);
    setForceUpdate(forceUpdate + 1);
  }

    React.useEffect(() => {
      console.log(submitSuccess, 'useEffect');
        setcompleted(submitSuccess);
    }, [submitSuccess]);

    const stepIndicatorWidth = detail !== null ? 100/(detail.questions.length) : 10;

    const setNextStep = () => {
        setActiveQuestionError(null);
        const activeQuestion = detail?.questions[steps];
        if(Number(activeQuestion?.required_question) === 1 || (formData[activeQuestion?.id!] !== undefined &&  formData[activeQuestion?.id!].answer !== null)){
          if(activeQuestion?.question_type === 'multiple'){
            if(formData[activeQuestion?.id!] === undefined || formData[activeQuestion?.id!]?.answer === null || formData[activeQuestion?.id!].answer.length <= 0){
              setActiveQuestionError(event.labels.REGISTRATION_FORM_FIELD_REQUIRED);
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
              setActiveQuestionError(event.labels.REGISTRATION_FORM_FIELD_REQUIRED);
              return;
            }
          }
          else if(activeQuestion?.question_type === 'dropdown') {
            if(formData[activeQuestion?.id!] === undefined || formData[activeQuestion?.id!]?.answer === null || formData[activeQuestion?.id!].answer.length <= 0){
              setActiveQuestionError(event.labels.REGISTRATION_FORM_FIELD_REQUIRED);
              return;
            } 
          }
          else if(activeQuestion?.question_type === 'world_cloud') {
            if(formData[activeQuestion?.id!] === undefined || formData[activeQuestion?.id!]?.answer === null || Object.keys(formData[activeQuestion?.id!].answer).length < activeQuestion.entries_per_participant){
              setActiveQuestionError(event.labels.REGISTRATION_FORM_FIELD_REQUIRED);
              return;
            } 
          }
          else if(activeQuestion?.question_type === 'matrix') {
            if(formData[activeQuestion?.id!] === undefined || formData[activeQuestion?.id!]?.answer === null || Object.keys(formData[activeQuestion?.id!].answer).length < activeQuestion.answer.length){
              setActiveQuestionError(event.labels.REGISTRATION_FORM_FIELD_REQUIRED);
              return;
            } 
          }
          else{
            if(formData[activeQuestion?.id!] === undefined || formData[activeQuestion?.id!]?.answer === null || formData[activeQuestion?.id!].answer === ''){
              setActiveQuestionError(event.labels.REGISTRATION_FORM_FIELD_REQUIRED);
              return;
            }
          }
          
        }
        if(steps === (detail?.questions.length! - 1)){
          onSubmit()
        }else{
          setsteps(steps + 1);
        }
        
    }

    const onSubmit = ( ) => {
      setSubmittingPoll(true)
        const submitedData:SubmittedQuestion[] | undefined = detail?.questions.map((q)=>{
            let answeredQuestion:any = {
              id:q.id,
              type:q.question_type,
              required:q.required_question,
              is_anonymous:q.is_anonymous,
              comment:formData[q.id] !== undefined ? formData[q.id]?.comment : '',
            }
            if(q.question_type === 'single' || q.question_type === 'multiple' || q.question_type === 'dropdown' || q.question_type === 'matrix'){
              answeredQuestion['original_answers']= q.answer.map((answer)=>({id:answer.id, correct:answer.correct}));
              if(q.question_type === 'single'){
                answeredQuestion['answers'] = formData[q.id] !== undefined && formData[q.id].answer.length > 0 ? [{id: formData[q.id].answer[0]}] : [];
              }
              else if(q.question_type === 'dropdown'){
                answeredQuestion['answers'] = formData[q.id] !== undefined && formData[q.id].answer.length > 0 ? [{id: formData[q.id].answer[0]}] : [];
              }
              else if(q.question_type === 'multiple'){
                answeredQuestion['answers'] = (formData[q.id] !== undefined && formData[q.id].answer.length > 0) ? formData[q.id].answer.map((i:number)=>({id:i})) : [];
              }
              else if(q.question_type === 'matrix'){
                answeredQuestion['answers'] = (formData[q.id] !== undefined && Object.keys(formData[q.id].answer).length > 0) ? Object.keys(formData[q.id].answer).reduce((ack:any, i)=>([...ack, {id: `${i}_${formData[q.id].answer[i]}`}]), []) : [];
              }
            }
            else{
              if(q.question_type === 'world_cloud'){
                answeredQuestion['answers'] = (formData[q.id] !== undefined && Object.keys(formData[q.id].answer).length > 0) ? Object.keys(formData[q.id].answer).reduce((ack:any, i)=>([...ack, {value: formData[q.id].answer[i]}]), []) : [];
              }
              else{
                answeredQuestion['answers'] = (formData[q.id] !== undefined && formData[q.id].answer !== null) ? [{value: formData[q.id].answer }] : [];
              }
            }
            return answeredQuestion;

        });

        console.log();

        const postData = {
          poll_id: detail?.questions[0]?.poll_id,
          agenda_id: parseInt(id!),
          event_id: event.id!,
          attendee_id: response.data.user.id,
          base_url: _env.eventcenter_base_url,
          organizer_id: event.organizer_id!,
          create_date: new Date().toLocaleDateString(),
          env: _env.app_server_enviornment,
          submitted_questions:submitedData!
        };
        
        SubmitPoll(postData);

    }

  return (
    <Container maxW="100%" h={'100%'} w="100%">
      {loading ? (
                <MobileLoading />
            ) : (
            <Container mb="3" maxW="100%" w="100%">
              <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                <Pressable onPress={()=> push(`/${event.url}/polls`)}>
                  <HStack space="3" alignItems="center">
                        <Icon as={AntDesign} name="arrowleft" size="xl" color="primary.text" />
                        <Text fontSize="2xl">BACK</Text>
                  </HStack>
                </Pressable>
                <Spacer />
                <Text isTruncated pr="6" fontSize="lg">{detail?.topic}</Text>
              </HStack>
              <HStack bg="primary.box" overflow="hidden" borderWidth="1" borderColor="primary.bdBox" mb="4" space="0" w="100%" rounded="2xl">
                {detail?.questions.length! > 0 && detail?.questions.map((item, key)=>(
                    <Box key={key} bg={steps >= key ? 'secondary.500' : 'transparent'} h="22px" w={`${stepIndicatorWidth}%`} />
                ))}
              </HStack>
              {!completed && <Box w="100%" bg="primary.box" borderWidth="1" borderColor="primary.bdBox" rounded="10">
                {detail?.questions.length! > 0 &&  detail?.questions[steps] !== undefined && (
                  <>
                    {detail?.questions[steps].question_type === 'matrix' && <MatrixAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} error={activeQuestionError} labels={event?.labels} forceRender={forceUpdate} />}
                    {detail?.questions[steps].question_type === 'multiple' && <MultipleAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} error={activeQuestionError} labels={event?.labels}  forceRender={forceUpdate}/>}
                    {detail?.questions[steps].question_type === 'single' && <SingleAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} error={activeQuestionError} labels={event?.labels} forceRender={forceUpdate} />}
                    {detail?.questions[steps].question_type === 'dropdown' && <DropdownAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} error={activeQuestionError}labels={event?.labels} forceRender={forceUpdate} />}
                    {detail?.questions[steps].question_type === 'open' && <OpenQuestionAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} error={activeQuestionError}labels={event?.labels}  forceRender={forceUpdate} />}
                    {detail?.questions[steps].question_type === 'number' && <NumberAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} error={activeQuestionError}labels={event?.labels} forceRender={forceUpdate} />}
                    {detail?.questions[steps].question_type === 'date' && <DateAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} error={activeQuestionError}labels={event?.labels} forceRender={forceUpdate} />}
                    {detail?.questions[steps].question_type === 'date_time' && <DateTimeAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} error={activeQuestionError} labels={event?.labels} forceRender={forceUpdate} />}
                    {detail?.questions[steps].question_type === 'world_cloud' && <WordCloudAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} error={activeQuestionError}labels={event?.labels} forceRender={forceUpdate} />}
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
                        setActiveQuestionError(null)
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
              </Box>}
              {completed === true && <Box borderWidth="1" borderColor="primary.bdBox" w="100%" bg="primary.box" p="5" py="8" rounded="10px">
                <VStack alignItems="center" space="5">
                  <Box bg="primary.500" w="67px" h="67px" borderWidth="1" borderColor="primary.bordercolor" rounded="full" alignItems="center" justifyContent="center">
                    <Icon size="4xl" color="primary.text" as={Ionicons} name="checkmark" />
                  </Box>
                  <Text fontSize="lg">{poll_labels?.POLL_ANSWER_SUBMITTED_SUCCESFULLY}</Text>
                </VStack>
              </Box>}
            </Container>
      )}
    </Container>
  );
};

export default Detail;
