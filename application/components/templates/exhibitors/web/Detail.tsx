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
import UseEnvService from 'application/store/services/UseEnvService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import BannerAds from 'application/components/atoms/banners/BannerAds'


type ScreenParams = { id: string, cms: string | undefined }

const { useParam } = createParam<ScreenParams>()

const Detail = React.memo(() => {

    const { FetchExhibitorDetail, detail } = UseExhibitorService();

    const { loading, processing } = UseLoadingService();

    const [id] = useParam('id');

    const { documents, clearState } = UseDocumentService();
    
    const { event, modules } = UseEventService();

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
                            {/*{filteredBanner?.length > 0 && filteredBanner.map((banner: any, key: number) =>*/}

                            {/*    <Image source={{ uri: `${_env.eventcenter_base_url}/assets/banners/${banner.image}` }} alt="Alternate Text" w="700px" h="100px" rounded={10} />*/}
                            {/*)}*/}
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
                        <BannerAds module_name={'exhibitors'} module_type={'detail'} module_id={detail?.detail?.id} />
                    </Box>
                </>
            )}
        </>
    )

})

export default Detail