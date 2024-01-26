import React from 'react';
import { Box, Center, Checkbox, Divider, HStack, Icon, Radio, Text, TextArea, VStack } from 'native-base';
import Icodocument from 'application/assets/icons/small/Icodocument';
import { Question, FormData } from 'application/models/poll/Detail';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Platform } from 'react-native';

type PropTypes = {
  question: Question,
  formData: FormData,
  updateFormData: (question_id:number, type:string, answer:any, index?:number) => void,
  error:string|null,
  labels:any,
  forceRender:number,
}
const SingleAnswer = ({ question, formData, updateFormData, error, labels }: PropTypes) => {
  

  return (
    <Center maxW="100%" w="100%" mb="0">
      <Box mb="3" py="3" px="4" w="100%">
        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{question?.info?.question} {Number(question?.required_question) === 1 && <Text display={Platform.OS === 'web' ? "inline" : 'flex'} color="red.500">*</Text>}</Text>
        <Divider mb="5" opacity={0.27} bg="primary.text" />
        <Radio.Group space="5" defaultValue={formData[question.id]?.answer !== null && formData[question.id]?.answer.length > 0 ? `${formData[question.id]?.answer[0]}` : ``} name="MyRadioGroup"  onChange={answer_id => {updateFormData(question.id, question.question_type, answer_id);}}>
          {question.answer.map((answer, k) =>
            <Radio  key={k}  value={`${answer.id}`}> {answer.answer} </Radio>
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
            <Text fontSize="lg">{labels?.GENERAL_YOUR_COMMENT}</Text>
          </HStack>
          <Box py="3" px="4" w="100%">
             <TextArea
              p="3"
              mb={1}
              h="100px"
              bg={'primary.darkbox'}
              defaultValue={formData[question.id]?.comment !== null ? formData[question.id]?.comment : ``}
              onChange={(e) => updateFormData(question.id, 'comment', e.currentTarget.valueOf)}
              onChangeText={(text) => {updateFormData(question.id, 'comment', text); }}
              borderWidth="0" fontSize="md" placeholder={labels?.GENERAL_COMMENT} autoCompleteType={undefined} />
              <Text fontSize="sm" textAlign={'right'}>{labels?.GENERAL_CHARACTER_REMAINING !== undefined ? `510 ${labels?.GENERAL_CHARACTER_REMAINING}` : ''}</Text>
          </Box>
        </>
      }
    </Center>
  )
}

export default SingleAnswer