import React, { useState } from 'react'
import { Button, Container, HStack, Icon, Pressable, Spacer, Text } from 'native-base';
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

type ScreenParams = { id: string }

const { useParam } = createParam<ScreenParams>()

type Props = {
    speaker: number
}

const Detail = ({ speaker }: Props) => {

    const mounted = React.useRef(false);

    const [tab, setTab] = useState<string>('');

    const { event  } = UseEventService();

    const { FetchAttendeeDetail, detail, FetchGroups, groups } = UseAttendeeService();

    const { FetchPrograms, programs, page, id, query } = UseProgramService();

    const { FetchDocuments } = UseDocumentService();

    const { response } = UseAuthService();

    const { loading, scroll, processing } = UseLoadingService();

    const [_id] = useParam('id');
    
    const { push } = useRouter()


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

    return (
        <>
            {in_array('attendee-detail', processing) ? (
                <WebLoading />
            ) : (
                <>
                    <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                            <Pressable onPress={()=> push(`/${event.url}/${speaker ? 'speakers' : 'attendees'}`)}>
                                <HStack space="3" alignItems="center">
                                    <Icon as={AntDesign} name="arrowleft" size="xl" color="primary.text" />
                                    <Text fontSize="2xl">BACK</Text>
                                </HStack>
                            </Pressable>
                        <Spacer />
                        <Search tab={tab} />
                    </HStack>
                    <BasicInfoBlock detail={detail} showPrivate={response?.data?.user.id == _id ? 1 : 0} speaker={speaker} />
                    {detail?.detail?.gdpr === 1 && (
                        <>
                            {detail?.attendee_tabs_settings?.filter((tab: any, key: number) => tab?.status === 1).length > 0 && (
                                <Container mb="3" maxW="100%" w="100%">
                                    <HStack mb="3" rounded={8} overflow={'hidden'}  space={1} justifyContent="center" w="100%">
                                        {detail?.attendee_tabs_settings?.map((row: any, key: number) =>
                                            <React.Fragment key={key}>
                                                {
                                                    (() => {
                                                        if (row?.tab_name === 'program' && row?.status == 1) {
                                                            return (
                                                                <Button fontSize={['sm','md']} flex={1} onPress={() => setTab('program')} borderWidth="1px" py={0} borderColor="primary.darkbox" rounded={0} h="42px" bg={tab === 'program' ? 'primary.darkbox' : 'primary.box'} _text={{ fontWeight: '600', fontSize: 'inherit' }}>{speaker ? 'PROGRAMS' : 'MY PROGRAMS'}</Button>
                                                            )
                                                        } else if (row?.tab_name === 'category' && row?.status == 1) {
                                                            return (
                                                                <Button fontSize={['sm','md']} flex={1} onPress={() => setTab('category')} borderWidth="1px" py={0} borderColor="primary.darkbox" rounded={0} h="42px" bg={tab === 'category' ? 'primary.darkbox' : 'primary.box'} _text={{ fontWeight: '600', fontSize: 'inherit' }}>CATEGORIES</Button>
                                                            )
                                                        } else if (row?.tab_name === 'documents' && row?.status == 1) {
                                                            return (
                                                                <Button fontSize={['sm','md']} flex={1} onPress={() => setTab('documents')} borderWidth="1px" py={0} borderColor="primary.darkbox" rounded={0} h="42px" bg={tab === 'documents' ? 'primary.darkbox' : 'primary.box'} _text={{ fontWeight: '600', fontSize: 'inherit' }}>DOCUMENTS</Button>
                                                            )
                                                        } else if (row?.tab_name === 'contact_info' && row?.status == 1 && ((detail?.detail?.info?.facebook && detail?.field_setting?.facebook) || (detail?.detail?.info?.twitter && detail?.field_setting?.twitter) || (detail?.detail?.info?.linkedin && detail?.field_setting?.linkedin) || (detail?.detail?.info?.website && detail?.field_setting?.website))) {
                                                            return (
                                                                <Button fontSize={['sm','md']} flex={1} onPress={() => setTab('contact_info')} borderWidth="1px" py={0} borderColor="primary.darkbox" rounded={0} h="42px" bg={tab === 'contact_info' ? 'primary.darkbox' : 'primary.box'} _text={{ fontWeight: '600', fontSize: 'inherit' }}>CONTACT INFO</Button>
                                                            )
                                                        } else if (row?.tab_name === 'about' && row?.status == 1) {
                                                            return (
                                                                <Button fontSize={['sm','md']} flex={1} onPress={() => setTab('about')} borderWidth="1px" py={0} borderColor="primary.darkbox" rounded={0} h="42px" bg={tab === 'about' ? 'primary.darkbox' : 'primary.box'} _text={{ fontWeight: '600', fontSize: 'inherit' }}>ABOUT</Button>
                                                            )
                                                        } else if (row?.tab_name === 'groups' && row?.status == 1 && ((detail?.setting?.attendee_my_group === 1 && Number(_id) === response?.data?.user?.id) || ((detail?.is_speaker && detail?.speaker_setting?.show_group) || (!detail?.is_speaker && detail?.setting?.attendee_group)))) {
                                                            return (
                                                                <Button fontSize={['sm','md']} flex={1} onPress={() => setTab('groups')} borderRadius="0" borderWidth="1px" py={0} borderColor="primary.darkbox"  rounded={0}h="42px" bg={tab === 'groups' ? 'primary.darkbox' : 'primary.box'} _text={{ fontWeight: '600', fontSize: 'inherit' }}>GROUPS</Button>
                                                            )
                                                        } else if (speaker === 0 && row?.tab_name === 'sub_registration' && row?.status == 1 && detail?.sub_registration_module_status === 1 && detail?.sub_registration && (response?.data?.user?.id == _id)) {
                                                            return (
                                                                <Button fontSize={['sm','md']} flex={1} onPress={() => setTab('sub_registration')} borderRadius="0" borderWidth="1px" py={0} borderColor="primary.darkbox"  rounded={0}h="42px" bg={tab === 'sub_registration' ? 'primary.darkbox' : 'primary.box'} _text={{ fontWeight: '600', fontSize: 'inherit' }}>SUB REGISTRATION</Button>
                                                            )
                                                        }
                                                    })()
                                                }
                                            </React.Fragment>
                                        )}
                                    </HStack>
                                              
                                    {tab === 'about' && <DetailInfoBlock detail={detail} showPrivate={response?.data?.user?.id == _id ? 1 : 0} info={<div dangerouslySetInnerHTML={{ __html: detail?.detail?.info?.about! }}></div>} />}
                                    {tab === 'contact_info' && ((detail?.detail?.info?.facebook && detail?.field_setting?.facebook) || (detail?.detail?.info?.twitter && detail?.field_setting?.twitter) || (detail?.detail?.info?.linkedin && detail?.field_setting?.linkedin) || (detail?.detail?.info?.website && detail?.field_setting?.website)) && <ContactInfo detail={detail} />}
                                    {tab === 'sub_registration' && detail?.sub_registration_module_status === 1 && detail?.sub_registration && (response?.data?.user?.id == _id) && <SubRegistration detail={detail} />}
                                    {tab === 'groups' && ((detail?.setting?.attendee_my_group === 1 && Number(_id) === response?.data?.user?.id) || ((detail?.is_speaker && detail?.speaker_setting?.show_group) || (!detail?.is_speaker && detail?.setting?.attendee_group))) && <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                                        {in_array('groups', processing) && page === 1 ? (
                                            <SectionLoading />
                                        ) : (
                                            <>
                                                {groups?.map((group: Group, k: number) =>
                                                    <React.Fragment key={`${k}`}>
                                                        <RectangleGroupView group={group} k={k} border={groups.length > 0 && groups[groups.length - 1]?.id !== group?.id ? 1 : 0} navigation={true} />
                                                    </React.Fragment>
                                                )}
                                                        
                                                {
                                                    groups?.length <= 0 && (
                                                        <Text w="100%" pl="18px" bg="primary.darkbox">{event.labels.EVENT_NORECORD_FOUND}</Text>
                                                    )
                                                }
                                            </>
                                        )}

                                    </Container>}
                                    {tab === 'program' && <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                                        {in_array('programs', processing) && page === 1 ? (
                                            <SectionLoading />
                                        ) : (
                                            programs.length > 0 ? 
                                            <SlideView  speaker={speaker} section="program" programs={programs} /> :
                                            <Text fontSize="18px">{event.labels.EVENT_NORECORD_FOUND}</Text>
                                        )}
                                    </Container>}
                                    {tab === 'category' && <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
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
                                        {detail?.detail?.categories.length <=0 && 
                                        <Text fontSize="18px">{event.labels.EVENT_NORECORD_FOUND}</Text>}
                                    </Container>}
                                    {tab === 'documents' && <Container mb="3" rounded="10" w="100%" maxW="100%">
                                        {in_array('documents', processing) && page === 1 ? (
                                            <SectionLoading />
                                        ) : (
                                            <ListingLayout2 />
                                        )}
                                    </Container>}
                                    {(in_array('programs', processing) || in_array('groups', processing)) && page > 1 && (
                                        <LoadMore />
                                    )}
                                </Container>
                            )}
                        </>
                    )}
                </>
            )}
        </>
    )

}

export default Detail