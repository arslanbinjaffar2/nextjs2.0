import React from 'react'
import { HStack, Icon, Spacer, Text, VStack, Image,View, Center } from 'native-base'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import { SponsorsAttendee } from 'application/models/sponsor/SponsorDetail'
import UseEnvService from 'application/store/services/UseEnvService';
import UserPlaceholderImage from 'application/assets/images/user-placeholder.jpg';
import { Pressable } from 'react-native';
import { useRouter } from 'solito/router';
import UseEventService from 'application/store/services/UseEventService';

type AppProps = {
    attendee: SponsorsAttendee,
    k: number
}

const RectangleView = ({ k, attendee }: AppProps) => {

    const { push } = useRouter()

    const { _env } = UseEnvService()
    
    const { event } = UseEventService()

    return (
        <HStack key={`item-${k}`} py="3" px="2" space="4" alignItems="center" borderBottomWidth={k === 2 ? 0 : 1} borderColor="primary.bordercolor">
            {attendee.image ? (
                <Image source={{ uri: `${_env.eventcenter_base_url}/assets/attendees/${attendee.image}` }} alt="" w="50px" h="50px" rounded={30} />
            ) : (
                    <View bg={"gray.400"} h={10} w={10} borderRadius={1000} 
                        fontFamily={'body'}
                        fontSize={16} fontWeight={600}
                        color={'white'}
                        alignItems={"center"}
                        justifyContent={"center"}
                    >{attendee?.first_name?.charAt(0).toUpperCase()}
                    {attendee?.last_name?.charAt(0).toUpperCase()}</View>
                // <Image source={UserPlaceholderImage} alt="" w="50px" h="50px" rounded={30} />
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
            <Pressable  onPress={() => {
                    push(`/${event.url}/attendees/detail/${attendee.id}`)
                }}>
                <Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />
            </Pressable>
        </HStack>
    )
}

export default RectangleView