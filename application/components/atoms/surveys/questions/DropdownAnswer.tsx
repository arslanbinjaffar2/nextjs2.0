import React from 'react';
import { Box, Center, Checkbox, Divider, HStack, Select, Text, TextArea, VStack } from 'native-base';
import Icodocument from 'application/assets/icons/small/Icodocument';
import { Question, FormData } from 'application/models/survey/Detail';

type PropTypes = {
  question: Question,
  formData: FormData,
  updateFormData: (question_id:number, type:string, answer:any, index?:number) => void,
  error:string|null
}
const DropdownAnswer = ({ question, formData, updateFormData, error }: PropTypes) => {
  return (
    <Center maxW="100%" w="100%" mb="0">
      <Box mb="5" py="3" px="4" w="100%">
        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{question?.value} {Number(question?.required_question) === 1 &&  <Text display="inline" color="red.500">*</Text>}</Text>
        <Divider mb="5" opacity={0.27} bg="primary.text" />
        <Select
          placeholder="Please Select"
          minWidth="64"
          h="50px"
          selectedValue={formData[question.id]?.answer[0]}
          onValueChange={answer => updateFormData(question.id, question.question_type, answer)}
        >
          {question?.answer.map((answer, key)=>(<Select.Item  key={key} label={answer.answer} value={`${answer.id}`} />))}
        </Select>
      </Box>
      {error && <Box  mb="3" py="3" px="4" backgroundColor="red.200" w="100%">
              <Text color="red.400"> {error} </Text>
      </Box>}
      {Number(question.enable_comments) === 1 &&
        <>
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
              onChange={(e) => updateFormData(question.id, 'comment', e.currentTarget.value)}
              onChangeText={(text) => updateFormData(question.id, 'comment', text)}
              borderWidth="0" fontSize="md" placeholder="Please write your comment here …" autoCompleteType={undefined} />
          </Box>
        </>
      }
    </Center>
  )
}

export default DropdownAnswer