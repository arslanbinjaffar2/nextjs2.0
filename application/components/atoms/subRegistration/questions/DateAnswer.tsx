import React from 'react';
import { Box, Center, Checkbox, Divider, HStack, Input, Radio, Text, TextArea, VStack } from 'native-base';
import Icowritecomment from 'application/assets/icons/small/Icowritecomment';
import { Question, FormData } from 'application/models/subRegistration/SubRegistration';
import DateTimePicker from '../../DateTimePicker';
import { Platform } from 'react-native';
import UseEventService from 'application/store/services/UseEventService';


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
  const [show, setshow] = React.useState(false)
  const handleChange = ({}) => {
    console.log('handleChange')
  }
  return (
    <Center zIndex={1} maxW="100%" w="100%" mb="0">
      <Box fontFamily={'Avenir'} zIndex={2} mb="3" py="3" px="4" w="100%">
        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{question?.required_question == '1' && <Text display="inline" color="red.500">*</Text>} {question?.info?.[0]?.value}</Text>
        <Divider mb="5" opacity={0.27} bg="primary.text" />
        {Platform.OS === "web" && <DateTimePicker readOnly={ (canChangeAnswer !== undefined && canChangeAnswer == 0) ? true : false } showtime={true} showdate={true} />}
      </Box>
      <HStack px="3" py="1" mb={1} bg="primary.darkbox" w="100%" space="3" alignItems="center">
        <Icowritecomment width="15px" height="18px" />
        <Text fontSize="lg">{event?.labels?.GENERAL_YOUR_COMMENT}</Text>
      </HStack>
      <Box py="3" px="4" pb={0} w="100%">
        <TextArea
          p="0"
          h="30px"
          isDisabled={ (canChangeAnswer !== undefined && canChangeAnswer == 0) ? true : false }
          focusOutlineColor="transparent"
          _focus={{ bg: 'transparent' }}
          borderWidth="0" fontSize="md" placeholder={event?.labels?.GENERAL_COMMENT} autoCompleteType={undefined} />
      </Box>
    </Center>
  )
}

export default DateAnswer