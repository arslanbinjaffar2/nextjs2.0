import React, { useEffect } from 'react';
import { Box, Center, Checkbox, Divider, HStack, Heading, Icon, Text, TextArea, VStack } from 'native-base';
import Icowritecomment from 'application/assets/icons/small/Icowritecomment';
import { Question, FormData, Answer, Settings, Allprogram } from 'application/models/subRegistration/SubRegistration';
import moment from 'moment';
import UseEventService from 'application/store/services/UseEventService';
import {GENERAL_DATE_FORMAT} from 'application/utils/Globals';
import Comments from 'application/components/atoms/subRegistration/questions/Comments';
import { Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type PropTypes = {
  updates:number,
  onsubmit:number,
  question: Question,
  formData: FormData,
  updateFormData: (question_id:number, type:string, answer:any, index?:number) => void
  error:string|null,
  canChangeAnswer?:number
  settings:Settings
  programs:Allprogram[]
}

const MultipleAnswer = ({ question, formData, updateFormData, error,  settings, programs, canChangeAnswer, onsubmit}: PropTypes) => {
  const { event } = UseEventService();
  const refElement = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (error) {
      if (refElement.current) {
        refElement.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "start"  });
      }
    }
  }, [onsubmit])
  return (
    <Center ref={refElement} maxW="100%" w="100%" mb="0">
      <Box mb="3" py="3" px="4" w="100%">
        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{Number(question?.required_question) === 1 && <Text color="red.500">*</Text>} {question?.info?.[0]?.value}</Text>
        <Divider mb="5" opacity={0.27} bg="primary.text" />
        <VStack space="3">
        <Checkbox.Group defaultValue={formData[question.id]?.answer} onChange={(answers) => { updateFormData(question.id, question.question_type, answers)}} aria-label={question?.info?.[0]?.value}>
          {question?.answer.map((answer, k) =>
            <Checkbox colorScheme={'secondary'} mb={4} key={k} size="md" isDisabled={(canChangeAnswer !== undefined && canChangeAnswer == 0) ? true : checkIfProgramdisabled(answer, question.result, settings, programs, (formData[question.id]?.answer ?? []), question.answer)}   value={`${answer.id}`}>{answer?.info[0]?.value} </Checkbox>
          )}
        </Checkbox.Group>
        </VStack>
      </Box>
      {error && <>
        <Box  mb="3" py="3" px="4" backgroundColor="red.100" w="100%">
              <Text color="red.900"> {error} </Text>
        </Box>
        <HStack justifyContent="start" px="4" w="100%" mb={2}>
          <Text fontSize={'xs'}>{event?.labels?.SUB_REG_LIMIT_ERROR_RELOAD_MESSAGE}</Text>
          <Icon ml={2} as={Ionicons} name="reload" size="sm" color="primary.text" onPress={()=>{
            if(Platform.OS === 'web'){
              window.location.reload();
            }
          }} />
        </HStack>
      </>}
      {Number(question.enable_comments) === 1 && <Comments question={question} updateFormData={updateFormData} canChangeAnswer={canChangeAnswer} />}
    </Center>
  )
}

export default MultipleAnswer

const checkIfProgramdisabled =  (answer:Answer, result:any[], settings:Settings, programs:Allprogram[], stateAnswers:any[], answers:Answer[]):boolean =>{
  let disabled = false;
  const is_my_answer = result?.find((item:any)=> item.answer_id == answer.id) ? true : false;
  if(answer.link_to <= 0  && Number(answer?.sub_registration_limit) > 0){
    disabled = (Number(answer?.total_answer_submissions) >= Number(answer?.sub_registration_limit) && !is_my_answer) ? true : false;
  }
  else if((answer.link_to > 0 && answer.tickets !== undefined)){
      disabled =  (answer.tickets !== 'unlimited' && Number(answer.tickets) <= 0 && !is_my_answer) ? true : false;
  }
  if(settings.favorite_session_registration_same_time != 1 && answer.link_to > 0  && stateAnswers.length > 0 && !is_my_answer){
    let selectedProgram = programs.find((item)=>(item.id == answer.link_to))!
    let start_time1:any = selectedProgram.start_time;
    let end_time1:any = selectedProgram.end_time;
      stateAnswers.forEach(ans => {
      let pId = answers.find((item:any)=> item.id == ans)!.link_to;
      let thisPrograms = programs.find((item)=>(item.id == pId))!;
      let start_time2:any = thisPrograms.start_time;
      let end_time2:any = thisPrograms.end_time;
      start_time1 = moment(start_time1,'HH:mm:ss');
      end_time1 = moment(end_time1, 'HH:mm:ss');
      start_time2 = moment(start_time2, 'HH:mm:ss');
      end_time2 = moment(end_time2, 'HH:mm:ss');
      
      if(pId != answer.link_to && (moment(thisPrograms.date, GENERAL_DATE_FORMAT).isSame(moment(selectedProgram.date, GENERAL_DATE_FORMAT))) == true ){
          if ((start_time1 >= start_time2 && start_time1 <= end_time2) || (start_time2 >= start_time1 && start_time2 <= end_time1)) {
                  disabled = true;

          }
      }
    });
  }

  return disabled;
}