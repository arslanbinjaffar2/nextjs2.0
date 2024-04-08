import React, { useEffect, useState } from 'react'
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Divider, Button, ScrollView, Pressable, Heading, TextArea } from 'native-base';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import UseNoteService from 'application/store/services/UseNoteService';
import UseEventService from 'application/store/services/UseEventService';
import DynamicIcon from 'application/utils/DynamicIcon';
import UseToastService from 'application/store/services/UseToastService';
type AppProps = {
    note_type: string,
    note_type_id: any,
    children?: React.ReactNode
}
const NotesBox = ({note_type,note_type_id,children}:AppProps) => {
  const { my_note,saving_notes, SaveNote,GetNote,UpdateNote } = UseNoteService();
  const [note, setNote] = React.useState('')
  const [isNewNote, setIsNewNote] = React.useState(true)
  const {AddToast}=UseToastService()
  const {event} = UseEventService();

  useEffect(()=>{
    GetNote({note_type:note_type, note_type_id:note_type_id});
  },[])

  useEffect(()=>{
    if(my_note == null || my_note?.id === undefined || my_note?.id === 0){
        setIsNewNote(true);
    }else{
        setIsNewNote(false);
    }
    setNote(my_note?.notes ?? '');
  },[my_note])

  function save(){
    if(note === '' || saving_notes){
        return;
    }
    if(isNewNote){
        SaveNote({note:note, note_type:note_type, note_type_id:note_type_id });
        AddToast({message:"save notes",status:"success"})
    }else{
        UpdateNote({notes:note, id:my_note?.id, type:note_type});
        AddToast({message:"updated notes",status:"success"})
    }

  }

  return (
    <>
        <Box p="0" w="100%" bg={'primary.box'} mb={children ? 0 : 5} rounded={8}>
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center" roundedTop={8}>
                <DynamicIcon iconType={'notes'} iconProps={{ width: 15, height: 18 }} />
                <Text fontSize="lg">{event?.labels?.GENERAL_NOTES}</Text>
            </HStack>
            <Box py="3" px="4" w="100%">
            <TextArea
                p="0"
                h="60px"
                focusOutlineColor="transparent"
                _focus={{ bg: 'transparent' }}
                value={note}
                onChangeText={(text)=>setNote(text)}
                borderWidth="0" fontSize="md" placeholder={event?.labels?.GENERAL_TAKE_NOTES} autoCompleteType={undefined} />
                <HStack justifyContent={'flex-end'} alignItems={'flex-end'} space={2}>
                    {children}
                    <Pressable onPress={() => save()}><Icon as={FontAwesome} name="save" size={'lg'} color={'primary.text'} /></Pressable>
                </HStack>
            </Box>
        </Box>
    </>
  )
}

export default NotesBox