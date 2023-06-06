import React from 'react'
import { HStack, Icon, Spacer, Text, Pressable } from 'native-base';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Info } from 'application/models/Info'
import { useRouter } from 'solito/router'
import UseEventService from 'application/store/services/UseEventService';

const RectangleView = (info: Info) => {

    const { push } = useRouter()

    const { event } = UseEventService()

    return (
        <Pressable
            onPress={() => {
                if (info.type === 'page') {
                    push(`/${event.url}/${info.cms}/event-info-detail/${info.id}`)
                } else if (info.type === 'folder') {
                    push(`/${event.url}/${info.cms}/event-info/${info.id}`)
                }
            }}>
            <HStack borderBottomWidth="1px" borderBottomColor="primary.text" px="4" py="5" space="4" alignItems="center">
                {
                    (() => {
                        if (info.type === 'folder') {
                            return (
                                <Icon as={SimpleLineIcons} name="folder" size="lg" color="primary.text" />
                            )
                        } else if (info.type === 'page') {
                            return (
                                <Icon as={AntDesign} name="filetext1" size="lg" color="primary.text" />
                            )
                        } else if (info.type === 'link') {
                            return (
                                <Icon as={AntDesign} name="link" size="lg" color="primary.text" />
                            )
                        }
                    })()
                }
                <Text fontSize="lg">{info?.detail?.name}</Text>
                <Spacer />
                {info.type === 'folder' && (
                    <Icon as={SimpleLineIcons} name="arrow-right" size="md" color="primary.text" />
                )}
            </HStack>
        </Pressable>
    )
}

export default RectangleView