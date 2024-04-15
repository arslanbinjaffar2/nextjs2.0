import React, { useEffect } from 'react'
import { Box, Container, HStack, Image, Spacer, Text } from 'native-base'
import UseLoadingService from 'application/store/services/UseLoadingService';
import WebLoading from 'application/components/atoms/WebLoading';
import ListingLayout2 from 'application/components/molecules/documents/ListingLayout2';
import Search from 'application/components/atoms/documents/Search';
import UseEventService from 'application/store/services/UseEventService';
import in_array from "in_array";
import UseSponsorService from 'application/store/services/UseSponsorService'
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import BannerAds from 'application/components/atoms/banners/BannerAds'

const Index = React.memo(() => {

    const { processing } = UseLoadingService();
    const { event, modules } = UseEventService();
    const { sponsors, categories, FetchSponsors, category_id, query } = UseSponsorService();
    const [searchQuery, setSearch] = React.useState('')
    React.useEffect(() => {
        setSearch(query);
    }, [query]);
    const module = modules.find((module) => module.alias === 'ddirectory');
    return (
        <>
            {in_array('documents', processing) ? (
                <WebLoading />
            ) : (
                <>
                    <NextBreadcrumbs module={module} />
                    <Container pt="2" maxW="100%" w="100%">
                        <HStack display={['block', 'flex']} mb="3" pt="2" w="100%" space="0" alignItems="center">
                            <Text  fontSize="2xl">{modules?.find((documents) => (documents.alias == 'ddirectory'))?.name ?? 'documents'}</Text>
                            <Spacer />
                            <Search />
                        </HStack>
                        <ListingLayout2 />
                    </Container>
                </>

            )}
            <Box width={"100%"} height={"5%"}>
                <BannerAds module_name={'ddirectory'} module_type={'listing'} />
            </Box>
        </>
    )

})

export default Index