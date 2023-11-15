import React from 'react'
import { Box, Heading, HStack, Icon, Pressable, Spacer, Text, View, VStack } from 'native-base';
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
                    <Text fontSize="2xl">Hotel</Text>
                    <Box minWidth={70}> </Box>
                </HStack>
                <Box overflow="hidden" w="100%" bg="primary.box" p="0" rounded="10">
                    {hotels?.hotels?.map((h:any, i:any)=>(
                        h?.orderhotel !== undefined ? (
                            <Box w="100%" py="4" borderBottomWidth={(i === (hotels?.hotels?.length - 1)) ? 0 : 1} borderBottomColor={'primary.text'}>
                            <HStack px="5" w="100%" space="0" alignItems="center" justifyContent="space-between">
                                <LoadImage path={`${_env.eventcenter_base_url}/${h?.image !== undefined && h?.image !== ''  ? 'assets/hotel/'+ h?.image : '_mobile_assets/images/placeholder.png' }`} w="80px"  />

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
                            </HStack>
                        </Box>
                        ) :
                        (<Box w="100%" py="4" borderBottomWidth={(i === (hotels?.hotels?.length - 1)) ? 0 : 1} borderBottomColor={'primary.text'}>
                            <HStack px="5" w="100%" space="0" alignItems="center" justifyContent="space-between">
                                <LoadImage path={`${_env.eventcenter_base_url}/${h?.internal_booking_hotel?.image !== '' ? 'assets/hotel/'+ h?.internal_booking_hotel?.image : '_mobile_assets/images/placeholder.png' }`} w="80px"  />

                                <VStack bg="red" w="20%" minW={['20%']} space="0">
                                    <Text fontSize="lg" textAlign={'center'}>{h?.name}</Text>
                                    <Text fontSize="sm" textAlign={'center'}>{h?.internal_booking_hotel?.info[0]?.value}</Text>
                                </VStack>
                                {hotels?.settings.enable_checkin_checkout === 1 && 
                                    <>
                                        <VStack bg="red" w="20%" minW={['20%']} space="0">
                                            <Text fontSize="lg" textAlign={'center'}>Check in</Text>
                                            <Text fontSize="sm" textAlign={'center'}>{moment(h?.checkin).format('dddd DD, MMMM YYYY')}</Text>
                                        </VStack>
                                        <VStack bg="red" w="20%" minW={['20%']} space="0">
                                            <Text fontSize="lg"textAlign={'center'} >Check out</Text>
                                            <Text fontSize="sm" textAlign={'center'}>{moment(h?.checkout).format('dddd DD, MMMM YYYY')}</Text>
                                        </VStack>
                                    </>
                                }
                                
                                {hotels?.settings.enable_show_summary === 1 && <VStack bg="red" w="10%" minW={['20%']} space="0">
                                    <Text fontSize="lg" textAlign={'center'}>{h?.rooms}</Text>
                                    <Text fontSize="sm" textAlign={'center'}>{h?.internal_booking_hotel?.info[1]?.value}</Text>
                                </VStack>}
                                
                                {hotels?.settings.enable_hotel_price === 1 && <VStack bg="red" w="10%" minW={['10%']} space="0">
                                    <Text fontSize="lg" textAlign={'center'}>Price</Text>
                                    <Text fontSize="sm" textAlign={'center'}>{h?.price}{hotels?.currency}</Text>
                                </VStack>}
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