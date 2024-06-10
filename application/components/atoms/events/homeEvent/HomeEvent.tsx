import Icocalendar from 'application/assets/icons/small/Icocalendar';
import Icopin from 'application/assets/icons/small/Icopin';
import { HomeMyEvent } from 'application/models/FetchEvent';
import { UseEventService } from 'application/store/services';
import UseEnvService from 'application/store/services/UseEnvService';
import DynamicIcon from 'application/utils/DynamicIcon';
import { Box, Button, HStack, Image, Pressable, Text, View } from 'native-base';
import React from 'react';
import { useRouter } from 'solito/src/router/use-router';

const HomeEvent = () => {
    const { push } = useRouter();
    const { modules, event, FetchEvents, home_events } = UseEventService();
    const { _env } = UseEnvService()
    React.useEffect(() => {
        FetchEvents({ query: '', screen: 'homeMyevents' });
    }, []);

    React.useEffect(() => {
        console.log(home_events, 'home_events');
    }, [home_events]);

    return (
        <View>
            {home_events.length > 0 && home_events.map((home_event: HomeMyEvent, key: number) => (
                <View key={key} display={'flex'} flexDirection={['column', 'row']} alignItems={'flex-start'} width={'100%'} py={'14px'} px={'16px'}>
                    <Pressable 
                        onPress={() => {
                            push(`/${event.url}/home_events/detail/${home_event?.id}`);
                        }} 
                    >
                        {console.log(home_event?.id,'sds')}
                        {
                         home_event.app_icon ? (
                          <Image source={{ uri: `${_env.eventcenter_base_url}/assets/event/branding/${home_event?.app_icon}` }}  alt="Event Image" size="xl" width={114} height={46} rounded={'sm'} />
                            ):
                           <Image source={{ uri: "https://wallpaperaccess.com/full/317501.jpg" }} alt="Event Image" size="xl" width={114} height={46} rounded={'sm'} /> 
                        }
                    </Pressable>
                    <View display={'flex'} flexDirection={'column'} ml={['', '14px']} mt={['14px', '']} w={'100%'}>
                        <Pressable
                            onPress={() => {
                                push(`/${event.url}/home_events/detail/${home_event?.id}`);
                            }} 
                        >
                            <Text textDecorationLine={'underline'} fontSize={'md'}>{home_event?.name}</Text>
                        </Pressable>
                        <HStack space="3" alignItems="center" width={'100%'} flexDirection={'row'} pt={'6px'} w={'100%'}>
                            <Box alignItems={'center'} flexDirection={'row'}>
                                <Icocalendar width={16} height={18} />
                                <Text ml={'6px'} fontSize={'xs'}>{home_event?.start_date}</Text>
                            </Box>
                            <Box alignItems={'center'} flexDirection={'row'}>
                                <Text fontSize={'xs'}>Event ID:</Text>
                                <Text fontSize={'xs'}>{home_event?.id}</Text>
                            </Box>
                        </HStack>
                        <Box alignItems={'center'} flexDirection={'row'} pt={'6px'}>
                            <Icopin width={16} height={18} />
                            <Text ml={'6px'} fontSize={'xs'}>{home_event?.location}</Text>
                        </Box>
                        <Button width={['100%', '86px']} height={38} mt={'3'} onPress={() => { console.log('hello') }}>
                            <Box display={'flex'} alignItems={'center'} flexDirection={'row'}>
                                <DynamicIcon iconType={'logout'} iconProps={{ width: 14, height: 14 }} />
                                <Text ml={'6px'}>Login</Text>
                            </Box>
                        </Button>
                    </View>
                </View>
            ))}
        </View>
    );
}

export default HomeEvent;
