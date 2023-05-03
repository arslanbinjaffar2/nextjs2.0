import React from 'react'
import { HStack, Text } from 'native-base'
import RectangleView from 'application/components/atoms/polls/RectangleView'
import DynamicIcon from 'application/utils/DynamicIcon';

const Listing = () => {
    return (
        <>
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                <DynamicIcon iconType="polls" iconProps={{ width: 17, height: 17 }} />
                <Text fontSize="md">Polls</Text>
            </HStack>
            <RectangleView />
            <RectangleView />
            <RectangleView />
            <RectangleView />
            <RectangleView />
        </>
    )
}

export default Listing