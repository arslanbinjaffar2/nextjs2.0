import React from 'react'
import { Box, Heading, HStack, Icon, Pressable, Spacer, Text, View, VStack } from 'native-base';
import DynamicIcon from 'application/utils/DynamicIcon';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Detail } from 'application/models/attendee/Detail';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'solito/router';

type AppProps = {
    detail: Detail,
}

const RectangleView = ({ detail }: AppProps) => {
    const { event } = UseEventService();
    const { push } = useRouter()
    return (
        <Box overflow="hidden" w="100%" bg="primary.box" p="0" rounded="10">
            <Box p="0">
                <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                    <DynamicIcon iconType="survey" iconProps={{ width: 14, height: 17 }} />
                    <Text fontSize="md">{event?.modules_labels?.subregistration}</Text>
                </HStack>
                <Pressable
                    p="0"
                    w="100%"
                    _hover={{ bg: 'primary.500' }}
                    onPress={() => { 
                        push(`/${event.url}/settings/subregistration`)
                }}>

                    <Box w="100%" py="4">
                        <HStack px="5" w="100%" space="0" alignItems="center" justifyContent="space-between">
                            <VStack bg="red" w="100%" maxW={['95%', '80%', '70%']} space="0">
                                <Text fontSize="md">{event?.setting_modules_labels?.subregistration}</Text>
                            </VStack>
                            <Spacer />
                            <Icon as={SimpleLineIcons} name="arrow-right" size="md" />
                        </HStack>
                    </Box>
                </Pressable>
            </Box>
        </Box>
    )

}

export default RectangleView