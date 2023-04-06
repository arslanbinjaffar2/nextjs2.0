import React from 'react'
import Icoribbon from 'application/assets/icons/Icoribbon';
import Icoresume from 'application/assets/icons/Icoresume';
import Icohotelbed from 'application/assets/icons/Icohotelbed';
import { Box, Center, Container, HStack, Spacer, Text, VStack, Avatar } from 'native-base';

const BasicInfoBlock = () => {

    return (
        <Container borderWidth="1" borderColor="primary.darkbox" bg="primary.500" rounded="10" overflow="hidden" mb="3" maxW="100%" w="100%">
            <Box w="100%" p="4" py="5" rounded="10">
                <HStack mb="4" space="5">
                    <Avatar
                        size="lg"
                        borderWidth="1"
                        borderColor="primary.darkbox"
                        source={{
                            uri: 'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                        }}
                    >
                        BB
                    </Avatar>
                    <VStack maxW="70%" space="0">
                        <Text lineHeight="sm" fontSize="xl">Marie Solbakke</Text>
                        <Text lineHeight="sm" fontSize="md">Transportfirmaet HT</Text>
                        <Text lineHeight="sm" fontSize="md">Marketing CEO</Text>
                    </VStack>
                    <Spacer />
                    <Box w="20px" h="100%">
                        <Icoribbon width="20" height="28" />
                    </Box>
                </HStack>
                <HStack w="100%" space="0">
                    <Center alignItems="flex-start" pl="0" w="33.33%">
                        <VStack space="0">
                            <Text lineHeight="sm" fontSize="sm">Initials</Text>
                            <Text lineHeight="sm" fontSize="sm">MSA</Text>
                        </VStack>
                    </Center>
                    <Center borderLeftWidth="1" borderColor="primary.text" alignItems="flex-start" pl="8" w="33.33%">
                        <VStack space="0">
                            <Text lineHeight="sm" fontSize="sm">Delegate nr:</Text>
                            <Text lineHeight="sm" fontSize="sm">21405</Text>
                        </VStack>
                    </Center>
                    <Center borderLeftWidth="1" borderColor="primary.text" alignItems="flex-start" pl="8" w="33.33%">
                        <VStack space="0">
                            <Text lineHeight="sm" fontSize="sm">Table nr:</Text>
                            <Text lineHeight="sm" fontSize="sm">00212</Text>
                        </VStack>
                    </Center>
                </HStack>
            </Box>
            <Box w="100%" bg="primary.secondary" px="5" py="3" borderTopWidth="1" borderColor="primary.darkbox">
                <HStack w="100%" space="0">
                    <Center w="20%" alignItems="flex-start">
                        <Icoresume width="22" height="25" />
                    </Center>
                    <Center w="20%" borderLeftWidth="1" borderColor="primary.text" alignItems="center">
                        <Icohotelbed width="24" height="18" />
                    </Center>
                </HStack>
            </Box>
        </Container>
    )

}

export default BasicInfoBlock