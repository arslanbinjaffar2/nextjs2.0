import React from 'react';
import { Box, Center, Checkbox, Divider, HStack, Input, Radio, Text, TextArea, VStack } from 'native-base';
import Icodocument from 'application/assets/icons/small/Icodocument';
import { Question, FormData } from 'application/models/survey/Detail';
import DateTimePicker from 'application/components/atoms/DateTimePicker';
import moment from 'moment';

type PropTypes = {
  question: Question,
  formData: FormData,
  updateFormData: (question_id:number, type:string, answer:any, index?:number) => void,
  error:string|null
  labels:any,
  forceRender:number,
}
const DateAnswer = ({ question, formData, updateFormData, labels }: PropTypes) => {
  return (
    <Center maxW="100%" w="100%" mb="0">
      <Box zIndex={9999} position={'relative'} mb="3" py="3" px="4" w="100%">
        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{question?.value} {question?.required_question == '1' && <Text display="flex" color="red.500">*</Text>}</Text>
        <Divider mb="5" opacity={0.27} bg="primary.text" />
        <DateTimePicker showdate={'DD-MM-YYYY'} value={formData[question.id]?.answer ?? ''} onChange={(currentDate:any)=>{updateFormData(question.id, question.question_type, currentDate._isAMomentObject !== undefined && currentDate._isAMomentObject === true ? moment(currentDate).format('DD-MM-YYYY') : '')}} />
      </Box>
      <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
        <Icodocument width="15px" height="18px" />
        <Text fontSize="lg">Write comment</Text>
      </HStack>
      <Box py="3" px="4" w="100%">
        <TextArea
          p="0"
          h="30px"
          overflow="auto"
          focusOutlineColor="transparent"
          _focus={{ bg: 'transparent' }}
          defaultValue={formData[question.id]?.comment !== null ? formData[question.id]?.comment : ``}
          onChangeText={(text) => updateFormData(question.id, 'comment', text)}
          borderWidth="0" fontSize="md" placeholder="Please write your comment here …" autoCompleteType={undefined} />
        <Text fontSize="sm" textAlign={'right'}>{labels?.GENERAL_CHARACTER_REMAINING !== undefined ? `510 ${labels?.GENERAL_CHARACTER_REMAINING}` : ''}</Text>
      </Box>
    </Center>
  )
}

export default DateAnswer