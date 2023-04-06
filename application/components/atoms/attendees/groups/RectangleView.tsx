import React from 'react'
import { Avatar, Box, HStack, Icon, Spacer, Text, VStack } from 'native-base'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import Icoribbon from 'application/assets/icons/Icoribbon'

type boxItemProps = {
    border: number
}

const RectangleView = ({ border }: boxItemProps) => {
    return (
        <Box w="100%" borderBottomWidth={k === 6 ? 0 : 1} borderColor="primary.text" py="4">
            <HStack px="4" alignItems="flex-start" space={0} justifyContent="flex-start">
                <HStack w="100%" space="5" alignItems="center" justifyContent="space-between">
                    <Avatar
                        borderWidth={1}
                        borderColor="primary.darkbox"
                        bg={`danger.${k + 1}00`}
                        source={{
                            uri: 'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                        }}>MC</Avatar>
                    <VStack maxW={['62%', '70%', '40%']} space="0">
                        <Text lineHeight="22px" fontSize="lg">Marketing CEO</Text>
                    </VStack>
                    <Spacer />
                    <HStack space="4" alignItems="center">
                        <Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />
                    </HStack>
                </HStack>
            </HStack>
        </Box>
    )
}

export default RectangleView