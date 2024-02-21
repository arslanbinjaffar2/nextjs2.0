import React from 'react'
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Divider, Button, ScrollView, Pressable, Heading, TextArea } from 'native-base';
import Icodocument from 'application/assets/icons/small/Icodocument';
import { Linking } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import UseNoteService from 'application/store/services/UseNoteService';
import UseSponsorService from 'application/store/services/UseSponsorService';
import DynamicIcon from 'application/utils/DynamicIcon';

const NotesBox = () => {
  const { detail } = UseSponsorService();
  const { saving_notes, SaveNote } = UseNoteService();
  const [note, setNote] = React.useState('')
  return (
    <>
        {detail?.detail !== undefined && <Box p="0" w="100%" bg={'primary.box'} mb={5} rounded={8}>
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center" rounded={8}>
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
                <Box justifyContent={'flex-end'} alignItems={'flex-end'}>
                    <Pressable onPress={() => { 
                        if(note !== '' && !saving_notes){
                            SaveNote({note:note, note_type:'sponsors', note_type_id: detail.detail?.id});
                            setNote('');
                        }
                     }}><Icon as={FontAwesome} name="save" size={'lg'} color={'primary.text'} /></Pressable>
                </Box>
            </Box>
        </Box>}
    </>
  )
}

export default NotesBox