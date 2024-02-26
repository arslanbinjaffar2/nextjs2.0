import React from 'react';
import { Box, Center, Checkbox, Divider, HStack, Input, Radio, ScrollView, Text, TextArea, VStack } from 'native-base';
import Icodocument from 'application/assets/icons/PollCommentIcon';
import { Question } from 'application/models/poll/ResultDetail';
import { Platform } from 'react-native';
type PropTypes = {
  question: Question,
  questionNumber:number
}
const MatrixTypeResult = ({ question, questionNumber }: PropTypes) => {
  

  return (
    <>
      {question.results && question.results.length > 0 && <Center maxW="100%" w="100%" mb="3" bg="primary.box" borderWidth="1" borderColor="primary.bdBox" rounded="10">
        
      <Box mb="3" w="100%">
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" alignItems="center" roundedTop={10}>
                <Text fontWeight="600" maxW="80%" fontSize="lg">Question {`#${questionNumber + 1}`} </Text>
            </HStack>
            {/* <Divider mb="5" opacity={0.27} bg="primary.text" /> */}
            <Text px='4' py={4} fontSize="xl">{question?.info.question} {question?.required_question == '1' && <Text display={Platform.OS === 'web' ? "inline" : 'flex'} color="red.500">*</Text>}</Text>

        </Box>
        <Box mb="3" w="100%">
          <HStack px="3" py="1" bg="primary.darkbox" w="100%" alignItems="center">
                <Text fontWeight="600" maxW="80%" fontSize="lg">Your Answer</Text>
            </HStack>
            <Divider mb="5" opacity={0.27} bg="primary.text" />
          <ScrollView w={['320px','100%']} pb="5" showsHorizontalScrollIndicator={true} overflowX={'auto'} showsVerticalScrollIndicator={true}>
            <Box position="relative" w="100%" rounded="lg">
            <HStack space="1" alignItems="center" pb="3">
              <Center zIndex={9} position={Platform.OS === 'web' ? `sticky`: 'absolute'} left={0} minW="150px" maxW="150px"  flex="1" height="20px"></Center>
              {question?.matrix.map((matrix, k) =>
              <React.Fragment key={k}>
                  <Center minW="100px" flex="1"><Text px='3' fontSize="lg">{matrix.name}</Text></Center>
                </React.Fragment>
              )}
            </HStack>
            <VStack  w="100%" space="3">
              {question?.answer.map((answer, k) =>
              <Radio.Group isReadOnly w="100%" key={answer.id} display={'flex'} name={`group-${k}`} aria-label={answer?.info?.answer}  defaultValue={question?.results?.find((r)=>(r.answer_id == answer.id))?.answer ?? ''}    >
                <HStack w="100%" key={k} space="1" alignItems="center">
                  <Center  zIndex={9} alignItems="flex-start" position={Platform.OS === 'web' ? `sticky`: 'absolute'} left={0} minW="150px" maxW="150px"  flex="1">
                    <Text pl={3} fontSize="lg">
                      {answer?.info?.answer}
                    </Text>
                  </Center>
                  
                  {question.matrix.map((matrix, i) =>
                    <Center minW="100px" flex="1" key={matrix.id}>
                    <Radio key={i} value={`${matrix.id}`}  />
                    </Center>
                  )}
                </HStack>
              </Radio.Group>
              )}
              </VStack>
              
            </Box>
          </ScrollView>
        
        </Box>
      
        {Number(question.enable_comments) === 1 && question.results[0]?.comments !== '' &&
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
                  defaultValue={question.results[0]?.comments}
                  borderWidth="0" fontSize="md" placeholder="Please write your comment here …" autoCompleteType={undefined} />
              </Box>
              </>
          }
      </Center>}
    </>
  )
}

export default MatrixTypeResult