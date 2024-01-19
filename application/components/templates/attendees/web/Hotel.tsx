import React from 'react'
import { Box, Center, Heading, HStack, Icon, Pressable, Spacer, Text, View, VStack } from 'native-base';
import DynamicIcon from 'application/utils/DynamicIcon';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Detail } from 'application/models/attendee/Detail';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'solito/router';
import { createParam } from 'solito';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseAttendeeService from 'application/store/services/UseAttendeeService';
import SectionLoading from 'application/components/atoms/SectionLoading';
import UseAuthService from 'application/store/services/UseAuthService';
import AntDesign from '@expo/vector-icons/AntDesign';
import UseEnvService from 'application/store/services/UseEnvService';
import LoadImage from 'application/components/atoms/LoadImage';
import moment from 'moment';
import { useWindowDimensions } from 'react-native';

type ScreenParams = { id: string }

const { useParam } = createParam<ScreenParams>()

type AppProps = {
    detail: Detail,
}

const RectangleView = () => {
    const { loading } = UseLoadingService();
    const { FetchHotels, hotels } = UseAttendeeService();
    const { event } = UseEventService();
    const { push } = useRouter()
    const [_id] = useParam('id');
    const { response } = UseAuthService();
    const { _env } = UseEnvService()
     const { width } = useWindowDimensions();

    React.useEffect(() => {
        if (_id != response?.data?.user?.id) {
            push(`/${event.url}/dashboard`)

        }else{
            FetchHotels();
        }
    }, [_id]);

    return (
        <>
        {loading || !hotels ? <SectionLoading /> :
            <>
                <HStack mb="3" pt="2" w="100%" space="3" alignItems="center" justifyContent={'space-between'}>
                    <Pressable onPress={()=> push(`/${event.url}/attendees`)}>
                        <HStack space="3" alignItems="center">
                            <Icon as={AntDesign} name="arrowleft" size="xl" color="primary.text" />
                            <Text fontSize="2xl">BACK</Text>
                        </HStack>
                    </Pressable>
                    <Text fontSize="2xl" textTransform={'uppercase'}>Hotel</Text>
                    <Box minWidth={70}> </Box>
                </HStack>
                <Box overflow="hidden" w="100%" bg="primary.box" p="0" rounded="10">
                    {hotels?.hotels?.map((h:any, i:any)=>(
                        h?.orderhotel !== undefined ? (
                            <Box w="100%" py="4" borderBottomWidth={(i === (hotels?.hotels?.length - 1)) ? 0 : 1} borderBottomColor={'primary.text'}>
                            <HStack px="5" w="100%" space="0" alignItems="center" justifyContent="space-between">
                                <LoadImage path={`${_env.eventcenter_base_url}/${h?.image !== undefined && h?.image !== ''  ? 'assets/hotel/'+ h?.image : '_mobile_assets/images/placeholder.png' }`} w="110px" style={{borderRadius: '8px'}}  />

                                <Center>
                                    <VStack bg="red" w="20%" minW={['20%']} space="0">
                                        <Text fontSize="lg" textAlign={'center'}>{h?.orderhotel?.name}</Text>
                                    </VStack>
                                    {hotels?.settings.enable_checkin_checkout === 1 && 
                                        <>
                                            <VStack bg="red" w="20%" minW={['20%']} space="0">
                                                <Text fontSize="lg" textAlign={'center'}>Check in</Text>
                                                <Text fontSize="sm" textAlign={'center'}>{moment(h?.orderhotel?.checkin).format('dddd DD, MMMM YYYY')}</Text>
                                            </VStack>
                                            <VStack bg="red" w="20%" minW={['20%']} space="0">
                                                <Text fontSize="lg"textAlign={'center'} >Check out</Text>
                                                <Text fontSize="sm" textAlign={'center'}>{moment(h?.orderhotel?.checkout).format('dddd DD, MMMM YYYY')}</Text>
                                            </VStack>
                                        </>
                                    }
                                    
                                    {hotels?.settings.enable_show_summary === 1 && <VStack bg="red" w="10%" minW={['20%']} space="0">
                                        <Text fontSize="lg" textAlign={'center'}>{h?.orderhotel?.rooms}</Text>
                                    </VStack>}
                                    
                                    {hotels?.settings.enable_hotel_price === 1 && <VStack bg="red" w="10%" minW={['10%']} space="0">
                                        <Text fontSize="lg" textAlign={'center'}>Price</Text>
                                        <Text fontSize="sm" textAlign={'center'}>{h?.orderhotel?.price}{hotels?.currency}</Text>
                                    </VStack>}
                                </Center>
                            </HStack>
                        </Box>
                        ) :
                        (<Box w="100%" py="4" borderBottomWidth={(i === (hotels?.hotels?.length - 1)) ? 0 : 1} borderBottomColor={'primary.text'}>
                            <HStack px="4" w="100%" space="3" alignItems="center">
                                <Center w={["80px","110px"]}>
                                    <LoadImage path={`${_env.eventcenter_base_url}/${h?.internal_booking_hotel?.image !== '' ? 'assets/hotel/'+ h?.internal_booking_hotel?.image : '_mobile_assets/images/placeholder.png' }`} w={"100%"} style={{borderRadius: '8px'}}  />
                                </Center>

                                <Center w={['calc(100% - 100px)','calc(100% - 125px)']} justifyContent={'flex-start'} alignItems={'flex-start'}>
                                    <HStack w={'100%'} space="1" alignItems="center">
                                        <Center w={['100%','calc(100% - 95px)']} alignItems="flex-start">
                                            <Text mb={2} fontSize="lg">{h?.name}</Text>
                                            {hotels?.settings.enable_checkin_checkout === 1 && 
                                                <HStack space={3}>
                                                    <HStack justifyContent={'flex-start'} alignItems={'center'} space="1">
                                                        <HStack p={1} rounded={4} bg={'green.500'} space="0" alignItems="center">
                                                            <Icon size={'xsm'} color={'white'} as={SimpleLineIcons} name="login"  />
                                                        </HStack>
                                                        
                                                        <Text fontSize="md" textAlign={'center'}>{moment(h?.checkin).format('DD/MM/YYYY')}</Text>
                                                    </HStack>
                                                    <HStack justifyContent={'flex-start'} alignItems={'center'} space="1">
                                                        <HStack p={1} rounded={4} bg={'red.500'} space="0" alignItems="center">
                                                            <Icon size={'xsm'}  color={'white'} as={SimpleLineIcons} name="logout"  />
                                                        </HStack>
                                                        <Text fontSize="sm" textAlign={'center'}>{moment(h?.checkout).format('DD/MM/YYYY')}</Text>
                                                    </HStack>
                                                </HStack>
                                            }
                                        </Center>
                                        <Spacer />
                                        {width > 550 && <Center w={'90px'} alignItems="flex-end">
                                            {hotels?.settings.enable_show_summary === 1 && <VStack bg="red" space="0">
                                                <Text fontSize="sm">Rooms:{h?.rooms}</Text>
                                            </VStack>}
                                            {hotels?.settings.enable_hotel_price === 1 && <VStack bg="red"  space="0">
                                                <Text fontSize="sm">Price: {h?.price}{hotels?.currency}</Text>
                                            </VStack>}
                                        </Center>}
                                    </HStack>
                                    
                                    
                                    
                                    
                                    
                                </Center>
                            </HStack>
                        </Box>)
                    ))}
                    
                </Box>
            </>
            }
        </>
    )

}

export default RectangleView