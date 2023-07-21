import React from 'react'
import { Box, Button, Container, HStack, Icon, IconButton, Image, Input, Spacer, Text, VStack, ZStack, ScrollView } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import UseSponsorService from 'application/store/services/UseSponsorService';
import RectangleView from 'application/components/atoms/sponsors/RectangleView';
import BoxView from 'application/components/atoms/sponsors/BoxView';
import { Sponsor } from 'application/models/Sponsor'
import BannerView from 'application/components/atoms/banners/RectangleView';

const Index = () => {

    const [tab, setTab] = React.useState('name')

    const [mode, setMode] = React.useState('grid')

    const { sponsors, categories } = UseSponsorService();

    return (
        <>
            <Container pt="4" maxW="100%" w="100%">
                <HStack mb="3" w="100%" alignItems="center">
                    <Input rounded="10" bg="primary.box" borderWidth={0} placeholder="Search" leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
                </HStack>
                <HStack mb="3" space={1} justifyContent="center" w="100%">
                    <Button onPress={() => setTab('name')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={tab === 'name' ? 'primary.box' : 'primary.darkbox'} w="50%" _text={{ fontWeight: '600' }}>NAME</Button>
                    <Button onPress={() => setTab('category')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px" bg={tab === 'category' ? 'primary.box' : 'primary.darkbox'} w="50%" _text={{ fontWeight: '600' }}>CATEGORY</Button>
                </HStack>
                {tab === 'name' && <>
                    <HStack w="100%" mb="3" space="1" alignItems="center" justifyContent="flex-end">
                        <Text textTransform="uppercase" fontSize="2xl">Sponsors</Text>
                        <Spacer />
                        <IconButton
                            opacity={mode === "list" ? 100 : 50}
                            p="0"
                            variant="transparent"
                            icon={<Icon size="xl" as={Entypo} name="menu" color="primary.text" />}
                            onPress={() => {
                                setMode('list')
                            }}

                        />
                        <IconButton
                            p="0"
                            opacity={mode === "grid" ? 100 : 50}
                            variant="transparent"
                            icon={<Icon size="xl" as={Entypo} name="grid" color="primary.text" />}
                            onPress={() => {
                                setMode('grid')
                            }}

                        />
                    </HStack>
                    {mode === "list" &&
                        <ScrollView h={'48%'}>
                            <Box w="100%" rounded="10" bg="primary.box" borderWidth="1" borderColor="primary.bdBox">
                                {sponsors.length > 0 && sponsors.map((sponsor: Sponsor, key: number) =>
                                    <RectangleView sponsor={sponsor} k={key} />
                                )}
                            </Box>
                        </ScrollView>
                    }
                    {mode === "grid" &&
                        <ScrollView h={'48%'} w={'100%'}>
                            <HStack direction="row" flexWrap="wrap" space="0" alignItems="flex-start">
                                {sponsors.length > 0 && sponsors.map((sponsor: Sponsor, key: number) =>
                                    <BoxView sponsor={sponsor} k={key} />
                                )}
                            </HStack>
                        </ScrollView>
                    }
                    <BannerView />
                </>}
                {tab === 'category' && <Box w="100%" rounded="10" bg="primary.box" borderWidth="1" borderColor="primary.bdBox">
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
            </Container>
        </>
    )

}

export default Index