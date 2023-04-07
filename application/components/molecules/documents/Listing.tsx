import React from 'react'
import { HStack, Text, Icon } from 'native-base'
import RectangleView from 'application/components/atoms/documents/RectangleView'
import AntDesign from '@expo/vector-icons/AntDesign';

const Listing = () => {
    return (
        <>
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                <Icon size="sm" as={AntDesign} name="download" color="primary.text" />
                <Text fontSize="md">Documents</Text>
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