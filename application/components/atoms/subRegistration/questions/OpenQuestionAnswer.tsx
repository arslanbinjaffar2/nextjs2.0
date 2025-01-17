import React, { useEffect } from 'react';
import { Box, Center, Checkbox, Divider, HStack, Input, Radio, Text, TextArea, VStack } from 'native-base';
import Icowritecomment from 'application/assets/icons/small/Icowritecomment';
import { Question, FormData } from 'application/models/subRegistration/SubRegistration';
import { Platform } from 'react-native';
import UseEventService from 'application/store/services/UseEventService';
import Comments from 'application/components/atoms/subRegistration/questions/Comments';

type PropTypes = {
  question: Question,
  updates:number,
  onsubmit:number,
  formData: FormData,
  updateFormData: (question_id:number, type:string, answer:any, index?:number) => void,
  error:string|null,
  canChangeAnswer?:number
}
const OpenQuestionAnswer = ({ question, formData, updateFormData, error, canChangeAnswer, updates, onsubmit }: PropTypes) => {
  const { event } = UseEventService()
  const [inputText, setInputText] = React.useState(formData[question.id]?.answer ?? '');
  const refElement = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (error) {
      if (refElement.current) {
        refElement.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "start"  });
      }
    }
  }, [onsubmit])

  const [characterLimit,setCharacterLimit] =  React.useState(2000);

  function updateInputText(updatedText:string) {
    updatedText = updatedText.slice(0, characterLimit);
    setInputText(updatedText);
    updateFormData(question.id, question.question_type, updatedText)
  }

  return (
    <Center  ref={refElement} maxW="100%" w="100%" mb="0">
      <Box mb="3" py="3" px="4" w="100%">
        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{question?.required_question == '1' && <Text display={Platform.OS === 'web' ? "inline" : 'flex'} color="red.500">*</Text>} {question?.info?.[0]?.value}</Text>
        <Divider mb="5" opacity={0.27} bg="primary.text" />
        <TextArea w="100%" bg="primary.darkbox" isDisabled={ (canChangeAnswer !== undefined && canChangeAnswer == 0) ? true : false }  borderColor={'primary.darkbox'} fontSize={'lg'} placeholder={event?.labels?.GENERAL_ANSWER} autoCompleteType={undefined} 
          value={inputText}
          onChangeText={(answer)=>{ updateInputText(answer) }}
        />
        <HStack px="" py="1" w="100%" space="3" alignItems="center" justifyContent="end">
          <Text fontSize="sm">
            {characterLimit - inputText.length > 0 ? characterLimit - inputText.length : 0} {event?.labels?.GENERAL_CHARACTER_REMAINING}
          </Text>
        </HStack>
      </Box>
      {error && <Box  mb="3" py="3" px="4" backgroundColor="red.100" w="100%">
              <Text color="red.900"> {error} </Text>
      </Box>}
      {Number(question.enable_comments) === 1 && <Comments question={question} updateFormData={updateFormData} canChangeAnswer={canChangeAnswer} />}
    </Center>
  )
}

export default OpenQuestionAnswer