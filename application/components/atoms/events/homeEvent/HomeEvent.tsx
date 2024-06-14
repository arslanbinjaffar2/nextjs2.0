import Icocalendar from 'application/assets/icons/small/Icocalendar';
import Icopin from 'application/assets/icons/small/Icopin';
import { HomeMyEvent } from 'application/models/FetchEvent';
import { UseEventService } from 'application/store/services';
import UseEnvService from 'application/store/services/UseEnvService';
import DynamicIcon from 'application/utils/DynamicIcon';
import { Box, Button, HStack, Image, Pressable, Text, View, Input ,Icon} from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'solito/src/router/use-router';
import UseLoadingService from 'application/store/services/UseLoadingService';
import SectionLoading from 'application/components/atoms/SectionLoading';
import NoRecordFound from 'application/components/atoms/NoRecordFound';

const HomeEvent = () => {
    const { push } = useRouter();
    const { event,modules, FetchEvents, home_events } = UseEventService();
    const { _env } = UseEnvService();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredHomeEvent, setFilteredHomeEvent] = useState<HomeMyEvent[]>([]);
    const {processing} = UseLoadingService();

    useEffect(() => {
        FetchEvents({ query: '', screen: 'homeMyevents' });
    }, []);

    useEffect(() => {
        setFilteredHomeEvent(home_events);
    }, [home_events]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (!query) {
            setFilteredHomeEvent(home_events);
        } else {
            const lowercasedFilter = query.toLowerCase();
            const filteredData = home_events.filter((item: HomeMyEvent) =>
                (item.id && item.id.toString().includes(lowercasedFilter)) ||
                (item?.name && item.name.toLowerCase().includes(lowercasedFilter))
            );
            setFilteredHomeEvent(filteredData);
        }
    };

    return (
        <>
        {processing?.includes('fetching-events') ? <SectionLoading /> :(
            <>
            <HStack space={2} alignItems="center" mb={3} justifyContent={'space-between'}>
            <Text fontSize="2xl">{modules?.find((programTitle) => (programTitle.alias == 'homeMyevents'))?.name ?? ''}</Text>

                <Input
                    rounded="10"
                    w="60%"
                    maxW={290}
                    bg="primary.box"
                    borderWidth={0}
                    placeholder={event.labels.GENERAL_SEARCH}
                    value={searchQuery}
                    onChangeText={handleSearch}
                    InputLeftElement={
                        <Icon
                        ml={2}
                        color="primary.text"
                        size="lg"
                        as={AntDesign}
                        name="search1"
                        />
                        }
                        />
            </HStack>
            <View>
                {filteredHomeEvent.length === 0 && <NoRecordFound />}
                {filteredHomeEvent.map((home_event: HomeMyEvent, key: number) => (
                    <View key={key} display="flex" flexDirection={['column', 'row']} alignItems="flex-start" width="100%" py="14px" px="16px" bg={'primary.box'}>
                        <Pressable onPress={() => push(`/${event.url}/home_events/detail/${home_event?.id}`)} >
                            {home_event.app_icon ? (
                                <Image
                                source={{ uri: `${_env.eventcenter_base_url}/assets/event/branding/${home_event?.app_icon}` }}
                                    alt="Event Image"
                                    size="xl"
                                    width={114}
                                    height={46}
                                    rounded="sm"
                                    
                                    />
                                    ) : (
                                        <Image
                                        source={{ uri: "https://dev.eventbuizz.com/_admin_assets/images/logo-unavailable-2.png" }}
                                        alt="Event Image"
                                        size="xl"
                                        width={114}
                                        height={46}
                                        rounded="sm"
                                        bg={'gray.300'}
                                        />
                                        )}
                        </Pressable>
                        <View display="flex" flexDirection="column" ml={['', '30px']} mt={['14px', '']} w="100%">
                            <Pressable onPress={() => push(`/${event.url}/home_events/detail/${home_event?.id}`)}>
                                <Text textDecorationLine="underline" fontSize="md" fontWeight={'semibold'}>{home_event?.name}</Text>
                            </Pressable>
                            <HStack space="3" alignItems="center" width="100%" flexDirection="row" pt="6px">
                                <Box alignItems="center" flexDirection="row">
                                    <Icocalendar width={16} height={18} />
                                    <Text ml="6px" fontSize="xs">{home_event?.start_date}</Text>
                                </Box>
                                <Box alignItems="center" flexDirection="row">
                                    <Text fontSize="xs">{event?.labels?.GENERAL_EVENT_ID_LABEL}:</Text>
                                    <Text fontSize="xs">{home_event?.id}</Text>
                                </Box>
                            </HStack>
                            <Box alignItems="center" flexDirection="row" pt="6px">
                                <Icopin width={16} height={18} />
                                <Text ml="6px" fontSize="xs">{home_event?.location_name}</Text>
                            </Box>
                            {home_event?.id != event?.id && <Button width={['100%', '86px']} height={38} mt="3" onPress={() => window.open(`/${home_event?.url}`, '_blank')}>
                                <Box display="flex" alignItems="center" flexDirection="row">
                                    <DynamicIcon iconType="logout" iconProps={{ width: 14, height: 14 }} />
                                    <Text ml="6px">{event?.labels?.EVENTSITE_LOGIN}</Text>
                                </Box>
                            </Button>}
                        </View>
                    </View>
                ))}
            </View>
            </>
        )}
        </>
    );
};

export default HomeEvent;
