import React from 'react'
import { Box, Button, Container, HStack, Icon, IconButton, Image, Input, Spacer, Text, VStack, ZStack, ScrollView } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import BoxItem from 'application/components/atoms/exhibitors/BoxItem';
import UseSponsorService from 'application/store/services/UseSponsorService';
import RectangleView from 'application/components/atoms/sponsors/RectangleView';
import { Sponsor } from 'application/models/Sponsor'
import BannerView from 'application/components/atoms/banners/RectangleView';

const Index = () => {

    const [tab, setTab] = React.useState(true)

    const [view, setView] = React.useState(true)

    const { sponsors, categories } = UseSponsorService();

    return (
        <>
            <Container h="100%" pt="4" maxW="100%" w="100%">
                <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                    <Text textTransform="uppercase" fontSize="2xl">Sponsors</Text>
                    <Spacer />
                    <Input rounded="10" w="60%" bg="primary.box" borderWidth={0} placeholder="Search" leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
                </HStack>
                <HStack mb="3" space={1} justifyContent="center" w="100%">
                    <Button onPress={() => setTab(true)} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={tab ? 'primary.box' : 'primary.darkbox'} w="50%" _text={{ fontWeight: '600' }}>NAME</Button>
                    <Button onPress={() => setTab(false)} borderWidth="1px" py={0} color="primary.100" borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px" bg={!tab ? 'primary.box' : 'primary.darkbox'} w="50%" _text={{ fontWeight: '600' }}>CATEGORY</Button>
                </HStack>
                {tab && <>
                    <HStack w="100%" mb="3" space="1" alignItems="center" justifyContent="flex-end">
                        <IconButton
                            opacity={!view ? 100 : 50}
                            p="0"
                            variant="transparent"
                            icon={<Icon size="xl" as={Entypo} name="menu" color="primary.text" />}
                            onPress={() => {
                                setView(false)
                            }}

                        />
                        <IconButton
                            p="0"
                            opacity={view ? 100 : 50}
                            variant="transparent"
                            icon={<Icon size="xl" as={Entypo} name="grid" color="primary.text" />}
                            onPress={() => {
                                setView(true)
                            }}

                        />
                    </HStack>
                    {!view &&
                        <Box w="100%" rounded="10" bg="primary.box" borderWidth="1" borderColor="primary.bdBox">
                            {sponsors.length > 0 && sponsors.map((sponsor: Sponsor, key: number) =>
                                <RectangleView sponsor={sponsor} key={key} />
                            )}
                        </Box>
                    }
                    {view && <HStack direction="row" flexWrap="wrap" space="0" alignItems="flex-start">
                        <Box w="49%">
                            <BoxItem
                                image={<Image source={{ uri: 'https://wallpaperaccess.com/full/31751.jpg' }} alt="Alternate Text" w="210px" h="72px" />}
                                category="Technology"
                                bg="#E03C30"
                                speakers={109}
                            />
                        </Box>
                        <Spacer w="2%" />
                        <Box w="49%">
                            <BoxItem
                                image={<Image source={{ uri: 'https://wallpaperaccess.com/full/31751.jpg' }} alt="Alternate Text" w="210px" h="72px" />}
                                category="Technology"
                                bg="#E03C30"
                                speakers={109}
                            />
                        </Box>
                        <Box w="49%">
                            <BoxItem
                                image={<Image source={{ uri: 'https://wallpaperaccess.com/full/31751.jpg' }} alt="Alternate Text" w="210px" h="72px" />}
                                category="Technology"
                                bg="#E03C30"
                                speakers={109}
                            />
                        </Box>
                        <Spacer w="2%" />
                        <Box w="49%">
                            <BoxItem
                                image={<Image source={{ uri: 'https://wallpaperaccess.com/full/31751.jpg' }} alt="Alternate Text" w="210px" h="72px" />}
                                category="Technology"
                                bg="#E03C30"
                                speakers={109}
                            />
                        </Box>
                    </HStack>}
                    <BannerView />
                </>}
                <>
                    {!tab && <Box w="100%" rounded="10" bg="primary.box" borderWidth="1" borderColor="primary.bdBox">
                        {[...Array(4)].map((item, k) =>
                            <Box w="100%" key={k} borderBottomWidth={k === 3 ? 0 : 1} borderColor="primary.text" py="3">
                                <HStack pl="30px" alignItems="center" minH="55px" space={0} justifyContent="flex-start">
                                    <Box position="absolute" left="0" top="0" w="15px">
                                        <ZStack>
                                            {[...Array(k + 1)].map((track, i) =>
                                                <Box key={i} bg={`primary.${i + 1}00`} borderWidth="1" borderColor="primary.darkbox" w="15px" mt={`${i * 10}px`} h={`${55 - (i * 10)}px`} borderRightRadius="10" shadow={2} />
                                            )}
                                        </ZStack>
                                    </Box>
                                    <HStack pt="0" w="100%" space="5" alignItems="center" justifyContent="space-between">
                                        <VStack maxW={['62%', '70%', '40%']} space="1">
                                            <Text fontSize="lg" lineHeight="22px">
                                                Alberto Mark Spancer Gloves
                                            </Text>
                                        </VStack>
                                        <Spacer />
                                        <HStack pr="3" space="5" alignItems="center">
                                            <IconButton
                                                bg="transparent"
                                                p="1"
                                                _hover={{ bg: 'transparent' }}
                                                icon={<Icon size="lg" as={SimpleLineIcons} name="arrow-right" color="primary.text" />}
                                                onPress={() => {
                                                    console.log('hello')
                                                }}
                                            />
                                        </HStack>
                                    </HStack>
                                </HStack>
                            </Box>)}
                    </Box>}
                </>
            </Container>
        </>
    )

}

export default Index