import React, { useEffect } from 'react'
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Divider, Button, ScrollView, Pressable, Image } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import Icouser from 'application/assets/icons/small/Icouser';
import Icodocument from 'application/assets/icons/small/Icodocument';
import MultipleAnswer from 'application/components/atoms/surveys/questions/MultipleAnswer';
import { createParam } from 'solito';
import UseSponsorService from 'application/store/services/UseSponsorService';
import DetailBox from 'application/components/atoms/sponsors/web/DetailBox';
import UseLoadingService from 'application/store/services/UseLoadingService';
import { SponsorsAttendee } from 'application/models/sponsor/SponsorDetail'
import RectangleView from 'application/components/atoms/sponsors/contact-person/RectangleView';
import WebLoading from 'application/components/atoms/WebLoading';
import SectionLoading from 'application/components/atoms/SectionLoading';
import ListingLayout2 from 'application/components/molecules/documents/ListingLayout2';
import in_array from 'in_array'
import UseDocumentService from 'application/store/services/UseDocumentService';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'solito/router';
import UseBannerService from 'application/store/services/UseBannerService';
import { Banner } from 'application/models/Banner'
import UseEnvService from 'application/store/services/UseEnvService';

type ScreenParams = { id: string, cms: string | undefined }

const { useParam } = createParam<ScreenParams>()

const Detail = React.memo(() => {

    const { FetchSponsorDetail, detail } = UseSponsorService();

    const { loading, processing } = UseLoadingService();

    const [id] = useParam('id');
    
    const { clearState, documents } = UseDocumentService();

    const { event } = UseEventService();

    const { back } = useRouter();

    const { _env } = UseEnvService();

    const { banners, FetchBanners } = UseBannerService();

    const [filteredBanner, setFilteredBanner] = React.useState<Banner[]>([]);
    const [filteredBanners, setFilteredBanners] = React.useState<Banner[]>([]);

    React.useEffect(() => {
        if (id) {
            FetchSponsorDetail({ id: Number(id) });
            FetchBanners();
        }
        return () => {
            clearState();
        }
    }, [id]);
    useEffect(()=>{
        const filteredBanner=banners.filter((banner  : Banner)=>{
            return banner.module_name == 'sponsors' && banner.module_type == 'detail'
        })

        setFilteredBanners(filteredBanner);
    },[banners]);
    React.useEffect(() => {
        FetchBanners();
    }, []);
    React.useEffect(() => {

        const filteredBanner = banners.filter((banner: any) => {
            return id == banner.sponsor_id;
        });
        setFilteredBanner(filteredBanner);
    }, [banners]);

    return (
        <>
            {loading ? (
                <WebLoading />
            ) : (
                <>
                     <HStack mb="1" pt="2" w="100%" space="3" alignItems="center">
                            <Pressable onPress={()=> back() }>
                                <HStack space="3" alignItems="center">
                                    <Icon as={AntDesign} name="arrowleft" size="xl" color="primary.text" />
                                    <Text fontSize="2xl">BACK</Text>
                                </HStack>
                            </Pressable>
                        <Spacer />
                    </HStack>
                    <Container overflow="hidden" mb="4" mt="2" maxW="100%" w="100%" bg="primary.box" rounded="10">
                        <Container  maxW="100%" w="100%"  rounded="10">
                            <DetailBox detail={detail} />
                            {detail?.detail?.sponsors_attendee!?.length > 0 && ( 
                                <Box w="100%" p="0">
                                    <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                                        <Icouser />
                                        <Text fontSize="lg">Contact person(s)</Text>
                                    </HStack>
                                    
                                        {detail?.detail?.sponsors_attendee?.map((attendee: SponsorsAttendee, key: number) =>
                                            <React.Fragment key={key}>
                                                <RectangleView attendee={attendee} k={key} />
                                            </React.Fragment>
                                        )}
                                </Box>
                            )}
                            {event?.sponsor_settings?.document == 1 && documents.length > 0 && <Box mb="4" p="0" w="100%">
                                <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                                    <Icodocument width="15px" height="18px" />
                                    <Text fontSize="lg">Documents</Text>
                                </HStack>
                                <Box w={'100%'} >
                                        {in_array('documents', processing) ? (
                                                    <SectionLoading />
                                                ) : (
                                            <ListingLayout2 disableTitle />
                                        )}
                                </Box>
                            </Box>}
                        </Container>

                            {filteredBanner?.length > 0 && filteredBanner.map((banner: any, key: number) =>

                                <Image source={{ uri: `${_env.eventcenter_base_url}/assets/banners/${banner.image}` }} alt="" w="700px" h="100px" rounded={10} />
                            )}
                    </Container>
                    <Box width={"100%"}>
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
            )}
        </>
    )

})

export default Detail