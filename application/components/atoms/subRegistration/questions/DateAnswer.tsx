import React, { useEffect } from 'react';
import { Box, Center, Checkbox, Divider, HStack, Input, Radio, Text, TextArea, VStack } from 'native-base';
import Icodocument from 'application/assets/icons/small/Icodocument';
import { Question, FormData } from 'application/models/subRegistration/SubRegistration';
import DateTimePicker from '../../DateTimePicker';
import { Platform } from 'react-native';
import UseEventService from 'application/store/services/UseEventService';
import Comments from 'application/components/atoms/subRegistration/questions/Comments';


type PropTypes = {
  question: Question,
  formData: FormData,
  updates:number,

  updateFormData: (question_id:number, type:string, answer:any) => void,
  error:string|null,
  canChangeAnswer?:number
}
const DateAnswer = ({ question, formData, updateFormData, canChangeAnswer }: PropTypes) => {
  const { event } = UseEventService()
  
  return (
    <Center zIndex={1} maxW="100%" w="100%" mb="0">
      <Box fontFamily={'Avenir'} zIndex={2} mb="3" py="3" px="4" w="100%">
        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{question?.required_question == '1' && <Text display="inline" color="red.500">*</Text>} {question?.info?.[0]?.value}</Text>
        <Divider mb="5" opacity={0.27} bg="primary.text" />
        {Platform.OS === "web" && <DateTimePicker readOnly={ (canChangeAnswer !== undefined && canChangeAnswer == 0) ? true : false } showtime={true} showdate={true} />}
      </Box>
      {Number(question.enable_comments) === 1 && <Comments
       question={question} updateFormData={updateFormData} canChangeAnswer={canChangeAnswer} />}
    </Center>
  )
}

export default DateAnswer