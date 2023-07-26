import React from 'react'
import { Box, Image, Spacer, Text, Center, HStack, IconButton, Icon, Divider } from 'native-base'
import { Sponsor } from 'application/models/sponsor/Sponsor'
import DynamicIcon from 'application/utils/DynamicIcon';
import UseEnvService from 'application/store/services/UseEnvService';
import UseSponsorService from 'application/store/services/UseSponsorService';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'solito/router'
import UseEventService from 'application/store/services/UseEventService';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

const DetailBox = () => {

    const { width } = useWindowDimensions();

    const { _env } = UseEnvService()

    const { settings, MakeFavourite, detail } = UseSponsorService();

    const { push } = useRouter()

    const { event } = UseEventService()

    return (
        <>
            <Box w="100%" bg="primary.500" p="0">
                <Image
                    source={{
                        uri: 'https://wallpaperaccess.com/full/39050.jpg'
                    }}
                    alt="Alternate Text"
                    size="full"
                    w="100%"
                    h="160px"
                    rounded="10"
                    mb="5"
                />
                <Box w="100%" px="5">
                    <HStack w="100%" mb="1" space="3" alignItems="flex-start">
                        {detail?.detail?.name && (
                            <Text maxW="80%" fontSize="xl">{detail?.detail?.name}</Text>
                        )}
                        <Spacer />
                        <IconButton
                            bg="transparent"
                            p="1"
                            _hover={{ bg: 'primary.500' }}
                            icon={<Icon size="xl" as={Ionicons} name={sponsor.attendee_sponsors.length > 0 ? 'heart' : 'heart-outline'} color="primary.darkbox" />}
                            onPress={() => {
                                MakeFavourite({ sponsor_id: Number(detail?.detail?.id), screen: 'listing' });
                            }}
                            position={'absolute'}
                            zIndex={'999999'}
                            right={'0'}
                        />
                    </HStack>
                    <HStack w="100%" mb="3" space="0" alignItems="center">
                        <Text fontSize="md">Marketing</Text>
                        <Spacer />
                        {detail?.detail?.booth && (
                            <HStack alignItems="center" space="2">
                                <DynamicIcon iconType="exhibitors" iconProps={{ width: 16, height: 16 }} />
                                <Text fontSize="md">{detail?.detail?.booth}</Text>
                            </HStack>
                        )}
                    </HStack>
                    <Box mb="4" w="100%">
                        <Divider mb="3" bg="primary.text" />
                        <RenderHtml
                            contentWidth={width}
                            source={{ html: detail?.detail?.description }}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default DetailBox