import React, { useState } from 'react'
import { VStack, View, Text, Box, HStack, Modal, Image, Icon, TextArea } from 'native-base'
import DynamicIcon from 'application/utils/DynamicIcon';
import Icocalendar from 'application/assets/icons/small/Icocalendar';
import Icoclock from 'application/assets/icons/small/Icoclock';
import Icopin from 'application/assets/icons/small/Icopin';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Pressable, useWindowDimensions } from 'react-native';
import moment from 'moment';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MyNote } from 'application/models/notes/Notes';
import { GENERAL_DATE_FORMAT } from 'application/utils/Globals'
import UseEnvService from 'application/store/services/UseEnvService';
import UseNoteService from 'application/store/services/UseNoteService';
import UseToastService from 'application/store/services/UseToastService';
import UseLoadingService from 'application/store/services/UseLoadingService';
import SectionLoading from 'application/components/atoms/SectionLoading';
import UseEventService from 'application/store/services/UseEventService';
import imageplaceholder from 'application/assets/images/imageplaceholder.png';
import FileIconByType from 'application/components/atoms/documents/FileIconByType';
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
  const { event } = UseEventService();
  const {width}=useWindowDimensions()
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
console.log(note?.directory_note)
  return (
    <>
      {loading ? (
        <SectionLoading />
      ) : (
        <>
          <VStack flexDirection={[`${(type == "sponsors" || type == "exhibitors") ?'column':'row'}`,'row']} w={'100%'} p={'16px'} >
            {type == "sponsors" && <Box w={'114px'} h={'46px'} mr={'16px'}>
                {note?.sponsor_note?.logo? <Image
               src={`${_env.eventcenter_base_url}/assets/sponsors/large/${note?.sponsor_note?.logo}`}
                alt='image'
                width={'100%'}
                height={'100%'}
                rounded={'lg'}
              />:
              <Image
                src={imageplaceholder}
                alt='image'
                width={'100%'}
                height={'100%'}
                rounded={'lg'}
              />
              }
            </Box>}
            {type == "exhibitors" && <Box w={'114px'} h={'46px'} mr={'16px'}>
             {note?.exhibitor_note?.logo? <Image
                src={`${_env.eventcenter_base_url}/assets/exhibitors/large/${note?.exhibitor_note?.logo}`}
                alt='image'
                width={'100%'}
                height={'100%'}
                rounded={'lg'}
              />:
              <Image src={imageplaceholder}
              alt='image'
              width={'100%'}
              height={'100%'}
              rounded={'lg'}
              /> 
              }
            </Box>}
            {type == "directory" && <Box w={'20px'} h={'20px'} mr={'12px'} flexDirection={['column','row']} display={['none','flex']}>
            <FileIconByType type={note?.directory_note?.path.split('.')[1]} />
            </Box>}
            <HStack flexDirection={'column'}
            mt={[`${(type == "sponsors" || type == "exhibitors") && '10px'}`,'']}
            w={['calc(100% - 16px)',(type == "sponsors" || type == "exhibitors") ? 'calc(100% - 130px)' : type=="programs"?
            'calc(100%)':'calc(100% - 28px)']}>
              {type == "programs" && <View flexDirection={'row'} justifyContent={'space-between'} alignItems={'start'} flexWrap={['wrap','nowrap']} >
                <Text fontSize="md"  fontWeight={'medium'}>{getValueByNameProgram('topic')}</Text>
                <Box flexDirection={'row'} style={{ gap: 12 }} alignItems={'center'} flexWrap={['wrap','nowrap']} w={['100%','']} mt={['10px','']}> 
                  <View flexDirection={'row'} style={{ gap: 6 }} alignItems={'center'}>
                    <Icocalendar width={16} height={18} />
                    <Text fontSize="xs"  fontWeight={'medium'}>{getValueByNameProgram('date')}</Text>
                  </View>
                  <View flexDirection={'row'} style={{ gap: 6 }} alignItems={'center'}>
                    <Icoclock width={16} height={18} />
                    <Text fontSize="xs"  fontWeight={'medium'}>{getValueByNameProgram('start_time')} - {getValueByNameProgram('end_time')}</Text>
                  </View>
                  {getValueByNameProgram('location') &&
                    <View flexDirection={'row'} style={{ gap: 6 }} alignItems={'center'}>
                      <Icopin width={16} height={18} />
                      <Text fontSize="xs"  fontWeight={'medium'}>{getValueByNameProgram('location')}</Text>
                    </View>
                  }
                </Box>
              </View>}
              {type == "sponsors" && <View flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} >
                <Text fontSize={'md'}  fontWeight={'medium'}>{note?.sponsor_note?.name}</Text>
               {note?.sponsor_note?.booth && <Box flexDirection={'row'} alignItems={'center'} >
                  <DynamicIcon iconType={'help_desk'} iconProps={{ width: 13, height: 12 }} />
                  <Text ml={'6px'} fontSize={'xs'}  fontWeight={'medium'}>{note?.sponsor_note?.booth}</Text>
                </Box>}
              </View>}
              {type == "exhibitors" && <View flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} >
                <Text fontSize={'md'}  fontWeight={'medium'}>{note?.exhibitor_note?.name}</Text>
              {note?.exhibitor_note?.booth && <Box flexDirection={'row'} alignItems={'center'} >
                  <DynamicIcon iconType={'help_desk'} iconProps={{ width: 13, height: 12 }} />
                  <Text ml={'6px'} fontSize={'xs'}  fontWeight={'medium'}>{note?.exhibitor_note?.booth}</Text>
                </Box>}
              </View>}
              {type == "directory" &&
              <View flexDirection={'row'} alignItems={'center'} width={'100%'}>
              <Box w={'20px'} h={'20px'} mr={'12px'} flexDirection={['column','row']} mt={['4px','']} display={['flex','none']}>
              <FileIconByType type={note?.directory_note?.path.split('.')[1]} />
              </Box>
               <View flexDirection={['column','row']} justifyContent={'space-between'} alignItems={['start','center']} w={'calc(100% - 16px)'} mt={['10px','']}>
                <Text fontSize={'md'} fontWeight={'medium'}>{getValueByNameDocument('name')}
                </Text>
                <Text fontSize={'xs'}  fontWeight={'medium'} ml={['','6px']} >{note?.directory_note?.file_size} KBs | {moment(note?.directory_note?.start_date).format(GENERAL_DATE_FORMAT)}</Text>
              </View>
              </View>
              }
              <View flexDirection={'row'}  justifyContent={'space-between'} mt={['4px','8px']}>
                <Text w={'95%'} fontSize="sm" fontWeight={'normal'}>{note?.notes}
                
                </Text>
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
            <Modal.Header height={'42px'} px={'16px'} py={'8px'} flexDirection={'row'} maxWidth={'520px'} width={['80%','90%']} roundedTop={'10px'} alignItems={'center'} mx={'auto'}>
              <DynamicIcon iconType={'my_notes'} iconProps={{ width: 20, height: 20 }} />
              <Text ml={2}>{event?.labels?.GENERAL_NOTES}</Text>
            </Modal.Header>
            <Modal.Content p={0} maxWidth={'520px'} width={['80%','90%']} roundedBottom={'10px'} roundedTop={0} mx={'auto'}>
              <Modal.Body position={'relative'} zIndex={1} p={4} >
                <View flexDirection={'column'}>
                  <TextArea
                    p="0"
                    h="150px"
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