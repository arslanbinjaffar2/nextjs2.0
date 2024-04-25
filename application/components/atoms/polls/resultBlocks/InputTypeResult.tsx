import React from 'react';
import { Box, Center, Checkbox, Divider, HStack, Input, Radio, Text, TextArea, VStack } from 'native-base';
import Icodocument from 'application/assets/icons/PollCommentIcon';
import { Question } from 'application/models/poll/ResultDetail';
import { Platform } from 'react-native';
import UsePollService from 'application/store/services/UsePollService';
import UseEventService from 'application/store/services/UseEventService';

type PropTypes = {
  question: Question
  questionNumber:number
}
const InputTypeResult = ({ question, questionNumber  }: PropTypes) => {
  const { poll_labels } = UsePollService();
  const { event } = UseEventService();

  return (
    <>
        {question.results && question.results.length > 0 && <Center maxW="100%" w="100%" mb="3" bg="primary.box" borderWidth="0" borderColor="primary.bdBox" rounded="10">
        <Box mb="3" w="100%">
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" alignItems="center" roundedTop={10}>
                <Text fontWeight="600" maxW="80%" fontSize="lg">Question {`#${questionNumber + 1}`} </Text>
            </HStack>
            {/* <Divider mb="5" opacity={0.27} bg="primary.text" /> */}
            <Text px='4' py={4} fontSize="xl">{question?.required_question == '1' && <Text display={Platform.OS === 'web' ? "inline" : 'flex'} color="red.500">*</Text>} {question?.info.question}</Text>

        </Box>
        
        <Box mb="3" w="100%">
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" alignItems="center">
                <Text fontWeight="600" maxW="80%" fontSize="lg">{poll_labels?.POLL_YOUR_ANSWER}</Text>
            </HStack>
            {/* <Divider mb="5" opacity={0.27} bg="primary.text" /> */}
            <Text px='4' py={4} fontSize="lg">{question.results[0]?.answer}</Text>

        </Box>
        
        {Number(question.enable_comments) === 1 && question.results[0]?.comments !== '' &&
            <>
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
            <Icodocument />
            <Text fontSize="lg">{event?.labels?.GENERAL_YOUR_COMMENT}</Text>
            </HStack>
            <Box py="3" px="4" w="100%">
               <Text fontSize="md">{question.results[0]?.comments}</Text>
               
            </Box>
            </>
        }
        </Center>}
    </>
  )
}

export default InputTypeResult