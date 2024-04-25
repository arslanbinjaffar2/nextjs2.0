import React from 'react'
import { HStack, Icon, Spacer, Text, VStack, Image, Pressable, Avatar } from 'native-base'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import { ExhibitorsAttendee } from 'application/models/exhibitor/ExhibitorDetail'
import UseEnvService from 'application/store/services/UseEnvService';
import UserPlaceholderImage from 'application/assets/images/user-placeholder.jpg';
import { useRouter } from 'solito/router';
import UseEventService from 'application/store/services/UseEventService';
import UseExhibitorService from 'application/store/services/UseExhibitorService'

type AppProps = {
    attendee: ExhibitorsAttendee,
    total: number,
    k: number
}

const RectangleView = ({ k, attendee, total }: AppProps) => {
    
    const { push } = useRouter()

    const { _env } = UseEnvService()
    
    const { event } = UseEventService()
    const { detail } = UseExhibitorService()

    const showLastName = attendee?.sort_settings?.last_name?.status ? 1 : 0;
    return (
        <Pressable w={'100%'} onPress={() => {push(`/${event.url}/attendees/detail/${attendee.id}`)}}>
        <HStack w={'100%'} key={`item-${k}`} py="3" px="3" space="3" alignItems="center" borderTopWidth={k === 0 ? 0 : 1} borderColor="primary.bordercolor">
            {attendee.image && detail?.detail?.exhibitors_attendee && detail?.detail?.exhibitors_attendee[0].sort_settings.profile_picture.is_private == 0 ? (
                <Image source={{ uri: `${_env.eventcenter_base_url}/assets/attendees/${attendee.image}` }} alt="" w="50px" h="50px" rounded={30} />
            ) : (
                 <Avatar
                  borderWidth={1}
                  borderColor="primary.darkbox"
                  textTransform="uppercase"
                  bg={'#A5A5A5'}
                  >{ attendee?.first_name && attendee?.last_name ? attendee?.first_name?.substring(0,1) + attendee?.last_name?.substring(0,1) : attendee?.first_name?.substring(0,1)}</Avatar>
   
            )}
            <VStack w={'calc(100% - 120px)'} space="0">
                {(attendee?.first_name || attendee?.last_name) && (
                    <Text  textBreakStrategy='simple' fontSize="lg">{`${attendee?.first_name} ${showLastName ? attendee?.last_name : ''}`}</Text>
                )}
              {(attendee?.info?.company_name || attendee?.info?.title || attendee?.info?.department) && (
                <Text textBreakStrategy='balanced' fontSize="lg">
                  {attendee?.info?.company_name && (
                    <>
                      {`${attendee?.info?.company_name}, `}
                    </>
                  )}
                  {attendee?.info?.title && (
                    <>
                      {`${attendee?.info?.title}, `}
                    </>
                  )}
                  {attendee?.info?.department && (
                    <>
                      {`${attendee?.info?.department}`}
                    </>
                  )}
                </Text>
              )}
            </VStack>
            <Spacer />
                <Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />
        </HStack>
    </Pressable>
    )
}

export default RectangleView