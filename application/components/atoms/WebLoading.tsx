import React from 'react';
import { Spinner, HStack, Heading, Center } from 'native-base';

const WebLoading = () => {
    return (
        <Center flex={1} alignItems={'center'} justifyContent={'center'} w={'100%'} h={'100%'}>
            <HStack alignItems="center" space={3}>
                <Spinner  color="primary.text" size={'lg'} accessibilityLabel="Loading posts" />
                <Heading color="primary.text" ml={1} fontSize="xl">
                    Loading
                </Heading>
            </HStack>
        </Center>
    )
}

export default WebLoading