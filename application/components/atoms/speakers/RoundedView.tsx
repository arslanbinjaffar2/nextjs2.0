import React from 'react';
import { Box, Image } from 'native-base';
import { Attendee } from 'application/models/attendee/Attendee';
import UseEnvService from 'application/store/services/UseEnvService';

type AppProps = {
    attendee: Attendee
}

const RoundedView = ({ attendee }: AppProps) => {

    const { _env } = UseEnvService()
    
    return (
        <Box w='100%' borderRadius={200} bg="primary.400" pb="100%" position="relative" marginLeft={15}>
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
            ) : (
                <Image
                    position="absolute"
                    left="0"
                    top="0"
                    w="100%"
                    h="100%"
                    borderRadius={200}
                    source={{ uri: 'https://wallpaperaccess.com/full/31751.jpg' }}
                    alt={`${attendee?.first_name} ${attendee?.last_name}`}
                />
            )}


        </Box>
    )
}

export default RoundedView;