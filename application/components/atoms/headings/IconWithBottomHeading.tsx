import React from 'react';
import { Flex, HStack, Text } from 'native-base';
type AppProps = {
    title: string,
    icon: HTMLElement
}

const IconWithBottomHeading = ({ title, icon }: AppProps) => {
    return (
        <Flex style={{ justifyContent: 'center', alignItems: 'center' }} flexDirection="column">
            <HStack mb="1">
                {icon}
            </HStack>
            <HStack>
                <Text fontSize="xl">{title}</Text>
            </HStack>
        </Flex>
    )
}

export default IconWithBottomHeading