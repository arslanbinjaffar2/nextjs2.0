import React from 'react';
import { HStack, Spacer, Text, VStack, Pressable, Icon, Modal, Button, Input, TextArea, Box } from 'native-base'
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
import { store } from 'application/store/Index'
import { sendDocumentEmailApi } from 'application/store/api/DocumentApi';
import { useRouter } from 'solito/router';


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
    const [isEmailBoxOpen, setIsEmailBoxOpen] = React.useState(false);
    const [emailData, setEmailData] = React.useState(
        { email: '', subject: '', message: '' }
    );
    const [sendingEmail, setSendingEmail] = React.useState<boolean>(false);
    const [emailAlert, setEmailAlert] = React.useState('');

    
    async function sendEmail() {
        if(emailData.email == '') {
            setEmailAlert('Please enter email');
            return;
        }
        if(emailData.subject == '') {
            setEmailAlert('Please enter subject');
            return;
        }
        setEmailAlert('');
        const mystate=store.getState()
        setSendingEmail(true);
        try {
        await sendDocumentEmailApi({...emailData,document_id:document.id}, mystate); // Call the API function
        setSendingEmail(false);
        setEmailAlert('Email sent successfully');
          
        } catch (error) {
          console.log('error', error);
        }
    }

    React.useEffect(() => {
        setEmailAlert('');
    }, [emailData]);
  const {push}=useRouter()
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
                                    <HStack   alignItems="center" justifyContent={'flex-end'}>
                                    <Pressable
                                        onPress={async () => {
                                            push(`/${event.url}/document-send-email/detail/${document.id}`)
                                        }}
                                      
                                        >
                                        <DynamicIcon iconType={'email_icon'} iconProps={{ width: 15, height: 18 }} />
                                    </Pressable>
                                    
                                    <Box mx={'3'}>
                                    {event.document_settings?.show_documents_notes == 1 && 

                                            <Pressable
                                                    onPress={async () => {
                                                        setIsNotesOpen(true);
                                                    }}
                                                    >
                                                    <DynamicIcon iconType={'editnotes'} iconProps={{ width: 20, height: 20 }} />
                                                </Pressable>
                                    }
                                    </Box>

                                    <Pressable
                                        onPress={async () => {
                                            const url: any = document.s3 ? `${document.s3_url}` : `${_env.eventcenter_base_url}/assets/directory/${document.path}`;
                                            const supported = await Linking.canOpenURL(url);
                                            if (supported) {
                                                await Linking.openURL(url);
                                            }
                                        }}
                                        >
                                        <Icon as={AntDesign} name="download" size="md" color="primary.text" />
                                    </Pressable>     
                                    </HStack>
                                    <Modal
                                            isOpen={isNotesOpen}
                                            onClose={()=>{
                                            setIsNotesOpen(false);
                                            }}
                                        >
                                            
                                        <Modal.Content p={0}>
                                                <Modal.Body position={'relative'} zIndex={1} p={0}>
                                                    <DocumentNotesBox showModal={setIsNotesOpen} note_type_id={document.id}/>
                                                </Modal.Body>
                                            </Modal.Content>
                                    </Modal>
                                </HStack>
                        )
                })()
            }
        </>
    )

}

export default RectangleViewLayout2

