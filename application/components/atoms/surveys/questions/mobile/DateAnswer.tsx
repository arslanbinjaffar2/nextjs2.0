import React from 'react';
import { Box, Center, Checkbox, Divider, HStack, Input, Radio, Text, TextArea, VStack, Button } from 'native-base';
import Icodocument from 'application/assets/icons/small/Icodocument';
import { Question, FormData } from 'application/models/survey/Detail';
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment';
type PropTypes = {
  question: Question,
  formData: FormData,
  updateFormData: (question_id:number, type:string, answer:any, index?:number) => void,
  error:string|null
}
const DateAnswer = ({ question, formData, updateFormData }: PropTypes) => {
  const [date, setDate] = React.useState();
  const [show, setShow] = React.useState(false);
  const onChange = (event:any, selectedDate:any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    updateFormData(question.id, question.question_type, moment(currentDate).format("YYYY-MM-DD"))
  };
  return (
    <Center maxW="100%" w="100%" mb="0">
      <Box mb="3" py="3" px="4" w="100%">
        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{question?.value} {question?.required_question == '1' && <Text display="inline" color="red.500">*</Text>}</Text>
        <Divider mb="5" opacity={0.27} bg="primary.text" />
        <Input w="100%" keyboardType = 'numeric' isReadOnly={true}  value={moment(date).format("YYYY-MM-DD")} mb={5}/>
        {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          onChange={onChange}
        />
      )}
      <Button onPress={()=>{setShow(true)}}>Select Date</Button>
      </Box>
      <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
        <Icodocument width="15px" height="18px" />
        <Text fontSize="lg">Write comment</Text>
      </HStack>
      <Box py="3" px="4" w="100%">
        <TextArea
          p="0"
          h="30px"
          focusOutlineColor="transparent"
          _focus={{ bg: 'transparent' }}
          borderWidth="0" fontSize="md" placeholder="Please write your comment here …" autoCompleteType={undefined} />
      </Box>
    </Center>
  )
}

export default DateAnswer