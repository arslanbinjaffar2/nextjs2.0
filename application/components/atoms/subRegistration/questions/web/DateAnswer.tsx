import React, { useEffect } from 'react';
import { Box, Center, Checkbox, Divider, HStack, Input, Radio, Text, TextArea, VStack } from 'native-base';
import Icodocument from 'application/assets/icons/small/Icodocument';
import { Question, FormData } from 'application/models/subRegistration/SubRegistration';
import DateTimePicker from 'application/components/atoms/DateTimePicker';
import moment from 'moment';
import { Platform } from 'react-native';
import UseEventService from 'application/store/services/UseEventService';
import {GENERAL_DATE_FORMAT} from 'application/utils/Globals'

type PropTypes = {
  question: Question,
  formData: FormData,
  updates:number,
  updateFormData: (question_id:number, type:string, answer:any, index?:number) => void,
  error:string|null,
  canChangeAnswer?:number
}
const DateAnswer = ({ question, formData, updateFormData, canChangeAnswer, error }: PropTypes) => {
  const { event } = UseEventService()
  const [comment,setComment] =  React.useState('');

  useEffect(() => {
    setComment(question?.result?.[0]?.comments ?? '');
  }
  ,[question?.result]);

  return (
    <Center maxW="100%" w="100%" mb="0" zIndex={9}>
      <Box zIndex={9999} position={'relative'} mb="3" py="3" px="4" w="100%">
        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{question?.required_question == '1' && <Text display={Platform.OS === 'web' ? "inline" : 'flex'} color="red.500">*</Text>} {question?.info?.[0]?.value}</Text>
        <Divider mb="5" opacity={0.27} bg="primary.text" />
        <DateTimePicker readOnly={ (canChangeAnswer !== undefined && canChangeAnswer == 0) ? true : false } label={event?.labels?.EVENTSITE_SUB_REGISTRATION_DATE_INSERT} showdate={GENERAL_DATE_FORMAT} initialValue={formData[question.id]?.answer} onChange={(currentDate:any)=>{updateFormData(question.id, question.question_type, currentDate._isAMomentObject !== undefined && currentDate._isAMomentObject === true ? moment(currentDate).format(GENERAL_DATE_FORMAT) : '')}} />
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
              value={comment}
              isDisabled={ (canChangeAnswer !== undefined && canChangeAnswer == 0) ? true : false }
              onChange={(e) => {setComment(e.currentTarget.valueOf.toString()); updateFormData(question.id, 'comment', e.currentTarget.valueOf.toString())}}
              onChangeText={(text) => {setComment(text); updateFormData(question.id, 'comment', text)}}
              borderWidth="0" fontSize="md" placeholder={event?.labels?.GENERAL_COMMENT} autoCompleteType={undefined} />
          </Box>
        </>}
    </Center>
  )
}

export default DateAnswer