import React from 'react';
import { Box, Center, Checkbox, Divider, HStack, Input, Radio, Text, TextArea, VStack } from 'native-base';
import Icowritecomment from 'application/assets/icons/small/Icowritecomment';
import { Question, FormData } from 'application/models/poll/Detail';
import { Platform } from 'react-native';
import UsePollService from 'application/store/services/UsePollService';

type PropTypes = {
  question: Question,
  formData: FormData,
  updateFormData: (question_id:number, type:string, answer:any, index?:number) => void,
  error:string|null,
  labels:any,
  forceRender:number,
}
const OpenQuestionAnswer = ({ question, formData, updateFormData, error, labels }: PropTypes) => {
  const [inputText, setInputText] = React.useState(formData[question.id]?.answer ?? '')
  const { poll_labels } = UsePollService();

  return (
    <Center maxW="100%" w="100%" mb="0">
      <Box mb="3" py="3" px="4" w="100%">
        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{question?.required_question == '1' && <Text display={Platform.OS === 'web' ? "inline" : 'flex'} color="red.500">*</Text>} {question?.info.question}</Text>
        <Divider mb="5" opacity={0.27} bg="primary.text" />
        <TextArea w="100%" bg="primary.darkbox" borderColor={'primary.darkbox'} fontSize={'lg'} placeholder={poll_labels?.POLL_SURVEY_ANSWER} autoCompleteType={undefined} 
          value={inputText}
          onChangeText={(answer)=>{ 
            updateFormData(question.id, question.question_type, answer)
            setInputText(answer)
          }}
        />
        <Text fontSize="sm" textAlign={'right'}>{labels?.GENERAL_CHARACTER_REMAINING !== undefined ? `510 ${labels?.GENERAL_CHARACTER_REMAINING}` : ''}</Text>
      </Box>
      {error && <Box  mb="3" py="3" px="4" backgroundColor="red.100" w="100%">
              <Text color="red.900"> {error} </Text>
      </Box>}
      {Number(question.enable_comments) === 1 &&
        <>
        <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
          <Icowritecomment width="15px" height="18px" />
          <Text fontSize="lg">{labels?.GENERAL_YOUR_COMMENT}</Text>
        </HStack>
        <Box py="3" px="4" w="100%">
           <TextArea
            p="3"
            mb={1}
            h="100px"
            bg={'primary.darkbox'}
            defaultValue={formData[question.id]?.comment !== null ? formData[question.id]?.comment : ``}
            onChangeText={(text) => {updateFormData(question.id, 'comment', text); }}
            borderWidth="0" fontSize="md" placeholder={labels?.GENERAL_COMMENT} autoCompleteType={undefined} />
            <Text fontSize="sm" textAlign={'right'}>{labels?.GENERAL_CHARACTER_REMAINING !== undefined ? `510 ${labels?.GENERAL_CHARACTER_REMAINING}` : ''}</Text>
        </Box>
        </>
      }
    </Center>
  )
}

export default OpenQuestionAnswer