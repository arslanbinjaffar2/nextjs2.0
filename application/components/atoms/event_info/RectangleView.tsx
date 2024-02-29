import React from 'react'
import { HStack, Icon, Spacer, Text, Pressable } from 'native-base';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Octicons from '@expo/vector-icons/Octicons';
import { Info } from 'application/models/Info'
import { useRouter } from 'solito/router'
import UseEventService from 'application/store/services/UseEventService';
import IcoFileText from 'application/assets/icons/small/IcoFileText';
import IcoFolder from 'application/assets/icons/small/IcoFolder';
import IcoLink from 'application/assets/icons/small/IcoLink';
import { Linking } from 'react-native';

const RectangleView = (info: Info) => {

    const { push } = useRouter()

    const { event } = UseEventService()

    return (
        <Pressable
            onPress={async () => {
                if (info.type === 'page') {
                    push(`/${event.url}/${info.cms}/event-info-detail/${info.id}`)
                } else if (info.type === 'folder') {
                    if(info.cms !== 'information-pages'){
                        push(`/${event.url}/${info.cms}/event-info/${info.id}`)
                    } else {
                        push(`/${event.url}/${info.cms}/sub/${info.id}`)             
                    }
                } else {
                    const url: any = info.website_protocol! + info.url;
                    const supported = await Linking.canOpenURL(url);
                    if (supported) {
                        await Linking.openURL(url);
                    }
                }
            }}>
            <HStack borderTopWidth={info?.index === 0 ? 0 : "1px"} borderTopColor="primary.bordercolor" px="4" py="5" space="4" alignItems="center">
                {
                    (() => {
                        if (info.type === 'folder') {
                            return (
                                <IcoFolder />
                            )
                        } else if (info.type === 'page') {
                            return (
                                <IcoFileText  />
                            )
                        } else if (info.type === 'link') {
                            return (
                                <IcoLink />
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