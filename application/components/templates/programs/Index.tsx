import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Center, Container, Heading, HStack, Icon, IconButton, Input, Spacer, Text, VStack, ZStack } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import Master from 'application/screens/web/layouts/Master';
import { useState } from 'react';
import Search from 'application/components/atoms/programs/Search';

const Index = () => {

    const [tabs, settabs] = useState<string | null>('PROGRAM');

    const programs = [{
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        text: 'First point in the agenda, with room for two or three lines of text.',
        starttime: '12:47',
        endtime: '12:47',
        tracks: [{ name: 'Technology', color: '#F5B761' }, { name: 'Nature', color: '#74AD6A' }, { name: 'Banking', color: '#74ADEF' }]
    }, {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        starttime: '11:11',
        endtime: '11:11',
        text: 'First point in the agenda',
        tracks: [{ name: 'Technology', color: '#F5B761' }, { name: 'Banking', color: '#74ADEF' }]
    }, {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        starttime: '6:22',
        endtime: '6:22',
        text: 'With room for two or three lines of text.',
        tracks: [{ name: 'Technology', color: '#F5B761' }]
    }, {
        id: '68694a0f-3da1-431f-bd56-142371e29d72',
        starttime: '8:56',
        endtime: '8:56',
        text: 'First point in the agenda, with room for two or three lines of text.',
        tracks: [{ name: 'Technology', color: '#74ADEF' }]
    }, {
        id: '28694a0f-3da1-471f-bd96-142456e29d72',
        starttime: '12:47',
        endtime: '12:47',
        text: 'First point in the agenda, with room for two or three lines of text.',
        tracks: [{ name: 'Technology', color: '#9F1C2B' }]
    }];
    
    return (
        <>
            <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                <Text fontSize="2xl">PROGRAMS</Text>
                <Spacer />
                <Search />
            </HStack>
            <HStack mb="3" space={1} justifyContent="center" w="100%">
                <Button onPress={() => settabs('PROGRAM')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={tabs === 'PROGRAM' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{ fontWeight: '600' }}>PROGRAM</Button>
                <Button onPress={() => settabs('MY_PROGRAM')} borderRadius="0" borderWidth="1px" py={0} borderColor="primary.darkbox" h="42px" bg={tabs === 'MY_PROGRAM' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{ fontWeight: '600' }}>MY PROGRAM</Button>
                <Button onPress={() => settabs('TRACKS')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px" bg={tabs === 'TRACKS' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{ fontWeight: '600' }}>TRACKS</Button>
            </HStack>
            <>
                {tabs === 'PROGRAM' && <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                    <Heading py="1" fontSize="2xl" w="100%" textAlign="center">PROGRAM</Heading>
                    <HStack py="1" w="100%" bg="primary.darkbox" space="0" alignItems="center">
                        <Center alignItems="flex-start" w="10%">
                            <IconButton
                                p="0"
                                w="40px"
                                variant="transparent"
                                icon={<Icon size="md" as={SimpleLineIcons} name="arrow-left" color="primary.text" />}
                                onPress={() => {
                                    console.log('hello')
                                }}
                            />
                        </Center>
                        <Center w="80%">
                            <Heading fontSize="lg">Wednesday - Oktober 7</Heading>
                        </Center>
                        <Center alignItems="flex-end" w="10%">
                            <IconButton
                                p="0"
                                w="40px"
                                variant="transparent"
                                icon={<Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />}
                                onPress={() => {
                                    console.log('hello')
                                }}
                            />
                        </Center>
                    </HStack>
                    {[...Array(4)].map((item, k) =>
                        <Box w="100%" key={k} borderBottomWidth={k === 3 ? 0 : 1} borderColor="primary.text" py="3">
                            <HStack pl="30px" alignItems="flex-start" minH="55px" space={0} justifyContent="flex-start">
                                <Box position="absolute" left="0" top="0" w="15px">
                                    <ZStack>
                                        {[...Array(k + 1)].map((track, i) =>
                                            <Box key={i} bg={`primary.${i + 1}00`} borderWidth="1" borderColor="primary.darkbox" w="15px" mt={`${i * 10}px`} h={`${55 - (i * 10)}px`} borderRightRadius="10" shadow={2} />
                                        )}
                                    </ZStack>
                                </Box>
                                <HStack pt="2" w="100%" space="5" alignItems="center" justifyContent="space-between">
                                    <VStack w="40px" space="0">
                                        <Text lineHeight="22px">08:50</Text>
                                        <Text lineHeight="22px">09:45</Text>
                                    </VStack>

                                    <Text lineHeight="22px" maxW={['62%', '70%', '40%']} alignSelf="flex-start">
                                        First point in the agenda, with room for two lines of text.
                                    </Text>
                                    <Spacer />
                                    <HStack pr="3" space="5" alignItems="center">
                                        <Icon size="xl" as={Ionicons} name="ios-videocam-outline" color="primary.text" />
                                        <Icon size="xl" as={Ionicons} name="heart-outline" color="primary.text" />
                                    </HStack>
                                </HStack>
                            </HStack>
                        </Box>)}
                    <Text w="100%" pl="30px" bg="primary.darkbox">Afternoon sessions</Text>
                    {[...Array(3)].map((item, k) =>
                        <Box w="100%" key={k} borderBottomWidth={k === 2 ? 0 : 1} borderColor="primary.text" py="3">
                            <HStack pl="30px" alignItems="flex-start" minH="55px" space={0} justifyContent="flex-start">
                                <Box position="absolute" left="0" top="0" w="15px">
                                    <ZStack>
                                        {[...Array(k + 1)].map((track, i) =>
                                            <Box key={i} bg={`red.${i + 1}00`} borderWidth="1" borderColor="primary.darkbox" w="15px" mt={`${i * 10}px`} h={`${55 - (i * 10)}px`} borderRightRadius="10" shadow={2} />
                                        )}
                                    </ZStack>
                                </Box>
                                <HStack pt="2" w="100%" space="5" alignItems="center" justifyContent="space-between">
                                    <VStack w="40px" space="0">
                                        <Text lineHeight="22px">08:50</Text>
                                        <Text lineHeight="22px">09:45</Text>
                                    </VStack>

                                    <Text lineHeight="22px" maxW={['62%', '70%', '40%']} alignSelf="flex-start">
                                        First point in the agenda, with room for two lines of text.
                                    </Text>
                                    <Spacer />
                                    <HStack pr="3" space="5" alignItems="center">
                                        <Icon size="xl" as={Ionicons} name="ios-videocam-outline" color="primary.text" />
                                        <Icon size="xl" as={Ionicons} name="heart" color="primary.text" />
                                    </HStack>
                                </HStack>
                            </HStack>
                        </Box>)}
                    <Text w="100%" pl="30px" bg="primary.darkbox">Workshops</Text>
                    {[...Array(2)].map((item, k) =>
                        <Box w="100%" key={k} borderBottomWidth={k === 1 ? 0 : 1} borderColor="primary.text" py="3">
                            <HStack pl="30px" alignItems="flex-start" minH="55px" space={0} justifyContent="flex-start">
                                <Box position="absolute" left="0" top="0" w="15px">
                                    <ZStack>
                                        {[...Array(k + 1)].map((track, i) =>
                                            <Box key={i} bg={`green.${i + 1}00`} borderWidth="1" borderColor="primary.darkbox" w="15px" mt={`${i * 10}px`} h={`${55 - (i * 10)}px`} borderRightRadius="10" shadow={2} />
                                        )}
                                    </ZStack>
                                </Box>
                                <HStack pt="2" w="100%" space="5" alignItems="center" justifyContent="space-between">
                                    <VStack w="40px" space="0">
                                    </VStack>
                                    <Center maxW={['62%', '70%', '60%']} alignSelf="flex-start" p="0">
                                        <Text alignSelf="flex-start" lineHeight="22px">Workshop name here</Text>
                                        <HStack space="3" alignItems="center">
                                            <Text lineHeight="22px">03-08-2021</Text>
                                            <Text lineHeight="22px">04-09-2021</Text>
                                        </HStack>
                                    </Center>
                                    <Spacer />
                                    <HStack pr="5" space="2" alignItems="center">
                                        <Icon size="xl" as={AntDesign} name="calendar" color="primary.text" />
                                        <Text pt="1" fontSize="lg">8</Text>
                                    </HStack>
                                </HStack>
                            </HStack>
                        </Box>)}
                </Container>}
            </>
            <>
                {tabs === 'MY_PROGRAM' && <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                    {[...Array(5)].map((item, k) =>
                        <Box w="100%" key={k} borderBottomWidth={k === 4 ? 0 : 1} borderColor="primary.text" py="3">
                            <HStack pl="30px" alignItems="flex-start" minH="55px" space={0} justifyContent="flex-start">
                                <Box position="absolute" left="0" top="0" w="15px">
                                    <ZStack>
                                        {[...Array(1)].map((track, i) =>
                                            <Box key={i} bg={`green.${i + 1}00`} borderWidth="1" borderColor="primary.darkbox" w="15px" mt={`${i * 10}px`} h={`${55 - (i * 10)}px`} borderRightRadius="10" shadow={2} />
                                        )}
                                    </ZStack>
                                </Box>
                                <HStack pt="2" w="100%" space="5" alignItems="center" justifyContent="space-between">
                                    <VStack w="40px" space="0">
                                        <Text lineHeight="22px">08:50</Text>
                                        <Text lineHeight="22px">09:45</Text>
                                    </VStack>
                                    <Center maxW={['62%', '70%', '42%']} alignSelf="flex-start" p="0">
                                        <Text alignSelf="flex-start" lineHeight="22px">First point in the agenda, with room for two lines of text.</Text>
                                    </Center>
                                    <Spacer />
                                    <HStack pr="5" space="2" alignItems="center">
                                        <Icon size="xl" as={Ionicons} name="heart" color="primary.secondary" />
                                    </HStack>
                                </HStack>
                            </HStack>
                        </Box>)}
                </Container>}
            </>
            <>
                {tabs === 'TRACKS' && <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                    {[...Array(5)].map((item, k) =>
                        <Box w="100%" key={k} borderBottomWidth={k === 4 ? 0 : 1} borderColor="primary.text" py="3">
                            <HStack pl="30px" alignItems="center" minH="55px" space={0} justifyContent="flex-start">
                                <Box position="absolute" left="0" top="0" w="15px">
                                    <ZStack>
                                        {[...Array(1)].map((track, i) =>
                                            <Box key={i} bg={`green.${i + 1}00`} borderWidth="1" borderColor="primary.darkbox" w="15px" mt={`${i * 10}px`} h={`${55 - (i * 10)}px`} borderRightRadius="10" shadow={2} />
                                        )}
                                    </ZStack>
                                </Box>
                                <HStack pt="02" w="100%" space="5" alignItems="center" justifyContent="space-between">
                                    <Center maxW={['62%', '70%', '42%']} alignSelf="flex-start" p="0">
                                        <Text alignSelf="flex-start" lineHeight="22px">Technology</Text>
                                    </Center>
                                </HStack>
                            </HStack>
                        </Box>)}
                </Container>}
            </>
        </>
    );
};

export default Index;
