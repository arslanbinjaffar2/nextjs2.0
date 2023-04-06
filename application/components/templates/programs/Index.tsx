import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Center, Container, Heading, HStack, Icon, IconButton, Input, Spacer, Text, VStack, ZStack } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import Master from 'application/screens/web/layouts/Master';
import { useState } from 'react';
import Search from 'application/components/atoms/programs/Search';
import SlideView from 'application/components/molecules/programs/SlideView';

const Index = () => {

    const [tabs, settabs] = useState<string | null>('PROGRAM');

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
                    <SlideView />
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
