/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Box, Icon, Image } from 'native-base'

const BoxView = (props: any) => {
    return (
        <Box position="relative" alignItems="center" justifyContent="center" rounded="md" w="150px" h="85" overflow="hidden" bg="rgba(0,0,0,0.5)">
            <Icon position="relative" zIndex="9" as={MaterialIcons} size="3xl" color="#fff" name="play-arrow" />
            <Image
                opacity="0.5"
                position="absolute"
                w="100%"
                h="100%"
                source={{ uri: props?.video?.image }}
                alt={props?.video?.text}
            />
        </Box>
    )
}

export default BoxView
