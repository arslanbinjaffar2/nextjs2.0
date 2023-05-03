import React, { useState } from 'react'
import { Box, Heading, HStack, Icon, Spacer, Text, VStack } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import DynamicIcon from 'application/utils/DynamicIcon';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

const DetailInfoBlock = (props: any) => {

    return (
        <Box overflow="hidden" w="100%" bg="primary.box" p="0" rounded="10">
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                <Icon as={AntDesign} name="infocirlceo" size="md" color="primary.text" />
                <Text fontSize="md">About</Text>
            </HStack>
            <VStack py="5" px="4" space="0" alignItems="center">
                <Text fontSize="md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim eniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </Text>
            </VStack>
            <Box p="0">
                <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                    <Icon as={AntDesign} name="infocirlceo" size="md" color="primary.text" />
                    <Text fontSize="md">More info</Text>
                </HStack>
                <VStack px="3" py="4" w="100%" space="3">
                    <HStack space="0" alignItems="flex-start">
                        <Box w="15%">
                            <Heading fontSize="md" lineHeight="lg">Job task :</Heading>
                        </Box>
                        <Box w="84%" pl="1">
                            <Text fontSize="md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                        </Box>
                    </HStack>
                    <HStack space="0" alignItems="flex-start">
                        <Box w="15%">
                            <Heading fontSize="md" lineHeight="lg">Interests :</Heading>
                        </Box>
                        <Box w="84%" pl="1">
                            <Text fontSize="md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</Text>
                        </Box>
                    </HStack>
                    <HStack space="0" alignItems="flex-start">
                        <Box w="15%">
                            <Heading fontSize="md" lineHeight="lg">Network Group :</Heading>
                        </Box>
                        <Box w="84%" pl="1">
                            <Text fontSize="md">My network</Text>
                        </Box>
                    </HStack>
                    <HStack space="0" alignItems="flex-start">
                        <Box w="15%">
                            <Heading fontSize="md" lineHeight="lg">Age:</Heading>
                        </Box>
                        <HStack space="24" w="84%" pl="1" alignItems="flex-start">
                            <Text fontSize="md">25 years</Text>
                            <HStack space="4">
                                <Heading fontSize="md" lineHeight="lg">Private post code :</Heading>
                                <Text fontSize="md">76765</Text>
                            </HStack>
                        </HStack>
                    </HStack>
                </VStack>
            </Box>
            <Box p="0">
                <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                    <DynamicIcon iconType="survey" iconProps={{ width: 14, height: 17 }} />
                    <Text fontSize="md">Sub-registrations</Text>
                </HStack>
                <Box w="100%" py="4">
                    <HStack px="5" w="100%" space="0" alignItems="center" justifyContent="space-between">
                        <VStack bg="red" w="100%" maxW={['95%', '80%', '70%']} space="0">
                            <Text fontSize="md">10 things we can do to help</Text>
                        </VStack>
                        <Spacer />
                        <Icon as={SimpleLineIcons} name="arrow-right" size="md" />
                    </HStack>
                </Box>
            </Box>
        </Box>
    )

}

export default DetailInfoBlock