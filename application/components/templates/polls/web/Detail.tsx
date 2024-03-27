import * as React from 'react';
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Divider, Button, Pressable, Image } from 'native-base'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import { useEffect, useState } from 'react'
import IcoLongArrow from 'application/assets/icons/IcoLongArrow';
import { createParam } from 'solito';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UsePollService from 'application/store/services/UsePollService';
import { FormData, Question } from 'application/models/poll/Detail';
import WebLoading from 'application/components/atoms/WebLoading';
import MultipleAnswer from 'application/components/atoms/polls/questions/MultipleAnswer';
import SingleAnswer from 'application/components/atoms/polls/questions/SingleAnswer';
import DropdownAnswer from 'application/components/atoms/polls/questions/DropdownAnswer';
import WordCloudAnswer from 'application/components/atoms/polls/questions/WordCloudAnswer';
import MatrixAnswer from 'application/components/atoms/polls/questions/MatrixAnswer';
import OpenQuestionAnswer from 'application/components/atoms/polls/questions/OpenQuestionAnswer';
import NumberAnswer from 'application/components/atoms/polls/questions/NumberAnswer';
import DateAnswer from 'application/components/atoms/polls/questions/web/DateAnswer';
import DateTimeAnswer from 'application/components/atoms/polls/questions/web/DateTimeAnswer';
import UseEventService from 'application/store/services/UseEventService';
import UseEnvService from 'application/store/services/UseEnvService';
import UseAuthService from 'application/store/services/UseAuthService';
import { SubmittedQuestion } from 'application/models/poll/Poll';
import { useRouter } from 'solito/router'
import BannerAds from 'application/components/atoms/banners/BannerAds'
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import IcoTick from 'application/assets/icons/small/IcoTick';

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

  const { push, back } = useRouter()

  const { FetchPollDetail, detail, poll_labels, submitSuccess, SubmitPoll } = UsePollService();

  const [formData, setFormData] = useState<FormData>({});

  const [activeQuestionError, setActiveQuestionError] = useState<string | null>(null);

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

    const [id] = useParam('id');

    React.useEffect(() => {
        if (id) {
          FetchPollDetail({ id: Number(id) });
        }
    }, [id]);
    React.useEffect(() => {
      console.log(submitSuccess, 'useEffect');
        setcompleted(submitSuccess);
    }, [submitSuccess]);
    
    React.useEffect(() => {
      setForceUpdate(forceUpdate + 1);
    }, [steps]);

    const stepIndicatorWidth = detail !== null ? 100/(detail.questions.length) : 10;

    const setNextStep = () => {
        setActiveQuestionError(null);
        const activeQuestion = detail?.questions[steps];
        if(Number(activeQuestion?.required_question) === 1 || (formData[activeQuestion?.id!] !== undefined &&  formData[activeQuestion?.id!].answer !== null)){
          if(activeQuestion?.question_type === 'multiple'){
            if(formData[activeQuestion?.id!] === undefined || formData[activeQuestion?.id!]?.answer === null || (Number(activeQuestion?.required_question) === 1 && formData[activeQuestion?.id!].answer.length <= 0)){
              setActiveQuestionError(event.labels.REGISTRATION_FORM_FIELD_REQUIRED);
              return;
            }
            else if(activeQuestion.min_options > 0 && ((formData[activeQuestion?.id!].answer.length < activeQuestion.min_options) && formData[activeQuestion?.id!].answer.length != 0)){
              setActiveQuestionError(poll_labels.POLL_SURVEY_MIN_SELECTION_ERROR
                .replace(/%q/g, activeQuestion.info.question)
                .replace(/%s/g, activeQuestion.min_options.toString())
              );
              return;
            }
            else if(activeQuestion.max_options > 0 && ((formData[activeQuestion?.id!].answer.length > activeQuestion.max_options) && formData[activeQuestion?.id!].answer.length != 0)){
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
            if(Number(activeQuestion?.required_question) === 1 && (formData[activeQuestion?.id!] === undefined || formData[activeQuestion?.id!]?.answer === null || formData[activeQuestion?.id!].answer === '')){
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
                answeredQuestion['answers'] = (formData[q.id] !== undefined && Object.keys(formData[q.id].answer).length > 0) ? Object.keys(formData[q.id].answer).reduce((ack:any, v, i)=>([...ack, {value: formData[q.id].answer[Object.keys(formData[q.id].answer).length - (i + 1)]}]), []) : [];
              }
              else{
                answeredQuestion['answers'] = (formData[q.id] !== undefined && formData[q.id].answer !== null) ? [{value: formData[q.id].answer }] : [];
              }
            }
            return answeredQuestion;

        });

       

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
  const module = modules.find((module) => module.alias === 'polls');

  const filterQuestion: Question = detail?.questions.find((question) => question.question_type === 'world_cloud') ?? {} as Question;
  
  const [showCloudQuestion,setShowCloudQuestion]=React.useState(false)

  return (
    <>
      {loading ? (
                <WebLoading />
            ) : (

              <>
             <NextBreadcrumbs module={module} title={detail?.topic}/>
            <Container mb="3" maxW="100%" w="100%">
              <Text mb={1} textBreakStrategy='simple' w={'100%'} textAlign={'center'} fontSize="2xl">{detail?.topic}</Text>
              {detail?.questions.length! > 0 && <HStack bg="primary.box" overflow="hidden" borderWidth="1" borderColor="primary.bdBox" mb="4" space="0" w="100%" rounded="2xl">
                { detail?.questions.map((item, key)=>(
                    <Box key={key} bg={steps >= key ? 'secondary.500' : 'transparent'} h="22px" w={`${stepIndicatorWidth}%`} />
                ))}
              </HStack>}
              {!completed && <Box w="100%" bg="primary.box" borderWidth="1" borderColor="primary.bdBox" rounded="10">
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
                    {steps < (detail?.questions.length! -1)  && 
                    <Button
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
                      id='test'
                        w="100%"
                        py="3"
                        px="1"
                        leftIcon={<IcoLongArrow />}
                        colorScheme="primary"
                        isLoading={submittingPoll}
                        onPress={() => {
                         setNextStep();
                        }}
                      >
                      {poll_labels?.POLL_SURVEY_AUTHORITY_SUBMIT}
                      </Button>
                    </Box>
                  </Box>}
                </Box>
              </Box>}
            {(completed === true  && showCloudQuestion==true)&&
                <>
              {Object.keys(filterQuestion).length>0 && 
               <WordCloudAnswer question={filterQuestion} key={filterQuestion?.id} formData={formData} updateFormData={updateFormData} error={activeQuestionError} labels={event?.labels}  />
              }
              </>
            }
              {completed === true &&
              (
                 <>
                <Box borderWidth="1" borderColor="primary.bdBox" w="100%" bg="primary.box" p="5" py="8" rounded="10px">
                <VStack alignItems="center" space="5">
                  <Box nativeID='bg-circle-animation' bg="primary.500" w="67px" h="67px" borderWidth="1" borderColor="primary.bordercolor" rounded="100%" alignItems="center" justifyContent="center">
                   <IcoTick />
                  </Box>
                  <Text fontSize="lg">{poll_labels?.POLL_ANSWER_SUBMITTED_SUCCESFULLY}</Text>
                  <Button
                      id='test'
                      w="100px"
                      py="3"
                      px="1"
                      isLoading={submittingPoll}
                      colorScheme="primary"
                      onPress={()=>{
                        onSubmit()
                        setShowCloudQuestion(true)
                      }}
                      
                    >
                      {poll_labels?.WORD_CLOUD_SUBMIT_AGAIN}
                    </Button>
                </VStack>
              </Box>
              </>

              )
              }

            </Container>

            </>
      )}
      <Box width={"100%"} height={"5%"}>
        <BannerAds module_name={'polls'} module_type={'detail'}/>
      </Box>
    </>
  );
};

export default Detail;
