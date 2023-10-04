import React from 'react'
import { HStack, Text, Icon } from 'native-base'
import RectangleViewLayout1 from 'application/components/atoms/documents/RectangleViewLayout1'
import AntDesign from '@expo/vector-icons/AntDesign';

const ListingLayout1 = () => {
    return (
        <>
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                <Icon size="sm" as={AntDesign} name="download" color="primary.text" />
                <Text fontSize="md">Documents</Text>
            </HStack>
            <RectangleViewLayout1 />
            <RectangleViewLayout1 />
            <RectangleViewLayout1 />
            <RectangleViewLayout1 />
            <RectangleViewLayout1 />
        </>
    )
}

export default ListingLayout1