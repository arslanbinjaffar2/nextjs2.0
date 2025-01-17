import React from 'react'
import { Avatar, Center, HStack, Icon, Image, Pressable, Spacer, Text, VStack } from 'native-base'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import { Attendee } from 'application/models/attendee/Attendee'
import UseEnvService from 'application/store/services/UseEnvService';
import { useRouter } from 'solito/router'
import UseEventService from 'application/store/services/UseEventService';
import UseExhibitorService from 'application/store/services/UseExhibitorService'
import UseProgramService from 'application/store/services/UseProgramService'
import UserPlaceholderImage from 'application/assets/images/user-placeholder.jpg'
import UseAuthService from 'application/store/services/UseAuthService'

type boxItemProps = {
    k: number,
    attendee: Attendee,
    total: number
}

const RectangleView = ({ k, attendee, total }: boxItemProps) => {

    const { _env } = UseEnvService()

    const { push } = useRouter()
    const { response } = UseAuthService()

    const { event } = UseEventService();
    const { FetchProgramDetail, detail } = UseProgramService();
    return (
        <Pressable w='100%' onPress={() => {
            push(`/${event.url}/speakers/detail/${attendee.id}`)
        }}>
            <HStack key={k} borderBottomWidth={total !== (k + 1) ? '1px' : '0'} borderColor="primary.bordercolor" px="3" py="3" w="100%" space="0" alignItems="center">
                <Center alignItems="flex-start" w={['calc(100% - 75px)']} p="0">
                    <HStack space="3" alignItems="center">
                        {detail?.program?.program_speakers && detail?.program?.program_speakers[0].sort_settings.profile_picture.is_private == 0 || attendee.id == response?.data?.user?.id ? (
                        <Avatar
                            source={{
                                uri: attendee?.image ? `${_env.eventcenter_base_url}/assets/attendees/${attendee?.image}` : 'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                            }}
                        >
                            {attendee?.first_name?.charAt(0).toUpperCase()! + attendee?.last_name?.charAt(0).toUpperCase()!}
                        </Avatar>
                        ) : (
                            <Image source={UserPlaceholderImage} alt="" w="50px" h="50px" rounded={30} />
                          )}
                        <VStack w={['calc(100% - 10px)']}  space="0">
                            {(attendee?.first_name || attendee?.last_name) && (
                                <>
                                    <Text fontWeight={600} lineHeight="22px" fontSize="lg">{`${attendee?.first_name} ${attendee?.sort_settings?.last_name?.status === 1 ? attendee?.last_name : ''}`}</Text>
                                    {(attendee?.info?.company_name || attendee?.info?.title || attendee?.info?.department) && (
                                        <Text fontSize="md">
                                        {attendee?.info?.title && (
                                            <>
                                            {`${attendee?.info?.title}`}
                                            {attendee?.info?.department || attendee?.info?.company_name ? ', ' : ''}
                                            </>
                                        )}
                                        {attendee?.info?.department && (
                                            <>
                                            {`${attendee?.info?.department}`}
                                            {attendee?.info?.company_name ? ', ' : ''}
                                            </>
                                        )}
                                        {attendee?.info?.company_name && (
                                            <>
                                            {`${attendee?.info?.company_name}`}
                                            </>
                                        )}
                                    </Text>
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
        </Pressable>
    )
}

export default RectangleView