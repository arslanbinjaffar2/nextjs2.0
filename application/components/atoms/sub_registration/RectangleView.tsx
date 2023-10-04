import React from 'react'
import { Box, Heading, HStack, Icon, Spacer, Text, View, VStack } from 'native-base';
import DynamicIcon from 'application/utils/DynamicIcon';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Detail } from 'application/models/attendee/Detail';

type AppProps = {
    detail: Detail,
}

const RectangleView = ({ detail }: AppProps) => {

    return (
        <Box overflow="hidden" w="100%" bg="primary.box" p="0" rounded="10">
            <Box p="0">
                <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                    <DynamicIcon iconType="survey" iconProps={{ width: 14, height: 17 }} />
                    <Text fontSize="md">Sub-registrations</Text>
                </HStack>
                <Box w="100%" py="4">
                    <HStack px="5" w="100%" space="0" alignItems="center" justifyContent="space-between">
                        <VStack bg="red" w="100%" maxW={['95%', '80%', '70%']} space="0">
                            <Text fontSize="md">Lorem Ipsum is simply dummy text of the printing and typesetting industry</Text>
                        </VStack>
                        <Spacer />
                        <Icon as={SimpleLineIcons} name="arrow-right" size="md" />
                    </HStack>
                </Box>
            </Box>
        </Box>
    )

}

export default RectangleView