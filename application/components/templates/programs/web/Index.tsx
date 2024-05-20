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
import ButtonElement from 'application/components/atoms/ButtonElement'
import { func } from 'application/styles';


type IndexProps = {
    dashboard?: boolean
}
const Index = ({dashboard}:IndexProps) => {
    
    const mounted = React.useRef(false);
    
    const { FetchPrograms, programs, page,total_pages, id, query, track_id, tracks, FetchTracks, track, parent_track, ResetTracks } = UseProgramService();
    
    const { loading, scroll, processing } = UseLoadingService();
    
    const { response } = UseAuthService();
    const { _env } = UseEnvService();
    const { event, modules  } = UseEventService();

    const [enabledTabs] = useState(() => {
       // agenda_tab = Display both time and tracks
        let display_both_time_and_tracks = event?.agenda_settings?.agenda_tab == 1;
        let program_module_enabled = modules.find((module) => module.alias === 'agendas') ? true : false;
        let my_program_module_enabled = modules.find((module) => module.alias === 'myprograms') ? true : false;
        
        let enabledTabs = [];
        if(dashboard){
            if(program_module_enabled && event?.agenda_settings?.show_program_dashboard == 1){
                enabledTabs.push('program');
            }
            if(my_program_module_enabled && event?.agenda_settings?.show_my_program_dashboard == 1){
                enabledTabs.push('my-program');
            }
            return enabledTabs;
        }

        if(program_module_enabled){
            enabledTabs.push('program');
        }
        if(my_program_module_enabled){
            enabledTabs.push('my-program');
        }
        if((program_module_enabled || program_module_enabled) && display_both_time_and_tracks){
            enabledTabs.push('track');
        }

        return enabledTabs;
    });
  
    
    const [tab, setTab] = useState<string>(()=>{
        // agenda_list = 0 means Listings by time
        // agenda_list = 1 means Listings by track 
        
        let display_both_time_and_tracks = event?.agenda_settings?.agenda_tab == 1;
        let listing_by_time = event?.agenda_settings?.agenda_list == 0;
        let listing_by_track = event?.agenda_settings?.agenda_list == 1;
        
        if(dashboard){
            if(in_array('program',enabledTabs)){
                return 'program'}
            else if(in_array('my-program',enabledTabs)){
                return 'my-program'}
            else{
                return ''
            }

        }

        return in_array('track', enabledTabs) && display_both_time_and_tracks && listing_by_track ? 'track' : 'program';
    });

    const tabLabels: { [key: string]: string } = {
        'program': modules?.find((module)=>(module.alias == 'agendas'))?.name ?? 'Program',
        'my-program': modules?.find((module)=>(module.alias == 'myprograms'))?.name ?? 'My program',
        'track': event?.labels?.PROGRAM_BY_TRACKS ?? 'Program by tracks',
    };

    const { width } = useWindowDimensions();

    function getTabData(loadMore: boolean = false) {
        if(!tab || tab == '') return;
        let pageNo = loadMore ? page + 1 : 1;
        if(tab == 'program' || tab == 'my-program'){
            if(!loadMore){
                ResetTracks();
                FetchTracks({ page: 1, query: '', screen: tab, track_id: 0 });
            }
            FetchPrograms({ page: pageNo, query: '', screen: tab, id: tab === 'my-program' ? response?.data?.user?.id : 0, track_id: track_id });
        }else if(tab == 'track'){
            FetchTracks({ page: pageNo, query: '', screen: tab, track_id: 0 });
        }
    }

    React.useEffect(() => {
        if (mounted.current) {
            getTabData();
        }
    }, [tab]);

    function loadMore() {
        if (mounted.current) {
            getTabData(true);
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
        getTabData();
    }, []);

    function checkSubTabs(tabName: string){
        if(tab == 'sub-track' && tabName == 'track'){
            return true;
        }
        if(tab == 'track-program' && tabName == 'program'){
            return true;
        }
    }

    const module = modules.find((module) => module.alias === 'agendas');

    return (
        <>
            {!dashboard && (
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
                        <Search tab={tab} />
                </HStack>
                </>
            )}
          
            

            {enabledTabs?.length > 1 && (
                <HStack flexWrap={'wrap'} mb="3" overflow={'hidden'} rounded={8} space={1} justifyContent="center" w="100%">
                    {enabledTabs.map((tabName: string, key: number) => (
                        <ButtonElement key={key} bg={(tab == tabName) || checkSubTabs(tabName) ? 'primary.boxbutton' : 'primary.box'} onPress={() => {setTab(tabName)}}>{tabLabels[tabName]}</ButtonElement>
                    ))}
                </HStack>
            )}

            
            
            {Object.keys(track).length > 0 && (
                <HStack alignItems={'center'} mb="3" pt="2" w="100%" space="3">
                    <Text flex="1"  fontSize="sm">
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
                            <Text  fontSize="sm">{parent_track.name}</Text>
                        </Pressable>
                        <Icon color={'primary.text'} as={AntDesign} name="right"  />
                        <Text fontSize="sm">{track?.name}</Text>
                        </>
                    ) : (
                        <Text fontSize="sm">{track?.name}</Text>
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
                    <Text fontSize="sm"><Icon color={'primary.text'} as={AntDesign} name="left"  />{event?.labels?.NATIVE_APP_LOADING_GO_BACK}</Text>
                    </Pressable>
                </HStack>
                )}

            {(in_array('programs', processing) || in_array('tracks', processing)) && page === 1 ? (
                <SectionLoading />
            ) : (
                <>
                    {in_array(tab, ['program', 'my-program', 'track-program']) && <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                        <SlideView dashboard={dashboard} section={tab} programs={programs} />
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

            {!dashboard && !in_array('programs', processing) && !in_array('tracks', processing) && (page < total_pages && total_pages>1) && (in_array(tab, ['program', 'my-program','track'])) && (
                <>
                <IntersectionObserverComponent onIntersect={loadMore} />
                </>
            )}
        </>
    );
};

export default Index;
