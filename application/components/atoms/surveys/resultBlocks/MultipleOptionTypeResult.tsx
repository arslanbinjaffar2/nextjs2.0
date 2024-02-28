import React from 'react';
import { Box, Center, Checkbox, Divider, HStack, Input, Radio, Text, TextArea, VStack } from 'native-base';
import { Question } from 'application/models/survey/ResultDetail';
import { Platform } from 'react-native';
import CorrectAnswer from 'application/assets/icons/CorrectAnswer';
import WrongAnswer from 'application/assets/icons/WrongAnswer';
import Icodocument from 'application/assets/icons/PollCommentIcon';
type PropTypes = {
  question: Question
  questionNumber:number
}
const MultiOptionTypeResult = ({ question, questionNumber  }: PropTypes) => {
  
  return (
    <>
        {question.results && question.results.length > 0 && <Center maxW="100%" w="100%" mb="3" bg="primary.box" borderWidth="1" borderColor="primary.bdBox" rounded="10">
        <Box mb="3" w="100%">
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" alignItems="center" justifyContent={'space-between'} roundedTop={10}>
                <Text fontWeight="600" maxW="80%" fontSize="lg">Question {`#${questionNumber + 1}`} </Text>
                <Box >
                  {question.answer.find((a)=>(a.correct == 1)) && question?.result_score !== undefined && question?.result_score[0] !== undefined && (
                     question?.result_score[0]?.score > 0 ? 
                     <HStack  space="3" alignItems="center">
                      <HStack  space="1" alignItems="center">
                        <CorrectAnswer  />  <Text fontWeight="500" fontSize="lg" textAlign={'right'}> {`Correct Answer`} </Text>
                      </HStack>
                      <Divider h={4} bg={'primary.text'} orientation='vertical' />
                      <Text fontSize="lg">Point : 1</Text>
                    </HStack> : 
                     <HStack  space="3" alignItems="center">
                      <HStack  space="1" alignItems="center">
                        <WrongAnswer  />  <Text fontWeight="500" fontSize="lg" textAlign={'right'}> {`Wrong Answer`} </Text>
                      </HStack>
                      <Divider h={4} bg={'primary.text'} orientation='vertical' />
                      <Text fontSize="lg">Point : 0</Text>
                    </HStack>
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
                    {question.answer.filter((a)=>( question?.results.find((r)=>(r.answer_id == a.id)) )).map((answer, i)=>(
                      <HStack px='4' space={1} alignItems={'center'} >
                        <Box width="20px" height="20px" >
                          {question.answer.find((a)=>(a.correct == 1)) &&  (answer?.correct == 1 ? <CorrectAnswer  /> : <WrongAnswer/>)}
                        </Box>
                        <Text  fontSize="lg" color={'primary.text'} >{`${i + 1}-  `}{answer?.info.answer}</Text>
                      </HStack>
                    ))}
            </VStack>
        </Box>
        
        {Number(question.enable_comments) === 1 && question.results[0]?.comment !== '' &&
            <>
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
            <Icodocument  />
            <Text fontSize="lg">Comments</Text>
            </HStack>
            <Box py="3" px="4" w="100%">
                 <Text fontSize="md">{question.results[0]?.comment}</Text>
            </Box>
            </>
        }
        </Center>}
    </>
  )
}

export default MultiOptionTypeResult