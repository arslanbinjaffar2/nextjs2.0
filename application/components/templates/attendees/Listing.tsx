import React from 'react'
import { useState } from 'react';
import { Button, Container, HStack, Spacer, Text, VStack } from 'native-base';
import RectangleAttendeeView from 'application/components/atoms/attendees/RectangleView';
import Search from 'application/components/atoms/attendees/Search';
import RectangleGroupView from 'application/components/atoms/attendees/groups/RectangleView';

const Listing = () => {

    const [tabs, settabs] = useState<string | null>('PROGRAM');

    const alpha = Array.from(Array(26)).map((e, i) => i + 65);

    const alphabet = alpha.map((x) => String.fromCharCode(x));

    return (
        <>
            <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                <Text fontSize="2xl">ATTENDEES</Text>
                <Spacer />
                <Search />
            </HStack>
            <HStack mb="3" space={1} justifyContent="center" w="100%">
                <Button onPress={() => settabs('PROGRAM')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={tabs === 'PROGRAM' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{ fontWeight: '600' }}>ALL</Button>
                <Button onPress={() => settabs('MY_PROGRAM')} borderRadius="0" borderWidth="1px" py={0} borderColor="primary.darkbox" h="42px" bg={tabs === 'MY_PROGRAM' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{ fontWeight: '600' }}>MY ATTENDEES</Button>
                <Button onPress={() => settabs('GROUPS')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px" bg={tabs === 'GROUPS' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{ fontWeight: '600' }}>GROUPS</Button>
            </HStack>
            <>
                {tabs === 'PROGRAM' && <Container position="relative" mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                    <VStack w="20px" position="absolute" right="-20px" top="0" space="1">
                        {alphabet && alphabet.map((item, k) =>
                            <Text textAlign="center" color="primary.text" opacity="0.5" key={k} fontSize="md">{item}</Text>
                        )}
                    </VStack>
                    <Text w="100%" pl="18px" bg="primary.darkbox">A</Text>
                    {[...Array(3)].map((item, k) =>
                        <React.Fragment key={`item-box-${k}`}>
                            <RectangleAttendeeView border={k === 2 ? 0 : 1} />
                        </React.Fragment>
                    )}
                    <Text w="100%" pl="18px" bg="primary.darkbox">B</Text>
                    {[...Array(3)].map((item, k) =>
                        <React.Fragment key={`item-box-alt-${k}`}>
                            <RectangleAttendeeView border={k === 2 ? 0 : 1} />
                        </React.Fragment>
                    )}
                </Container>}
            </>
            <>
                {tabs === 'MY_PROGRAM' && <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                    {[...Array(6)].map((item, k) =>
                        <React.Fragment key={`item-box-programs-${k}`}>
                            <RectangleAttendeeView border={k === 5 ? 0 : 1} />
                        </React.Fragment>
                    )}
                </Container>}
            </>
            <>
                {tabs === 'GROUPS' && <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                    {[...Array(7)].map((item, k) =>
                        <React.Fragment key={`item-box-group-${k}`}>
                            <RectangleGroupView k={k} />
                        </React.Fragment>
                    )}
                </Container>}
            </>
        </>
    )

}

export default Listing