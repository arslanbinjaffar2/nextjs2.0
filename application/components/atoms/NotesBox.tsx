import React, { useEffect, useState } from 'react'
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Divider, Button, ScrollView, Pressable, Heading, TextArea } from 'native-base';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import UseNoteService from 'application/store/services/UseNoteService';
import DynamicIcon from 'application/utils/DynamicIcon';
type AppProps = {
    note_type: string,
    note_type_id: any
}
const NotesBox = ({note_type,note_type_id}:AppProps) => {
  const { my_note,saving_notes, SaveNote,GetNote,UpdateNote } = UseNoteService();
  const [note, setNote] = React.useState('')
  const [isNewNote, setIsNewNote] = React.useState(true)

  useEffect(()=>{
    GetNote({note_type:note_type, note_type_id:note_type_id});
  },[])

  useEffect(()=>{
    console.log('my_note',my_note);
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
    }else{
        UpdateNote({notes:note, id:my_note?.id, type:note_type});
    }

  }

  return (
    <>
        <Box p="0" w="100%" bg={'primary.box'} mb={5} rounded={8}>
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center" roundedTop={8}>
                <DynamicIcon iconType={'my_notes'} iconProps={{ width: 15, height: 18 }} />
                <Text fontSize="lg">Notes {isNewNote ? 'New':'Old'} {saving_notes ? 'saving...':''}</Text>
            </HStack>
            <Box py="3" px="4" w="100%">
            <TextArea
                p="0"
                h="60px"
                focusOutlineColor="transparent"
                _focus={{ bg: 'transparent' }}
                value={note}
                onChangeText={(text)=>setNote(text)}
                borderWidth="0" fontSize="md" placeholder="Take note" autoCompleteType={undefined} />
                <Box justifyContent={'flex-end'} alignItems={'flex-end'}>
                    <Pressable onPress={() => save()}><Icon as={FontAwesome} name="save" size={'lg'} color={'primary.text'} /></Pressable>
                </Box>
            </Box>
        </Box>
    </>
  )
}

export default NotesBox