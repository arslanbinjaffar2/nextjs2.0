import React from 'react'
import { Box, Center, Avatar, HStack, IconButton, Button, Divider, TextArea, Icon, Text, Image, Spacer } from 'native-base'
import IcoLike from 'application/assets/icons/Icolike'
import IcoSmiley from 'application/assets/icons/Icosmiley';
import Ionicons from '@expo/vector-icons/Ionicons';

const AddPost = () => {

    return (
        <Box borderWidth="1" borderColor="primary.bdBox" overflow="hidden" position="relative" w="100%" bg="primary.box" rounded="10" mb="3">
            <IconButton
                w="30px"
                h="30px"
                p="1"
                position="absolute"
                right="20px"
                top="15px"
                zIndex="99"
                rounded="100%"
                variant="unstyled"
                icon={<IcoSmiley width="20px" height="20px" />}
                onPress={() => {
                    console.log('hello')
                }}
            />
            <HStack px="4" py="3" pr="12" space="3" alignItems="flex-start">
                <Avatar
                    size="sm"
                    source={{
                        uri: 'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                    }}
                >
                    SS
                </Avatar>
                <TextArea
                    p="0"
                    pt="1"
                    h="80px"
                    w="calc(100% - 44px)"
                    overflow="auto"
                    focusOutlineColor="transparent"
                    _focus={{ bg: 'transparent' }}
                    borderWidth="0" fontSize="md" placeholder="Please write your comment here …" autoCompleteType={undefined} />
            </HStack>
            <HStack borderTopWidth="1" borderTopColor="primary.bdBox" space="0" alignItems="center">
                <Center bg="primary.box" w="65%">
                    <HStack w="100%" space="0" alignItems="center">
                        <IconButton
                            w="50%"
                            rounded="0"
                            _hover={{ bg: 'primary.secondary' }}
                            variant="unstyled"
                            icon={<Icon size="xl" as={Ionicons} name="ios-image-outline" color="primary.text" />}
                            onPress={() => {
                                console.log('hello')
                            }}
                        />
                        <Divider w="1px" h="10" bg="primary.text" />
                        <IconButton
                            w="50%"
                            rounded="0"
                            variant="unstyled"
                            _hover={{ bg: 'primary.secondary' }}
                            icon={<Icon size="xl" as={Ionicons} name="ios-videocam-outline" color="primary.text" />}
                            onPress={() => {
                                console.log('hello')
                            }}
                        />
                    </HStack>
                </Center>
                <Center borderLeftWidth="1" borderLeftColor="primary.bdBox" w="35%">
                    <Button
                        w="100%"
                        rounded="0"
                        py="3"
                        _text={{ fontWeight: 600 }}
                        colorScheme="primary"
                        onPress={() => {
                            console.log('hello')
                        }}
                    >
                        POST
                    </Button>
                </Center>
            </HStack>
        </Box>
    )

}

export default AddPost