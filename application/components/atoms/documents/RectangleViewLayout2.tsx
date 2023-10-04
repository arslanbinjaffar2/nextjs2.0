import React from 'react';
import { HStack, Spacer, Text, VStack, Pressable, Icon } from 'native-base'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Document } from 'application/models/document/Document'
import UseDocumentService from 'application/store/services/UseDocumentService';
import FindPath from 'application/utils/FindPath';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import HumanFileSize from 'application/utils/HumanFileSize';
import { Linking } from 'react-native';
import UseEnvService from 'application/store/services/UseEnvService';

type AppProps = {
    document: Document,
    k: number,
    length: number,
    updateBreadCrumbs: (documents: Document[]) => void,
}

const RectangleViewLayout2 = ({ k, document, updateBreadCrumbs, length }: AppProps) => {

    const { data, FilterDocuments } = UseDocumentService();

    const { _env } = UseEnvService()

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
                                <HStack borderBottomWidth="1" borderBottomColor={length !== k ? "primary.text" : 'transparent'} w="100%" px="4" py="4" space="3" alignItems="center">
                                    <Icon size="xl" as={MaterialIcons} name="folder" color="primary.text" />
                                    <VStack space="0">
                                        <Text fontSize="md">{document?.name}</Text>
                                    </VStack>
                                    <Spacer />
                                    <Icon as={SimpleLineIcons} name="arrow-right" size="md" color="primary.text" />
                                </HStack>
                            </Pressable>
                        )
                    else
                        return (
                            <Pressable
                                onPress={async () => {
                                    const url: any = `${_env.eventcenter_base_url}/assets/directory/${document.path}`;
                                    const supported = await Linking.canOpenURL(url);
                                    if (supported) {
                                        await Linking.openURL(url);
                                    }
                                }}>

                                <HStack borderBottomWidth="1" borderBottomColor={length !== k ? "primary.text" : 'transparent'} w="100%" px="4" py="4" space="3" alignItems="center">
                                    <Icon size="xl" as={AntDesign} name="pdffile1" color="primary.text" />
                                    <VStack space="0">
                                        <Text fontSize="md">{document?.name}</Text>
                                        <HStack space="3" alignItems="center">
                                            <Text fontSize="xs">{HumanFileSize(document?.file_size)}</Text>
                                            <Text fontSize="xs">{document?.start_date}</Text>
                                            <Text fontSize="xs">{document?.start_time}</Text>
                                        </HStack>
                                    </VStack>
                                    <Spacer />
                                    <Icon as={AntDesign} name="download" size="md" color="primary.text" />
                                </HStack>
                            </Pressable>
                        )
                })()
            }
        </>
    )

}

export default RectangleViewLayout2