import React from 'react';
import { Spinner, HStack, Heading, Center } from 'native-base';

type Props = {
    h?: string
}

const SectionLoading = ({ h }: Props) => {
    return (
        <Center alignItems={'center'} justifyContent={'center'} w={'100%'}>
            <HStack alignItems="center" h={h ? h : '500px'}>
                <Spinner accessibilityLabel="Loading posts" />
                <Heading color="primary.500" ml={1} fontSize="md">
                    Loading
                </Heading>
            </HStack>
        </Center>
    )
}

export default SectionLoading