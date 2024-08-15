import React, { useEffect, useState } from 'react'
import { Box, Button, Container, HStack, Icon, Image, Pressable, ScrollView, Spacer, Text } from 'native-base'
import AntDesign from '@expo/vector-icons/AntDesign';
import Search from 'application/components/atoms/programs/Search';
import BasicInfoBlock from 'application/components/atoms/attendees/detail/BasicInfoBlock';
import ContactInfo from 'application/components/atoms/attendees/detail/ContactInfo';
import SubRegistration from 'application/components/atoms/subRegistration/RectangleView';
import DetailInfoBlock from 'application/components/atoms/attendees/detail/web/DetailInfoBlock';
import RectangleGroupView from 'application/components/atoms/attendees/groups/RectangleView';
import RectangleCategoryView from 'application/components/atoms/attendees/categories/RectangleView';
import SlideView from 'application/components/molecules/programs/SlideView';
import WebLoading from 'application/components/atoms/WebLoading';
import { createParam } from 'solito';
import UseAttendeeService from 'application/store/services/UseAttendeeService';
import UseProgramService from 'application/store/services/UseProgramService';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseAuthService from 'application/store/services/UseAuthService';
import GroupAlphabatically from 'application/utils/GroupAlphabatically';
import { Group } from 'application/models/attendee/Group';
import SectionLoading from 'application/components/atoms/SectionLoading';
import LoadMore from 'application/components/atoms/LoadMore';
import in_array from "in_array";
import { Category } from 'application/models/event/Category';
import UseDocumentService from 'application/store/services/UseDocumentService';
import ListingLayout2 from 'application/components/molecules/documents/ListingLayout2';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'solito/router';
import UseEnvService from 'application/store/services/UseEnvService'
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import BannerAds from 'application/components/atoms/banners/BannerAds'
import ButtonElement from 'application/components/atoms/ButtonElement'
import { Platform, useWindowDimensions } from 'react-native';
import NoRecordFound from 'application/components/atoms/NoRecordFound';
import { getColorScheme } from "application/styles/colors";
import ModuleEnabled from 'application/utils/ModuleEnabled';

type ScreenParams = { id: string }

const { useParam } = createParam<ScreenParams>()

type Props = {
    speaker: number
}

