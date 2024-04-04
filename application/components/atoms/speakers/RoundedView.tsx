import React from 'react';
import { Avatar, Box, Image, Pressable } from 'native-base';
import { Attendee } from 'application/models/attendee/Attendee';
import UseEnvService from 'application/store/services/UseEnvService';
import { useRouter } from 'solito/router'
import UseEventService from 'application/store/services/UseEventService';

type AppProps = {
    attendee: Attendee
}

const RoundedView = ({ attendee }: AppProps) => {

    const { _env } = UseEnvService()

    const { push } = useRouter()

    const { event } = UseEventService();

    return (
        <Pressable w='100%' onPress={() => {
            push(`/${event.url}/speakers/detail/${attendee.id}`)
        }}>
            <Box w='100%' borderRadius={200} bg="primary.400" pb="100%" position="relative">
                {attendee?.image ? (
                    <Image
                        position="absolute"
                        left="0"
                        top="0"
                        w="100%"
                        h="100%"
                        borderRadius={200}
                        source={{ uri: `${_env.eventcenter_base_url}/assets/attendees/${attendee?.image}` }}
                        alt={`${attendee?.first_name} ${attendee?.last_name}`}
                    />
                ) :(
                    <Avatar
                        position="absolute"
                        left="0"
                        top="0"
                        w="100%"
                        h="100%"
                        borderRadius={200}
                        borderWidth={0}
                        borderColor="primary.darkbox"
                        textTransform="uppercase"
                        bg={'#A5A5A5'}
                        >{ attendee?.first_name && attendee?.last_name ? attendee?.first_name?.substring(0,1) + attendee?.last_name?.substring(0,1) : attendee?.first_name?.substring(0,1)}</Avatar>
                            
                )}


            </Box>
        </Pressable>
    )
}

export default RoundedView;