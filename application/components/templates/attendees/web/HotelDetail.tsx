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

type ScreenParams = { id: string }

const { useParam } = createParam<ScreenParams>()
const {event} = UseEventService()
type AppProps = {
    detail: Detail,
}

const RectangleView = () => {
   

   
    return (
        <>
        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center" justifyContent={'space-between'}>
            <Pressable onPress={()=> console.log('first')}>
                <HStack space="3" alignItems="center">
                    <Icon as={AntDesign} name="arrowleft" size="xl" color="primary.text" />
                    <Text fontSize="2xl">{event?.labels?.GENERAL_BACK}</Text>
                </HStack>
            </Pressable>
            <Text fontSize="2xl">Hotel Details</Text>
            <Box minWidth={70}> </Box>
        </HStack>
       <Box overflow="hidden" w="100%" bg="primary.box" p="0" rounded="10">
            <Center w={'100%'} justifyItems={'flex-start'} roundedTop={10}>
                <LoadImage path={`https://placehold.co/1200x400`} w="100%" style={{borderRadius: '8px'}}  />
            </Center>
						<Center p={4} w={'100%'} justifyItems={'flex-start'} alignItems={'flex-start'}>
							<Text mb={3} fontSize="xl">Celestial Sands Hotel</Text>
							<HStack w={'100%'} flexDirection={['column','row']}  space="3" alignItems={["flex-start","center"]}>
								<Center justifyItems={'flex-start'}>
									<HStack mb={2} space={3}>
											<HStack justifyContent={'flex-start'} alignItems={'center'} space="1">
															<HStack p={1} rounded={4} bg={'green.500'} space="0" alignItems="center">
																	<Icon size={'xsm'} color={'white'} as={SimpleLineIcons} name="login"  />
															</HStack>
															
															<Text fontSize="md" textAlign={'center'}>{moment(new Date()).format('DD/MM/YYYY')}</Text>
													</HStack>
													<HStack justifyContent={'flex-start'} alignItems={'center'} space="1">
															<HStack p={1} rounded={4} bg={'red.500'} space="0" alignItems="center">
																	<Icon size={'xsm'}  color={'white'} as={SimpleLineIcons} name="logout"  />
															</HStack>
															<Text fontSize="md" textAlign={'center'}>{moment(new Date()).format('DD/MM/YYYY')}</Text>
													</HStack>
											</HStack>
											
											

								</Center>
								<Spacer />
								<Center justifyItems={'flex-start'}>
									<HStack space="3" alignItems="center">
										<Text  fontSize="md">Rooms: 15</Text>
										<Divider orientation="vertical" h={3} bgColor={"primary.text"} />
										<Text  fontSize="md">Price: 2500</Text>
										
									</HStack>
									
								</Center>
							</HStack>
							<HStack  space="1" alignItems="center">
								<Icon as={SimpleLineIcons} name="link" color={'primary.text'}  />
								<Text textDecorationLine={'underline'} fontSize="md">example.com/admin/booking/hotels</Text>
							</HStack>
							<Divider my={4} bg={'primary.text'} />
							
							<Text fontSize="md">Discover the charm of whispering pines retreat, surrounded by the natural beauty of radiant orchid inn. celestial sands hotel is where modern amenities meet timeless elegance, and velvet horizon lodge welcomes guests with warmth and style. enchanted oasis resort, with its lush gardens and sparkling pools, promises an unforgettable stay.</Text>
							
						</Center>
						
         
        </Box>
        
        </>
    )

}

export default RectangleView