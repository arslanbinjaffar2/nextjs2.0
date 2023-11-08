import React from 'react';
import { Box, Center, Checkbox, Divider, HStack, Input, Radio, Text, TextArea, VStack } from 'native-base';
import Icodocument from 'application/assets/icons/small/Icodocument';
import { Question, FormData } from 'application/models/poll/Detail';
import { Platform } from 'react-native';

type PropTypes = {
  question: Question,
  formData: FormData,
  updateFormData: (question_id:number, type:string, answer:any, index?:number) => void,
  error:string|null,
  labels:any
}
const OpenQuestionAnswer = ({ question, formData, updateFormData, error, labels }: PropTypes) => {
  const [inputText, setInputText] = React.useState(formData[question.id]?.answer ?? '')
  const [commentText, setCommentText] = React.useState(formData[question.id]?.comment ?? '')

  return (
    <Center maxW="100%" w="100%" mb="0">
      <Box mb="3" py="3" px="4" w="100%">
        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{question?.info.question} {question?.required_question == '1' && <Text display={Platform.OS === 'web' ? "inline" : 'flex'} color="red.500">*</Text>}</Text>
        <Divider mb="5" opacity={0.27} bg="primary.text" />
        <TextArea w="100%" bg="primary.darkbox" borderColor={'primary.darkbox'} fontSize={'lg'} placeholder="Please write here..." autoCompleteType={undefined} 
          value={inputText}
          onChangeText={(answer)=>{ 
            updateFormData(question.id, question.question_type, answer)
            setInputText(answer)
          }}
        />
        <Text fontSize="sm" textAlign={'right'}>{labels?.GENERAL_CHARACTER_REMAINING !== undefined ? `510 ${labels?.GENERAL_CHARACTER_REMAINING}` : ''}</Text>
      </Box>
      {error && <Box  mb="3" py="3" px="4" backgroundColor="red.300" w="100%">
              <Text color="red.900"> {error} </Text>
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
            focusOutlineColor="transparent"
            _focus={{ bg: 'transparent' }}
            value={commentText}
            onChangeText={(text) => {updateFormData(question.id, 'comment', text); setCommentText(text);}}
            borderWidth="0" fontSize="md" placeholder="Please write your comment here …" autoCompleteType={undefined} />
            <Text fontSize="sm" textAlign={'right'}>{labels?.GENERAL_CHARACTER_REMAINING !== undefined ? `510 ${labels?.GENERAL_CHARACTER_REMAINING}` : ''}</Text>
        </Box>
        </>
      }
    </Center>
  )
}

export default OpenQuestionAnswer