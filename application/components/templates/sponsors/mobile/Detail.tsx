import React from 'react'
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Image, Divider, Avatar, Button, ScrollView } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import DynamicIcon from 'application/utils/DynamicIcon';
import Icouser from 'application/assets/icons/small/Icouser';
import Icodocument from 'application/assets/icons/small/Icodocument';
import MultipleAnswer from 'application/components/atoms/surveys/MultipleAnswer';
import { createParam } from 'solito';
import UseSponsorService from 'application/store/services/UseSponsorService';
import DetailBox from 'application/components/atoms/sponsors/DetailBox';

type ScreenParams = { id: string, cms: string | undefined }

const { useParam } = createParam<ScreenParams>()

const Index = React.memo(() => {

    const { FetchSponsorDetail, detail } = UseSponsorService();

    const [id] = useParam('id');

    React.useEffect(() => {
        if (id) {
            FetchSponsorDetail({ id: Number(id) });
        }
    }, [id]);

    console.log(detail)
    return (
        <>
            <ScrollView h={'90%'}>
                <Container mb="4" mt="5" maxW="100%" w="100%" bg="primary.box" rounded="10">
                    <DetailBox />
                    <Box w="100%" p="0">
                        <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                            <Icouser />
                            <Text fontSize="lg">Contact person(s)</Text>
                        </HStack>
                        {[...Array(3)].map((item, k) => <HStack key={`item-${k}`} py="3" px="2" space="4" alignItems="center" borderBottomWidth={k === 2 ? 0 : 1} borderColor="primary.text">
                            <Avatar
                                source={{
                                    uri: 'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                                }}
                            >
                                SS
                            </Avatar>
                            <VStack space="0">
                                <Text fontSize="lg">Stephen Hendry</Text>
                                <Text fontSize="lg">Global INC - Social media Expert</Text>
                            </VStack>
                            <Spacer />
                            <Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />
                        </HStack>)}
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
    )

})

export default Index