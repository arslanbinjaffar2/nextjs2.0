import React from 'react'
import { HStack, Icon, Spacer, Text, VStack, Image, Pressable } from 'native-base'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import { ExhibitorsAttendee } from 'application/models/exhibitor/ExhibitorDetail'
import UseEnvService from 'application/store/services/UseEnvService';
import UserPlaceholderImage from 'application/assets/images/user-placeholder.jpg';
import { useRouter } from 'solito/router';
import UseEventService from 'application/store/services/UseEventService';

type AppProps = {
    attendee: ExhibitorsAttendee,
    total: number,
    k: number
}

const RectangleView = ({ k, attendee, total }: AppProps) => {
    
    const { push } = useRouter()

    const { _env } = UseEnvService()
    
    const { event } = UseEventService()
    console.log(total)
    return (
        <HStack key={`item-${k}`} py="3" px="2" space="4" alignItems="center" borderBottomWidth={k === (total-1) ? 0 : 1} borderColor="primary.bordercolor">
            {attendee.image ? (
                <Image source={{ uri: `${_env.eventcenter_base_url}/assets/attendees/${attendee.image}` }} alt="" w="50px" h="50px" rounded={30} />
            ) : (
                <Image source={UserPlaceholderImage} alt="" w="50px" h="50px" rounded={30} />
            )}
            <VStack space="0">
                {(attendee?.first_name || attendee?.last_name) && (
                    <Text fontSize="lg">{`${attendee?.first_name} ${attendee?.last_name}`}</Text>
                )}
                {(attendee?.info?.company_name || attendee?.info?.title) && (
                    <Text fontSize="lg">
                        {`${attendee?.info?.company_name}`}
                        {attendee?.info?.title && (
                            <>
                                {` - ${attendee?.info?.title}`}
                            </>
                        )}
                    </Text>
                )}
            </VStack>
            <Spacer />
            <Pressable onPress={() => {
                    push(`/${event.url}/attendees/detail/${attendee.id}`)
                }}>
                <Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />
            </Pressable>
        </HStack>
    )
}

export default RectangleView