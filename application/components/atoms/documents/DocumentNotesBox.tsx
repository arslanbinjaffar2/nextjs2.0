import React, { useEffect, useState } from 'react'
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Divider, Button, ScrollView, Pressable, Heading, TextArea } from 'native-base';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import DynamicIcon from 'application/utils/DynamicIcon';
import { getMyNoteApi, saveNote, updateNote } from 'application/store/api/Notes.Api';
import { MyNote } from 'application/models/notes/Notes';
import { store } from 'application/store/Index';
import UseEventService from 'application/store/services/UseEventService';



type AppProps = {
    note_type_id: number
    children?: React.ReactNode
}
const DocumentNotesBox = ({note_type_id, children}:AppProps) => {
  const [note, setNote] = React.useState('')
  const [isNewNote, setIsNewNote] = React.useState(true)
  const noteType = 'directory';

  const [myNote, setMyNote] = useState<MyNote|null>(null);

  const [loadingNote, setLoadingNote] = useState<boolean>(false);

  const {event} = UseEventService();

  async function fetchNotes() {
    const mystate=store.getState()
    setLoadingNote(true);
    try {
      const response = await getMyNoteApi({note_type:noteType, note_type_id:note_type_id},mystate); // Call the API function
      setMyNote(response.data.data.note);
      setLoadingNote(false);
    } catch (error) {
      console.log('error', error);
    }
  }

  async function saveNotes() {
    const mystate=store.getState()
    setLoadingNote(true);
    try {
      await saveNote ({note: note,note_type:noteType, note_type_id:note_type_id},mystate); // Call the API function
      fetchNotes();
      setLoadingNote(false);
    } catch (error) {
      console.log('error', error);
    }
  }

  async function updateNotes() {
    const mystate=store.getState()
    setLoadingNote(true);
    try {
      await updateNote ({notes: note,id:myNote?.id, type:noteType},mystate); // Call the API function
      setLoadingNote(false);
    } catch (error) {
      console.log('error', error);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);


  useEffect(()=>{
    if(myNote == null || myNote?.id === undefined || myNote?.id === 0){
        setIsNewNote(true);
    }else{
        setIsNewNote(false);
    }
    setNote(myNote?.notes ?? '');
  },[myNote])


  function save() {
    if (note === '' || loadingNote) {
      return;
    }
    isNewNote ? saveNotes() : updateNotes();
  }

  return (
    <>
        <Box p="0" w="100%" bg={'primary.box'} mb={children ? 0 : 5} rounded={8}>
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center" roundedTop={8}>
                <DynamicIcon iconType={'my_notes'} iconProps={{ width: 15, height: 18 }} />
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
                    <Pressable onPress={() => save()} disabled={loadingNote}><Icon as={FontAwesome} name="save" size={'lg'} color={'primary.text'} /></Pressable>
                </HStack>
            </Box>
        </Box>
    </>
  )
}

export default DocumentNotesBox