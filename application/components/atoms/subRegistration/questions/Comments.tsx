import React, { useEffect } from 'react';
import { Box, Center, Checkbox, Divider, HStack, Input, Radio, Text, TextArea, VStack } from 'native-base';
import Icodocument from 'application/assets/icons/small/Icodocument';
import { Question, FormData } from 'application/models/subRegistration/SubRegistration';
import UseEventService from 'application/store/services/UseEventService';


type PropTypes = {
  question: Question,
  updateFormData: (question_id:number, type:string, answer:any) => void,
  canChangeAnswer?:number
}
const Comments = ({ question, updateFormData, canChangeAnswer }: PropTypes) => {
  const { event } = UseEventService()
  const [comment,setComment] =  React.useState('');
  const [characterLimit,setCharacterLimit] =  React.useState(2000);

  useEffect(() => {
    setComment(question?.result?.[0]?.comments ?? '');
  }
  ,[question?.result]);

  
  function updateComment(comment:string) {
    setComment(comment);
    updateFormData(question.id, 'comment', comment);
  }

  return (
    <>
        <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
          <Icodocument width="15px" height="18px" />
          <Text fontSize="lg">{event?.labels?.GENERAL_YOUR_COMMENT}</Text>
        </HStack>
        <Box py="3" px="4" w="100%">
          <TextArea
            p="0"
            h="30px"
            value={comment}
            isDisabled={ (canChangeAnswer !== undefined && canChangeAnswer == 0) ? true : false }
            onChange={(e) => updateComment(e.currentTarget.valueOf.toString())}
            onChangeText={(text) => updateComment(text)}
            focusOutlineColor="transparent"
            _focus={{ bg: 'transparent' }}
            borderWidth="0" fontSize="md" placeholder={event?.labels?.GENERAL_COMMENT} autoCompleteType={undefined} />
        </Box>
        <Text>
          characterLimit: {characterLimit - comment.length}
        </Text>
      </>
  )
}

export default Comments