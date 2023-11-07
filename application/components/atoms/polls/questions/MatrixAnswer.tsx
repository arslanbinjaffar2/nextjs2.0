import React from 'react';
import { Box, Center, Checkbox, Divider, HStack, Input, Radio, ScrollView, Text, TextArea, VStack } from 'native-base';
import Icodocument from 'application/assets/icons/small/Icodocument';
import { Question, FormData } from 'application/models/poll/Detail';
import { Platform } from 'react-native';
type PropTypes = {
  question: Question,
  formData: FormData,
  updateFormData: (question_id:number, type:string, answer:any, index?:number) => void
  error:string|null,
  labels:any
}
const MatrixAnswer = ({ question, formData, updateFormData, error, labels }: PropTypes) => {
  return (
    <Center maxW="100%" w="100%" mb="0">
      <Box mb="3" py="3" px="4" w="100%">
        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{question?.info.question} {question?.required_question == '1' && <Text display={Platform.OS === 'web' ? "inline" : 'flex'} color="red.500">*</Text>}</Text>
        <Divider mb="5" opacity={0.27} bg="primary.text" />
        <ScrollView w="100%" pb="5" showsHorizontalScrollIndicator={true} overflowX={'auto'} showsVerticalScrollIndicator={true}>
          <Box position="relative" w="100%" rounded="lg">
          <HStack space="1" alignItems="center" pb="3">
            <Center zIndex={9} position={Platform.OS === 'web' ? `sticky`: 'absolute'} left={0} minW="150px" maxW="150px"  flex="1" height="20px"></Center>
            {question?.matrix.map((matrix, k) =>
             <React.Fragment key={k}>
                <Center minW="100px" flex="1"><Text fontSize="lg">{matrix.name}</Text></Center>
              </React.Fragment>
            )}
          </HStack>
          <VStack  w="100%" space="3">
            {question?.answer.map((answer, k) =>
            <Radio.Group w="100%" key={answer.id} display={'flex'} name={`group-${k}`} aria-label={answer?.answer}  defaultValue={`${formData[question.id]?.answer[k] ?? ''}`}   onChange={matrix_id => {updateFormData(question.id, question.question_type, matrix_id, answer.id);}}>
              <HStack w="100%" key={k} space="1" alignItems="center">
                <Center  zIndex={9} alignItems="flex-start" position={Platform.OS === 'web' ? `sticky`: 'absolute'} left={0} minW="150px" maxW="150px"  flex="1">
                  <Text fontSize="lg">
                    {answer?.answer}
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
      {error && <Box  mb="3" py="3" px="4" backgroundColor="red.200" w="100%">
              <Text color="red.400"> {error} </Text>
      </Box>}
      
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
          onChangeText={(text) => updateFormData(question.id, 'comment', text)}
          borderWidth="0" fontSize="md" placeholder="Please write your comment here …" autoCompleteType={undefined} />
          <Text fontSize="sm" textAlign={'right'}>{labels?.GENERAL_CHARACTER_REMAINING !== undefined ? `510 ${labels?.GENERAL_CHARACTER_REMAINING}` : ''}</Text>
      </Box>
    </Center>
  )
}

export default MatrixAnswer