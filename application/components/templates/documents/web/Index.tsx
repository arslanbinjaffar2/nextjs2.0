import React, { useEffect } from 'react'
import { Box, Container, HStack, Image, Spacer, Text } from 'native-base'
import UseLoadingService from 'application/store/services/UseLoadingService';
import WebLoading from 'application/components/atoms/WebLoading';
import ListingLayout2 from 'application/components/molecules/documents/ListingLayout2';
import Search from 'application/components/atoms/documents/Search';
import UseEventService from 'application/store/services/UseEventService';
import in_array from "in_array";
import UseEnvService from 'application/store/services/UseEnvService'
import UseBannerService from 'application/store/services/UseBannerService'
import { Banner } from 'application/models/Banner'
import UseSponsorService from 'application/store/services/UseSponsorService'

const Index = React.memo(() => {

    const { processing } = UseLoadingService();
    const { event, modules  } = UseEventService();
    const { sponsors, categories, FetchSponsors, category_id, query } = UseSponsorService();
    const [searchQuery, setSearch] = React.useState('')
    const { _env } = UseEnvService()
    const { banners, FetchBanners} = UseBannerService();
    const [filteredBanners, setFilteredBanners] = React.useState<Banner[]>([]);
    useEffect(()=>{
        const filteredBanner=banners.filter((banner  : Banner)=>{
            return banner.module_name == 'documents' && banner.module_type == 'listing'
        })

        setFilteredBanners(filteredBanner);
    },[query,banners]);
    React.useEffect(() => {
        setSearch(query);
    }, [query]);
    React.useEffect(() => {
        FetchBanners();
    }, []);
    return (
        <>
            {in_array('documents', processing) ? (
                <WebLoading />
            ) : (
                <Container pt="2" maxW="100%" w="100%">
                    <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                        <Text textTransform="uppercase" fontSize="2xl">{modules?.find((documents)=>(documents.alias == 'ddirectory'))?.name ?? 'Documents'}</Text>
                        <Spacer />
                        <Search />
                    </HStack>
                    <ListingLayout2 />
                </Container>
            )}
            <Box width={"100%"} height={"5%"}>
                {filteredBanners.map((banner, k) =>
                  <Image
                    key={k}
                    source={{ uri: `${_env.eventcenter_base_url}/assets/banners/${banner.image}` }}
                    alt="Image"
                    width="100%"
                    height="100%"
                  />
                )}
            </Box>
        </>
    )

})

export default Index