import React, { useState } from 'react'
import { Button, Container, HStack, Icon, ScrollView, Spacer, Text, FlatList } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import Search from 'application/components/atoms/programs/Search';
import BasicInfoBlock from 'application/components/atoms/attendees/detail/BasicInfoBlock';
import ContactInfo from 'application/components/atoms/attendees/detail/ContactInfo';
import SubRegistration from 'application/components/atoms/subRegistration/RectangleView';
import DetailInfoBlock from 'application/components/atoms/attendees/detail/web/DetailInfoBlock';
import RectangleGroupView from 'application/components/atoms/attendees/groups/RectangleView';
import RectangleCategoryView from 'application/components/atoms/attendees/categories/RectangleView';
import SlideView from 'application/components/molecules/programs/SlideView';
import MobileLoading from 'application/components/atoms/MobileLoading';
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
import { useWindowDimensions } from 'react-native';

type ScreenParams = { id: string }

const { useParam } = createParam<ScreenParams>()

type Props = {
    speaker: number
}

const Detail = ({ speaker }: Props) => {

    const RenderHtml = require('react-native-render-html').default;

    const { width } = useWindowDimensions();

    const mounted = React.useRef(false);

    const [tab, setTab] = useState<string>('');

    const { FetchAttendeeDetail, detail, FetchGroups, groups } = UseAttendeeService();

    const { FetchPrograms, programs, page, id, query } = UseProgramService();

    const { FetchDocuments } = UseDocumentService();

    const { response } = UseAuthService();

    const { loading, scroll, processing, setScrollCounter } = UseLoadingService();

    const [_id] = useParam('id');

    React.useEffect(() => {
        if (_id) {
            FetchAttendeeDetail({ id: Number(_id), speaker: speaker! });
        }
    }, [_id]);

    React.useEffect(() => {
        if (detail?.attendee_tabs_settings?.filter((tab: any, key: number) => tab?.status === 1).length > 0) {
            setTab(detail?.attendee_tabs_settings?.filter((tab: any, key: number) => tab?.status === 1)[0]?.tab_name!)
        }
    }, [detail]);

    React.useEffect(() => {
        if (mounted.current) {
            if (tab == 'program') {
                FetchPrograms({ page: 1, query: '', screen: speaker ? 'speaker-program' : 'my-program', id: Number(_id), track_id: 0 });
            } else if (tab === "groups") {
                FetchGroups({ query: '', group_id: 0, page: 1, attendee_id: Number(_id), program_id: 0 });
            } else if (tab === "documents") {
                FetchDocuments({ speaker_id: Number(_id), exhibitor_id: 0, sponsor_id: 0, agenda_id: 0 });
            }
        }
    }, [tab]);

    React.useEffect(() => {
        if (mounted.current) {
            if (tab == 'program') {
                FetchPrograms({ query: '', page: page + 1, screen: speaker ? 'speaker-program' : 'my-program', id: Number(_id), track_id: 0 });
            } else if (tab === "groups") {
                FetchGroups({ query: '', group_id: 0, page: page + 1, attendee_id: Number(_id), program_id: 0 });
            }
        }
    }, [scroll]);

    React.useEffect(() => {
        mounted.current = true;
        return () => { mounted.current = false; };
    }, []);

    const totalGroups = (groups: any) => {
        let total = 0;
        groups.forEach((group: any) => total += group?.records?.length);
        return total;
    }

    return (
        <Container pt="2" maxW="100%" h={'100%'} w="100%">
            {in_array('attendee-detail', processing) ? (
                <MobileLoading />
            ) : (
                <>
                    <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                        <Search tab={tab} w='100%' />
                    </HStack>
                    <BasicInfoBlock detail={detail} />
                    {detail?.detail?.gdpr === 1 && (
                        <>
                            {detail?.attendee_tabs_settings?.filter((tab: any, key: number) => tab?.status === 1).length > 0 && (
                                <Container mb="3" maxW="100%" w="100%">
                                    <HStack mb="3" space={1} justifyContent="center" w="100%">
                                        <ScrollView w={'100%'} horizontal={true}>
                                            {detail?.attendee_tabs_settings?.map((row: any, key: number) =>
                                                <React.Fragment key={key}>
                                                    {
                                                        (() => {
                                                            if (row?.tab_name === 'program' && row?.status == 1) {
                                                                return (
                                                                    <Button onPress={() => setTab('program')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius={detail?.attendee_tabs_settings[detail?.attendee_tabs_settings?.length - 1]?.tab_name === 'program' ? 8 : 0} borderLeftRadius={detail?.attendee_tabs_settings[0]?.tab_name === 'program' ? 8 : 0} h="42px" bg={tab === 'program' ? 'primary.boxbutton' : 'primary.box'} _text={{ fontWeight: '600' }}>{speaker ? 'PROGRAMS' : 'MY PROGRAMS'}</Button>
                                                                )
                                                            } else if (row?.tab_name === 'category' && row?.status == 1) {
                                                                return (
                                                                    <Button onPress={() => setTab('category')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius={detail?.attendee_tabs_settings[detail?.attendee_tabs_settings?.length - 1]?.tab_name === 'category' ? 8 : 0} borderLeftRadius={detail?.attendee_tabs_settings[0]?.tab_name === 'category' ? 8 : 0} h="42px" bg={tab === 'category' ? 'primary.boxbutton' : 'primary.box'} _text={{ fontWeight: '600' }}>CATEGORIES</Button>
                                                                )
                                                            } else if (row?.tab_name === 'documents' && row?.status == 1) {
                                                                return (
                                                                    <Button onPress={() => setTab('documents')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius={detail?.attendee_tabs_settings[detail?.attendee_tabs_settings?.length - 1]?.tab_name === 'documents' ? 8 : 0} borderLeftRadius={detail?.attendee_tabs_settings[0]?.tab_name === 'documents' ? 8 : 0} h="42px" bg={tab === 'documents' ? 'primary.boxbutton' : 'primary.box'} _text={{ fontWeight: '600' }}>DOCUMENTS</Button>
                                                                )
                                                            } else if (row?.tab_name === 'contact_info' && row?.status == 1 && ((detail?.detail?.info?.facebook && detail?.field_setting?.facebook) || (detail?.detail?.info?.twitter && detail?.field_setting?.twitter) || (detail?.detail?.info?.linkedin && detail?.field_setting?.linkedin) || (detail?.detail?.info?.website && detail?.field_setting?.website))) {
                                                                return (
                                                                    <Button onPress={() => setTab('contact_info')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius={detail?.attendee_tabs_settings[detail?.attendee_tabs_settings?.length - 1]?.tab_name === 'contact_info' ? 8 : 0} borderLeftRadius={detail?.attendee_tabs_settings[0]?.tab_name === 'contact_info' ? 8 : 0} h="42px" bg={tab === 'contact_info' ? 'primary.boxbutton' : 'primary.box'} _text={{ fontWeight: '600' }}>CONTACT INFO</Button>
                                                                )
                                                            } else if (row?.tab_name === 'about' && row?.status == 1) {
                                                                return (
                                                                    <Button onPress={() => setTab('about')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius={detail?.attendee_tabs_settings[detail?.attendee_tabs_settings?.length - 1]?.tab_name === 'about' ? 8 : 0} borderLeftRadius={detail?.attendee_tabs_settings[0]?.tab_name === 'about' ? 8 : 0} h="42px" bg={tab === 'about' ? 'primary.boxbutton' : 'primary.box'} _text={{ fontWeight: '600' }}>ABOUT</Button>
                                                                )
                                                            } else if (row?.tab_name === 'groups' && row?.status == 1 && ((detail?.setting?.attendee_my_group === 1 && Number(_id) === response?.data?.user?.id) || ((detail?.is_speaker && detail?.speaker_setting?.show_group) || (!detail?.is_speaker && detail?.setting?.attendee_group)))) {
                                                                return (
                                                                    <Button onPress={() => setTab('groups')} borderRadius="0" borderWidth="1px" py={0} borderColor="primary.darkbox" borderLeftRadius={detail?.attendee_tabs_settings[0]?.tab_name === 'groups' ? 8 : 0} borderRightRadius={detail?.attendee_tabs_settings[detail?.attendee_tabs_settings?.length - 1]?.tab_name === 'groups' ? 8 : 0} h="42px" bg={tab === 'groups' ? 'primary.boxbutton' : 'primary.box'} _text={{ fontWeight: '600' }}>GROUPS</Button>
                                                                )
                                                            } else if (speaker === 0 && row?.tab_name === 'sub_registration' && row?.status == 1 && detail?.sub_registration_module_status === 1 && detail?.sub_registration) {
                                                                return (
                                                                    <Button onPress={() => setTab('sub_registration')} borderRadius="0" borderWidth="1px" py={0} borderColor="primary.darkbox" borderLeftRadius={detail?.attendee_tabs_settings[0]?.tab_name === 'sub_registration' ? 8 : 0} borderRightRadius={detail?.attendee_tabs_settings[detail?.attendee_tabs_settings?.length - 1]?.tab_name === 'sub_registration' ? 8 : 0} h="42px" bg={tab === 'sub_registration' ? 'primary.boxbutton' : 'primary.box'} _text={{ fontWeight: '600' }}>SUB REGISTRATION</Button>
                                                                )
                                                            }
                                                        })()
                                                    }
                                                </React.Fragment>
                                            )}
                                        </ScrollView>
                                    </HStack>
                                    <Container mb="3" rounded="10" bg={!in_array(tab, ["documents"]) ? 'primary.box' : '0'} w="100%" h={'57%'} maxW="100%">
                                        {((in_array('groups', processing) || in_array('programs', processing) || in_array('documents', processing)) && page === 1) ? (
                                            <SectionLoading h={'100%'} />
                                        ) : (
                                            <>
                                                {tab === 'about' && (
                                                    <ScrollView w={'100%'}>
                                                        <DetailInfoBlock detail={detail} info={<RenderHtml contentWidth={width} source={{ html: detail?.detail?.info?.about! }} />} />
                                                    </ScrollView>
                                                )}
                                                {tab === 'contact_info' && ((detail?.detail?.info?.facebook && detail?.field_setting?.facebook) || (detail?.detail?.info?.twitter && detail?.field_setting?.twitter) || (detail?.detail?.info?.linkedin && detail?.field_setting?.linkedin) || (detail?.detail?.info?.website && detail?.field_setting?.website)) && <ContactInfo detail={detail} />}
                                                {tab === 'sub_registration' && detail?.sub_registration_module_status === 1 && detail?.sub_registration && <SubRegistration detail={detail} />}
                                                {tab === 'groups' && ((detail?.setting?.attendee_my_group === 1 && Number(_id) === response?.data?.user?.id) || ((detail?.is_speaker && detail?.speaker_setting?.show_group) || (!detail?.is_speaker && detail?.setting?.attendee_group))) && groups?.length > 0 &&
                                                    <FlatList
                                                        style={{ width: '100%' }}
                                                        data={GroupAlphabatically(groups, 'info')}
                                                        renderItem={({ item }: any) => {
                                                            return (
                                                                <>
                                                                    {item?.letter && (
                                                                        <Text w="100%" pl="18px" bg="primary.darkbox">{item?.letter}</Text>
                                                                    )}
                                                                    {item?.records?.map((group: Group, k: number) =>
                                                                        <React.Fragment key={`${k}`}>
                                                                            <RectangleGroupView group={group} k={k} border={k} navigation={true} />
                                                                        </React.Fragment>
                                                                    )}
                                                                </>
                                                            );
                                                        }}
                                                        keyExtractor={item => item.letter.toString()}
                                                        onEndReached={async () => {
                                                            if (totalGroups(GroupAlphabatically(groups, 'info')) > 20) {
                                                                setScrollCounter(scroll + 1);
                                                            }
                                                        }}
                                                        onEndReachedThreshold={0.1}
                                                    />
                                                }
                                                {tab === 'program' && programs?.length > 0 &&
                                                    <SlideView section="program" programs={programs} />
                                                }
                                                {tab === 'category' &&
                                                    <ScrollView w={'100%'}>
                                                        {detail?.detail?.categories.map((map: any, k: number) =>
                                                            <React.Fragment key={`item-box-group-${k}`}>
                                                                {map?.name && (
                                                                    <Text w="100%" pl="18px" bg="primary.darkbox">{map?.name}</Text>
                                                                )}
                                                                {map?.children?.map((category: Category, index: number) =>
                                                                    <React.Fragment key={`${index}`}>
                                                                        <RectangleCategoryView category={category} k={k} border={map?.children.length != (index + 1)} navigation={true} screen="detail" />
                                                                    </React.Fragment>
                                                                )}
                                                            </React.Fragment>
                                                        )}
                                                    </ScrollView>
                                                }
                                                {tab === 'documents' &&
                                                    <ListingLayout2 />
                                                }
                                            </>
                                        )}
                                        {(in_array('programs', processing) || in_array('groups', processing)) && page > 1 && (
                                            <LoadMore />
                                        )}
                                    </Container>
                                </Container>
                            )}
                        </>
                    )}
                </>
            )}
        </Container>
    )

}

export default Detail