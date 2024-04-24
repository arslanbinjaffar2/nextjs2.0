import * as React from 'react';
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Divider, Button, Pressable, Image, Spinner } from 'native-base'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import { useEffect, useState } from 'react'
import IcoLongArrow from 'application/assets/icons/IcoLongArrow';
import { createParam } from 'solito';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseSurveyService from 'application/store/services/UseSurveyService';
import { FormData } from 'application/models/survey/Detail';
import WebLoading from 'application/components/atoms/WebLoading';
import MultipleAnswer from 'application/components/atoms/surveys/questions/MultipleAnswer';
import SingleAnswer from 'application/components/atoms/surveys/questions/SingleAnswer';
import DropdownAnswer from 'application/components/atoms/surveys/questions/DropdownAnswer';
import WordCloudAnswer from 'application/components/atoms/surveys/questions/WordCloudAnswer';
import MatrixAnswer from 'application/components/atoms/surveys/questions/MatrixAnswer';
import OpenQuestionAnswer from 'application/components/atoms/surveys/questions/OpenQuestionAnswer';
import NumberAnswer from 'application/components/atoms/surveys/questions/NumberAnswer';
import DateAnswer from 'application/components/atoms/surveys/questions/web/DateAnswer';
import DateTimeAnswer from 'application/components/atoms/surveys/questions/web/DateTimeAnswer';
import UseEventService from 'application/store/services/UseEventService';
import UseEnvService from 'application/store/services/UseEnvService';
import UseAuthService from 'application/store/services/UseAuthService';
import { SubmittedQuestion } from 'application/models/survey/Survey';
import { useRouter } from 'solito/router'
import { Banner } from 'application/models/Banner'
import BannerAds from 'application/components/atoms/banners/BannerAds'
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import IcoTick from 'application/assets/icons/small/IcoTick';
import { SwipeButton } from 'react-native-expo-swipe-button';
import { getColorScheme } from 'application/styles/colors';
import SwipeBtn from 'application/components/atoms/swipeBtn';


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

  const { event, modules  } = UseEventService();

  const { response  } = UseAuthService();

  const { push, back } = useRouter()

  const { FetchSurveyDetail, detail, survey_labels, submitSuccess, SubmitSurvey } = UseSurveyService();

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
    console.log(newFormData)
    setFormData(newFormData);
    setForceUpdate(forceUpdate + 1);
  }


    const [id] = useParam('id');
    const [filteredBanners, setFilteredBanners] = React.useState<Banner[]>([]);
    React.useEffect(() => {
        if (id) {
          FetchSurveyDetail({ id: Number(id) });
        }
    }, [id]);

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
              if(formData[activeQuestion?.id!] === undefined || formData[activeQuestion?.id!]?.answer === null || (Number(activeQuestion?.required_question) === 1 && formData[activeQuestion?.id!].answer.length <= 0)){
                setActiveQuestionError(event.labels.REGISTRATION_FORM_FIELD_REQUIRED);
                return;
              }
              else if(activeQuestion.min_options > 0 && (formData[activeQuestion?.id!].answer.length < activeQuestion.min_options) && formData[activeQuestion?.id!].answer.length != 0){
                setActiveQuestionError(survey_labels.POLL_SURVEY_MIN_SELECTION_ERROR
                  .replace(/%q/g, activeQuestion.value)
                  .replace(/%s/g, activeQuestion.min_options.toString())
                );
                return;
              }
              else if(activeQuestion.max_options > 0 && (formData[activeQuestion?.id!].answer.length > activeQuestion.max_options) && formData[activeQuestion?.id!].answer.length != 0){
                setActiveQuestionError(survey_labels.POLL_SURVEY_MAX_SELECTION_ERROR.replace(/%s/g, activeQuestion.max_options.toString()));
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
      setSubmittingSurvey(true)
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
                answeredQuestion['answers'] = (formData[q.id] !== undefined && formData[q.id].answer.length > 0) ? [{id: formData[q.id].answer[0]}] : []
              }
              else if(q.question_type === 'dropdown'){
                answeredQuestion['answers'] = (formData[q.id] !== undefined && formData[q.id].answer.length > 0) ? [{id: formData[q.id].answer[0]}] : []
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
                answeredQuestion['answers'] = [{value:(formData[q.id] !== undefined && formData[q.id].answer !== null) ? formData[q.id].answer : ''}]
              }
            }
            return answeredQuestion;

        });

        const postData = {
          survey_id: parseInt(id!),
          event_id: event.id!,
          attendee_id: response.data.user.id,
          base_url: _env.eventcenter_base_url,
          organizer_id: event.organizer_id!,
          create_date: new Date().toLocaleDateString(),
          env: _env.app_server_enviornment,
          submitted_questions:submitedData!
        };
        
        SubmitSurvey(postData);

    }

    const module = modules.find((module) => module.alias === 'survey');
    const [canSubmitMultipleTimes,setCanSubmitMultipleTimes]=useState<boolean>(false);
    useEffect(()=>{
      if(detail?.questions.length! > 0){
        const mutipleCloudQuestions = detail?.questions.filter((question) => question.question_type === 'world_cloud' && question.is_participants_multiple_times === 1);
        setCanSubmitMultipleTimes(mutipleCloudQuestions && mutipleCloudQuestions?.length > 0 ? true : false);
      }
    },[detail])

    function resetForSubmitAgain(){
      setFormData({})
      if (id) {
        FetchSurveyDetail({ id: Number(id) });
      }
      setcompleted(false)
      setSubmittingSurvey(false)
      setsteps(0)
    }
    

  return (
    <>
      {loading ? (
                <WebLoading />
            ) : (
              <>
             <NextBreadcrumbs module={module} title={detail?.info.name}/>
            <Container mb="3" maxW="100%" w="100%">
               <Text mb={1} textBreakStrategy='simple' w={'100%'} textAlign={'center'} fontSize="2xl">{detail?.info.name}</Text>
              {detail?.questions.length! > 0 && <HStack bg="primary.box" overflow="hidden" borderWidth="0" borderColor="primary.bdBox" mb="4" space="0" w="100%" rounded="2xl">
                { detail?.questions.map((item, key)=>(
                    <Box key={key} bg={steps >= key ? 'secondary.500' : 'transparent'} h="22px" w={`${stepIndicatorWidth}%`} />
                ))}
              </HStack>}
              {!completed && <Box w="100%" bg="primary.box" borderWidth="0" borderColor="primary.bdBox" rounded="10">
                {detail?.questions.length! > 0 &&  detail?.questions[steps] !== undefined && (
                  <>
                    {detail?.questions[steps].question_type === 'matrix' && <MatrixAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} error={activeQuestionError} labels={event?.labels} forceRender={forceUpdate} key={detail?.questions[steps].id}   />}
                    {detail?.questions[steps].question_type === 'multiple' && <MultipleAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} error={activeQuestionError} labels={event?.labels} forceRender={forceUpdate} key={detail?.questions[steps].id}   />}
                    {detail?.questions[steps].question_type === 'single' && <SingleAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} error={activeQuestionError} labels={event?.labels} forceRender={forceUpdate} key={detail?.questions[steps].id}   />}
                    {detail?.questions[steps].question_type === 'dropdown' && <DropdownAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} error={activeQuestionError}labels={event?.labels} forceRender={forceUpdate} key={detail?.questions[steps].id}   />}
                    {detail?.questions[steps].question_type === 'open' && <OpenQuestionAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} error={activeQuestionError} labels={event?.labels} forceRender={forceUpdate} key={detail?.questions[steps].id}   />}
                    {detail?.questions[steps].question_type === 'number' && <NumberAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} error={activeQuestionError} labels={event?.labels} forceRender={forceUpdate}key={detail?.questions[steps].id}  />}
                    {detail?.questions[steps].question_type === 'date' && <DateAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} error={activeQuestionError} labels={event?.labels} forceRender={forceUpdate} key={detail?.questions[steps].id}  />}
                    {detail?.questions[steps].question_type === 'date_time' && <DateTimeAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} error={activeQuestionError} labels={event?.labels} forceRender={forceUpdate} key={detail?.questions[steps].id}  />}
                    {detail?.questions[steps].question_type === 'world_cloud' && <WordCloudAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} error={activeQuestionError} labels={event?.labels} forceRender={forceUpdate} key={detail?.questions[steps].id}  />}
                  </>
                )}
                {detail?.questions.length! <= 0 &&
                  <Box padding={5}>
                      <Text>{survey_labels?.NO_SURVEY_AVAILABL}</Text>
                  </Box>
                }
                <Box py="0" px="4" w="100%">
                  <Divider mb="15" opacity={0.27} bg="primary.text" />
                  <HStack mb="3" space="3" alignItems="center">
                    {steps > 0 && <Button
                      isDisabled={steps <= 0 ? true : false}
                      bg="transparent"
                      p="2"
                      fontSize="lg"
                      leftIcon={<Icon size="md" as={SimpleLineIcons} name="arrow-left" color="primary.text" />}
                      colorScheme="primary"
                      onPress={() => {
                        setActiveQuestionError(null);
                        setsteps(steps - 1);
                      }}
                    >
                      {survey_labels?.POLL_SURVEY_PREVIOUS}
                    </Button>}
                    <Spacer />
                    {steps < (detail?.questions.length! -1)  && <Button
                      bg="transparent"
                      isDisabled={steps >= (detail?.questions.length! -1) ? true : false}
                      p="2"
                      fontSize="lg"
                      rightIcon={<Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />}
                      colorScheme="primary"
                      onPress={() => {
                        setNextStep();
                      }}
                    >
                      {survey_labels?.POLL_SURVEY_NEXT}
                    </Button>}
                  </HStack>
                  {steps === (detail?.questions.length! - 1) && 
                  <Box w="100%" mb="6">
                      <SwipeBtn
                          loading={submittingSurvey}
                          onComplete={() => 
                          setNextStep()
                        }
                          />
                  </Box>
                   } 
                </Box>
              </Box>}
              {completed === true && (
                <Box borderWidth="0" borderColor="primary.bdBox" w="100%" bg="primary.box" p="5" py="8" rounded="10px">
                <VStack alignItems="center" space="5">
                  <Box nativeID='bg-circle-animation' bg="primary.500" w="67px" h="67px" borderWidth="1" borderColor="primary.bordercolor" rounded="100%" alignItems="center" justifyContent="center">
                    <IcoTick />
                  </Box>
                  <Text fontSize="lg">{survey_labels?.SURVEY_ANSWER_SUBMITTED_SUCCESFULLY}</Text>
                  {canSubmitMultipleTimes ? (
                    <Button
                    id='test'
                    minW="100px"
                    py="3"
                    px="3"
                    isLoading={false}
                    colorScheme="primary"
                    onPress={()=>{
                      resetForSubmitAgain()
                    }}
                    
                  >
                    {survey_labels?.WORD_CLOUD_SUBMIT_AGAIN}
                  </Button>
                  ):(
                    <>
                    <Text fontSize="md">{survey_labels?.POLL_SURVEY_REDIRECT_MSG}</Text>
                    <CountdownTimer />
                    </>
                  )}
                </VStack>
              </Box>
              )}
            </Container>
            </>
      )}
        <BannerAds module_name={'polls'} module_type={'detail'} module_id={detail?.id}/>
    </>
  );
};

const CountdownTimer = React.memo(() => {
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const { push, back } = useRouter();
  const {event} = UseEventService();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      onEnd(); // Trigger the function when countdown ends
    }
  }, [timeLeft]);

  const onEnd = () => {
    push(`/${event.url}`);
  }

  return (
    <>
      {timeLeft > 0 ? (
        <Text fontSize="lg">{timeLeft}</Text>
      ) : (
        <WebLoading />
      )}
    </>
  );
});

export default Detail;
