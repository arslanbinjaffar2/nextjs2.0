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


type ScreenParams = { id: string }

const { useParam } = createParam<ScreenParams>()

const Detail = () => {


  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  const [submittingPoll, setSubmittingPoll] = useState(false);

  const { loading, scroll } = UseLoadingService();

  const { _env } = UseEnvService();

  const { event,setting_modules  } = UseEventService();

  const { response  } = UseAuthService();

  const { push } = useRouter()

  const { mySubReg, FetchMySubRegistration, SaveSubRegistration, submitting, skip, setSkip } = UseSubRegistrationService();

    React.useEffect(() => {
            FetchMySubRegistration();
            setFirstLoad(false);
    }, []);

    

  return (
    <>
      {(firstLoad||loading || mySubReg == null) ? (
                <WebLoading />
            ) : (
           <RegForm
              mySubReg={mySubReg}
              SaveSubRegistration={SaveSubRegistration}
              submitting={submitting}
              skip={skip}
              setSkip={setSkip}
              event={event}
              setting_modules={setting_modules}
            />
      )}
    </>
  );
};

export default Detail;


function RegForm({mySubReg, SaveSubRegistration, submitting, skip, setSkip, event, setting_modules}:any) {

  const [formData, setFormData] = useState<FormData>(mySubReg?.questions?.question
    .reduce(
      (ack:any, item:any) => {
      if(item.question_type === "multiple" && item.result.length > 0){
        ack[item.id] = {
          answer:item.result.map((item:any)=>`${item.answer_id}`),
          comment:item.result[0].comments
        }
      }
      else if(item.question_type === "single" && item.result.length > 0){
        ack[item.id] = {
          answer:item.result.map((item:any)=>`${item.answer_id}`),
          comment:item.result[0].comments
        }
      }
      else if(item.question_type === "dropdown" && item.result.length > 0){
        ack[item.id] = {
          answer:item.result.map((item:any)=>`${item.answer_id}`),
          comment:item.result[0].comments
        }
      }
      else if(item.question_type === "matrix" && item.result.length > 0){
        ack[item.id] = {
          answer:item.result.reduce((ack:any,item:any)=> {ack[item.answer_id] = `${item.answer}`; return ack;} , {}),
          comment:item.result[0].comments
        }
      }
      else if(item.result.length > 0){
        ack[item.id] = {
          answer:item.result[0].answer,
          comment:item.result[0].comments
        }
      }
      return ack;
    },{}));
  const [errors, setErrors] = useState<FormData>({});
  const [updates, setUpdates] = useState(0);

  const [activeQuestionError, setActiveQuestionError] = useState<string | null>(null);

  

  const updateFormData = (question_id:number, type:string, answer:any, index?:number, agendaId?:number) => {
    
    let newErrors = errors;
    console.log(newErrors[question_id])
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
    if(type === 'multiple'){
          newFormData[question_id].answer = answer      
          setUpdates(updates + 1);
    }
    else if(type === 'single'){
      newFormData[question_id].answer = answer == '0' ? [] :  [answer]
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


    setErrors(newErrors);
    setFormData(newFormData);
  }
  const validate = async () => {
    let error = false;
    let newFormData = errors;
      for(const activeQuestion of mySubReg?.questions?.question!){
      if(Number(activeQuestion?.required_question) === 1 || (formData[activeQuestion?.id!]?.answer !== undefined && formData[activeQuestion?.id!]?.answer !== null)){
        if(activeQuestion?.question_type === 'multiple'){
          if(Number(activeQuestion?.required_question) === 1 && (formData[activeQuestion?.id!] === undefined || formData[activeQuestion?.id!]?.answer === null || formData[activeQuestion?.id!].answer.length <= 0)){
            newFormData[activeQuestion.id!] = {
                error:event.labels.REGISTRATION_FORM_FIELD_REQUIRED
              };
            error  = true;
          }
          else if(activeQuestion.min_options > 0 && formData[activeQuestion?.id!].answer.length < activeQuestion.min_options){
            newFormData[activeQuestion.id!] = {
                error: mySubReg?.labels?.SUB_REGISTRATION_MIN_SELECTION_ERROR
                .replace(/%q/g, activeQuestion?.info[0]?.value)
                .replace(/%s/g, activeQuestion?.min_options?.toString())
              };
              error  = true;
          }
          else if(activeQuestion.max_options > 0 && formData[activeQuestion?.id!].answer.length > activeQuestion.max_options){
            newFormData[activeQuestion.id!] = {
                error:mySubReg?.labels?.SUB_REGISTRATION_MAX_SELECTION_ERROR.replace(/%s/g, activeQuestion.max_options.toString())
              };
              error  = true;
          }
        }
        else if(activeQuestion?.question_type === 'single') {
          if(formData[activeQuestion?.id!] === undefined || formData[activeQuestion?.id!]?.answer === null || formData[activeQuestion?.id!].answer.length <= 0){
              console.log('single', activeQuestion.id)
              newFormData[activeQuestion.id!] = {
                error:event.labels.REGISTRATION_FORM_FIELD_REQUIRED,
              };
              error  = true;
          }
        }
        else if(activeQuestion?.question_type === 'dropdown') {
          if(formData[activeQuestion?.id!] === undefined || formData[activeQuestion?.id!]?.answer === null || formData[activeQuestion?.id!].answer.length <= 0){
            newFormData[activeQuestion.id!] = {
                error:event.labels.REGISTRATION_FORM_FIELD_REQUIRED
              };
              error  = true;
          } 
        }
       
        else if(activeQuestion?.question_type === 'matrix') {
          if(formData[activeQuestion?.id!] === undefined || formData[activeQuestion?.id!]?.answer === null || Object.keys(formData[activeQuestion?.id!].answer).length < activeQuestion.answer.length){
            newFormData[activeQuestion.id!] = {
                error:event.labels.REGISTRATION_FORM_FIELD_REQUIRED
              };
              error  = true;
          } 
        }
        else{
          if(Number(activeQuestion?.required_question) === 1 && (formData[activeQuestion?.id!] === undefined || formData[activeQuestion?.id!]?.answer === null || formData[activeQuestion?.id!].answer === '')){
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
     return error;
}

  const onSubmit = async ( ) => {
    const isError = await validate();
    
    if(!isError){
       const answers = mySubReg?.questions?.question
       .reduce(
         (ack:any, item:any) => {
         if(item.question_type === "multiple" && formData[item.id] !== undefined && formData[item.id].answer !== undefined &&  formData[item.id].answer.length > 0){
           let newObj ={ [`answer${item.id}`]: formData[item.id].answer.map((item:any) =>(item)), [`comments${item.id}`]:formData[item.id].comment }
           let agendas = item?.answer?.filter((filterItem:any)=>(filterItem.link_to > 0))?.reduce((ack:any, ritem:any) => {
             if(formData[item.id]?.answer.map((item:any)=>(item)).includes(`${ritem.id}`)){
              return Object.assign(ack, { [`answer_agenda_${ritem.id}`] : ritem.link_to })
             }
             return ack;          
             },
           {})
           if(Object.keys(agendas).length > 0){
             newObj ={...newObj,...agendas};
           }
           return Object.assign(ack, {...newObj} );
         }
         else if(item.question_type === "single" && formData[item.id] !== undefined && formData[item.id].answer !== undefined && formData[item.id].answer.length > 0){
           let newObj ={ [`answer${item.id}`]: formData[item.id].answer, [`comments${item.id}`]:formData[item.id].comment }
           if((item.answer.find((answer:any)=>(formData[item.id].answer[0] == answer.id))?.link_to ?? 0) > 0){
             newObj ={...newObj,[`answer_agenda_${formData[item.id].answer[0]}`] : item.answer.find((answer:any)=>(formData[item.id].answer[0] == answer.id))?.link_to ?? 0};
           }
           return Object.assign(ack, {...newObj} );
         }
         else if(item.question_type === "dropdown" && formData[item.id] !== undefined && formData[item.id].answer !== undefined &&  formData[item.id].answer.length > 0 && formData[item.id]?.answer[0] !== '0'){
           let newObj ={ [`answer_dropdown${item.id}`]: [`${formData[item.id].answer[0]}-${item?.answer?.find((answer:any)=>(formData[item.id]?.answer[0] == answer.id))?.link_to ?? 0}`], [`comments${item.id}`]:formData[item.id]?.comment }
           return Object.assign(ack, {...newObj} );
         }
         else if(item.question_type === "matrix" && formData[item.id] !== undefined && formData[item.id].answer !== undefined && Object.keys(formData[item.id].answer).length > 0){
           let newObj ={ [`answer${item.id}`]: Object.keys(formData[item.id].answer), [`comments${item.id}`]: formData[item.id].comment }
           let matrix = Object.keys(formData[item.id].answer).reduce((ack, ritem) => {
              return Object.assign(ack, { [`answer_matrix${item.id}_${ritem}`] : [`${ritem}-${formData[item.id].answer[ritem]}`] })},
             
           {})
           return Object.assign(ack, {...newObj, ...matrix} );
         }
         else{
           if(formData[item.id] !== undefined && formData[item.id] !== undefined && formData[item.id].answer !== undefined &&  formData[item.id].answer.length > 0){
             return Object.assign(ack, { [`answer_${item.question_type}${item.id}`]: [formData[item.id].answer], [`comments${item.id}`]:formData[item.id].comment} );
           }else{
             return ack;
           }
         }
       },{})

       SaveSubRegistration({
        first_time:"no",
        sub_reg_id: mySubReg?.questions?.id,
        optionals:mySubReg?.questions?.question
        .filter((item:any) => item.required_question !== "1")
        .map((item:any) => item.id),
        questionsType:mySubReg?.questions?.question.reduce(
          (ack:any, item:any) => Object.assign(ack, { [item.id]: item.question_type }),
          {}
        ),
        questions:mySubReg?.questions?.question.reduce((ack:any, item:any) => { return ack.concat(item.id)},[]),
        ...answers,
       });
    }
  }
  return (
    <Container mb="3" maxW="100%" w="100%">
    <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
      <Text isTruncated pr="6" fontSize="lg">{setting_modules?.find((module: { alias: string; })=>(module.alias == 'subregistration'))?.name ?? 'Subregistration'}</Text>
    </HStack>
      <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
      <Text isTruncated pr="6" fontSize="lg">{event.labels?.EVENTSITE_QUESTIONAIRS_DETAIL}</Text>
    </HStack>
     <Box w="100%" bg="primary.box" borderWidth="1" borderColor="primary.bdBox" rounded="10">
      {mySubReg?.questions?.question.length! > 0 &&  mySubReg?.questions?.question.map((item:any, index:any)=>(
          <React.Fragment key={item.id}>
          {item.question_type === 'matrix' && (mySubReg?.settings?.answer === 1 ? true : (item.result !== undefined && item.result.length > 0)) && <MatrixAnswer canChangeAnswer={mySubReg?.show_save} question={item} updates={updates} formData={formData} updateFormData={updateFormData} error={errors[item.id]?.error }  />}
          {item.question_type === 'multiple' && (mySubReg?.settings?.answer === 1 ? true : (item.result !== undefined && item.result.length > 0)) && <MultipleAnswer canChangeAnswer={mySubReg?.show_save} settings={mySubReg.settings!} programs={mySubReg.all_programs!} question={item} updates={updates} formData={formData} updateFormData={updateFormData} error={errors[item.id]?.error}  />}
          {item.question_type === 'single' && (mySubReg?.settings?.answer === 1 ? true : (item.result !== undefined && item.result.length > 0)) && <SingleAnswer canChangeAnswer={mySubReg?.show_save}  question={item} updates={updates} formData={formData} updateFormData={updateFormData} error={errors[item.id]?.error}  />}
          {item.question_type === 'dropdown' && (mySubReg?.settings?.answer === 1 ? true : (item.result !== undefined && item.result.length > 0)) && <DropdownAnswer canChangeAnswer={mySubReg?.show_save}  question={item} updates={updates} formData={formData} updateFormData={updateFormData} error={errors[item.id]?.error} />}
          {item.question_type === 'open' && (mySubReg?.settings?.answer === 1 ? true : (item.result !== undefined && item.result.length > 0)) && <OpenQuestionAnswer canChangeAnswer={mySubReg?.show_save}  question={item} updates={updates} formData={formData} updateFormData={updateFormData} error={errors[item.id]?.error}  />}
          {item.question_type === 'number' && (mySubReg?.settings?.answer === 1 ? true : (item.result !== undefined && item.result.length > 0)) && <NumberAnswer  canChangeAnswer={mySubReg?.show_save} question={item} updates={updates} formData={formData} updateFormData={updateFormData} error={errors[item.id]?.error} />}
          {item.question_type === 'date' && (mySubReg?.settings?.answer === 1 ? true : (item.result !== undefined && item.result.length > 0)) && <DateAnswer canChangeAnswer={mySubReg?.show_save} question={item} updates={updates} formData={formData} updateFormData={updateFormData} error={errors[item.id]?.error} />}
          {item.question_type === 'date_time' && (mySubReg?.settings?.answer === 1 ? true : (item.result !== undefined && item.result.length > 0)) && <DateTimeAnswer canChangeAnswer={mySubReg?.show_save} question={item} updates={updates} formData={formData} updateFormData={updateFormData} error={errors[item.id]?.error} />}
        </React.Fragment>
      )) }
      <Box py="0" px="4" w="100%">
        <Divider mb="15" opacity={0.27} bg="primary.text" />
        <HStack mb="3" space="3" alignItems="center" justifyContent={'center'}>

            {mySubReg?.settings?.answer === 1 && mySubReg?.show_save === 1 && <Button
              w="48px"
              py="3"
              px="1"
              leftIcon={<IcoLongArrow />}
              colorScheme="primary"
              isLoading={submitting}
              onPress={() => {
               onSubmit();
              }}
            />}
        </HStack>
      </Box>
    </Box>
  </Container>
  )
}