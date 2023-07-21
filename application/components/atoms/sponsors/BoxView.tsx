import React from 'react'
import { Box, Image, Spacer, Text, Center, HStack } from 'native-base'
import { Sponsor } from 'application/models/Sponsor'
import DynamicIcon from 'application/utils/DynamicIcon';
import UseEnvService from 'application/store/services/UseEnvService';

type AppProps = {
    sponsor: Sponsor,
    k: number
}

const BoxView = ({ k, sponsor }: AppProps) => {

    const { _env } = UseEnvService()

    return (
        <>
            <Box w="49%">
                <Box mb="3" w="100%" bg="primary.box" p="0" borderWidth="1" borderColor="primary.bdBox" rounded="10">
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
            </Box>
            {(k + 1) % 2 === 1 && (
                <Spacer w="2%" />
            )}
        </>
    )
}

export default BoxView