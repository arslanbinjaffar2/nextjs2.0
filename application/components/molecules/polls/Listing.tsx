import React from 'react'
import { HStack, Text } from 'native-base'
import RectangleView from 'application/components/atoms/polls/RectangleView'
import IcoPolls from 'application/assets/icons/IcoPolls'

const Listing = () => {
    return (
        <>
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                <IcoPolls width="17" height="17" />
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