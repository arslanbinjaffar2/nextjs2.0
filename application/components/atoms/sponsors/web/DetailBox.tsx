import React, { useEffect, useState } from 'react'
import { Box, Image, Spacer, Text, HStack, IconButton, Icon, Divider, ZStack, Center } from 'native-base'
import { Category, SponsorDetail } from 'application/models/sponsor/SponsorDetail'
import DynamicIcon from 'application/utils/DynamicIcon';
import UseEnvService from 'application/store/services/UseEnvService';
import UseSponsorService from 'application/store/services/UseSponsorService';
import Ionicons from '@expo/vector-icons/Ionicons';
import ExhibitorDefaultImage from 'application/assets/images/exhibitors-default.png';
import UseEventService from 'application/store/services/UseEventService';

type AppProps = {
    detail: SponsorDetail|null,
}

const DetailBox = ({ detail }: AppProps) => {

    const { _env } = UseEnvService()

    const { MakeFavourite } = UseSponsorService();
    
    const { event } = UseEventService()

    const [isFav,setIsFav] = useState(false)

    useEffect(() => {
        console.log("fav: ",isFav)
    }, [isFav])

    useEffect(() => {
        if (detail?.detail?.attendee_sponsors?.length && detail?.detail?.attendee_sponsors?.length > 0) {
            setIsFav(true)
        } else {
            setIsFav(false)
        }
    }, [detail?.detail?.attendee_sponsors])

    function toggleFav(){
        if(isFav){
            setIsFav(false)
        }else{
            setIsFav(true)
        }
        MakeFavourite({ sponsor_id: detail?.detail?.id ? detail?.detail?.id : 0, screen: 'sponsor-detail' });
    }

    return (
        <>
            {detail && <Box w="100%" bg="primary.primarycolor" p="0" roundedTop="10">
                {detail?.detail?.logo ? (
                    <Image mb="5" roundedTop="10" size="full" source={{ uri: `${_env.eventcenter_base_url}/assets/sponsors/large/${detail?.detail?.logo}` }} alt="Alternate Text" w="100%" h="160px" />
                ) : (
                    <Image mb="5" roundedTop="10" size="full" source={ExhibitorDefaultImage} alt="Alternate Text" w="100%" h="160px" />
                )}
                <Box w="100%" px="6">
                    <HStack w="100%" mb="1" space="3" alignItems="flex-start">
                        {detail?.detail?.name && (
                            <Text maxW="80%" fontWeight={500} fontSize="xl">{detail?.detail?.name}</Text>
                        )}
                        <Spacer />
                       {event?.sponsor_settings?.mark_favorite == 1 && <IconButton
                            bg="transparent"
                            p="1"
                            rounded={'full'}
                            _hover={{ bg: 'primary.500' }}
                            icon={<Icon size="xl" as={Ionicons} name={isFav ? 'heart' : 'heart-outline'} color={isFav ? 'secondary.500' : "primary.text"}/>}
                            onPress={() => {
                                toggleFav();
                            }}
                            position={'absolute'}
                            zIndex={'999999'}
                            right={'0'}
                        />}
                    </HStack>
                    <HStack w="100%" mb="3" space="0" alignItems="flex-start" justifyContent={'flex-start'}>
                        {/* {detail?.detail?.categories!?.length > 0 && <Box position="absolute" left="-24px" top="0">
                            <ZStack>
                                <Box bg={detail?.detail?.categories[0].color} borderWidth="1" borderColor="primary.darkbox" w="16px" mt='0px' h={`32px`} borderRightRadius="10" shadow={2} />
                            </ZStack>
                        </Box>} */}
                        {detail?.detail?.categories!?.length > 0 && (
                            <HStack alignItems="flex-start" justifyContent={'flex-start'} display={'flex'} flexWrap={'wrap'} maxW={'calc(100% - 145px)'}>
                                {detail?.detail?.categories!?.map((category: Category, i: number) =>
                                    <Box borderColor={'primary.box'} borderWidth={1} rounded={'full'} bg={category.color} px={4} py={1} my={1} mr={2}  key={i}>
                                        <Text lineHeight={'sm'} fontSize="sm">{`${category.info.name}`}</Text>
                                    </Box>
                                )}
                            </HStack>
                        )}
                        <Spacer />
                        {detail?.detail?.booth && (
                            <HStack alignItems="center" space="2">
                                <DynamicIcon iconType="exhibitors" iconProps={{ width: 16, height: 16 }} />
                                <Center maxW={120}>
                                    <Text  fontSize="md">{detail?.detail?.booth}</Text>
                                </Center>
                            </HStack>
                        )}
                    </HStack>
                    {detail?.detail?.description && <Box mb="4" w="100%">
                        <Divider mb="3" bg="primary.text" />
                        <Text><div dangerouslySetInnerHTML={{ __html: detail?.detail?.description }}></div></Text>
                    </Box>}
                </Box>
            </Box>}
        </>
    )
}

export default DetailBox