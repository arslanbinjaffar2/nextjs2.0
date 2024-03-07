import React from 'react'
import { HStack, Icon, Spacer, Text, VStack, Image } from 'native-base'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import { ExhibitorsAttendee } from 'application/models/exhibitor/ExhibitorDetail'
import UseEnvService from 'application/store/services/UseEnvService';

type AppProps = {
    attendee: ExhibitorsAttendee,
    k: number
}

const RectangleView = ({ k, attendee }: AppProps) => {

    const { _env } = UseEnvService()

    return (
        <HStack key={`item-${k}`} py="3" px="2" space="4" alignItems="center" borderBottomWidth={k === 2 ? 0 : 1} borderColor="primary.bordercolor">
            {attendee.image ? (
                <Image source={{ uri: `${_env.eventcenter_base_url}/assets/attendees/${attendee.image}` }} alt="" w="50px" h="50px" rounded={30} />
            ) : (
                <Image source={{ uri: 'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg' }} alt="" w="50px" h="50px" rounded={30} />
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
            <Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />
        </HStack>
    )
}

export default RectangleView