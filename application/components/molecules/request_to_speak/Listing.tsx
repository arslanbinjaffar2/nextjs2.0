import React from 'react'
import { HStack, Text } from 'native-base'
import RectangleView from 'application/components/atoms/request_to_speak/RectangleView'
import IcoRaiseHand from 'application/assets/icons/IcoRaiseHand'

const Listing = () => {
    return (
        <>
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                <IcoRaiseHand width="14" height="17" />
                <Text fontSize="md">Request to speak</Text>
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