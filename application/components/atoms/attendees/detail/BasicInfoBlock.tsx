import React from 'react'
import Icoribbon from 'application/assets/icons/Icoribbon';
import Icoresume from 'application/assets/icons/Icoresume';
import Icohotelbed from 'application/assets/icons/Icohotelbed';
import { Box, Center, Container, HStack, Spacer, Text, VStack, Avatar, Image, Pressable } from 'native-base';
import { Detail } from 'application/models/attendee/Detail';
import UseEnvService from 'application/store/services/UseEnvService';
import UseAttendeeService from 'application/store/services/UseAttendeeService';
import UseEventService from 'application/store/services/UseEventService';

type AppProps = {
    detail: Detail,
    showPrivate:number,
}

const BasicInfoBlock = ({ detail, showPrivate }: AppProps) => {

    const { _env } = UseEnvService()

    const { MakeFavourite } = UseAttendeeService();

    const { event } = UseEventService();

    const isPrivate = detail?.sort_field_setting?.reduce((ack:any, s:any)=>({...ack, [s.name]:s.is_private}),{});

    return (
        <Container borderWidth="1" borderColor="primary.darkbox" bg="primary.500" rounded="10" overflow="hidden" mb="3" maxW="100%" w="100%">
            <Box w="100%" p="4" py="5" rounded="10">
                <HStack mb="4" space="5">
                    {detail?.detail?.image ? (
                        <Image rounded="25" size="lg" borderWidth="1" borderColor="primary.darkbox" source={{ uri: `${_env.eventcenter_base_url}/assets/attendees/${detail?.detail?.image}` }} alt="Alternate Text" w="50px" h="50px" />
                    ) : (
                        <Image rounded="25" size="lg" borderWidth="1" borderColor="primary.darkbox" source={{ uri: 'https://wallpaperaccess.com/full/31751.jpg' }} alt="Alternate Text" w="50px" h="50px" />
                    )}
                    <VStack maxW="70%" space="0">
                        <Text lineHeight="sm" fontSize="xl">
                            {`${(showPrivate == 1 || isPrivate?.first_name == 0) ? detail?.detail?.first_name : ''} ${(showPrivate == 1 || isPrivate?.last_name == 0) ? detail?.detail?.last_name : ''}`}
                        </Text>
                        {detail?.detail?.info &&
                            (detail?.detail?.info.company_name ||
                                detail?.detail?.info.title) && 
                                (showPrivate == 1 || (isPrivate?.title == 0 || isPrivate?.company_name == 0))
                                && (
                                <>
                                    {detail?.detail?.info.title && (
                                        <Text lineHeight="22px" fontSize="lg">{detail?.detail?.info?.title}&nbsp;{detail?.detail?.info?.company_name &&
                                            detail?.detail?.info?.title &&
                                            ", "}
                                            {detail?.detail?.info?.company_name && detail?.detail?.info?.company_name}</Text>
                                    )}
                                </>
                            )}
                        {(showPrivate == 1 || isPrivate?.department == 0) && detail?.detail?.info?.department && (
                            <Text lineHeight="sm" fontSize="md">{detail?.detail?.info?.department}</Text>
                        )}
                    </VStack>
                    <Spacer />
                    <Box w="20px" h="100%">
                        <Pressable
                            onPress={() => {
                                MakeFavourite({ attendee_id: Number(detail?.detail?.id), screen: 'detail' })
                            }}>
                            <Icoribbon width="20" height="28" color={detail?.is_favourite ? event?.settings?.primary_color : ''} />
                        </Pressable>
                    </Box>
                </HStack>
                <HStack w="100%" space="0">
                    {(showPrivate == 1 || isPrivate?.initial == 0) && detail?.detail?.info?.initial && (
                        <Center borderRightWidth="1" alignItems="flex-start" pl="0" w="33.33%">
                            <VStack space="0">
                                <Text lineHeight="sm" fontSize="sm">Initials</Text>
                                <Text lineHeight="sm" fontSize="sm">{detail?.detail?.info?.initial}</Text>
                            </VStack>
                        </Center>
                    )}
                    {(showPrivate == 1 || isPrivate?.delegate_number == 0) && detail?.detail?.info?.delegate_number && (
                        <Center borderRightWidth="1" borderColor="primary.text" alignItems="flex-start" pl="8" w="33.33%">
                            <VStack space="0">
                                <Text lineHeight="sm" fontSize="sm">Delegate nr:</Text>
                                <Text lineHeight="sm" fontSize="sm">{detail?.detail?.info?.delegate_number}</Text>
                            </VStack>
                        </Center>
                    )}
                    {(showPrivate == 1 || isPrivate?.table_number == 0) && detail?.detail?.info?.table_number && (
                        <Center borderColor="primary.text" alignItems="flex-start" pl="8" w="33.33%">
                            <VStack space="0">
                                <Text lineHeight="sm" fontSize="sm">Table nr:</Text>
                                <Text lineHeight="sm" fontSize="sm">{detail?.detail?.info?.table_number}</Text>
                            </VStack>
                        </Center>
                    )}
                </HStack>
            </Box>
            <Box w="100%" bg="primary.secondary" px="5" py="3" borderTopWidth="1" borderColor="primary.darkbox">
                <HStack w="100%" space="0">
                    <Center w="20%" borderRightWidth="1" alignItems="flex-start">
                        <Icoresume width="22" height="25" />
                    </Center>
                    <Center w="20%"  borderColor="primary.text" alignItems="center">
                        <Icohotelbed width="24" height="18" />
                    </Center>
                </HStack>
            </Box>
        </Container>
    )

}

export default BasicInfoBlock