import React from 'react'
import { Box, HStack, Spacer, Text, VStack } from 'native-base'
import IcoRaiseHand from 'application/assets/icons/IcoRaiseHand';
import { Program } from 'application/models/program/Detail';

type AppProps = {
    program?: Program
}

const RectangleView = ({ program }: AppProps) => {
    return (
        <Box w="100%" py="4">
            <HStack px="5" w="100%" space="0" alignItems="center" justifyContent="space-between">
                <VStack bg="red" w="100%" maxW={['95%', '80%', '70%']} space="0">
                    <Text fontSize="md">{program?.topic}</Text>
                </VStack>
                <Spacer />
                <IcoRaiseHand width="20" height="26" />
            </HStack>
        </Box>
    )
}

export default RectangleView