import React from 'react'
import { Box, Container, HStack, Icon, IconButton, Image, Input, Spacer, Text, VStack } from 'native-base';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Info } from 'application/models/Info'

const RectangleView = (info: Info) => {

    return (
        <HStack borderBottomWidth="1px" borderBottomColor="primary.text" px="4" py="5" space="4" alignItems="center">
            {
                (() => {
                    if (info.type === 'folder') {
                        return (
                            <Icon as={SimpleLineIcons} name="folder" size="lg" color="primary.text" />
                        )
                    } else if (info.type === 'page') {
                        return (
                            <Icon as={AntDesign} name="filetext1" size="lg" color="primary.text" />
                        )
                    } else if (info.type === 'link') {
                        return (
                            <Icon as={AntDesign} name="link" size="lg" color="primary.text" />
                        )
                    }
                })()
            }
            <Text fontSize="lg">{info?.detail?.name}</Text>
            <Spacer />
            <Icon as={SimpleLineIcons} name="arrow-right" size="md" color="primary.text" />
        </HStack>
    )
}

export default RectangleView