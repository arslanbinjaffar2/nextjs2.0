import React from 'react';
import { Box, HStack, Spacer, Text, VStack, Pressable, Icon } from 'native-base'
import AntDesign from '@expo/vector-icons/AntDesign';

const RectangleView = () => {

    return (
        <Box w="100%" py="4">
            <HStack px="5" w="100%" space="0" alignItems="center" justifyContent="space-between">
                <VStack bg="red" w="100%" maxW={['95%', '80%', '70%']} space="0">
                    <Text fontSize="md">10 things we can do to help</Text>
                </VStack>
                <Spacer />
                <Icon size="lg" as={AntDesign} name="pdffile1" color="primary.text" />
            </HStack>
        </Box>
    )

}

export default RectangleView