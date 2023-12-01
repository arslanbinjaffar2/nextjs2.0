import React from 'react';
import { Box, Center, Checkbox, Divider, HStack, Input, Radio, Text, TextArea, VStack } from 'native-base';
import Icodocument from 'application/assets/icons/small/Icodocument';
import { Question } from 'application/models/survey/ResultDetail';
import { Platform } from 'react-native';

type PropTypes = {
  question: Question
  questionNumber:number
}
const InputTypeResult = ({ question, questionNumber  }: PropTypes) => {
  
  return (
    <>
        {question.results && question.results.length > 0 && <Center maxW="100%" w="100%" mb="3" bg="primary.box" borderWidth="1" borderColor="primary.bdBox" rounded="10">
        <Box mb="3" w="100%">
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" alignItems="center">
                <Text fontWeight="600" maxW="80%" fontSize="lg">Q-{questionNumber + 1} {". "} {question?.info.question} {question?.required_question == '1' && <Text display={Platform.OS === 'web' ? "inline" : 'flex'} color="red.500">*</Text>}</Text>
            </HStack>
            <Divider mb="5" opacity={0.27} bg="primary.text" />
            <Text px='3' fontSize="lg">{question.results[0]?.answer}</Text>

        </Box>
        
        {Number(question.enable_comments) === 1 && question.results[0]?.comment !== '' &&
            <>
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
            <Icodocument width="15px" height="18px" />
            <Text fontSize="lg">Comments</Text>
            </HStack>
            <Box py="3" px="4" w="100%">
                <TextArea
                p="0"
                h="30px"
                isReadOnly
                focusOutlineColor="transparent"
                _focus={{ bg: 'transparent' }}
                defaultValue={question.results[0]?.comment}
                borderWidth="0" fontSize="md" placeholder="Please write your comment here …" autoCompleteType={undefined} />
            </Box>
            </>
        }
        </Center>}
    </>
  )
}

export default InputTypeResult