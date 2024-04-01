import React from 'react'
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Divider, Button, ScrollView, Pressable, Heading, TextArea } from 'native-base';
import Icodocument from 'application/assets/icons/small/Icodocument';
import { Linking } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import UseNoteService from 'application/store/services/UseNoteService';
import UseProgramService from 'application/store/services/UseProgramService';
import DynamicIcon from 'application/utils/DynamicIcon';
import NotesBoxGeneral from 'application/components/atoms/NotesBox';
import { createParam } from 'solito';

type ScreenParams = { id: string }
const { useParam } = createParam<ScreenParams>()

const NotesBox = () => {
  const { detail } = UseProgramService();
  const [_id] = useParam('id');
  return (
    <>
        {detail.program !== undefined && detail?.program_tabs_settings!?.filter((tab: any, key: number) => tab?.tab_name === 'notes' && tab?.status === 1)?.length > 0 && <NotesBoxGeneral note_type={'programs'} note_type_id={_id} />}
    </>
  )
}

export default NotesBox