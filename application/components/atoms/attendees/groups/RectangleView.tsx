import React from 'react'
import { Avatar, Box, HStack, Icon, Pressable, Spacer, Text, VStack } from 'native-base'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import { Group } from 'application/models/attendee/Group'
import UseAttendeeService from 'application/store/services/UseAttendeeService';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'solito/router'

type boxItemProps = {
    group: Group
    border: number
    k: number
    updateTab?: (tab: string) => void
    navigation?: boolean
}

const RectangleView = ({ group, border, k, updateTab, navigation }: boxItemProps) => {

    const { event } = UseEventService();

    const { query, FetchGroups, group_id } = UseAttendeeService();

    const { push } = useRouter()

    return (
        <Pressable w={'100%'} onPress={() => {
            if (navigation) {
                push(`/${event.url}/attendees/${group?.id!}`)
            } else {
                if (group_id === 0) {
                    FetchGroups({ query: query, page: 1, group_id: group?.id!, attendee_id: 0, program_id: 0 });
                } else if (updateTab) {
                    push(`/${event.url}/attendees/${group?.id!}`)
                }
            }
        }}>
            <Box w="100%" borderBottomWidth={border === 1 ? 1 : 0} borderColor="primary.box" py="4">
                <HStack px="4" alignItems="flex-start" space={0} justifyContent="flex-start">
                    <HStack w="100%" space="5" alignItems="center" justifyContent="space-between">
                        <Avatar
                            borderWidth={1}
                            borderColor="primary.darkbox"
                            bg={group?.color}
                            source={{
                                uri: 'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                            }}>{group?.info?.initial}</Avatar>
                        <VStack maxW={['62%', '70%', '70%']} space="0">
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