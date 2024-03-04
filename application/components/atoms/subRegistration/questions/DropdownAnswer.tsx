import React from 'react';
import { Box, Center, Checkbox, Divider, HStack, Select, Text, TextArea, VStack } from 'native-base';
import Icowritecomment from 'application/assets/icons/small/Icowritecomment';
import { Question, FormData, Answer } from 'application/models/subRegistration/SubRegistration';
import { Platform } from 'react-native';
import UseEventService from 'application/store/services/UseEventService';

type PropTypes = {
  question: Question,
  updates:number,
  formData: FormData,
  updateFormData: (question_id:number, type:string, answer:any, index?:number) => void,
  error:string|null
  canChangeAnswer?:number
}
const DropdownAnswer = ({ question, formData, updateFormData, error, canChangeAnswer }: PropTypes) => {
  const { event } = UseEventService()
  return (
    <Center maxW="100%" w="100%" mb="0">
      <Box mb="5" py="3" px="4" w="100%">
        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{Number(question?.required_question) === 1 &&  <Text display={Platform.OS === 'web' ? "inline" : 'flex'} color="red.500">*</Text>} {question?.info?.[0]?.value}</Text>
        <Divider mb="5" opacity={0.27} bg="primary.text" />
        <Select
          // placeholder="Please Select"
          minWidth="64"
          h="50px"
          isDisabled={ (canChangeAnswer !== undefined && canChangeAnswer == 0) ? true : false }
          defaultValue={formData[question.id]?.answer[0] !== undefined ? formData[question.id]?.answer[0] : '0'}
          onValueChange={answer => updateFormData(question.id, question.question_type, answer)}
        >
          <Select.Item label={event?.labels?.GENERAL_SELECT_DROPDOWN_VALUE} value={"0"} />
          {question?.answer.map((answer, key)=>(<Select.Item  isDisabled={checkIfdisabled(answer, question.result)} key={key} label={answer?.info[0]?.value} value={`${answer.id}`} />))}
        </Select>
      </Box>
      {error && <Box  mb="3" py="3" px="4" backgroundColor="red.100" w="100%">
              <Text color="red.900"> {error} </Text>
      </Box>}
      {Number(question.enable_comments) === 1 &&
        <>
          <HStack px="3" py="1" mb={1} bg="primary.darkbox" w="100%" space="3" alignItems="center">
            <Icowritecomment width="15px" height="18px" />
            <Text fontSize="lg">{event?.labels?.GENERAL_YOUR_COMMENT}</Text>
          </HStack>
          <Box py="3" px="4" pb={0} w="100%">
            <TextArea
              p="3"
              mb={1}
              h="100px"
              bg={'primary.darkbox'}
              isDisabled={ (canChangeAnswer !== undefined && canChangeAnswer == 0) ? true : false }
              onChangeText={(text) => updateFormData(question.id, 'comment', text)}
              borderWidth="1" borderColor={'primary.darkbox'} fontSize="md" placeholder={event?.labels?.GENERAL_COMMENT} autoCompleteType={undefined} />
          </Box>
        </>
      }
    </Center>
  )
}

export default DropdownAnswer

const checkIfdisabled = (answer:Answer, result:any[]):boolean =>{
  let disabled = false;
  const is_my_answer = result?.find((item:any)=> item.answer_id == answer.id) ? true : false;
  if(answer.link_to <= 0  && Number(answer?.sub_registration_limit) > 0){
    disabled = (Number(answer?.total_answer_submissions) >= Number(answer?.sub_registration_limit) && !is_my_answer) ? true : false;
  }
  else if((answer.link_to > 0 && answer.tickets !== undefined)){
      disabled =  (answer.tickets !== 'unlimited' && Number(answer.tickets) <= 0 && !is_my_answer) ? true : false;
  }
  return disabled;
}