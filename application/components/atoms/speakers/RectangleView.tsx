import React from 'react'
import { Avatar, Center, HStack, Icon, Spacer, Text, VStack } from 'native-base'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import { Attendee } from 'application/models/attendee/Attendee'

type boxItemProps = {
    k: number,
    attendee: Attendee,
    total: number
}

const RectangleView = ({ k, attendee, total }: boxItemProps) => {
    return (
        <HStack key={k} borderBottomWidth={total !== (k + 1) ? '1px' : '0'} borderColor="primary.text" px="3" py="3" w="100%" space="0" alignItems="center">
            <Center alignItems="flex-start" w="70%" p="0">
                <HStack space="3" alignItems="center">
                    <Avatar
                        source={{
                            uri: 'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                        }}
                    >
                        SS
                    </Avatar>
                    <VStack space="0">
                        {(attendee?.first_name || attendee?.last_name) && (
                            <>
                                <Text lineHeight="22px" fontSize="lg">{`${attendee?.first_name} ${attendee?.last_name}`}</Text>
                                {attendee?.info &&
                                    (attendee?.info.company_name ||
                                        attendee?.info.title) && (
                                        <>
                                            {attendee?.info.title && (
                                                <Text lineHeight="22px" fontSize="lg">{attendee?.info?.title}&nbsp;{attendee?.info?.company_name &&
                                                    attendee?.info?.title &&
                                                    ", "}
                                                    {attendee?.info?.company_name && attendee?.info?.company_name}</Text>
                                            )}
                                        </>
                                    )}
                            </>
                        )}
                    </VStack>
                </HStack>
            </Center>
            <Spacer />
            <Center p="0">
                <Icon as={SimpleLineIcons} name="arrow-right" size="md" color="primary.text" />
            </Center>
        </HStack>
    )
}

export default RectangleView