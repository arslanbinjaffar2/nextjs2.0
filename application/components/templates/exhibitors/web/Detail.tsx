import React, { useEffect } from 'react'
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Divider, Button, ScrollView, Pressable, Image } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import Icouser from 'application/assets/icons/small/Icouser';
import Icodocument from 'application/assets/icons/small/Icodocument';
// import MultipleAnswer from 'application/components/atoms/surveys/MultipleAnswer';
import { createParam } from 'solito';
import UseExhibitorService from 'application/store/services/UseExhibitorService';
import DetailBox from 'application/components/atoms/exhibitors/web/DetailBox';
import UseLoadingService from 'application/store/services/UseLoadingService';
import { ExhibitorsAttendee } from 'application/models/exhibitor/ExhibitorDetail'
import RectangleView from 'application/components/atoms/exhibitors/contact-person/RectangleView';
import WebLoading from 'application/components/atoms/WebLoading';
import SectionLoading from 'application/components/atoms/SectionLoading';
import in_array from "in_array";
import ListingLayout2 from 'application/components/molecules/documents/ListingLayout2';
import UseDocumentService from 'application/store/services/UseDocumentService';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'solito/router';
import UseBannerService from 'application/store/services/UseBannerService';
import { Banner } from 'application/models/Banner'
import UseEnvService from 'application/store/services/UseEnvService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';


type ScreenParams = { id: string, cms: string | undefined }

const { useParam } = createParam<ScreenParams>()

const Detail = React.memo(() => {

    const { FetchExhibitorDetail, detail } = UseExhibitorService();

    const { loading, processing } = UseLoadingService();

    const [id] = useParam('id');

    const { documents, clearState } = UseDocumentService();
    
    const { event, modules } = UseEventService();

    const { banners, FetchBanners }  = UseBannerService();

    const [filteredBanner, setFilteredBanner] = React.useState<Banner[]>([]);
    const [filteredBanners, setFilteredBanners] = React.useState<Banner[]>([]);

    const { _env } = UseEnvService();

    const { back } = useRouter()

    React.useEffect(() => {
        if (id) {
            FetchExhibitorDetail({ id: Number(id) });
        }
        return () =>{
            clearState();
        }
    }, [id]);
    React.useEffect(() => {

        const filteredBanner =  banners.filter((banner: any) => {
            return id == banner.exhibitor_id;
        });
        setFilteredBanner(filteredBanner);
    }, [banners]);
    useEffect(()=>{
        const filteredBanner=banners.filter((banner  : Banner)=>{
            return banner.module_name == 'exhibitors' && banner.module_type == 'detail'
        })

        setFilteredBanners(filteredBanner);
    },[banners]);
    React.useEffect(() => {
        FetchBanners();
    }, []);
    const module = modules.find((module) => module.alias === "exhibitors");
    return (
        <>
            {loading ? (
                <WebLoading />
            ) : (
                <>
                 <NextBreadcrumbs module={module} title={detail?.detail?.name} />
                    <Container maxW="100%" h={'93%'} w="100%">
                        <Container mb="4" mt="2" maxW="100%" w="100%" bg="primary.box" roundedTop="10">
                            <DetailBox detail={detail} />
                            {detail?.detail?.exhibitors_attendee!?.length > 0 && (
                                <Box w="100%" p="0">
                                    <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                                        <Icouser />
                                        <Text fontSize="lg">Contact person(s)</Text>
                                    </HStack>
                                    
                                        {detail?.detail?.exhibitors_attendee?.map((attendee: ExhibitorsAttendee, key: number)  =>
                                            <React.Fragment key={key}>
                                                <RectangleView total={detail?.detail?.exhibitors_attendee?.length as number} attendee={attendee} k={key} />
                                            </React.Fragment>
                                        )}
                                </Box>
                            )}

                            {event?.exhibitor_settings?.document == 1 && documents.length > 0  && <Box p="0" w="100%">
                                <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                                    <Icodocument width="15px" height="18px" />
                                    <Text fontSize="lg">Documents</Text>
                                </HStack>
                                <Box w={'100%'}>
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