import Icocalendar from 'application/assets/icons/small/Icocalendar';
import Icopin from 'application/assets/icons/small/Icopin';
import { HomeMyEvent } from 'application/models/FetchEvent';
import { UseEventService } from 'application/store/services';
import UseEnvService from 'application/store/services/UseEnvService';
import DynamicIcon from 'application/utils/DynamicIcon';
import { Box, Button, HStack, Image, Pressable, Text, View, Input ,Icon, Select, CheckIcon, VStack} from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'solito/src/router/use-router';
import UseLoadingService from 'application/store/services/UseLoadingService';
import SectionLoading from 'application/components/atoms/SectionLoading';
import NoRecordFound from 'application/components/atoms/NoRecordFound';
import { GENERAL_DATE_FORMAT } from 'application/utils/Globals';
import moment from 'moment';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import { func } from 'application/styles';

const HomeEvent = () => {
    const { push } = useRouter();
    const { event,modules, FetchEvents, home_events } = UseEventService();
    const { _env } = UseEnvService();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredHomeEvent, setFilteredHomeEvent] = useState<HomeMyEvent[]>([]);
    const [selectedFilter, setSelectedFilter] = useState<string>('active_and_future');
    const {processing} = UseLoadingService();
    const module = modules.find((module) => module.alias === 'homeMyevents');

    useEffect(() => {
        FetchEvents({ query: '', screen: 'homeMyevents',selected_filter:selectedFilter });
    }, []);

    useEffect(() => {
        filterBySearchQuery();
    }, [home_events, searchQuery]);

    function filterBySearchQuery(){
        if (!searchQuery) {
            setFilteredHomeEvent(home_events);
        } else {
            const lowercasedFilter = searchQuery.toLowerCase();
            const filteredData = home_events.filter((item: HomeMyEvent) =>
                (item.id && item.id.toString().includes(lowercasedFilter)) ||
                (item?.name && item.name.toLowerCase().includes(lowercasedFilter))
            );
            setFilteredHomeEvent(filteredData);
        }
    }

    React.useEffect(() => {
        FetchEvents({ query: '', screen: 'homeMyevents',selected_filter:selectedFilter });
    }, [selectedFilter]);

    return (
        <>
        <NextBreadcrumbs module={module} />
        <Text fontSize="2xl">{modules?.find((programTitle) => (programTitle.alias == 'homeMyevents'))?.name ?? ''}</Text>
        <HStack space={2} alignItems="center" mb={3} justifyContent={'space-between'}>

            <View w={'50%'}>
            <Select w={'100%'}  bg={'primary.box'}  
                rounded="10"
				selectedValue={selectedFilter} _selectedItem={{
					bg: "teal.600",
					endIcon: <CheckIcon size="5" />
					}} mt={1} onValueChange={itemValue => setSelectedFilter(itemValue)}>
						<Select.Item label={event?.labels?.GENERAL_ALL} value={'all'} />
						<Select.Item label={event?.labels?.GENERAL_FILTER_ACTIVE_AND_FUTURE} value={'active_and_future'} />
						<Select.Item label={event?.labels?.GENERAL_FILTER_EXPIRED} value={'expired'} />
        		</Select>
            </View>
            
				 
                <Input
                    rounded="10"
                    w="50%"
                    maxW={290}
                    bg="primary.box"
                    borderWidth={0}
                    placeholder={event.labels.GENERAL_SEARCH}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
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
        {processing?.includes('fetching-events') ? <SectionLoading /> :(
            <>   
            {filteredHomeEvent.length === 0 && <View bg="primary.box" rounded="lg"><NoRecordFound /></View>}
            <Box bg={'primary.box'} rounded={10}>
                {filteredHomeEvent.map((home_event: HomeMyEvent, key: number) => (
                    <HStack borderTopWidth={key === 0 ? 0 : 1} borderTopColor={'primary.bordercolor'} key={key} display="flex" alignItems="flex-start" width="100%" p={4}>
                        <Pressable onPress={() => push(`/${event.url}/home-events/detail/${home_event?.id}`)} >
                            {home_event.app_header_logo ? (
                                <Image
                                source={{ uri: `${_env.eventcenter_base_url}/assets/event/branding/${home_event?.app_header_logo}` }}
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
                        <VStack space={2}  ml={['4']} w={'calc(100% - 140px)'}>
                            <Pressable onPress={() => push(`/${event.url}/home-events/detail/${home_event?.id}`)}>
                                <Text  fontSize="lg" fontWeight={'500'}>{home_event?.name}</Text>
                            </Pressable>
                            <HStack space="3" alignItems="center" width="100%" flexDirection="row">
                                <Box alignItems="center" flexDirection="row">
                                    <Icocalendar width={16} height={18} />
                                    <Text ml="6px" fontSize="12px">{moment(home_event?.start_date).format(GENERAL_DATE_FORMAT)}</Text>
                                </Box>
                                <Box  alignItems="center" flexDirection="row">
                                    <Text fontSize="12px">{event?.labels?.GENERAL_EVENT_ID_LABEL}:</Text>
                                    <Text fontSize="12px">{home_event?.id}</Text>
                                </Box>
                            </HStack>
                            <Box alignItems="center" flexDirection="row">
                                <Icopin width={16} height={18} />
                                <Text ml="6px" fontSize="12px">{home_event?.location_name}</Text>
                            </Box>
                            
                            {home_event?.id != event?.id && 
                                <Text>
                                    <Button _text={{color: 'primary.hovercolor'}} px={4} py={2} leftIcon={<DynamicIcon iconType="logout" iconProps={{ width: 14, height: 14,color: func.colorType(event?.settings?.primary_color) }} />} onPress={() => window.open(`/${home_event?.url}`, '_blank')}>
                                        {event?.labels?.EVENTSITE_LOGIN}
                                    </Button>
                                </Text>
                                
                            }
                        </VStack>
                    </HStack>
                ))}
            </Box>
            </>
        )}
        </>
    );
};

export default HomeEvent;
