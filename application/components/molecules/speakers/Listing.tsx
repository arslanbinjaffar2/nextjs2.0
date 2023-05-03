import React from 'react'
import { HStack, Text } from 'native-base'
import RectangleView from 'application/components/atoms/speakers/RectangleView'
import DynamicIcon from 'application/utils/DynamicIcon';

const Listing = () => {
    return (
        <>
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                <DynamicIcon iconType="speakers" iconProps={{ width: 12, height: 18 }} />
                <Text fontSize="md">Speaker</Text>
            </HStack>
            <RectangleView border={1} />
            <RectangleView border={1} />
            <RectangleView border={1} />
            <RectangleView border={1} />
            <RectangleView border={1} />
        </>
    )
}

export default Listing