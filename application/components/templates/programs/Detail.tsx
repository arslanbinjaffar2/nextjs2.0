import React, { useState } from 'react'

import { Box, Button, Container, HStack, Text } from 'native-base';

import DetailBlock from 'application/components/atoms/programs/DetailBlock';

import SpeakerListing from 'application/components/molecules/speakers/Listing';

import PollRectangleView from 'application/components/atoms/polls/RectangleView'

import RequestToSpeakListing from 'application/components/molecules/request_to_speak/Listing';

import ListingLayout1 from 'application/components/molecules/documents/ListingLayout1';

import DynamicIcon from 'application/utils/DynamicIcon';

const Detail = () => {

    const [tabs, settabs] = useState<string | null>('ABOUT');

    return (
        <>
            <DetailBlock />
            <Container mb="3" maxW="100%" w="100%">
                <HStack mb="3" space={1} justifyContent="center" w="100%">
                    <Button onPress={() => settabs('ABOUT')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={tabs === 'ABOUT' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{ fontWeight: '600' }}>ABOUT</Button>
                    <Button onPress={() => settabs('GROUPS')} borderRadius="0" borderWidth="1px" py={0} borderColor="primary.darkbox" h="42px" bg={tabs === 'GROUPS' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{ fontWeight: '600' }}>GROUPS</Button>
                    <Button onPress={() => settabs('ATTENDEES')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px" bg={tabs === 'ATTENDEES' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{ fontWeight: '600' }}>ATTENDEES</Button>
                </HStack>
                <Box overflow="hidden" w="100%" bg="primary.box" p="0" rounded="10">
                    <SpeakerListing />
                    <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                        <DynamicIcon iconType="polls" iconProps={{ width: 17, height: 17 }} />
                        <Text fontSize="md">Polls</Text>
                    </HStack>
                    <PollRectangleView />
                    <RequestToSpeakListing />
                    <ListingLayout1 />
                </Box>
            </Container>
        </>
    )

}

export default Detail