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

  
  function updateComment(updatedComment:string) {
    if (comment.length < updatedComment.length && updatedComment.length > characterLimit) {
      return;
    }
    setComment(updatedComment);
    updateFormData(question.id, 'comment', updatedComment);
  }

  return (
    <>
        <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
          <Icodocument width="15px" height="18px" />
          <Text fontSize="lg">{event?.labels?.GENERAL_YOUR_COMMENT}</Text>
        </HStack>
        <Box pt="3" px="4" w="100%">
          <TextArea
            p="3"
            mb={1}
            h="100px"
            bg={'primary.darkbox'}
            value={comment}
            isDisabled={ (canChangeAnswer !== undefined && canChangeAnswer == 0) ? true : false }
            onChange={(e) => updateComment(e.currentTarget.valueOf.toString())}
            onChangeText={(text) => updateComment(text)}
            borderWidth="1" borderColor={'primary.darkbox'} fontSize="md" placeholder={event?.labels?.GENERAL_COMMENT} autoCompleteType={undefined} />
        </Box>
        <HStack px="4" py="1" w="100%" space="3" alignItems="center" justifyContent="end">
          <Text fontSize="sm">
            {characterLimit - comment.length > 0 ? characterLimit - comment.length : 0} {event?.labels?.GENERAL_CHARACTER_REMAINING}
          </Text>
        </HStack>
      </>
  )
}

export default Comments