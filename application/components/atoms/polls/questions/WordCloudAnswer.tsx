import React from 'react';
import { Box, Center, Checkbox, Divider, HStack, Input, Radio, Text, TextArea, VStack } from 'native-base';
import Icodocument from 'application/assets/icons/small/Icodocument';
import { Question, FormData } from 'application/models/poll/Detail';

type PropTypes = {
  question: Question,
  formData: FormData,
  updateFormData: (question_id:number, type:string, answer:any) => void
}
const WordCloudAnswer = ({ question, formData, updateFormData }: PropTypes) => {
  console.log(question)
  return (
    <Center maxW="100%" w="100%" mb="0">
      <Box mb="3" py="3" px="4" w="100%">
        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{question?.info?.question} {question?.required_question == '1' && <Text display="inline" color="red.500">*</Text>}</Text>
        <Divider mb="5" opacity={0.27} bg="primary.text" />
        <VStack space="3" alignItems="center">
          {[...Array(2)].map((item, k) =>
            <HStack alignItems="center" key={k} w="100%">
              <Text w="10%" fontSize="lg">{k+1}</Text>
               <Input placeholder="Please Enter" width="90%"  />
            </HStack> 
          )}
        </VStack>
      </Box>
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
          borderWidth="0" fontSize="md" placeholder="Please write your comment here …" autoCompleteType={undefined} />
      </Box>
    </Center>
  )
}

export default WordCloudAnswer