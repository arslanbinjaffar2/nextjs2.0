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
import NoRecordFound from 'application/components/atoms/NoRecordFound';


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
        let listing_by_time = event?.agenda_settings?.agenda_list == 0;
        let listing_by_track = event?.agenda_settings?.agenda_list == 1;
        let program_module_enabled = modules.find((module) => module.alias === 'agendas') ? true : false;
        let my_program_module_enabled = modules.find((module) => module.alias === 'myprograms') ? true : false;

        let program_dashboard_module_enabled = event?.dashboard_modules && event?.dashboard_modules.find((module) => module.alias === 'agendas') ? true : false;
        let my_program_dashboard_module_enabled = event?.dashboard_modules && event?.dashboard_modules.find((module) => module.alias === 'myagendas') ? true : false;
        
        let enabledTabs = [];
        if(dashboard){
            if(program_module_enabled && program_dashboard_module_enabled){
                enabledTabs.push('program');
            }
            if(my_program_module_enabled && my_program_dashboard_module_enabled){
                enabledTabs.push('my-program');
            }
            return enabledTabs;
        }

        if(program_module_enabled && (listing_by_time || display_both_time_and_tracks)){
            enabledTabs.push('program');
        }
        if(my_program_module_enabled){
            enabledTabs.push('my-program');
        }
        if((program_module_enabled || program_module_enabled) && ( listing_by_track || display_both_time_and_tracks)){
            enabledTabs.push('track');
        }

        return enabledTabs;
    });
  
    
    const [tab, setTab] = useState<string>(()=>{
        // agenda_list = 0 means Listings by time
        // agenda_list = 1 means Listings by track 
        
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

        if(in_array('track', enabledTabs) && listing_by_track){
            return 'track';
        }else if(in_array('program', enabledTabs) && listing_by_time){
            return 'program';
        }else if(in_array('my-program', enabledTabs)){
            return 'my-program';
        }else{
            return '';
        }

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
            // if(!loadMore){
            //     ResetTracks();
            //     FetchTracks({ page: 1, query: '', screen: tab, track_id: 0 });
            // }
            FetchPrograms({ page: pageNo, query: '', screen: tab, id: tab === 'my-program' ? response?.data?.user?.id : 0, track_id: 0 });
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
                    {width > 680 &&
                        <>
                            <Text maxW={'150px'} fontSize="2xl">
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
                                if (tab === 'track-program') {
                                    FetchPrograms({ page: 1, query: '', screen: 'program', id: 0, track_id: track?.parent_id ?? 0 });
                                }
                            }}>
                            <Text  fontSize="sm">{track?.parent?.name}</Text>
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
                            FetchTracks({ page: 1, query: '', screen: tab, track_id: 0 });
                            setTab('track');
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
                        {tracks?.length <= 0 && <NoRecordFound/>}
                    </Container>}
                         {!dashboard && tab === 'program' && <BannerAds module_name={'agendas'} module_type={'listing'} />}
                         {!dashboard && tab === 'my-program' && <BannerAds module_name={'myagendas'} module_type={'listing'} />}
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
