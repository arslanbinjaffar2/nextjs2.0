import React from 'react';
import { HStack, Spacer, Text, VStack, Pressable, Icon } from 'native-base'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Document } from 'application/models/document/Document'
import UseDocumentService from 'application/store/services/UseDocumentService';
import FindPath from 'application/utils/FindPath';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import HumanFileSize from 'application/utils/HumanFileSize';

type AppProps = {
    document: Document,
    k: number,
    updateBreadCrumbs: (documents: Document[]) => void,
}

const RectangleViewLayout2 = ({ k, document, updateBreadCrumbs }: AppProps) => {

    const { data, FilterDocuments } = UseDocumentService();

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
                                <HStack borderBottomWidth="1" borderBottomColor="primary.text" w="100%" px="4" py="4" space="3" alignItems="center">
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
                            <HStack borderBottomWidth="1" borderBottomColor="primary.text" w="100%" px="4" py="4" space="3" alignItems="center">
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
                        )
                })()
            }
        </>
    )

}

export default RectangleViewLayout2