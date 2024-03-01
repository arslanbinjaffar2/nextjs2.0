import React, { useEffect } from 'react';
import { Box, Center, Checkbox, Divider, HStack, Input, Radio, Text, TextArea, VStack } from 'native-base';
import Icodocument from 'application/assets/icons/small/Icodocument';
import { Question, FormData } from 'application/models/subRegistration/SubRegistration';
import { Platform } from 'react-native';
import UseEventService from 'application/store/services/UseEventService';
import Comments from 'application/components/atoms/subRegistration/questions/Comments';

type PropTypes = {
  question: Question,
  updates:number,
  formData: FormData,
  updateFormData: (question_id:number, type:string, answer:any, index?:number) => void,
  error:string|null,
  canChangeAnswer?:number
}
const NumberAnswer = ({ question, formData, updateFormData, error, canChangeAnswer }: PropTypes) => {
  const { event } = UseEventService()
  const [inputText, setInputText] = React.useState(formData[question.id]?.answer ?? '')

  const [comment,setComment] =  React.useState('');

  useEffect(() => {
    setComment(question?.result?.[0]?.comments ?? '');
  }
  ,[question?.result]);



  return (
    <Center maxW="100%" w="100%" mb="0">
      <Box mb="3" py="3" px="4" w="100%">
        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{question?.required_question == '1' && <Text display={Platform.OS === 'web' ? "inline" : 'flex'} color="red.500">*</Text>} {question?.info?.[0]?.value}</Text>
        <Divider mb="5" opacity={0.27} bg="primary.text" />
        <Input w="100%" placeholder={event?.labels?.EVENTSITE_SUB_REGISTRATION_ANSWER_PLACEHOLDER} isDisabled={ (canChangeAnswer !== undefined && canChangeAnswer == 0) ? true : false } keyboardType = 'numeric' value={inputText} onChangeText={(answer)=>{ 
            updateFormData(question.id, question.question_type, answer.replace(/[^0-9]/g, ''))
            setInputText(answer.replace(/[^0-9]/g, ''));
        }}  />
      </Box>
      {error && <Box  mb="3" py="3" px="4" backgroundColor="red.100" w="100%">
              <Text color="red.900"> {error} </Text>
      </Box>}
      {Number(question.enable_comments) === 1 && <Comments question={question} updateFormData={updateFormData} canChangeAnswer={canChangeAnswer} />}
    </Center>
  )
}

export default NumberAnswer