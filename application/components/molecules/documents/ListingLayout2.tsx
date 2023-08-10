import React from 'react'
import { HStack, Text, Icon, Box, Pressable, ScrollView, Container, View } from 'native-base'
import AntDesign from '@expo/vector-icons/AntDesign';
import UseDocumentService from 'application/store/services/UseDocumentService';
import { Document } from 'application/models/document/Document'
import FindPath from 'application/utils/FindPath';
import { Platform } from 'react-native';
import RectangleViewLayout2 from 'application/components/atoms/documents/RectangleViewLayout2';

const ListingLayout2 = () => {

    const [breadcrumbs, setBreadCrumbs] = React.useState<Document[]>([]);

    const { documents, data, FilterDocuments } = UseDocumentService();

    const updateBreadCrumbs = (breadcrumbs: Document[]) => {
        setBreadCrumbs(breadcrumbs);
    }

    return (
        <View w="100%" h="80%">
            <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                <Pressable
                    onPress={async () => {
                        FilterDocuments({ document_id: 0, query: '' });
                        setBreadCrumbs([]);
                    }}>
                    <Text textTransform="uppercase" fontSize="xs">Documents</Text>
                </Pressable>
                {breadcrumbs.length > 0 && breadcrumbs.map((breadcrumb: Document, key: number) =>
                    <React.Fragment key={key}>
                        <Icon ml="-1" color="primary.text" size="3" as={AntDesign} name="right" />
                        <Pressable
                            onPress={async () => {
                                FilterDocuments({ document_id: breadcrumb.id, query: '' });
                                setBreadCrumbs(FindPath(data, breadcrumb.id));
                            }}>
                            <Text textTransform="uppercase" fontSize="xs">{breadcrumb.name}</Text>
                        </Pressable>
                    </React.Fragment>
                )}
            </HStack>
            {Platform.OS === 'web' ? (
                <Box overflow="hidden" w="100%" bg="primary.box" p="0" rounded="10">
                    {documents.map((document: Document, key: number) =>
                        <React.Fragment key={key}>
                            <RectangleViewLayout2 length={documents.length - 1} document={document} k={key} updateBreadCrumbs={updateBreadCrumbs} />
                        </React.Fragment>
                    )}
                </Box>
            ) : (
                <Container w="100%" h="90%" bg="primary.box" p="0" rounded="10" maxW={'100%'}>
                    <ScrollView w={'100%'}>
                        <Box overflow="hidden" w="100%">
                            {documents.map((document: Document, key: number) =>
                                <React.Fragment key={key}>
                                    <RectangleViewLayout2 length={documents.length - 1} document={document} k={key} updateBreadCrumbs={updateBreadCrumbs} />
                                </React.Fragment>
                            )}
                        </Box>
                    </ScrollView>
                </Container>
            )}
        </View>
    )
}

export default ListingLayout2