import React from 'react';
import { Center, Flex, HStack, Text, VStack } from 'native-base';
type AppProps = {
    title: string,
    icon: any
}

const IconWithLeftHeading = ({ title, icon }: AppProps) => {
    return (
        <Flex mb="0" alignItems="flex-start" flexDirection="row">
            <Center alignItems="flex-start" w="100%">
                <HStack alignItems="center" space="3">
                    {icon}<Text fontSize="xl">{title}</Text>
                </HStack>
            </Center>
        </Flex>
    )
}

export default IconWithLeftHeading