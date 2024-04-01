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
import { FormData } from 'application/models/poll/Detail';
import WebLoading from 'application/components/atoms/WebLoading';
import MultipleAnswer from 'application/components/atoms/subRegistration/questions/MultipleAnswer';
import SingleAnswer from 'application/components/atoms/subRegistration/questions/SingleAnswer';
import DropdownAnswer from 'application/components/atoms/subRegistration/questions/DropdownAnswer';
import MatrixAnswer from 'application/components/atoms/subRegistration/questions/MatrixAnswer';
import OpenQuestionAnswer from 'application/components/atoms/subRegistration/questions/OpenQuestionAnswer';
import NumberAnswer from 'application/components/atoms/subRegistration/questions/NumberAnswer';
import DateAnswer from 'application/components/atoms/subRegistration/questions/web/DateAnswer';
import DateTimeAnswer from 'application/components/atoms/subRegistration/questions/web/DateTimeAnswer';
import UseEventService from 'application/store/services/UseEventService';
import UseEnvService from 'application/store/services/UseEnvService';
import UseAuthService from 'application/store/services/UseAuthService';
import { SubmittedQuestion } from 'application/models/poll/Poll';
import { useRouter } from 'solito/router'
import UseSubRegistrationService from 'application/store/services/UseSubRegistrationService';
import { error } from 'application/store/slices/Auth.Slice';
import UseNetworkInterestService from 'application/store/services/UseNetworkInterestService';
import BannerAds from 'application/components/atoms/banners/BannerAds'


type ScreenParams = { id: string }

const { useParam } = createParam<ScreenParams>()

