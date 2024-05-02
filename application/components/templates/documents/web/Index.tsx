import React, { useEffect } from 'react'
import { Box, Container, HStack, Image, Spacer, Text } from 'native-base'
import UseLoadingService from 'application/store/services/UseLoadingService';
import WebLoading from 'application/components/atoms/WebLoading';
import ListingLayout2 from 'application/components/molecules/documents/ListingLayout2';
import Search from 'application/components/atoms/documents/Search';
import UseEventService from 'application/store/services/UseEventService';
import in_array from "in_array";
import UseSponsorService from 'application/store/services/UseSponsorService'
import BannerAds from 'application/components/atoms/banners/BannerAds'
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import { Document } from 'application/models/document/Document'; 
import UseDocumentService from 'application/store/services/UseDocumentService';
import FindPath from 'application/utils/FindPath';


const Index = React.memo(() => {

    const [breadcrumbs, setBreadcrumbs] = React.useState<Document[]>([]);
    const [selectedBreadcrumb, setSelectedBreadcrumb] = React.useState<Document | null>(null);
    const { processing } = UseLoadingService();
    const { event, modules } = UseEventService();
    const { sponsors, categories, FetchSponsors, category_id, query } = UseSponsorService();
    const [searchQuery, setSearch] = React.useState('')
    const { documents, data, FilterDocuments } = UseDocumentService();

    React.useEffect(() => {
        setSearch(query);
    }, [query]);

    const updateBreadcrumbs = (newBreadcrumbs: Document[]) => {
        setBreadcrumbs(newBreadcrumbs);
    };
    const handleBreadcrumbPress = (breadcrumb: Document) => {
        FilterDocuments({ document_id: breadcrumb.id, query: '' });
        const newBreadcrumbs = FindPath(data, breadcrumb.id);
        updateBreadcrumbs(newBreadcrumbs);
    };
    const onAdditionalMainBreadcrumbPress = () => {
        FilterDocuments({ document_id: 0, query: '' });
        const newBreadcrumbs: Document[] = [];
        updateBreadcrumbs(newBreadcrumbs);
    };

    const module = modules.find((module) => module.alias === 'ddirectory');

    return (
        <>
            {in_array('documents', processing) ? (
                <WebLoading />
            ) : (
                <>
                    <NextBreadcrumbs module={module} additionalBreadcrubms={breadcrumbs} onBreadcrumbPress={handleBreadcrumbPress} onAdditionalMainBreadcrumbPress={onAdditionalMainBreadcrumbPress}/>
                    <Container mb={4} pt="2" maxW="100%" w="100%">
                        <HStack display={['block', 'flex']} mb="3" pt="2" w="100%" space="0" alignItems="center">
                            <Text fontSize="2xl">{modules?.find((documents) => (documents.alias == 'ddirectory'))?.name ?? 'Documents'}</Text>
                            <Spacer />
                            <Search />
                        </HStack>
                        <Box w={'100%'} bg="primary.box" rounded="lg">
                            <ListingLayout2 updateBreadcrumbs={updateBreadcrumbs} disableTitle/>
                        </Box>
                        
                    </Container>
                </>

            )}
                <BannerAds module_name={'ddirectory'} module_type={'listing'} />
        </>
    )

})

export default Index