import React from 'react'
import { Box, Center, Divider, Heading, HStack, Icon, Pressable, Spacer, Text, View, VStack } from 'native-base';
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
import IcoCheckin from 'application/assets/icons/small/IcoCheckin';
import IcoCheckout from 'application/assets/icons/small/IcoCheckout';

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
                            <Box w="100%" py={["3","4"]} borderBottomWidth={(i === (hotels?.hotels?.length - 1)) ? 0 : 1} borderBottomColor={'primary.bordercolor'}>
                            <HStack px={["3","4"]} w="100%" space="0" alignItems={["flex-start","center"]} justifyContent="space-between">
															<Box  w={["90px","110px"]}>
                                <LoadImage path={`${_env.eventcenter_base_url}/${h?.image !== undefined && h?.image !== ''  ? 'assets/hotel/'+ h?.image : '_mobile_assets/images/placeholder.png' }`} w="100%" style={{borderRadius: '8px'}}  />
															</Box>
															

                                <HStack display={['block','flex']} pl={4} w={['calc(100% - 70px)','calc(100% - 110px)']} alignItems={'center'} justifyContent={'flex-start'}>
                                    <VStack  w={'calc(100% - 90px)'} space="0" alignItems={'center'} justifyContent={'flex-start'}>
                                        <Text fontSize="lg" mb={1} w={'100%'} fontWeight={500}>{h?.orderhotel?.name}</Text>
                                  
                                    {hotels?.settings.enable_checkin_checkout === 1 && 
                                        <HStack space={3} w={'100%'}>
                                            <HStack  space="2" alignItems="center" justifyContent={'flex-start'}>
																							<Box lineHeight={1} bg={'success.500'} p="1" rounded={4}>
                                               	<IcoCheckin width={12} height={12} />
																							</Box>
                                                <Text fontSize="16px">{moment(h?.orderhotel?.checkin).format('DD/MM/YYYY')}</Text>
                                            </HStack>
                                            <HStack  space="2" alignItems="center" justifyContent={'flex-start'}>
																							<Box lineHeight={1} bg={'danger.500'} p="1" rounded={4}>
                                               	<IcoCheckout width={12} height={12} />
																							</Box>
                                                <Text fontSize="16px">{moment(h?.orderhotel?.checkout).format('DD/MM/YYYY')}</Text>
                                            </HStack>
                                        </HStack>
                                    }
                                    </VStack>
																		 <HStack display={['flex','block']} pt={['1','0']} space={['3','0']}  w={['100%','90px']} alignItems={'center'}  justifyItems={'flex-end'}>
																			{hotels?.settings.enable_show_summary === 1 && 
																					<Text  textAlign={['left','right']} fontSize="16px">Rooms: {h?.orderhotel?.rooms}</Text>}
																					<Divider display={['','none']} orientation='horizontal' w={'1px'} borderWidth={0} bg={'primary.text'} height={'15px'} />
																				
																			{hotels?.settings.enable_hotel_price === 1 && 
																					<Text  textAlign={['left','right']}  fontSize="16px">Price: {h?.orderhotel?.price}{hotels?.currency}</Text>}
																	</HStack>
                                </HStack>
                            </HStack>
                        </Box>
                        ) :
                        (<Box w="100%" py={["3","4"]} borderBottomWidth={(i === (hotels?.hotels?.length - 1)) ? 0 : 1} borderBottomColor={'primary.bordercolor'}>
                            <HStack px={["3","4"]} w="100%" space="0" alignItems={["flex-start","center"]} justifyContent="space-between">
															<Box  w={["90px","110px"]}>
                                    <LoadImage path={`${_env.eventcenter_base_url}/${h?.internal_booking_hotel?.image !== '' ? 'assets/hotel/'+ h?.internal_booking_hotel?.image : '_mobile_assets/images/placeholder.png' }`} w={"100%"} style={{borderRadius: '8px'}}  />
                                </Box>

                                <Center w={['calc(100% - 100px)','calc(100% - 125px)']} justifyContent={'flex-start'} alignItems={'flex-start'}>
                                    <HStack w={'100%'} space="1" alignItems="center">
                                        <Center w={['100%','calc(100% - 95px)']} alignItems="flex-start">
                                            <Text lineHeight={'sm'} mb={[1,2]} fontSize="lg">{h?.name}</Text>
                                            {hotels?.settings.enable_checkin_checkout === 1 && 
                                                <HStack space={3}>
                                                    <HStack justifyContent={'flex-start'} alignItems={'center'} space="1">
                                                        <HStack p={1} rounded={4} bg={'green.500'} space="0" alignItems="center">
                                                            <IcoCheckin width={12} height={12} />
                                                        </HStack>
                                                        
                                                        <Text fontSize="md" textAlign={'center'}>{moment(h?.checkin).format('DD/MM/YYYY')}</Text>
                                                    </HStack>
                                                    <HStack justifyContent={'flex-start'} alignItems={'center'} space="1">
                                                        <HStack p={1} rounded={4} bg={'red.500'} space="0" alignItems="center">
                                                            <IcoCheckout width={12} height={12} />
                                                        </HStack>
                                                        <Text fontSize="md" textAlign={'center'}>{moment(h?.checkout).format('DD/MM/YYYY')}</Text>
                                                    </HStack>
                                                </HStack>}
																								 {width < 550 && <HStack w={'100%'} mb={2} space={3} alignItems="center">
                                                {hotels?.settings.enable_show_summary === 1 && <VStack space="0">
                                                    <Text fontSize="16px">Rooms:{h?.rooms}</Text>
                                                </VStack>}
																									<Divider display={['','none']} orientation='horizontal' w={'1px'} borderWidth={0} bg={'primary.text'} height={'15px'} />
                                                    {hotels?.settings.enable_hotel_price === 1 && <VStack  space="0">
                                                        <Text fontSize="16px">Price: {h?.price}{hotels?.currency}</Text>
                                                    </VStack>}
                                                </HStack>}
                                        </Center>
                                        <Spacer />
                                        {width > 550 && <Center w={'90px'} alignItems="flex-end">
                                            {hotels?.settings.enable_show_summary === 1 && <VStack space="0">
                                                <Text fontSize="16px">Rooms:{h?.rooms}</Text>
                                            </VStack>}
                                            {hotels?.settings.enable_hotel_price === 1 && <VStack  space="0">
                                                <Text fontSize="16px">Price: {h?.price}{hotels?.currency}</Text>
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