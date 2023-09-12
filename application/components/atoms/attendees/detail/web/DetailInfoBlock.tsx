import React from 'react'
import { Box, Heading, HStack, Icon, Spacer, Text, View, VStack } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Detail } from 'application/models/attendee/Detail';

type AppProps = {
    detail: Detail,
}

const DetailInfoBlock = ({ detail }: AppProps) => {

    return (
        <Box overflow="hidden" w="100%" bg="primary.box" p="0" rounded="10">
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                <Icon as={AntDesign} name="infocirlceo" size="md" color="primary.text" />
                <Text fontSize="md">About</Text>
            </HStack>
            {detail?.detail?.info?.about! && (
                <VStack py="5" px="4" space="0" alignItems="center">
                    <View w={'100%'}>
                        <div dangerouslySetInnerHTML={{ __html: detail?.detail?.info?.about! }}></div>
                    </View>
                </VStack>
            )}
            {(detail?.detail?.info?.jobs! || detail?.detail?.info?.interests! || detail?.detail?.info?.network_group! || detail?.detail?.info?.age! || detail?.detail?.info?.network_group!) && (
                <Box p="0">
                    <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                        <Icon as={AntDesign} name="infocirlceo" size="md" color="primary.text" />
                        <Text fontSize="md">More info</Text>
                    </HStack>
                    <VStack px="3" py="4" w="100%" space="3">
                        {detail?.detail?.info?.jobs! && (
                            <HStack space="0" alignItems="flex-start">
                                <Box w="25%">
                                    <Heading fontSize="md" lineHeight="lg">Job task :</Heading>
                                </Box>
                                <Box w="65%" pl="1">
                                    <Text fontSize="md">{detail?.detail?.info?.jobs}</Text>
                                </Box>
                            </HStack>
                        )}
                        {detail?.detail?.info?.interests! && (
                            <HStack space="0" alignItems="flex-start">
                                <Box w="25%">
                                    <Heading fontSize="md" lineHeight="lg">Interests :</Heading>
                                </Box>
                                <Box w="65%" pl="1">
                                    <Text fontSize="md">{detail?.detail?.info?.interests}</Text>
                                </Box>
                            </HStack>
                        )}
                        {detail?.detail?.info?.network_group! && (
                            <HStack space="0" alignItems="flex-start">
                                <Box w="25%">
                                    <Heading fontSize="md" lineHeight="lg">Network Group :</Heading>
                                </Box>
                                <Box w="65%" pl="1">
                                    <Text fontSize="md">{detail?.detail?.info?.network_group}</Text>
                                </Box>
                            </HStack>
                        )}
                        <HStack w="100%" maxW={'100%'}>
                            {detail?.detail?.info?.age! && (
                                <HStack w="50%" space="0" >
                                    <Box w="144px">
                                        <Heading fontSize="md" lineHeight="lg">Age:</Heading>
                                    </Box>
                                    <Box pl="1">
                                        <Text fontSize="md">{detail?.detail?.info?.age} years</Text>
                                    </Box>
                                </HStack>
                            )}
                            {detail?.detail?.info?.private_post_code! && (
                                <HStack w="50%" space="0" >
                                    <Box w="144px">
                                        <Heading fontSize="md" lineHeight="lg">Private post code :</Heading>
                                    </Box>
                                    <Box pl="1">
                                        <Text fontSize="md">{detail?.detail?.info?.private_post_code}</Text>
                                    </Box>
                                </HStack>
                            )}
                        </HStack>
                    </VStack>
                </Box>
            )}
        </Box>
    )

}

export default DetailInfoBlock