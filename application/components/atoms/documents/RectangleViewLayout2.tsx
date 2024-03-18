import React from 'react';
import { HStack, Spacer, Text, VStack, Pressable, Icon, Modal, Button } from 'native-base'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Document } from 'application/models/document/Document'
import UseDocumentService from 'application/store/services/UseDocumentService';
import FindPath from 'application/utils/FindPath';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import HumanFileSize from 'application/utils/HumanFileSize';
import { Linking } from 'react-native';
import UseEnvService from 'application/store/services/UseEnvService';
import FileIconByType from 'application/components/atoms/documents/FileIconByType';
import moment from 'moment';
import {GENERAL_DATE_FORMAT} from 'application/utils/Globals'
import NotesBoxGeneral from 'application/components/atoms/NotesBox';
import UseEventService from 'application/store/services/UseEventService';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import DynamicIcon from 'application/utils/DynamicIcon';
import DocumentNotesBox from 'application/components/atoms/documents/DocumentNotesBox';

type AppProps = {
    document: Document,
    k: number,
    length: number,
    updateBreadCrumbs: (documents: Document[]) => void,
}

const RectangleViewLayout2 = ({ k, document, updateBreadCrumbs, length }: AppProps) => {

    const {data, FilterDocuments } = UseDocumentService();

    const { _env } = UseEnvService();

    const { event } = UseEventService();

    const [isNotesOpen, setIsNotesOpen] = React.useState(false);

    return (
        <>
            {
                (() => {
                    if (document?.path === undefined)
                        return (
                            <Pressable
                                onPress={async () => {
                                    FilterDocuments({ document_id: document.id, query: '' });
                                    updateBreadCrumbs(FindPath(data, document.id));
                                }}>
                                <HStack borderBottomWidth="1" borderBottomColor={length !== k ? "primary.bordercolor" : 'transparent'} w="100%" px="4" py="4" space="3" alignItems="center">
                                    <Icon size="xl" as={MaterialIcons} name="folder" color="primary.text" />
                                    <VStack space="0" w={'calc(100% - 100px)'}>
                                        <Text fontSize="md" textBreakStrategy='simple'>{document?.name}</Text>
                                    </VStack>
                                    <Spacer />
                                    <Icon as={SimpleLineIcons} name="arrow-right" size="md" color="primary.text" />
                                </HStack>
                            </Pressable>
                        )
                    else
                        return (
                            

                                <HStack borderBottomWidth="1" borderBottomColor={length !== k ? "primary.bordercolor" : 'transparent'} w="100%" px="4" py="4" space="3" alignItems="center">
                                    <FileIconByType type={document?.path.split('.')[1]} />
                                    <VStack space="0" w={'calc(100% - 150px)'}>
                                        <Text fontSize="md">{document?.name}</Text>
                                        <HStack space="3" alignItems="center">
                                            <Text fontSize="xs">{HumanFileSize(document?.file_size)}</Text>
                                            <Text fontSize="xs">{moment(document?.start_date).format(GENERAL_DATE_FORMAT)}</Text>
                                            {/* <Text fontSize="xs">{document?.start_time}</Text> */}
                                        </HStack>
                                    </VStack>
                                    <Spacer />
                                    <HStack  space="3" alignItems="center" justifyContent={'flex-end'}>
                                    {event.document_settings?.show_documents_notes == 1 && 
                                        <>
                                         <Pressable
                                                onPress={async () => {
                                                    setIsNotesOpen(true);
                                                }}>
                                                <DynamicIcon iconType={'my_notes'} iconProps={{ width: 15, height: 18 }} />
                                            </Pressable>
                                            <Modal
                                            isOpen={isNotesOpen}
                                            onClose={()=>{
                                            setIsNotesOpen(false);
                                            }}
                                        >
                                            
                                        <Modal.Content p={0}>
                                                <Modal.Body position={'relative'} zIndex={1} p={0}>
                                                    <DocumentNotesBox note_type_id={document.id}>
                                                    <Pressable onPress={() => setIsNotesOpen(false)}><Icon as={FontAwesome} name="close" size={'lg'} color={'primary.text'} /></Pressable>
                                                    </DocumentNotesBox>
                                                </Modal.Body>
                                            </Modal.Content>
                                        </Modal>
                                        </>
                                    }
                                    <Pressable
                                        onPress={async () => {
                                            const url: any = document.s3 ? `${document.s3_url}` : `${_env.eventcenter_base_url}/assets/directory/${document.path}`;
                                            const supported = await Linking.canOpenURL(url);
                                            if (supported) {
                                                await Linking.openURL(url);
                                            }
                                        }}>
                                        <Icon as={AntDesign} name="download" size="md" color="primary.text" />
                                    </Pressable>     
                                    </HStack>
                                    
                                  
                                    
                                </HStack>
                        )
                })()
            }
        </>
    )

}

export default RectangleViewLayout2

