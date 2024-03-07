import React from 'react';
import { Box, Center, Checkbox, Divider, HStack, Input, Radio, Text, TextArea, VStack } from 'native-base';
import Icowritecomment from 'application/assets/icons/small/Icowritecomment';
import { Question, FormData } from 'application/models/subRegistration/SubRegistration';
import DateTimePicker from 'application/components/atoms/DateTimePicker';
import moment from 'moment';
import { Platform } from 'react-native';
import UseEventService from 'application/store/services/UseEventService';
import {GENERAL_DATE_FORMAT, GENERAL_DATETIME_FORMAT} from 'application/utils/Globals'

type PropTypes = {
  question: Question,
  formData: FormData,
  updates:number,
  onsubmit:number,
  updateFormData: (question_id:number, type:string, answer:any, index?:number) => void,
  error:string|null,
  canChangeAnswer?:number
}
const DateAnswer = ({ question, formData, updateFormData, canChangeAnswer, error, onsubmit }: PropTypes) => {
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
    <Center ref={refElement} maxW="100%" w="100%" mb="0" zIndex={9}>
      <Box zIndex={9999} position={'relative'} mb="3" py="3" px="4" w="100%">
        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{question?.required_question == '1' && <Text display={Platform.OS === 'web' ? "inline" : 'flex'} color="red.500">*</Text>} {question?.info?.[0]?.value}</Text>
        <Divider mb="5" opacity={0.27} bg="primary.text" />
        <DateTimePicker readOnly={ (canChangeAnswer !== undefined && canChangeAnswer == 0) ? true : false } label={event?.labels?.EVENTSITE_SUB_REGISTRATION_DATETIME_INSERT} showtime={`HH:mm:ss`} showdate={GENERAL_DATE_FORMAT} initialValue={formData[question.id]?.answer} onChange={(currentDate:any)=>{updateFormData(question.id, question.question_type, currentDate._isAMomentObject !== undefined && currentDate._isAMomentObject === true ? moment(currentDate).format(GENERAL_DATETIME_FORMAT) : '')}} />
      </Box>
      {error && <Box  mb="3" py="3" px="4" backgroundColor="red.100" w="100%">
              <Text color="red.900"> {error} </Text>
      </Box>}
      <HStack px="3" py="1" mb={1} bg="primary.darkbox" w="100%" space="3" alignItems="center">
        <Icowritecomment width="15px" height="18px" />
        <Text fontSize="lg">{event?.labels?.GENERAL_YOUR_COMMENT}</Text>
      </HStack>
      <Box py="3" px="4" mb={0} w="100%">
        <TextArea
          p="3"
          mb={1}
          h="100px"
          bg={'primary.darkbox'}
          isDisabled={ (canChangeAnswer !== undefined && canChangeAnswer == 0) ? true : false }
          borderWidth="1" borderColor={'primary.darkbox'} fontSize="md" placeholder={event?.labels?.GENERAL_COMMENT} autoCompleteType={undefined} />
      </Box>
    </Center>
  )
}

export default DateAnswer