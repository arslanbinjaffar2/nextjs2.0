import React from 'react';
import { Box, Center, Checkbox, Divider, HStack, Input, Radio, Text, TextArea, VStack } from 'native-base';
import CorrectAnswer from 'application/assets/icons/CorrectAnswer';
import WrongAnswer from 'application/assets/icons/WrongAnswer';
import Icodocument from 'application/assets/icons/PollCommentIcon';
import { Question } from 'application/models/poll/ResultDetail';
import { Platform } from 'react-native';

type PropTypes = {
  question: Question
  questionNumber:number
}
const SingleOptionTypeResult = ({ question, questionNumber  }: PropTypes) => {
  
  return (
    <>
        {question.results && question.results.length > 0 && <Center maxW="100%" w="100%" mb="3" bg="primary.box" borderWidth="1" borderColor="primary.bdBox" rounded="10">
        <Box mb="3" w="100%">
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" alignItems="center" justifyContent={'space-between'} roundedTop={10}>
                <Text fontWeight="600" maxW="80%" fontSize="lg">Question {`#${questionNumber + 1}`} </Text>
                <Box width={'50%'} >
                  {question.answer.find((a)=>(a.correct == 1)) && question?.score !== undefined  &&  question.score[0] !== undefined && (
                     question?.score[0]?.score > 0 ? 
                     <Text fontWeight="600" fontSize="lg" textAlign={'right'}><CorrectAnswer  /> {`Correct Answer | Point : 1`} </Text> : 
                     <Text fontWeight="600" fontSize="lg" textAlign={'right'}><WrongAnswer/> {`Wrong Answer | Point : 0`} </Text> 
                  )}
                  
                </Box>
            </HStack>
            {/* <Divider mb="5" opacity={0.27} bg="primary.text" /> */}
            <Text px='4' py={4} fontSize="xl">{question?.info.question} {question?.required_question == '1' && <Text display={Platform.OS === 'web' ? "inline" : 'flex'} color="red.500">*</Text>}</Text>
            <VStack>
                    {question.answer.map((answer, i)=>(
                      <HStack px='4' space={1} alignItems={'center'} >
                        <Box width="20px" height="20px" >
                          {answer?.correct == 1 && <CorrectAnswer  />}
                        </Box>
                        <Text  fontSize="lg" color={'primary.text'} >{`${i + 1}-  `}{answer?.info.answer}</Text>
                      </HStack>
                    ))}
            </VStack>
        </Box>
        <Box mb="3" w="100%">
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" alignItems="center">
                <Text fontWeight="600" maxW="80%" fontSize="lg">Your answer </Text>
            </HStack>
            <VStack>
                    {question.answer.filter((a)=>(a.id == question?.results[0]?.answer_id)).map((answer, i)=>(
                      <HStack px='4' py={2} space={1} alignItems={'center'} >
                        <Box width="20px" height="20px" >
                          {question.answer.find((a)=>(a.correct == 1)) &&  (answer?.correct == 1 ? <CorrectAnswer  /> : <WrongAnswer/>)}
                        </Box>
                        <Text  fontSize="lg" color={'primary.text'} >{`${i + 1}-  `}{answer?.info.answer}</Text>
                      </HStack>
                    ))}
            </VStack>
        </Box>
        
        {Number(question.enable_comments) === 1 && question.results[0]?.comments !== '' &&
            <>
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
            <Icodocument  />
            <Text fontSize="lg">Comments</Text>
            </HStack>
            <Box py="3" px="4" w="100%">
                <TextArea
                p="0"
                h="30px"
                isReadOnly
                focusOutlineColor="transparent"
                _focus={{ bg: 'transparent' }}
                defaultValue={question.results[0]?.comments}
                borderWidth="0" fontSize="md" placeholder="Please write your comment here …" autoCompleteType={undefined} />
            </Box>
            </>
        }
        </Center>}
    </>
  )
}

export default SingleOptionTypeResult