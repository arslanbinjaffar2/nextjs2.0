import Icocalendar from 'application/assets/icons/small/Icocalendar';
import Icopin from 'application/assets/icons/small/Icopin';
import { UpcomingEvent } from 'application/models/FetchEvent';
import { UseEventService } from 'application/store/services';
import UseEnvService from 'application/store/services/UseEnvService';
import DynamicIcon from 'application/utils/DynamicIcon';
import { Box, Button, HStack, Icon, Image, Input, Pressable, Text, View } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useEffect, useState } from 'react';
import { Link } from 'solito/link';
import { useRouter } from 'solito/src/router/use-router';
import SectionLoading from 'application/components/atoms/SectionLoading';
import UseLoadingService from 'application/store/services/UseLoadingService';
import NoRecordFound from 'application/components/atoms/NoRecordFound';
import moment from 'moment';
import { GENERAL_DATE_FORMAT } from 'application/utils/Globals';

const UpcomingEvents = () => {
    const { push } = useRouter();
    const { modules, event, FetchEvents, upcoming_events } = UseEventService();
    const { _env } = UseEnvService();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUpcomingEvents, setFilteredUpcomingEvents] = useState<UpcomingEvent[]>([]);
    const {processing} = UseLoadingService();

    useEffect(() => {
        FetchEvents({ query: '', screen: 'upcomingEvents',selected_filter:'all' });
    }, []);

    useEffect(() => {
        setFilteredUpcomingEvents(upcoming_events);
    }, [upcoming_events]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (!query) {
            setFilteredUpcomingEvents(upcoming_events);
        } else {
            const lowercasedFilter = query.toLowerCase();
            const filteredData = upcoming_events.filter((item: UpcomingEvent) =>
                (item.id && item.id.toString().includes(lowercasedFilter)) ||
                (item?.name && item.name.toLowerCase().includes(lowercasedFilter))
            );
            setFilteredUpcomingEvents(filteredData);
        }
    };

    return (
        <>
        {processing?.includes('fetching-events') ? <SectionLoading /> :(
            <>
            <HStack space={2} alignItems="center" mb={3} justifyContent="space-between">
                <Text fontSize="2xl">{modules?.find((programTitle) => programTitle.alias === 'upcomingEvents')?.name ?? ''}</Text>
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
                        <Icon ml={2} color="primary.text" size="lg" as={AntDesign} name="search1" />
                    }
                />
            </HStack>
            <View bg="primary.box" rounded="lg">
                {filteredUpcomingEvents.length === 0 && <NoRecordFound />}
                {filteredUpcomingEvents.map((upcoming_event: UpcomingEvent, key: number) => (
                    <Box borderBottomWidth={filteredUpcomingEvents.length - 1 === key ? 0 : 1} key={key}>
                        <View display="flex" flexDirection={['column', 'row']} alignItems="flex-start" width="100%" py="14px" px="16px" bg="primary.box">
                            <Pressable onPress={() => push(`/${event.url}/upcomingEvents/detail/0`)}>
                            {upcoming_event.app_header_logo ? (
                                <Image
                                source={{ uri: `${_env.eventcenter_base_url}/assets/event/branding/${upcoming_event?.app_header_logo}` }}
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
                                <Pressable onPress={() => push(`/${event.url}/upcoming-events/detail/${upcoming_event?.id}`)}>
                                    <Text textDecorationLine="underline" fontSize="md" fontWeight="semibold">
                                        {upcoming_event.name}
                                    </Text>
                                </Pressable>
                                <HStack space="3" alignItems="center" width="100%" flexDirection="row" pt="6px">
                                    <Box alignItems="center" flexDirection="row">
                                        <Icocalendar width={16} height={18} />
                                        <Text ml="6px" fontSize="xs">
                                            {moment(upcoming_event?.start_date).format(GENERAL_DATE_FORMAT)} - {moment(upcoming_event?.end_date).format(GENERAL_DATE_FORMAT)}
                                        </Text>
                                    </Box>
                                    <Box alignItems="center" flexDirection="row">
                                        <Text fontSize="xs">{event?.labels?.GENERAL_EVENT_ID_LABEL}:</Text>
                                        <Text fontSize="xs"> {upcoming_event.id}</Text>
                                    </Box>
                                </HStack>
                                <Box alignItems="center" flexDirection="row" pt="6px">
                                    <Icopin width={16} height={18} />
                                    <Text ml="6px" fontSize="xs">
                                        {upcoming_event.location_name}
                                    </Text>
                                </Box>
                                <View flexDirection="row" alignItems="center" mt="3">
                                    {upcoming_event?.not_attending_link &&<Button bg="#000000" width={['100%', '136px']} height={38} onPress={() => window.open(upcoming_event?.not_attending_link, '_blank')}>
                                        <Box display="flex" alignItems="center" flexDirection="row">
                                            <DynamicIcon iconType="Notattending" iconProps={{ width: 14, height: 16, color: '#fff' }} />
                                            <Text ml="6px" color="#fff">
                                                {event?.labels?.ATTENDEE_UNSUBSCRIBE_TEXT}
                                            </Text>
                                        </Box>
                                    </Button>}
                                    {upcoming_event?.register_link && <Button width={['100%', '86px']} height={38} ml="10px" onPress={() => window.open(upcoming_event?.register_link, '_blank')}>
                                        <Link href={upcoming_event?.register_link as string} target="_blank">
                                            <Box display="flex" alignItems="center" flexDirection="row">
                                                <DynamicIcon iconType="register" iconProps={{ width: 17, height: 16,color: 'primary.text' }} />
                                                <Text ml="6px" color={'primary.hovercolor'} width={'100px'} isTruncated>{event?.labels?.EMAIL_CLICK_HERE_TO_REGISTER}</Text>
                                            </Box>
                                        </Link>
                                    </Button>}
                                </View>
                            </View>
                        </View>
                    </Box>
                ))}
            </View>
            </>
        )}
        </>
    );
};

export default UpcomingEvents;
