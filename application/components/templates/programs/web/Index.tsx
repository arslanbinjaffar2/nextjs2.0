import * as React from 'react';
import { Box, Button, Container, HStack, Image, Pressable, Spacer, Text, Icon, } from 'native-base'
import { useEffect, useState } from 'react'
import Search from 'application/components/atoms/programs/Search';
import SlideView from 'application/components/molecules/programs/SlideView';
import UseProgramService from 'application/store/services/UseProgramService';
import in_array from "in_array";
import AntDesign from '@expo/vector-icons/AntDesign';
import SectionLoading from 'application/components/atoms/SectionLoading';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseAuthService from 'application/store/services/UseAuthService';
import TrackRectangleDetailView from 'application/components/atoms/programs/tracks/RectangleDetailView';
import LoadMore from 'application/components/atoms/LoadMore';
import IntersectionObserverComponent from 'application/components/atoms/IntersectionObserverComponent';
import UseEventService from 'application/store/services/UseEventService';
import BannerAds from 'application/components/atoms/banners/BannerAds'
import { Platform, useWindowDimensions } from 'react-native';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import UseEnvService from 'application/store/services/UseEnvService';

const Index = () => {
    
    const mounted = React.useRef(false);
    
    const { FetchPrograms, programs, page,total_pages, id, query, track_id, tracks, FetchTracks, track, parent_track, ResetTracks } = UseProgramService();
    
    const { loading, scroll, processing } = UseLoadingService();
    
    const { response } = UseAuthService();
    const { _env } = UseEnvService()

    const tb1 = React.useRef<HTMLDivElement>(null);
    const tb2 = React.useRef<HTMLDivElement>(null);
    const tb3 = React.useRef<HTMLDivElement>(null);
    
    const { event, modules  } = UseEventService();
    const [tab, setTab] = useState<string>(event?.agenda_settings?.agenda_list == 1 ? 'track' : 'program');
    const { width } = useWindowDimensions();
    React.useEffect(() => {
        if (mounted.current) {
            if (in_array(tab, ['program', 'my-program'])) {
                FetchTracks({ page: 1, query: '', screen: tab, track_id: 0 });
                FetchPrograms({ page: 1, query: '', screen: tab, id: tab === 'my-program' ? response?.data?.user?.id : 0, track_id: track_id });
            } else if (tab === "track") {
                FetchTracks({ page: 1, query: '', screen: tab, track_id: 0 });
            }
        }
    }, [tab]);

    function loadMore() {
        if (mounted.current) {
            if (in_array(tab, ['program', 'my-program'])) {
                FetchPrograms({ query: query, page: page + 1, screen: tab, id: tab === 'my-program' ? response?.data?.user?.id : 0, track_id: track_id });
            } else if (tab === "track") {
                FetchTracks({ page: page + 1, query: query, screen: tab, track_id: track_id });
            }
        }
    }
    React.useEffect(() => {
        mounted.current = true;
        return () => { mounted.current = false; };
    }, []);

    const updateTab = (tab: string) => {
        setTab(tab);
    }

    React.useEffect(() => {
        if (event?.agenda_settings?.agenda_list == 1) {
            FetchTracks({ page: 1, query: '', screen: tab, track_id: 0 });
        } else {
            FetchPrograms({ query: '', page: 1, screen: tab, id: 0, track_id: 0 });
        }
    }, []);

    const module = modules.find((module) => module.alias === 'agendas');

    return (
        <>
            <NextBreadcrumbs module={module} />
            <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                {width > 480 &&
                    <>
                        <Text  fontSize="2xl">
                            {modules?.find((programTitle) => (programTitle.alias == 'agendas'))?.name ?? ''}
                            </Text>
                        <Spacer />
                    </>}
                {event?.eventsite_settings?.agenda_search_filter == 1 && <Search tab={tab} />}
            </HStack>
          
            

            <HStack mb="3" overflow={'hidden'} rounded={8} space={1} justifyContent="center" w="100%">
                {(event?.agenda_settings?.agenda_list == 1 || event?.agenda_settings?.agenda_tab == 1) && <Button ref={tb1} _hover={{_text: {color: 'primary.hovercolor'}}} onPress={() => {
                    ResetTracks();
                    setTab('program')
                }}  flex={1} borderWidth="0px" borderRightRadius={0} borderLeftRadius={0} py={0} borderColor="primary.darkbox"  h="42px" bg={in_array(tab, ['program', 'track-program']) ? 'primary.boxbutton' : 'primary.box'}  _text={{ fontWeight: '600' }}><Text textAlign={'center'} isTruncated w={tb1.current?.clientWidth ? tb1.current?.clientWidth - 10 : '100%'} fontWeight={600}>
                {modules?.find((module)=>(module.alias == 'agendas'))?.name ?? 'Program'}</Text></Button>}
                {(modules?.find((m)=>(m.alias == 'myprograms'))) &&<Button ref={tb2} _hover={{_text: {color: 'primary.hovercolor'}}} onPress={() => {
                    ResetTracks();
                    setTab('my-program');
                }}  flex={1} borderWidth="0px" borderRightRadius={0} borderLeftRadius={0} py={0} borderColor="primary.darkbox" h="42px" bg={tab === 'my-program' ? 'primary.boxbutton' : 'primary.box'}  _text={{ fontWeight: '600' }}><Text textAlign={'center'} isTruncated w={tb2.current?.clientWidth ? tb2.current?.clientWidth - 10 : '100%'} fontWeight={600}>{modules?.find((module)=>(module.alias == 'myprograms'))?.name ?? 'My program'}</Text></Button>}
                {(event?.agenda_settings?.agenda_list == 1 || event?.agenda_settings?.agenda_tab == 1) &&<Button ref={tb3} _hover={{_text: {color: 'primary.hovercolor'}}} onPress={() => setTab('track')} borderWidth="0px" py={0} borderColor="primary.darkbox" flex={1} borderLeftRadius="0" borderRightRadius={0} h="42px" bg={tab === 'track' ? 'primary.boxbutton' : 'primary.box'}  _text={{ fontWeight: '600' }}><Text textAlign={'center'} isTruncated w={tb3.current?.clientWidth ? tb3.current?.clientWidth - 10 : '100%'} fontWeight={600}>TRACKS</Text></Button>}
            </HStack>
            {Object.keys(track).length > 0 && (
                <HStack alignItems={'center'} mb="3" pt="2" w="100%" space="3">
                    <Text flex="1" textTransform="uppercase" fontSize="sm">
                    {track.parent_id !== 0 ? (
                        <>
                        <Pressable
                            onPress={async () => {
                                if (in_array(tab, ['track', 'track-program', 'sub-track'])) {
                                FetchTracks({ page: 1, query: '', screen: tab, track_id: (track?.parent_id !== undefined ? track?.parent_id : 0) });
                                if (tab === 'track-program') {
                                    setTab('sub-track');
                                }
                                } else {
                                FetchPrograms({ query: '', page: 1, screen: tab, id: tab === 'my-program' ? response?.data?.user?.id : 0, track_id: 0 });
                                }
                            }}>
                            <Text textTransform="uppercase" fontSize="sm">{parent_track.name}</Text>
                        </Pressable>
                        <Icon color={'primary.text'} as={AntDesign} name="right"  />
                        <Text textTransform="uppercase" fontSize="sm">{track?.name}</Text>
                        </>
                    ) : (
                        <Text textTransform="uppercase" fontSize="sm">{track?.name}</Text>
                    )}
                    </Text>
                    <Pressable
                    onPress={async () => {
                        if (in_array(tab, ['track', 'track-program', 'sub-track'])) {
                        FetchTracks({ page: 1, query: '', screen: tab, track_id: (track?.parent_id !== undefined ? track?.parent_id : 0) });
                        if (tab === 'track-program') {
                            setTab('sub-track');
                        }
                        } else {
                        FetchPrograms({ query: '', page: 1, screen: tab, id: tab === 'my-program' ? response?.data?.user?.id : 0, track_id: 0 });
                        }
                    }}>
                    <Text textTransform="capitalize" fontSize="sm"><Icon color={'primary.text'} as={AntDesign} name="left"  />{event?.labels?.NATIVE_APP_LOADING_GO_BACK}</Text>
                    </Pressable>
                </HStack>
                )}

            {(in_array('programs', processing) || in_array('tracks', processing)) && page === 1 ? (
                <SectionLoading />
            ) : (
                <>
                    {in_array(tab, ['program', 'my-program', 'track-program']) && <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                        <SlideView section={tab} programs={programs} />
                    </Container>}
                    {in_array(tab, ['track', 'sub-track']) && <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                        {tracks?.map((track: any, key: any) =>
                            <TrackRectangleDetailView key={key} track={track} border={tracks.length != (key + 1)} updateTab={updateTab} />
                        )}
                        {tracks?.length <= 0 && <Text textAlign="center" fontSize="lg" p="5">{event?.labels?.GENERAL_NO_RECORD}</Text>}
                    </Container>}
                         <BannerAds module_name={'agendas'} module_type={'listing'} />
                </>
            )}
            {(in_array('programs', processing) || in_array('tracks', processing)) && page > 1 && (
                <LoadMore />
            )}

            {!in_array('programs', processing) && !in_array('tracks', processing) && (page < total_pages && total_pages>1) && (in_array(tab, ['program', 'my-program','track'])) && (
                <>
                <IntersectionObserverComponent onIntersect={loadMore} />
                </>
            )}
        </>
    );
};

export default Index;
