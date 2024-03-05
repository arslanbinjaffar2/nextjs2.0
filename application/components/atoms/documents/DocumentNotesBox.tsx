import React, { useEffect, useState } from 'react'
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Divider, Button, ScrollView, Pressable, Heading, TextArea } from 'native-base';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import UseNoteService from 'application/store/services/UseNoteService';
import DynamicIcon from 'application/utils/DynamicIcon';
import makeApi from "application/utils/ConfigureAxios";
import { HttpResponse } from 'application/models/GeneralResponse';
import { getMyNoteApi } from '../../../store/api/Notes.Api';


type AppProps = {
    note_type_id: number
    children?: React.ReactNode
}
const DocumentNotesBox = ({note_type_id, children}:AppProps) => {
  const { my_note,saving_notes, SaveNote,GetNote,UpdateNote } = UseNoteService();
  const [note, setNote] = React.useState('')
  const [isNewNote, setIsNewNote] = React.useState(true)
  const note_type = 'directory';

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getMyNoteApi({note_type:note_type, note_type_id:note_type_id}, {}); // Call the API function
        console.log(response);
      } catch (error) {
        // Handle error
      }
    }

    fetchData(); // Call the function to fetch data
  }, []);

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
    }else{
        UpdateNote({notes:note, id:my_note?.id, type:note_type});
    }

  }

  return (
    <>
        <Box p="0" w="100%" bg={'primary.box'} mb={children ? 0 : 5} rounded={8}>
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center" roundedTop={8}>
                <DynamicIcon iconType={'my_notes'} iconProps={{ width: 15, height: 18 }} />
                <Text fontSize="lg">Notes</Text>
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
                <HStack justifyContent={'flex-end'} alignItems={'flex-end'} space={2}>
                    {children}
                    <Pressable onPress={() => save()}><Icon as={FontAwesome} name="save" size={'lg'} color={'primary.text'} /></Pressable>
                </HStack>
            </Box>
        </Box>
    </>
  )
}

export default DocumentNotesBox