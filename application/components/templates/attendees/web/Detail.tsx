import React, { useState } from 'react'
import { Button, Container, HStack, Icon, Spacer, Text } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import Search from 'application/components/atoms/programs/Search';
import BasicInfoBlock from 'application/components/atoms/attendees/detail/BasicInfoBlock';
import ContactInfo from 'application/components/atoms/attendees/detail/ContactInfo';
import SubRegistration from 'application/components/atoms/sub_registration/RectangleView';
import DetailInfoBlock from 'application/components/atoms/attendees/detail/web/DetailInfoBlock';
import RectangleGroupView from 'application/components/atoms/attendees/groups/RectangleView';
import SlideView from 'application/components/molecules/programs/SlideView';
import WebLoading from 'application/components/atoms/WebLoading';
import { createParam } from 'solito';
import UseAttendeeService from 'application/store/services/UseAttendeeService';
import UseProgramService from 'application/store/services/UseProgramService';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseAuthService from 'application/store/services/UseAuthService';
import GroupAlphabatically from 'application/utils/GroupAlphabatically';
import { Group } from 'application/models/attendee/Group';

type ScreenParams = { id: string, cms: string | undefined }

const { useParam } = createParam<ScreenParams>()

const Detail = () => {

    const mounted = React.useRef(false);

    const [tab, setTab] = useState<string>('');

    const { FetchAttendeeDetail, detail, FetchGroups, groups } = UseAttendeeService();

    const { FetchMyPrograms, programs, page } = UseProgramService();

    const { response } = UseAuthService();

    const { loading, scroll } = UseLoadingService();

    const [id] = useParam('id');

    React.useEffect(() => {
        if (id) {
            FetchAttendeeDetail({ id: Number(id) });
        }
    }, [id]);

    React.useEffect(() => {
        if (detail?.attendee_tabs_settings?.filter((tab: any, key: number) => tab?.status === 1).length > 0) {
            setTab(detail?.attendee_tabs_settings?.filter((tab: any, key: number) => tab?.status === 1)[0]?.tab_name!)
        }
    }, [detail]);

    React.useEffect(() => {
        if (mounted.current) {
            if (tab == 'program') {
                FetchMyPrograms({ page: 1, query: '', screen: 'my-program' });
            } else if (tab === "groups") {
                FetchGroups({ query: '', group_id: 0, page: 1, attendee_id: Number(id) });
            }
        }
    }, [tab]);

    React.useEffect(() => {
        if (mounted.current) {
            if (tab == 'program') {
                FetchMyPrograms({ query: '', page: page + 1, screen: 'my-program' });
            } else if (tab === "groups") {
                FetchGroups({ query: '', group_id: 0, page: page + 1, attendee_id: Number(id) });
            }
        }
    }, [scroll]);

    React.useEffect(() => {
        mounted.current = true;
        return () => { mounted.current = false; };
    }, []);

    return (
        <>
            {loading && Object.keys(detail)?.length === 0 ? (
                <WebLoading />
            ) : (
                <>
                    <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                        <HStack space="3" alignItems="center">
                            <Icon as={AntDesign} name="arrowleft" size="xl" color="primary.text" />
                            <Text fontSize="2xl">BACK</Text>
                        </HStack>
                        <Spacer />
                        <Search tab={tab} />
                    </HStack>
                    <BasicInfoBlock detail={detail} />
                    {detail?.detail?.gdpr === 1 && (
                        <>
                            {detail?.attendee_tabs_settings?.filter((tab: any, key: number) => tab?.status === 1).length > 0 && (
                                <Container mb="3" maxW="100%" w="100%">
                                    <HStack mb="3" space={1} justifyContent="center" w="100%">
                                        {detail?.attendee_tabs_settings?.map((row: any, key: number) =>
                                            <React.Fragment key={key}>
                                                {
                                                    (() => {
                                                        if (row?.tab_name === 'program' && row?.status == 1) {
                                                            return (
                                                                <Button onPress={() => setTab('program')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius={detail?.attendee_tabs_settings[detail?.attendee_tabs_settings?.length - 1]?.tab_name === 'program' ? 8 : 0} borderLeftRadius={detail?.attendee_tabs_settings[0]?.tab_name === 'program' ? 8 : 0} h="42px" bg={tab === 'program' ? 'primary.darkbox' : 'primary.box'} w="22%" _text={{ fontWeight: '600' }}>MY PROGRAMS</Button>
                                                            )
                                                        } else if (row?.tab_name === 'contact_info' && row?.status == 1 && ((detail?.detail?.info?.facebook && detail?.field_setting?.facebook) || (detail?.detail?.info?.twitter && detail?.field_setting?.twitter) || (detail?.detail?.info?.linkedin && detail?.field_setting?.linkedin) || (detail?.detail?.info?.website && detail?.field_setting?.website))) {
                                                            return (
                                                                <Button onPress={() => setTab('contact_info')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius={detail?.attendee_tabs_settings[detail?.attendee_tabs_settings?.length - 1]?.tab_name === 'contact_info' ? 8 : 0} borderLeftRadius={detail?.attendee_tabs_settings[0]?.tab_name === 'contact_info' ? 8 : 0} h="42px" bg={tab === 'contact_info' ? 'primary.darkbox' : 'primary.box'} w="20%" _text={{ fontWeight: '600' }}>CONTACT INFO</Button>
                                                            )
                                                        } else if (row?.tab_name === 'about' && row?.status == 1) {
                                                            return (
                                                                <Button onPress={() => setTab('about')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius={detail?.attendee_tabs_settings[detail?.attendee_tabs_settings?.length - 1]?.tab_name === 'about' ? 8 : 0} borderLeftRadius={detail?.attendee_tabs_settings[0]?.tab_name === 'about' ? 8 : 0} h="42px" bg={tab === 'about' ? 'primary.darkbox' : 'primary.box'} w="15%" _text={{ fontWeight: '600' }}>ABOUT</Button>
                                                            )
                                                        } else if (row?.tab_name === 'groups' && row?.status == 1 && ((detail?.setting?.attendee_my_group === 1 && id === response?.data?.user?.id) || ((detail?.is_speaker && detail?.speaker_setting?.show_group) || (!detail?.is_speaker && detail?.setting?.attendee_group)))) {
                                                            return (
                                                                <Button onPress={() => setTab('groups')} borderRadius="0" borderWidth="1px" py={0} borderColor="primary.darkbox" borderLeftRadius={detail?.attendee_tabs_settings[0]?.tab_name === 'groups' ? 8 : 0} borderRightRadius={detail?.attendee_tabs_settings[detail?.attendee_tabs_settings?.length - 1]?.tab_name === 'groups' ? 8 : 0} h="42px" bg={tab === 'groups' ? 'primary.darkbox' : 'primary.box'} w="15%" _text={{ fontWeight: '600' }}>GROUPS</Button>
                                                            )
                                                        } else if (row?.tab_name === 'sub_registration' && row?.status == 1 && detail?.sub_registration_module_status === 1 && detail?.sub_registration) {
                                                            return (
                                                                <Button onPress={() => setTab('sub_registration')} borderRadius="0" borderWidth="1px" py={0} borderColor="primary.darkbox" borderLeftRadius={detail?.attendee_tabs_settings[0]?.tab_name === 'sub_registration' ? 8 : 0} borderRightRadius={detail?.attendee_tabs_settings[detail?.attendee_tabs_settings?.length - 1]?.tab_name === 'sub_registration' ? 8 : 0} h="42px" bg={tab === 'sub_registration' ? 'primary.darkbox' : 'primary.box'} w="25%" _text={{ fontWeight: '600' }}>SUB REGISTRATION</Button>
                                                            )
                                                        }
                                                    })()
                                                }
                                            </React.Fragment>
                                        )}
                                    </HStack>
                                    {tab === 'about' && <DetailInfoBlock detail={detail} />}
                                    {tab === 'contact_info' && ((detail?.detail?.info?.facebook && detail?.field_setting?.facebook) || (detail?.detail?.info?.twitter && detail?.field_setting?.twitter) || (detail?.detail?.info?.linkedin && detail?.field_setting?.linkedin) || (detail?.detail?.info?.website && detail?.field_setting?.website)) && <ContactInfo detail={detail} />}
                                    {tab === 'sub_registration' && detail?.sub_registration_module_status === 1 && detail?.sub_registration && <SubRegistration detail={detail} />}
                                    {tab === 'groups' && ((detail?.setting?.attendee_my_group === 1 && id === response?.data?.user?.id) || ((detail?.is_speaker && detail?.speaker_setting?.show_group) || (!detail?.is_speaker && detail?.setting?.attendee_group))) && <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                                        {GroupAlphabatically(groups, 'info').map((map: any, k: number) =>
                                            <React.Fragment key={`item-box-group-${k}`}>
                                                {map?.letter && (
                                                    <Text w="100%" pl="18px" bg="primary.darkbox">{map?.letter}</Text>
                                                )}
                                                {map?.records?.map((group: Group, k: number) =>
                                                    <React.Fragment key={`${k}`}>
                                                        <RectangleGroupView group={group} k={k} border={groups.length > 0 && groups[groups.length - 1]?.id !== group?.id ? 1 : 0} />
                                                    </React.Fragment>
                                                )}
                                            </React.Fragment>
                                        )}
                                    </Container>}
                                    {tab === 'program' && <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                                        <SlideView section="program" programs={programs} />
                                    </Container>}
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