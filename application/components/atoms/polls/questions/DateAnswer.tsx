import React from 'react';
import { Box, Center, Checkbox, Divider, HStack, Input, Radio, Text, TextArea, VStack } from 'native-base';
import Icodocument from 'application/assets/icons/small/Icodocument';
import { Question, FormData } from 'application/models/poll/Detail';
import DateTimePicker from '../../DateTimePicker';
import { Platform } from 'react-native';


type PropTypes = {
  question: Question,
  formData: FormData,
  updateFormData: (question_id:number, type:string, answer:any) => void,
  error:string|null,
  labels:any,
  forceRender:number,
}
const DateAnswer = ({ question, formData, updateFormData, labels }: PropTypes) => {
  const [show, setshow] = React.useState(false)
  const [commentText, setCommentText] = React.useState(formData[question.id]?.comment ?? '')

  const handleChange = ({}) => {
    console.log('handleChange')
  }
  return (
    <Center zIndex={1} maxW="100%" w="100%" mb="0">
      <Box fontFamily={'Avenir'} zIndex={2} mb="3" py="3" px="4" w="100%">
        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{question?.info?.question} {question?.required_question == '1' && <Text display="inline" color="red.500">*</Text>}</Text>
        <Divider mb="5" opacity={0.27} bg="primary.text" />
        {Platform.OS === "web" && <DateTimePicker showtime={true} showdate={true} />}
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
          value={commentText}
          onChangeText={(text) => {updateFormData(question.id, 'comment', text); setCommentText(text);}}
          borderWidth="0" fontSize="md" placeholder="Please write your comment here …" autoCompleteType={undefined} />
          <Text fontSize="sm" textAlign={'right'}>{labels?.GENERAL_CHARACTER_REMAINING !== undefined ? `510 ${labels?.GENERAL_CHARACTER_REMAINING}` : ''}</Text>
      </Box>
    </Center>
  )
}

export default DateAnswer