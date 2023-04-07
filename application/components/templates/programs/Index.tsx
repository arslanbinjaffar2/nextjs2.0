import * as React from 'react';
import { Button, Container, HStack, Spacer, Text } from 'native-base';
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
                    <SlideView section="program" />
                </Container>}
            </>
            <>
                {tabs === 'MY_PROGRAM' && <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                    <SlideView section="my-program" />
                </Container>}
            </>
            <>
                {tabs === 'TRACKS' && <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                    <SlideView section="tracks" />
                </Container>}
            </>
        </>
    );
};

export default Index;
