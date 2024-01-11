import React from 'react';
import { Box, Center, Checkbox, Divider, HStack, Icon, Radio, Text, TextArea, VStack } from 'native-base';
import Icodocument from 'application/assets/icons/small/Icodocument';
import { Question, FormData, Answer } from 'application/models/subRegistration/SubRegistration';
import { Platform } from 'react-native';
import UseEventService from 'application/store/services/UseEventService';
import Ionicons from '@expo/vector-icons/Ionicons';

type PropTypes = {
  question: Question,
  updates:number,
  formData: FormData,
  updateFormData: (question_id:number, type:string, answer:any, index?:number) => void,
  error:string|null,
  canChangeAnswer?:number
}
const SingleAnswer = ({ question, formData, updateFormData, error, canChangeAnswer }: PropTypes) => {
  const { event } = UseEventService()
  return (
    <Center maxW="100%" w="100%" mb="0">
      <Box mb="3" py="3" px="4" w="100%">
        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{question?.info?.[0]?.value} {Number(question?.required_question) === 1 && <Text display={Platform.OS === 'web' ? "inline" : 'flex'} color="red.500">*</Text>}</Text>
        <Divider mb="5" opacity={0.27} bg="primary.text" />
        <Radio.Group space="5"   defaultValue={`${formData[question.id]?.answer[0]}`} name="MyRadioGroup"  onChange={answer_id => {updateFormData(question.id, question.question_type, answer_id);}}>
          {question.answer.map((answer, k) =>
            <Radio colorScheme={'secondary'} icon={<Icon size={'lg'} as={<Ionicons size={18} name="checkmark" />} />} key={k} isDisabled={(canChangeAnswer !== undefined && canChangeAnswer == 0) ? true : checkIfdisabled(answer, question.result)}  value={`${answer.id}`}> {answer?.info[0]?.value} </Radio>
          )}
        </Radio.Group>
      </Box>
      {error && <Box  mb="3" py="3" px="4" backgroundColor="red.100" w="100%">
              <Text color="red.900"> {error} </Text>
      </Box>}
      {Number(question.enable_comments) === 1 &&
        <>
          <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
            <Icodocument width="15px" height="18px" />
            <Text fontSize="lg">{event?.labels?.GENERAL_YOUR_COMMENT}</Text>
          </HStack>
          <Box py="3" px="4" w="100%">
            <TextArea
              p="3"
              mb={1}
              h="100px"
              bg={'primary.darkbox'}
              isDisabled={ (canChangeAnswer !== undefined && canChangeAnswer == 0) ? true : false }
              onChange={(e) => updateFormData(question.id, 'comment', e.currentTarget.valueOf)}
              onChangeText={(text) => updateFormData(question.id, 'comment', text)}
              borderWidth="0" fontSize="md" placeholder={event?.labels?.GENERAL_COMMENT} autoCompleteType={undefined} />
          </Box>
        </>
      }
    </Center>
  )
}

export default SingleAnswer

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
