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
import BannerAds from 'application/components/atoms/banners/BannerAds'

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

    React.useEffect(() => {
        if (id) {
            FetchSponsorDetail({ id: Number(id) });
            FetchBanners();
        }
        return () => {
            clearState();
        }
    }, [id]);
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
                                    <Text fontSize="2xl">{event.labels?.GENERAL_BACK}</Text>
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
                                        <Text fontSize="lg">{event?.labels?.GENERAL_CONTACT_PERSON}</Text>
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

                        {/* <Container mb="3" maxW="100%" w="100%">
                            <Text mb="3" fontSize="lg" textTransform="uppercase">Available Survey</Text>
                            <Box w="100%" bg="primary.box" borderWidth="1" borderColor="primary.bdBox" rounded="10">
                                <Box py="3" px="4" w="100%">
                                    <Text mb="3" fontSize="lg">Tillykke med valget som tilli…</Text>
                                    <HStack bg="primary.box" overflow="hidden" borderWidth="1" borderColor="primary.bdBox" mb="4" space="0" w="100%" rounded="2xl">
                                        <Box bg="primary.500" h="22px" w="33.33%" />
                                        <Box borderLeftWidth="1" borderRightWidth="1" borderColor="primary.bdBox" bg="primary.500" h="22px" w="33.33%" />
                                        <Box bg="transparent" h="22px" w="33.33%" />
                                    </HStack>
                                </Box>
                                <MultipleAnswer req={true} title="What types of workouts will I be doing on DAMY Programs? Does it include cardio and weights?" />
                                <Box py="0" px="4" w="100%">
                                    <Divider mb="15" opacity={0.27} bg="primary.text" />
                                    <HStack mb="3" space="3" alignItems="center">
                                        <Button
                                            bg="transparent"
                                            p="2"
                                            textTransform={'uppercase'}
                                            fontSize="lg"
                                            leftIcon={<Icon size="md" as={SimpleLineIcons} name="arrow-left" color="primary.text" />}
                                            colorScheme="primary"
                                            onPress={() => {
                                                console.log('hello')
                                            }}
                                        >
                                            previous
                                        </Button>
                                        <Spacer />
                                        <Button
                                            bg="transparent"
                                            p="2"
                                            textTransform={'uppercase'}
                                            fontSize="lg"
                                            rightIcon={<Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />}
                                            colorScheme="primary"
                                            onPress={() => {
                                                console.log('hello')
                                            }}
                                        >
                                            next
                                        </Button>
                                    </HStack>
                                </Box>
                            </Box>
                        </Container> */}
                    </Container>
                    <Box width={"100%"} height={"5%"}>
                        <BannerAds module_name={'sponsors'} module_type={'detail'} module_id={detail?.detail?.id} />
                    </Box>
                </>
            )}
        </>
    )

})

export default Detail