const Detail = () => {


  const [completed, setcompleted] = useState<boolean>(false);

  const [submittingPoll, setSubmittingPoll] = useState(false);

  const { loading, scroll } = UseLoadingService();

  const { _env } = UseEnvService();

  const { event, modules  } = UseEventService();

  const { response  } = UseAuthService();

  const { push } = useRouter()

  const { afterLogin, FetchSubRegistrationAfterLogin, SaveSubRegistration, submitting, skip, setSkip } = UseSubRegistrationService();

  const { netWorkskip,setNetworkSkip  } = UseNetworkInterestService();


  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<FormData>({});
  const [updates, setUpdates] = useState(0);
  const [submitcount, setsubmitcount] = useState(0);
  const [activeQuestionError, setActiveQuestionError] = useState<string | null>(null);
  const refElement = React.useRef<HTMLDivElement>(null);
  const updateFormData = (question_id:number, type:string, answer:any, index?:number, agendaId?:number) => {
    
    let newErrors = errors;
    console.log(newErrors[question_id])
    console.log(answer)
    if(newErrors[question_id] !== undefined && newErrors[question_id].error !== undefined && newErrors[question_id].error !== null){
      newErrors[question_id].error = null;
      setUpdates(updates + 1);
    }

    let newFormData = formData;
    if(newFormData[question_id] === undefined){
      newFormData[question_id] = {
        answer:null,
        comment:null
      };
    }
    console.log(newFormData[question_id])

    if(type === 'multiple'){
          newFormData[question_id].answer = answer 
          setUpdates(updates + 1);

    }
    else if(type === 'single'){
      newFormData[question_id].answer = [answer]
    }
    else if(type === 'dropdown'){
      newFormData[question_id].answer = answer == '0' ? [] : [answer]
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


    setErrors(newErrors);
    setFormData(newFormData);
  }


    React.useEffect(() => {
            FetchSubRegistrationAfterLogin();
    }, []);

    React.useEffect(() => {
      if(skip === true){
          if(netWorkskip !== true  && event?.keyword_settings?.show_after_login !== 0){
            push(`/${event.url}/network-interest`)
          }else{
            setNetworkSkip();
            push(`/${event.url}/dashboard`)
          }
      }
    }, [skip]);

    const validate = async () => {
      let error = false;
      let newFormData = errors;
        for(const activeQuestion of afterLogin?.questions?.question!){
        if(Number(activeQuestion?.required_question) === 1 || (formData[activeQuestion?.id!]?.answer !== undefined && formData[activeQuestion?.id!]?.answer !== null)){
          if(activeQuestion?.question_type === 'multiple'){
            if(Number(activeQuestion?.required_question) === 1 && (formData[activeQuestion?.id!] === undefined || formData[activeQuestion?.id!]?.answer === null || formData[activeQuestion?.id!]?.answer.length <= 0)){
              newFormData[activeQuestion.id!] = {
                  error:event.labels.REGISTRATION_FORM_FIELD_REQUIRED
                };
              error  = true;
            }
            else if(activeQuestion.min_options > 0 && formData[activeQuestion?.id!].answer.length !== 0 && formData[activeQuestion?.id!]?.answer.length < activeQuestion.min_options){
              newFormData[activeQuestion.id!] = {
                  error: afterLogin?.labels?.SUB_REGISTRATION_MIN_SELECTION_ERROR
                  .replace(/%q/g, activeQuestion?.info[0]?.value)
                  .replace(/%s/g, activeQuestion?.min_options?.toString())
                };
                error  = true;
            }
            else if(activeQuestion.max_options > 0 && formData[activeQuestion?.id!].answer.length !== 0 && formData[activeQuestion?.id!]?.answer.length > activeQuestion.max_options){
              newFormData[activeQuestion.id!] = {
                  error:afterLogin?.labels?.SUB_REGISTRATION_MAX_SELECTION_ERROR.replace(/%s/g, activeQuestion.max_options.toString())
                };
                error  = true;
            }
          }
          else if(activeQuestion?.question_type === 'single') {
            if(formData[activeQuestion?.id!] === undefined || formData[activeQuestion?.id!]?.answer === null || formData[activeQuestion?.id!]?.answer.length <= 0){
                console.log('single', activeQuestion.id)
                newFormData[activeQuestion.id!] = {
                  error:event.labels.REGISTRATION_FORM_FIELD_REQUIRED,
                };
                error  = true;
            }
          }
          else if(activeQuestion?.question_type === 'dropdown') {
            if(formData[activeQuestion?.id!] === undefined || formData[activeQuestion?.id!]?.answer === null || formData[activeQuestion?.id!]?.answer.length <= 0){
              newFormData[activeQuestion.id!] = {
                  error:event.labels.REGISTRATION_FORM_FIELD_REQUIRED
                };
                error  = true;
            } 
          }
         
          else if(activeQuestion?.question_type === 'matrix') {
            if(formData[activeQuestion?.id!] === undefined || formData[activeQuestion?.id!]?.answer === null || Object.keys(formData[activeQuestion?.id!]?.answer).length < activeQuestion.answer.length){
              newFormData[activeQuestion.id!] = {
                  error:event.labels.REGISTRATION_FORM_FIELD_REQUIRED
                };
                error  = true;
            } 
          }
          else{
            if(Number(activeQuestion?.required_question) === 1 && (formData[activeQuestion?.id!] === undefined || formData[activeQuestion?.id!]?.answer === null || formData[activeQuestion?.id!]?.answer === '')){
                newFormData[activeQuestion.id!] = {
                  error:event.labels.REGISTRATION_FORM_FIELD_REQUIRED
                };
                error  = true;
            }
          } 
        }
       }
       setErrors(newFormData);
       setUpdates(updates + 1);
       setsubmitcount(submitcount + 1);
       return error;
  }

    const onSubmit = async ( ) => {

      const isError = await validate();

      console.log(isError);
      console.log(errors);
      
      if(!isError){
         const answers = afterLogin?.questions?.question
         .reduce(
           (ack:any, item:any) => {
           if(item.question_type === "multiple" && formData[item.id] !== undefined && formData[item.id].answer !== undefined &&  formData[item.id]?.answer.length > 0){
             let newObj ={ [`answer${item.id}`]: formData[item.id]?.answer.map((item:any) =>(item)), [`comments${item.id}`]:formData[item.id]?.comment }
             let agendas = item?.answer?.filter((filterItem:any)=>(filterItem.link_to > 0))?.reduce((acc:any, ritem:any) => {
               if(formData[item.id]?.answer.map((item:any)=>(item)).includes(`${ritem.id}`)){
                return Object.assign(acc, { [`answer_agenda_${ritem.id}`] : ritem.link_to })
               }
               return acc;          
               },
             {})
             if(Object.keys(agendas).length > 0){
               newObj ={...newObj,...agendas};
             }
             return Object.assign(ack, {...newObj} );
           }
           else if(item.question_type === "single" && formData[item.id] !== undefined && formData[item.id].answer !== undefined && formData[item.id]?.answer.length > 0){
             let newObj ={ [`answer${item.id}`]: formData[item.id]?.answer, [`comments${item.id}`]:formData[item.id]?.comment }
             
             if((item.answer.find((answer:any)=>(formData[item.id]?.answer[0] == answer.id))?.link_to ?? 0) > 0){
               newObj ={...newObj,[`answer_agenda_${formData[item.id]?.answer[0]}`] : item.answer.find((answer:any)=>(formData[item.id]?.answer[0] == answer.id))?.link_to ?? 0};
             }
             return Object.assign(ack, {...newObj} );
           }
           else if(item.question_type === "dropdown" && formData[item.id] !== undefined && formData[item.id].answer !== undefined && formData[item.id]?.answer.length > 0 && formData[item.id]?.answer[0] !== '0'){
             let newObj ={ [`answer_dropdown${item.id}`]: [`${formData[item.id]?.answer[0]}-${item?.answer?.find((answer:any)=>(formData[item.id]?.answer[0] == answer.id))?.link_to ?? 0}`], [`comments${item.id}`]:formData[item.id]?.comment }
             return Object.assign(ack, {...newObj} );
           }
           else if(item.question_type === "matrix" && formData[item.id] !== undefined && formData[item.id].answer !== undefined && Object.keys(formData[item.id]?.answer).length > 0){
             let newObj ={ [`answer${item.id}`]: Object.keys(formData[item.id]?.answer), [`comments${item.id}`]: formData[item.id]?.comment }
             let matrix = Object.keys(formData[item.id]?.answer).reduce((ack, ritem) => {
                return Object.assign(ack, { [`answer_matrix${item.id}_${ritem}`] : [`${ritem}-${formData[item.id]?.answer[ritem]}`] })},
               
             {})
             return Object.assign(ack, {...newObj, ...matrix} );
           }
           else{
             if(formData[item.id] !== undefined && formData[item.id] !== undefined && formData[item.id].answer !== undefined && formData[item.id]?.answer.length > 0){
               return Object.assign(ack, { [`answer_${item.question_type}${item.id}`]: [formData[item.id]?.answer], [`comments${item.id}`]:formData[item.id]?.comment} );
             }else{
               return ack;
             }
           }
         },{})
         SaveSubRegistration({
          first_time:"yes",
          sub_reg_id: afterLogin?.questions?.id,
          optionals:afterLogin?.questions?.question
          .filter((item) => item.required_question !== "1")
          .map((item) => item.id),
          questionsType:afterLogin?.questions?.question.reduce(
            (ack, item) => Object.assign(ack, { [item.id]: item.question_type }),
            {}
          ),
          questions:afterLogin?.questions?.question.reduce((ack, item:any) => { return ack.concat(item.id)},[]),
          ...answers,
         });
      }
    }

  return (
    <>
      {loading ? (
                <WebLoading />
            ) : (
            <Container ref={refElement} mb="3" maxW="100%" w="100%">
            
              <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                <Text isTruncated  fontSize="2xl">{afterLogin.labels.SUB_REGISTRATION_MODULE_LABEL}</Text>
              </HStack>
              <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                <Text isTruncated pr="6" fontSize="lg">{event.labels?.EVENTSITE_QUESTIONAIRS_DETAIL}</Text>
              </HStack>
              {!completed && <Box w="100%" bg="primary.box" borderWidth="0" borderColor="primary.bdBox" rounded="10">
                {afterLogin?.questions?.question.length! > 0 &&  afterLogin?.questions?.question.map((item, index)=>(
                    <React.Fragment key={item.id}>
                    {item.question_type === 'matrix' && item.display_question === "yes" && <MatrixAnswer onsubmit={submitcount}  question={item} updates={updates} formData={formData} updateFormData={updateFormData} error={errors[item.id]?.error }  />}
                    {item.question_type === 'multiple' && item.display_question === "yes" && <MultipleAnswer onsubmit={submitcount} settings={afterLogin.settings!} programs={afterLogin.all_programs!} question={item} updates={updates} formData={formData} updateFormData={updateFormData} error={errors[item.id]?.error}  />}
                    {item.question_type === 'single' && item.display_question === "yes" && <SingleAnswer onsubmit={submitcount}  question={item} updates={updates} formData={formData} updateFormData={updateFormData} error={errors[item.id]?.error}  />}
                    {item.question_type === 'dropdown' && item.display_question === "yes" && <DropdownAnswer onsubmit={submitcount}  question={item} updates={updates} formData={formData} updateFormData={updateFormData} error={errors[item.id]?.error} />}
                    {item.question_type === 'open' && <OpenQuestionAnswer onsubmit={submitcount}  question={item} updates={updates} formData={formData} updateFormData={updateFormData} error={errors[item.id]?.error}  />}
                    {item.question_type === 'number' && <NumberAnswer onsubmit={submitcount}  question={item} updates={updates} formData={formData} updateFormData={updateFormData} error={errors[item.id]?.error} />}
                    {item.question_type === 'date' && <DateAnswer onsubmit={submitcount}  question={item} updates={updates} formData={formData} updateFormData={updateFormData} error={errors[item.id]?.error} />}
                    {item.question_type === 'date_time' && <DateTimeAnswer onsubmit={submitcount}  question={item} updates={updates} formData={formData} updateFormData={updateFormData} error={errors[item.id]?.error} />}
                  </React.Fragment>
                )) }
                <Box py="0" px="4" w="100%">
                  <Divider mb="15" opacity={0.27} bg="primary.text" />
                  <HStack mb="3" space="3" alignItems="center">
                     {afterLogin.show_skip_button &&
                      <Button
                      bg="transparent"
                      p="2"
                      textTransform={'uppercase'}
                      fontSize="lg"
                      colorScheme="primary"
                      onPress={() => {
                        setSkip();
                      }}
                    >
                      {event?.labels?.GENERAL_SKIP}
                    </Button>}
                    <Spacer />
                    
                      <Button
                        w="48px"
                        py="3"
                        px="1"
                        leftIcon={<IcoLongArrow />}
                        colorScheme="primary"
                        isLoading={submitting}
                        onPress={() => {
                         onSubmit();
                        }}
                      />
                  </HStack>
                </Box>
              </Box>}
            </Container>
      )}
      <Box width={"100%"} height={"5%"}>
        <BannerAds module_name={'subregistration'} module_type={'listing'} />
      </Box>
    </>
  );
};

export default Detail;
