import React from 'react'
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Divider, Button, ScrollView } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import Icouser from 'application/assets/icons/small/Icouser';
import Icodocument from 'application/assets/icons/small/Icodocument';
import MultipleAnswer from 'application/components/atoms/surveys/MultipleAnswer';
import { createParam } from 'solito';
import UseExhibitorService from 'application/store/services/UseExhibitorService';
import DetailBox from 'application/components/atoms/exhibitors/DetailBox';
import UseLoadingService from 'application/store/services/UseLoadingService';
import MobileLoading from 'application/components/atoms/MobileLoading';
import { ExhibitorsAttendee } from 'application/models/exhibitor/ExhibitorDetail'
import RectangleView from 'application/components/atoms/exhibitors/contact-person/RectangleView';

type ScreenParams = { id: string, cms: string | undefined }

const { useParam } = createParam<ScreenParams>()

const Index = React.memo(() => {

    const { FetchExhibitorDetail, detail } = UseExhibitorService();

    const { loading } = UseLoadingService();

    const [id] = useParam('id');

    React.useEffect(() => {
        if (id) {
            FetchExhibitorDetail({ id: Number(id) });
        }
    }, [id]);

    return (
        <>
            <Container maxW="100%" h={'93%'} w="100%">
                {loading ? (
                    <MobileLoading />
                ) : (
                    <>
                        <ScrollView>
                            <Container mb="4" mt="5" maxW="100%" w="100%" bg="primary.box" rounded="10">
                                <DetailBox detail={detail} />
                                <Box w="100%" p="0">
                                    <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                                        <Icouser />
                                        <Text fontSize="lg">Contact person(s)</Text>
                                    </HStack>
                                    {detail?.detail?.exhibitors_attendee!?.length > 0 && (
                                        detail?.detail?.exhibitors_attendee?.map((attendee: ExhibitorsAttendee, key: number) =>
                                            <React.Fragment key={key}>
                                                <RectangleView attendee={attendee} k={key} />
                                            </React.Fragment>
                                        )
                                    )}
                                </Box>
                                <Box p="0" w="100%">
                                    <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                                        <Icodocument width="15px" height="18px" />
                                        <Text fontSize="lg">Documents</Text>
                                    </HStack>
                                    <Box w="100%" py="4">
                                        <HStack px="5" w="100%" space="0" alignItems="center" justifyContent="space-between">
                                            <VStack bg="red" w="100%" maxW={['95%', '80%', '70%']} space="0">
                                                <HStack space="3" alignItems="center">
                                                    <Icon size="md" as={AntDesign} name="pdffile1" color="primary.text" />
                                                    <Text fontSize="md">10 things we can do to help</Text>
                                                </HStack>

                                            </VStack>
                                            <Spacer />
                                            <Icon size="lg" as={AntDesign} name="download" color="primary.text" />
                                        </HStack>
                                    </Box>
                                </Box>
                            </Container>
                            <Container mb="3" maxW="100%" w="100%">
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
                            </Container>
                        </ScrollView>
                    </>
                )}
            </Container>
        </>
    )

})

export default Index