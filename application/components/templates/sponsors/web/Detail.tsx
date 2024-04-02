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
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import UseEnvService from 'application/store/services/UseEnvService';
import BannerAds from 'application/components/atoms/banners/BannerAds'
import SponsorContactInfo from 'application/components/atoms/sponsors/contact-info/ContactInfo';
import { useWindowDimensions } from 'react-native';
import SponsorNotesBox from 'application/components/atoms/sponsors/notes/NotesBox';


type ScreenParams = { id: string, cms: string | undefined }

const { useParam } = createParam<ScreenParams>()



const Detail = React.memo(() => {

    const { FetchSponsorDetail, detail } = UseSponsorService();

    const { loading, processing } = UseLoadingService();

    const [id] = useParam('id');
    
    const { clearState, documents } = UseDocumentService();

    const { event, modules } = UseEventService();

    const { back } = useRouter();

    const { _env } = UseEnvService();

    const { width } = useWindowDimensions();

    React.useEffect(() => {
        if (id) {
            FetchSponsorDetail({ id: Number(id) });
        }
        return () => {
            clearState();
        }
    }, [id]);
    const module = modules.find((module) => module.alias === "sponsors");
    return (
        <>
            {loading ? (
                <WebLoading />
            ) : (
                <>
                   <NextBreadcrumbs module={module} title={detail?.detail?.name} />
                    <Container overflow="hidden" mb="4" mt="2" maxW="100%" w="100%" bg="primary.box" rounded="10">
                        <Container  maxW="100%" w="100%"  rounded="10">
                            <DetailBox detail={detail} />
                            {event?.sponsor_tab_settings.contact_persons == 1 && detail?.detail?.sponsors_attendee!?.length > 0 && ( 
                                <Box w="100%" p="0">
                                    <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                                        <Icouser />
                                        <Text fontSize="lg">{event?.labels?.GENERAL_CONTACT_PERSON}</Text>
                                    </HStack>
                                    
                                        {detail?.detail?.sponsors_attendee?.map((attendee: SponsorsAttendee, key: number) =>
                                            <React.Fragment key={key}>
                                                <RectangleView attendee={attendee} k={key} />
                                            </React.Fragment>
                                        )}
                                </Box>
                            )}
                            {event?.sponsor_tab_settings.documents == 1 && documents.length > 0 && <Box mb="4" p="0" w="100%">
                                <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                                    <Icodocument width="15px" height="18px" />
                                    <Text fontSize="lg">{event?.labels?.GENERAL_DOCUMENTS}</Text>
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
                    </Container>
                    {width < 810 && <Container maxW="100%" w="100%" >
                        { event?.sponsor_tab_settings?.contact_info == 1 && <SponsorContactInfo />}
                        { event?.sponsor_tab_settings?.notes == 1 &&  <SponsorNotesBox />}
                    </Container>}
                    <Box width={"100%"} height={"5%"}>
                        <BannerAds module_name={'sponsors'} module_type={'detail'} module_id={detail?.detail?.id} />
                    </Box>
                </>
            )}
        </>
    )

})

export default Detail