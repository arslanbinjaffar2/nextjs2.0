import React from 'react'
import { Avatar, Box, HStack, Icon, Pressable, Spacer, Text, VStack } from 'native-base'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import { Group } from 'application/models/attendee/Group'
import UseAttendeeService from 'application/store/services/UseAttendeeService';

type boxItemProps = {
    group: Group
    border: number
    k: number
    updateTab: (tab: string) => void
}

const RectangleView = ({ group, border, k, updateTab }: boxItemProps) => {

    const { query, FetchGroups, group_id, FetchAttendees } = UseAttendeeService();

    return (
        <Pressable w={'100%'} onPress={() => {
            if (group_id === 0) {
                FetchGroups({ query: query, page: 1, group_id: group?.id! });
            } else {
                updateTab('group-attendee');
                FetchAttendees({ query: query, group_id: group?.id!, page: 1, my_attendee_id: 0 });
            }
        }}>
            <Box w="100%" borderBottomWidth={border === 1 ? 1 : 0} borderColor="primary.text" py="4">
                <HStack px="4" alignItems="flex-start" space={0} justifyContent="flex-start">
                    <HStack w="100%" space="5" alignItems="center" justifyContent="space-between">
                        <Avatar
                            borderWidth={1}
                            borderColor="primary.darkbox"
                            bg={group?.color}
                            source={{
                                uri: 'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                            }}>{group?.info?.initial}</Avatar>
                        <VStack maxW={['62%', '70%', '40%']} space="0">
                            <Text lineHeight="22px" fontSize="lg">{group?.info?.name}</Text>
                        </VStack>
                        <Spacer />
                        <HStack space="4" alignItems="center">
                            <Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />
                        </HStack>
                    </HStack>
                </HStack>
            </Box>
        </Pressable>
    )
}

export default RectangleView