const Detail = ({ speaker }: Props) => {

    const { width } = useWindowDimensions();

    const RenderHtml = require('react-native-render-html').default;

    const mounted = React.useRef(false);

    const [tab, setTab] = useState<string>('');

    const { event,modules  } = UseEventService();

    const { FetchAttendeeDetail, detail, FetchGroups, groups } = UseAttendeeService();

    const { FetchPrograms, programs, page, id, query,total_pages } = UseProgramService();

    const { FetchDocuments } = UseDocumentService();

    const { response } = UseAuthService();

    const { loading, scroll, processing } = UseLoadingService();

    const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
        const mixedStyle = {
          body: {
              fontFamily: 'Avenir',
              fontSize: '16px',
              userSelect: 'auto',
              color: colors.text
          },
          p: {
              fontFamily: 'Avenir',
          }
      }

    const tab1 = React.useRef<HTMLDivElement>();
    const tab2 = React.useRef<HTMLDivElement>();
    const tab3 = React.useRef<HTMLDivElement>();
    const tab4 = React.useRef<HTMLDivElement>();
    const tab5 = React.useRef<HTMLDivElement>();
    const tab6 = React.useRef<HTMLDivElement>();

    const [_id] = useParam('id');
    const { _env } = UseEnvService()
    const { push, back } = useRouter()
    React.useEffect(() => {
        if (_id) {
            FetchAttendeeDetail({ id: Number(_id), speaker: speaker! });
         
        }
    }, [_id]);
    
    const programModuleEnabled = React.useMemo(() => {
        if(speaker){
            return ModuleEnabled('agendas', modules)
        }else{
            return ModuleEnabled('myprograms', modules)
        }
    }, [modules,speaker]);

    React.useEffect(() => {
        if (detail?.attendee_tabs_settings) {
            // Filter and sort enabled tabs based on sort order
            const enabledTabs = detail.attendee_tabs_settings
                .filter((tab: any) => tab.status === 1)
                .sort((a: any, b: any) => a.sort_order - b.sort_order);
            console.log(enabledTabs)
            let defaultTab: string = '';
    
            // Iterate through the sorted enabled tabs and set the default tab based on conditions
            for (let i = 0; i < enabledTabs.length; i++) {
                const row = enabledTabs[i];
                if (row.tab_name === 'program' && programModuleEnabled) {
                    defaultTab = 'program';
                    break;
                } else if (row.tab_name === 'category') {
                    defaultTab = 'category';
                    break;
                } else if (row.tab_name === 'documents') {
                    defaultTab = 'documents';
                    break;
                }
                else if (row.tab_name === 'about') {
                    defaultTab = 'about';
                    break;
                } else if (
                    row.tab_name === 'groups' &&
                    (speaker ? detail?.speaker_setting?.show_group : (detail?.setting?.attendee_my_group ? response?.data?.user?.id == _id : detail?.setting?.attendee_group))
                ) {
                    defaultTab = 'groups';
                    break;
                } else if (
                    row.tab_name === 'sub_registration' &&
                    detail?.sub_registration_module_status === 1 &&
                    detail?.sub_registration &&
                    (response?.data?.user?.id === _id)
                ) {
                    defaultTab = 'sub_registration';
                    break;
                }
            }
            // Set the active tab based on the defaultTab or the first enabled tab
            setTab(defaultTab);
        }
           
    }, [detail]);
    
    
    React.useEffect(() => {
        if (mounted.current) {
            if (tab == 'program') {
                FetchPrograms({ page: 1, query: '', screen: speaker ? 'speaker-program' : 'my-program', id: Number(_id), track_id: 0 });
            } else if (tab === "groups") {
                FetchGroups({ query: '', group_id: 0, page: 1, attendee_id: Number(_id), program_id: 0 });
            } else if (tab === "documents" && ModuleEnabled('ddirectory', modules)) {
                FetchDocuments({ speaker_id: Number(_id), exhibitor_id: 0, sponsor_id: 0, agenda_id: 0 });
            }
        }
    }, [tab]);

    React.useEffect(() => {
        if (mounted.current) {
            if (tab == 'program') {
                if(page < total_pages && total_pages>1){
                    FetchPrograms({ query: '', page: page + 1, screen: speaker ? 'speaker-program' : 'my-program', id: Number(_id), track_id: 0 });
                }
            } else if (tab === "groups") {
                FetchGroups({ query: '', group_id: 0, page: page + 1, attendee_id: Number(_id), program_id: 0 });
            }
        }
    }, [scroll]);

    React.useEffect(() => {
        mounted.current = true;
        return () => { mounted.current = false; };
    }, []);
      
    const programModule = modules.find((module) => module.alias === (speaker ? "speakers" : "attendees"));
    const title = (detail.detail as any)?.first_name+' '+ (detail?.sort_field_setting.find((s:any)=>(s.name === 'last_name'))?.is_private == 0 ? (detail.detail as any)?.last_name : '');
    return (
        <>
            {in_array('attendee-detail', processing) ? (
                <SectionLoading />
            ) : (
                <>
                    <NextBreadcrumbs module={programModule} title={title}/>
                    <BasicInfoBlock detail={detail} showPrivate={response?.data?.user.id == _id ? 1 : 0} speaker={speaker} />
                    {detail?.detail?.gdpr === 1 && (
                        <>
                            {detail?.attendee_tabs_settings?.filter((tab: any, key: number) => tab?.status === 1 && tab.tab_name !== 'contact_info').length > 0 ? (
                                <Container mb="3" maxW="100%" w="100%">
                                            <HStack  style={{rowGap: 2, columnGap: 1}} mb="3" rounded={8} w={'100%'} overflow={'hidden'}  flexWrap={'wrap'}  space={0} justifyContent="flex-start" >
                                                {detail?.attendee_tabs_settings?.map((row: any, key: number) =>
                                                        
                                                    <React.Fragment key={key}>
                                                        {
                                                            (() => {
                                                                if (row?.tab_name === 'program' && row?.status == 1 && programModuleEnabled) {
                                                                    return (
                                                                        <ButtonElement minW={'calc(50% - 2px)'} onPress={() => setTab('program')} bg={tab === 'program' ? 'primary.boxbutton' : 'primary.box'} >{speaker ? (modules?.find   ((module)=>(module.alias == 'agendas'))?.name ?? 'PROGRAMS') : event?.labels?.ATTENDEE_TAB_MY_PROGRAM}
                                                                        </ButtonElement>
                                                                    )
                                                                } else if (row?.tab_name === 'category' && row?.status == 1) {
                                                                    return (
                                                                        <ButtonElement minW={'calc(50% - 2px)'} onPress={() => setTab('category')} bg={tab === 'category' ? 'primary.boxbutton' : 'primary.box'}>{event?.labels?.SPEAKER_CATEGORY}</ButtonElement>
                                                                    )
                                                                } else if (row?.tab_name === 'documents' && row?.status == 1 && ModuleEnabled('ddirectory', modules)) {
                                                                    return (
                                                                        <ButtonElement minW={'calc(50% - 2px)'} onPress={() => setTab('documents')} bg={tab === 'documents' ? 'primary.boxbutton' : 'primary.box'}>
                                                                            {modules?.find((module)=>(module.alias == 'ddirectory'))?.name ?? 'Documents'}</ButtonElement>
                                                                    )
                                                                } else if (row?.tab_name === 'about' && row?.status == 1) {
                                                                    return (
                                                                        <ButtonElement minW={'calc(50% - 2px)'} onPress={() => setTab('about')} bg={tab === 'about' ? 'primary.boxbutton' : 'primary.box'}>{event?.labels?.ATTENDEE_TAB_ABOUT}</ButtonElement>
                                                                    )
                                                                } else if (row?.tab_name === 'groups' && row?.status == 1 && (speaker ? detail?.speaker_setting?.show_group : (detail?.setting?.attendee_my_group ? response?.data?.user?.id == _id : detail?.setting?.attendee_group))) {
                                                                    return (
                                                                        <ButtonElement minW={'calc(50% - 2px)'} onPress={() => setTab('groups')} bg={tab === 'groups' ? 'primary.boxbutton' : 'primary.box'}>
                                                                            {event?.labels?.ATTENDEE_TAB_GROUP}</ButtonElement>
                                                                    )
                                                                } else if (speaker === 0 && row?.tab_name === 'sub_registration' && row?.status == 1 && detail?.sub_registration_module_status === 1 && detail?.sub_registration && (response?.data?.user?.id == _id)) {
                                                                    return (
                                                                        <ButtonElement minW={'calc(50% - 2px)'} onPress={() => setTab('sub_registration')} bg={tab === 'sub_registration' ? 'primary.boxbutton' : 'primary.box'}>
                                                                            {event?.modules_labels?.subregistration}</ButtonElement>
                                                                    )
                                                                }
                                                            })()
                                                        }
                                                    </React.Fragment>
                                                )}
                                            </HStack>
                                              
                                    {tab === 'about' && <DetailInfoBlock detail={detail} showPrivate={response?.data?.user?.id == _id ? 1 : 0} info={<RenderHtml
																									defaultTextProps={{selectable:true}}
																									contentWidth={width > 600 ? 600 : width - 90}
																									systemFonts={['Avenir']}
																									tagsStyles={mixedStyle}
																									source={{ html: detail?.detail?.info?.about! }}
																							/>} />}
                                    {tab === 'sub_registration' && detail?.sub_registration_module_status === 1 && detail?.sub_registration && (response?.data?.user?.id == _id) && <SubRegistration detail={detail} />}
                                    {tab === 'groups' &&
                                            <Container mb="3" rounded="10" bg={`${groups?.length > 0 ? "primary.box":""}`} w="100%" maxW="100%">
                                        {in_array('groups', processing) && page === 1 ? (
                                            <SectionLoading />
                                        ) : (
                                            <>
                                                { groups?.map((group: Group, k: number) =>
                                                    <React.Fragment key={`${k}`}>
                                                        <RectangleGroupView group={group} k={k} border={k} navigation={true}/>
                                                    </React.Fragment>
                                                )}
                                                        
                                                {
                                                    groups?.length <= 0 && (
                                                        <>
                                                          <NoRecordFound bg={"primary.box"}/>
                                                        </>
                                                    )
                                                }
                                            </>
                                        )}

                                    </Container>}
                                      <>
                                        {tab === 'program' && <Container mb="3" rounded="10" bg={`${programs.length > 0 ? "primary.box":""}`} w="100%" maxW="100%">
                                        {in_array('programs', processing) && page === 1 ? (
                                            <SectionLoading />
                                        ) : (
                                            programs.length > 0 ?
                                            <SlideView  speaker={speaker} section="program" programs={programs} /> 
                                                        : (
                                                            <>
                                                            <NoRecordFound bg={"primary.box"}/>
                                                            </>
                                                        )
                                        )}
                                    </Container>}
                                    </>
                                        {tab === 'category' && <Container mb="3" rounded="10" bg={`${detail?.detail?.categories.length > 0 ? "primary.box" :""}`} w="100%" maxW="100%">
                                        {detail?.detail?.categories.slice().sort((a, b) => a.sort_order - b.sort_order).map((map: any, k: number) =>
                                            <React.Fragment key={`item-box-group-${k}`}>
                                                <>
                                                {map?.name && (
                                                    <Text w="100%" pl="18px" bg="primary.darkbox">{map?.name}</Text>
                                                )}
                                                {map?.children?.map((category: Category, index: number) =>
                                                    <React.Fragment key={`${index}`}>
                                                        <RectangleCategoryView category={category} parentCategory={map} k={k} border={map?.children.length != (index + 1)} navigation={true} screen="detail" />
                                                    </React.Fragment>
                                                )}
                                                </>
                                            </React.Fragment>
                                        )}
                                        {detail?.detail?.categories.length <=0 && 
                                        (
                                            <>
                                                <NoRecordFound bg={"primary.box"}/>
                                            </>
                                            )
                                        }
                                    </Container>}
                                      <>
                                    {tab === 'documents' && <Container mb="3" rounded="10" w="100%" maxW="100%">
                                        {in_array('documents', processing) && page === 1 ? (
                                            <SectionLoading />
                                        ) : (
                                            <Box  bg="primary.box" w={'100%'} rounded="lg">
                                                <ListingLayout2 module={modules?.find((module)=>(module.alias == 'ddirectory'))?.name ?? 'DOCUMENTS'}/>
                                            </Box>
                                        )}
                                    </Container>}
                                      </>
                                    {(in_array('programs', processing) || in_array('groups', processing)) && page > 1 && (
                                        <LoadMore />
                                    )}
                                </Container>
                            ) : <>
                                  <NoRecordFound bg="primary.box"/>
                               
                                </>
                        }
                            
                            
                            <BannerAds module_name={'attendees'} module_type={'detail'} module_id={detail?.detail?.id}/>
                        </>
                    )}
                    <Box display={['','none']} w={'100%'}>
                    {((detail?.detail?.info?.facebook && detail?.field_setting?.facebook) || (detail?.detail?.info?.twitter && detail?.field_setting?.twitter) || (detail?.detail?.info?.linkedin && detail?.field_setting?.linkedin) || (detail?.detail?.info?.website && detail?.field_setting?.website) || (detail?.setting?.contact_vcf && detail?.setting?.contact_vcf)) ? <ContactInfo detail={detail} /> : null}
                    </Box>
                </>
            )}
        </>
    )

}

export default Detail