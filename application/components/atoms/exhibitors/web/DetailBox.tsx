import React from 'react'
import { Box, Image, Spacer, Text, HStack, IconButton, Icon, Divider } from 'native-base'
import { Category, ExhibitorDetail } from 'application/models/exhibitor/ExhibitorDetail'
import DynamicIcon from 'application/utils/DynamicIcon';
import UseEnvService from 'application/store/services/UseEnvService';
import UseExhibitorService from 'application/store/services/UseExhibitorService';
import Ionicons from '@expo/vector-icons/Ionicons';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

type AppProps = {
    detail: ExhibitorDetail,
}

const DetailBox = ({ detail }: AppProps) => {

    const { width } = useWindowDimensions();

    const { _env } = UseEnvService()

    const { MakeFavourite } = UseExhibitorService();

    return (
        <>
            <Box w="100%" bg="primary.500" p="0" rounded="10">
                {detail?.detail?.logo ? (
                    <Image mb="5" rounded="10" size="full" source={{ uri: `${_env.eventcenter_base_url}/assets/exhibitors/large/${detail?.detail?.logo}` }} alt="Alternate Text" w="100%" h="160px" />
                ) : (
                    <Image mb="5" rounded="10" size="full" source={{ uri: 'https://wallpaperaccess.com/full/31751.jpg' }} alt="Alternate Text" w="100%" h="160px" />
                )}
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
                            icon={<Icon size="xl" as={Ionicons} name={detail?.detail?.attendee_exhibitors!?.length > 0 ? 'heart' : 'heart-outline'} color="primary.darkbox" />}
                            onPress={() => {
                                MakeFavourite({ exhibitor_id: Number(detail?.detail?.id), screen: 'exhibitor-detail' });
                            }}
                            position={'absolute'}
                            zIndex={'999999'}
                            right={'0'}
                        />
                    </HStack>
                    <HStack w="100%" mb="3" space="0" alignItems="center">
                        {detail?.detail?.categories!?.length > 0 && (
                            <Text fontSize="md">
                                {detail?.detail?.categories!?.map((category: Category, i: number) =>
                                    <React.Fragment key={i}>
                                        {`${category.info.name}${(i + 1) < detail?.detail?.categories!?.length ? ', ' : ''}`}
                                    </React.Fragment>
                                )}
                            </Text>
                        )}
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
                        <div dangerouslySetInnerHTML={{ __html: detail?.detail?.description }}></div>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default DetailBox