import React, { useState } from 'react'
import { VStack, View, Text, Box, HStack, Modal, Image, Icon, TextArea } from 'native-base'
import DynamicIcon from 'application/utils/DynamicIcon';
import Icocalendar from 'application/assets/icons/small/Icocalendar';
import Icoclock from 'application/assets/icons/small/Icoclock';
import Icopin from 'application/assets/icons/small/Icopin';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Pressable } from 'react-native';
import moment from 'moment';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MyNote } from 'application/models/notes/Notes';
import { GENERAL_DATE_FORMAT } from 'application/utils/Globals'
import UseEnvService from 'application/store/services/UseEnvService';
import UseNoteService from 'application/store/services/UseNoteService';
import UseToastService from 'application/store/services/UseToastService';
import UseLoadingService from 'application/store/services/UseLoadingService';
import SectionLoading from 'application/components/atoms/SectionLoading';

interface CustomNotesProps {
  type: 'sponsors' | 'exhibitors' | 'directory' | 'programs';
  note: MyNote;
  onUpdate: () => void;
}

const CustomNotes: React.FC<CustomNotesProps> = ({ type, note, onUpdate }) => {

  const [isOpen, setIsOpen] = useState(false)
  const [noteValue, setNoteValue] = useState(note.notes)
  const { _env } = UseEnvService()
  const { UpdateNote } = UseNoteService();
  const { AddToast } = UseToastService()
  const { loading } = UseLoadingService();

  function getValueByNameProgram(name: string) {
    if (note.program_note) {
      const item = note.program_note.info.find((obj: any) => obj.name === name);
      return item ? item.value : null;
    }
    else {
      return null;
    }
  }

  function getValueByNameDocument(name: string) {
    if (note.directory_note) {
      const item = note.directory_note.info.find((obj: any) => obj.name === name);
      return item ? item.value : null;
    }
    else {
      return null;
    }
  }

  async function updateNote() {
    await UpdateNote({ notes: noteValue, id: note?.id, type: type });
    AddToast({ toast: { message: "Notes updated", status: "success" } })
    setTimeout(() => {
      onUpdate();
    }, 700);
  }

  return (
    <>
      {loading ? (
        <SectionLoading />
      ) : (
        <>
          <VStack flexDirection={'row'} w={'100%'} p={'16px'}>
            {type == "sponsors" && <Box w={'114px'} h={'46px'} mr={'16px'}>
              <Image
                src={`${_env.eventcenter_base_url}/assets/sponsors/large/${note?.sponsor_note?.logo}`}
                alt='image'
                width={'100%'}
                height={'100%'}
                rounded={'lg'}
              />
            </Box>}
            {type == "exhibitors" && <Box w={'114px'} h={'46px'} mr={'16px'}>
              <Image
                src={`${_env.eventcenter_base_url}/assets/exhibitors/large/${note?.exhibitor_note?.logo}`}
                alt='image'
                width={'100%'}
                height={'100%'}
                rounded={'lg'}
              />
            </Box>}
            {type == "directory" && <Box w={'20px'} h={'20px'} mr={'12px'}>
              <Icon as={AntDesign} name="pdffile1" size="md" color="primary.text" />
            </Box>}
            <HStack flexDirection={'column'} w={(type == "sponsors" || type == "exhibitors") ? 'calc(100% - 160px)' : 'calc(100% - 28px)'}>
              {type == "programs" && <View flexDirection={'row'} justifyContent={'space-between'}>
                <Text fontSize="md">{getValueByNameProgram('topic')}</Text>
                <Box flexDirection={'row'} style={{ gap: 12 }} alignItems={'center'}>
                  <View flexDirection={'row'} style={{ gap: 6 }} alignItems={'center'}>
                    <Icocalendar width={16} height={18} />
                    <Text fontSize="xs">{getValueByNameProgram('date')}</Text>
                  </View>
                  <View flexDirection={'row'} style={{ gap: 6 }} alignItems={'center'}>
                    <Icoclock width={16} height={18} />
                    <Text fontSize="xs">{getValueByNameProgram('start_time')} - {getValueByNameProgram('end_time')}</Text>
                  </View>
                  {getValueByNameProgram('location') &&
                    <View flexDirection={'row'} style={{ gap: 6 }} alignItems={'center'}>
                      <Icopin width={16} height={18} />
                      <Text fontSize="xs">{getValueByNameProgram('location')}</Text>
                    </View>
                  }
                </Box>
              </View>}
              {type == "sponsors" && <View flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} >
                <Text fontSize={'md'}>{note?.sponsor_note?.name}</Text>
                <Box flexDirection={'row'} alignItems={'center'} >
                  <DynamicIcon iconType={'help_desk'} iconProps={{ width: 13, height: 12 }} />
                  <Text ml={'6px'} fontSize={'xs'}>ALK-14565416-4154413</Text>
                </Box>
              </View>}
              {type == "exhibitors" && <View flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} >
                <Text fontSize={'md'}>{note?.exhibitor_note?.name}</Text>
                <Box flexDirection={'row'} alignItems={'center'} >
                  <DynamicIcon iconType={'help_desk'} iconProps={{ width: 13, height: 12 }} />
                  <Text ml={'6px'} fontSize={'xs'}>ALK-14565416-4154413</Text>
                </Box>
              </View>}
              {type == "directory" && <View flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} >
                <Text fontSize={'md'}>{getValueByNameDocument('name')}</Text>
                <Text fontSize={'xs'} ml={'6px'}>{note?.directory_note?.file_size} Kbs | {moment(note?.directory_note?.start_date).format(GENERAL_DATE_FORMAT)}</Text>
              </View>}
              <View flexDirection={'row'} justifyContent={'space-between'} mt={'8px'}>
                <Text w={'95%'} fontSize="sm">{note?.notes}</Text>
                <Box w={'5%'}>

                  <Pressable onPress={() => {
                    setIsOpen(true)
                  }}>
                    <DynamicIcon iconType={'editnotes'} iconProps={{ width: 20, height: 20 }} />
                  </Pressable>
                </Box>
              </View>
            </HStack>
          </VStack>
          <Modal

            isOpen={isOpen}
            onClose={() => {
              setIsOpen(false)
            }}
          >
            <Modal.Header height={'42px'} px={'16px'} py={'8px'} flexDirection={'row'} maxWidth={'520px'} width={'100%'} roundedTop={'10px'} alignItems={'center'}>
              <DynamicIcon iconType={'my_notes'} iconProps={{ width: 20, height: 20 }} />
              <Text ml={2}>Notes</Text>
            </Modal.Header>
            <Modal.Content p={0} maxWidth={'520px'} width={'100%'} roundedBottom={'10px'} roundedTop={0}>
              <Modal.Body position={'relative'} zIndex={1} p={4} >
                <View flexDirection={'column'}>
                  <TextArea
                    p="0"
                    h="60px"
                    focusOutlineColor="transparent"
                    _focus={{ bg: 'transparent' }}
                    value={noteValue}
                    onChangeText={(text) => setNoteValue(text)}
                    borderWidth="0" fontSize="md" autoCompleteType={undefined} />
                  <Text>
                  </Text>
                  <Box alignSelf={'flex-end'} flexDirection={'row'} alignItems={'center'} mt={'4'}>
                    <View>
                      <Pressable
                        onPress={() => {
                          setIsOpen(false)
                        }}
                      >
                        <Icon as={FontAwesome} name="close" size={'lg'} color={'primary.text'} />
                      </Pressable>
                    </View>
                    <View ml={'12px'}>
                      <Pressable
                        onPress={() => {
                          updateNote()
                        }}
                      >
                        <Icon as={FontAwesome} name="save" size={'lg'} color={'primary.text'} />
                      </Pressable>
                    </View>
                  </Box>
                </View>

              </Modal.Body>
            </Modal.Content>
          </Modal>

        </>
      )}
    </>
  )
}

export default CustomNotes