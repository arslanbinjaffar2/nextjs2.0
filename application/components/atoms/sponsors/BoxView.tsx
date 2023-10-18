import React from 'react'
import { Box, Image, Spacer, Text, Center, HStack, IconButton, Icon, Pressable } from 'native-base'
import { Sponsor } from 'application/models/sponsor/Sponsor'
import DynamicIcon from 'application/utils/DynamicIcon';
import UseEnvService from 'application/store/services/UseEnvService';
import UseSponsorService from 'application/store/services/UseSponsorService';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'solito/router'
import UseEventService from 'application/store/services/UseEventService';

type AppProps = {
    sponsor: Sponsor,
    k: number
    w: string
}

const BoxView = ({ k, sponsor, w }: AppProps) => {

    const { _env } = UseEnvService()

    const { settings, MakeFavourite } = UseSponsorService();

    const { push } = useRouter()

    const { event } = UseEventService()

    return (
        <>
            <Box w={w ? w : '49%'}>
                <Pressable
                    onPress={() => {
                        push(`/${event.url}/sponsors/detail/${sponsor.id}`)
                    }}>
                    <Box mb="3" w="100%" bg="primary.box" p="0" borderWidth="1" borderColor="primary.bdBox" rounded="10">
                        {settings?.mark_favorite === 1 && (
                            <IconButton
                                bg="transparent"
                                p="1"
                                _hover={{ bg: 'primary.500' }}
                                icon={<Icon size="xl" as={Ionicons} name={sponsor.attendee_sponsors.length > 0 ? 'heart' : 'heart-outline'} color="primary.darkbox" />}
                                onPress={() => {
                                    MakeFavourite({ sponsor_id: sponsor.id, screen: 'listing' });
                                }}
                                position={'absolute'}
                                zIndex={'999999'}
                                right={'0'}
                            />
                        )}
                        <Center pt="5" pb="3" px="1" alignItems="center" w="100%">
                            {sponsor.logo ? (
                                <Image source={{ uri: `${_env.eventcenter_base_url}/assets/sponsors/large/${sponsor.logo}` }} alt="Alternate Text" w="210px" h="72px" />
                            ) : (
                                <Image source={{ uri: 'https://wallpaperaccess.com/full/31751.jpg' }} alt="Alternate Text" w="210px" h="72px" />
                            )}
                        </Center>
                        <HStack pb="3" space="3" alignItems="center">
                            <Center alignItems="flex-start" w="70%">
                                {sponsor.name && <Box bg={'#E03C30'} borderWidth="1" borderColor="primary.bdBox" borderRightRadius="10" shadow="1" w="auto" px="2">
                                    <Text fontSize="xs">{sponsor.name}</Text>
                                </Box>}
                            </Center>
                            <Center pr="6" alignItems="flex-end" w="30%">
                                {sponsor.booth && <HStack space="3" alignItems="center">
                                    <DynamicIcon iconType="exhibitors" iconProps={{ width: 16, height: 16 }} />
                                    <Text fontSize="md">{sponsor.booth}</Text>
                                </HStack>}
                            </Center>
                        </HStack>
                    </Box>
                </Pressable>
            </Box>
            {(k + 1) % 2 === 1 && (
                <Spacer w="2%" />
            )}
        </>
    )
}

export default BoxView