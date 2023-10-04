import React from 'react';
import { Spinner, HStack, Heading, Center } from 'native-base';

const LoadMore = (props:any) => {
    return (
        <Center alignItems={'center'} justifyContent={'center'} p={props?.p ? props?.p : 0} w={'100%'}>
            <HStack alignItems="center">
                <Spinner accessibilityLabel="Loading posts" />
                <Heading color="primary.500" ml={1} fontSize="md">
                    Loading
                </Heading>
            </HStack>
        </Center>
    )
}

export default LoadMore