import React from 'react';
import { Spinner, HStack, Heading, Center } from 'native-base';

const MobileLoading = () => {
    return (
        <Center flex={1} w={'100%'}>
            <HStack alignItems="center">
                <Spinner accessibilityLabel="Loading posts" />
                <Heading color="primary.text" fontSize="md">
                    Loading
                </Heading>
            </HStack>
        </Center>
    )
}

export default MobileLoading