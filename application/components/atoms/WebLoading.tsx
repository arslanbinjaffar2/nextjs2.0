import React from 'react';
import { Spinner, HStack, Heading, Center } from 'native-base';

const WebLoading = () => {
    return (
        <Center flex={1} mt={'50%'} ml={'40%'}>
            <HStack alignItems="center">
                <Spinner accessibilityLabel="Loading posts" />
                <Heading color="primary.500" ml={1} fontSize="md">
                    Loading
                </Heading>
            </HStack>
        </Center>
    )
}

export default WebLoading