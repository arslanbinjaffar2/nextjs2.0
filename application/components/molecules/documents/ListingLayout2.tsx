import React,{ useEffect } from 'react'
import { HStack, Text, Icon, Box, Pressable, ScrollView, Container, View, Center } from 'native-base'
import AntDesign from '@expo/vector-icons/AntDesign';
import UseDocumentService from 'application/store/services/UseDocumentService';
import { Document } from 'application/models/document/Document'
import FindPath from 'application/utils/FindPath';
import { Platform } from 'react-native';
import RectangleViewLayout2 from 'application/components/atoms/documents/RectangleViewLayout2';
import UseEventService from 'application/store/services/UseEventService';

interface ListingLayout2Props {
    disableTitle?: boolean;
    updateBreadcrumbs?: (breadcrumbs: Document[]) => void;
}

const ListingLayout2: React.FC<ListingLayout2Props> = ({ disableTitle, updateBreadcrumbs }) => {

    const [breadcrumbs, setBreadCrumbs] = React.useState<Document[]>([]);

    const { documents, data, FilterDocuments } = UseDocumentService();

    const [filteredDocuments, setFilteredDocuments] = React.useState<Document[]>([]);

    useEffect(() => {
        const nonEmptyDocuments = documents.filter((document) => {
            return document?.path !== undefined || document?.children_files?.length > 0;
        });
        setFilteredDocuments(nonEmptyDocuments);
      }, [documents]);

    const updateBreadCrumbs = (breadcrumbs: Document[]) => {
        setBreadCrumbs(breadcrumbs);
        if(updateBreadcrumbs){
            updateBreadcrumbs(breadcrumbs);
        }
    }

    const { event  } = UseEventService();
    return (
        <View w="100%">
            {/* {!disableTitle && <HStack mb="3" pt="2" w="100%" space="3" alignItems="center" flexWrap={'wrap'}>
            </HStack>} */}
            {Platform.OS === 'web' ? (
                <Box overflow="hidden" w="100%" bg={disableTitle ? "" : "primary.box"} p="0" rounded="10">
                    {filteredDocuments.map((document: Document, key: number) => {
                               return <React.Fragment key={key}>
                                    <RectangleViewLayout2 length={filteredDocuments.length - 1} document={document} k={key} updateBreadCrumbs={updateBreadCrumbs} />
                                </React.Fragment>
                        }
                    )}
                    { filteredDocuments.length <= 0 &&
                        <Box p="3">
                            <Text fontSize="18px">{event.labels.GENERAL_NO_RECORD}</Text>
                        </Box>
                    }
                </Box>
            ) : (
                <Container w="100%"  bg={disableTitle ? "" : "primary.box"} p="0" rounded="10" maxW={'100%'}>
                    <ScrollView w={'100%'}>
                        <Box overflow="hidden" w="100%">
                            {filteredDocuments.map((document: Document, key: number) =>
                                <React.Fragment key={key}>
                                    <RectangleViewLayout2 length={filteredDocuments.length - 1} document={document} k={key} updateBreadCrumbs={updateBreadCrumbs} />
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