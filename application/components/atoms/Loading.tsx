import React from 'react';
import { Spinner, HStack, Heading, Center } from 'native-base';

const Loading = () => {
    return (
        <Center flex={1}>
            <HStack alignItems="center">
                <Spinner accessibilityLabel="Loading posts" />
                <Heading color="primary.500" fontSize="md">
                    Loading
                </Heading>
            </HStack>
        </Center>
    )
}

export default Loading