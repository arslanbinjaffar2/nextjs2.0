import React from 'react';
import { Box, Center, Checkbox, Divider, HStack, Input, Radio, Text, TextArea, VStack, Button } from 'native-base';
import Icodocument from 'application/assets/icons/small/Icodocument';
import { Question, FormData } from 'application/models/poll/Detail';
import DateTimePicker from '@react-native-community/datetimepicker'
import {GENERAL_DATETIME_FORMAT} from 'application/utils/Globals'
import moment from 'moment';
type PropTypes = {
  question: Question,
  formData: FormData,
  updateFormData: (question_id:number, type:string, answer:any, index?:number) => void,
  error:string|null,
  labels:any,
  forceRender:number,
}
const DateTimeAnswer = ({ question, formData, updateFormData, labels }: PropTypes) => {
  const [date, setDate] = React.useState();
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);
  

  
  const onChange = (event:any, selectedDate:any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    updateFormData(question.id, question.question_type, moment(currentDate).format(GENERAL_DATETIME_FORMAT))
  };

  const showMode = (currentMode:string) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <Center maxW="100%" w="100%" mb="0">
      <Box mb="3" py="3" px="4" w="100%">
        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{question?.info?.question} {question?.required_question == '1' && <Text display="flex" color="red.500">*</Text>}</Text>
        <Divider mb="5" opacity={0.27} bg="primary.text" />
        <Input w="100%" keyboardType = 'numeric' isReadOnly={true}  value={moment(date).format(GENERAL_DATETIME_FORMAT)} mb={5}/>
        {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
      <Box w={'full'} display={`flex`} flexDirection={`row`}>
        <Button w={`1/2`} onPress={()=>{showMode('date')}}>Select Date</Button>
        <Button w={`1/2`} onPress={()=>{showMode('time')}}>Select Time</Button>
      </Box>
      </Box>
      <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
        <Icodocument width="15px" height="18px" />
        <Text fontSize="lg">{labels?.GENERAL_YOUR_COMMENT}</Text>
      </HStack>
      <Box py="3" px="4" w="100%">
        <TextArea
          p="0"
          h="30px"
          focusOutlineColor="transparent"
          _focus={{ bg: 'transparent' }}
          defaultValue={formData[question.id]?.comment !== null ? formData[question.id]?.comment : ``}
          onChangeText={(text) => {updateFormData(question.id, 'comment', text); }}
          borderWidth="0" fontSize="md" placeholder={labels?.GENERAL_COMMENT} autoCompleteType={undefined} />
          <Text fontSize="sm" textAlign={'right'}>{labels?.GENERAL_CHARACTER_REMAINING !== undefined ? `510 ${labels?.GENERAL_CHARACTER_REMAINING}` : ''}</Text>
      </Box>
    </Center>
  )
}

export default DateTimeAnswer