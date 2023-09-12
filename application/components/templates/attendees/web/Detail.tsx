import React, { useState } from 'react'
import { Button, Container, HStack, Icon, Spacer, Text } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import Search from 'application/components/atoms/Search';
import BasicInfoBlock from 'application/components/atoms/attendees/detail/BasicInfoBlock';
import SubRegistration from 'application/components/atoms/attendees/SubRegistration';
import DetailInfoBlock from 'application/components/atoms/attendees/detail/web/DetailInfoBlock';
import RectangleGroupView from 'application/components/atoms/attendees/groups/RectangleView';
import SlideView from 'application/components/molecules/programs/SlideView';
import WebLoading from 'application/components/atoms/WebLoading';
import { createParam } from 'solito';
import UseAttendeeService from 'application/store/services/UseAttendeeService';
import UseProgramService from 'application/store/services/UseProgramService';
import UseLoadingService from 'application/store/services/UseLoadingService';

type ScreenParams = { id: string, cms: string | undefined }

const { useParam } = createParam<ScreenParams>()

const Detail = () => {

    const [tab, setTab] = useState<string>('');

    const { FetchAttendeeDetail, detail } = UseAttendeeService();

    const { FetchMyPrograms, programs } = UseProgramService();

    const { loading } = UseLoadingService();

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
        if (tab == 'program') {
            FetchMyPrograms({ page: 1, query: '', screen: 'my-program' });
        }
    }, [tab]);

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
                        <Search />
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
                                                                <Button onPress={() => setTab('program')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius={detail?.attendee_tabs_settings[detail?.attendee_tabs_settings?.length - 1]?.tab_name === 'program' ? 8 : 0} borderLeftRadius={detail?.attendee_tabs_settings[0]?.tab_name === 'program' ? 8 : 0} h="42px" bg={tab === 'program' ? 'primary.darkbox' : 'primary.box'} w="24%" _text={{ fontWeight: '600' }}>MY PROGRAMS</Button>
                                                            )
                                                        } else if (row?.tab_name === 'about' && row?.status == 1) {
                                                            return (
                                                                <Button onPress={() => setTab('about')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius={detail?.attendee_tabs_settings[detail?.attendee_tabs_settings?.length - 1]?.tab_name === 'about' ? 8 : 0} borderLeftRadius={detail?.attendee_tabs_settings[0]?.tab_name === 'about' ? 8 : 0} h="42px" bg={tab === 'about' ? 'primary.darkbox' : 'primary.box'} w="24%" _text={{ fontWeight: '600' }}>ABOUT</Button>
                                                            )
                                                        } else if (row?.tab_name === 'groups' && row?.status == 1) {
                                                            return (
                                                                <Button onPress={() => setTab('groups')} borderRadius="0" borderWidth="1px" py={0} borderColor="primary.darkbox" borderLeftRadius={detail?.attendee_tabs_settings[0]?.tab_name === 'groups' ? 8 : 0} borderRightRadius={detail?.attendee_tabs_settings[detail?.attendee_tabs_settings?.length - 1]?.tab_name === 'groups' ? 8 : 0} h="42px" bg={tab === 'groups' ? 'primary.darkbox' : 'primary.box'} w="24%" _text={{ fontWeight: '600' }}>GROUPS</Button>
                                                            )
                                                        } else if (row?.tab_name === 'sub_registration' && row?.status == 1 && detail?.sub_registration_module_status === 1 && detail?.show_sub_registraiton === 1) {
                                                            return (
                                                                <Button onPress={() => setTab('sub_registration')} borderRadius="0" borderWidth="1px" py={0} borderColor="primary.darkbox" borderLeftRadius={detail?.attendee_tabs_settings[0]?.tab_name === 'sub_registration' ? 8 : 0} borderRightRadius={detail?.attendee_tabs_settings[detail?.attendee_tabs_settings?.length - 1]?.tab_name === 'sub_registration' ? 8 : 0} h="42px" bg={tab === 'sub_registration' ? 'primary.darkbox' : 'primary.box'} w="24%" _text={{ fontWeight: '600' }}>SUB REGISTRATION</Button>
                                                            )
                                                        }
                                                    })()
                                                }
                                            </React.Fragment>
                                        )}
                                    </HStack>
                                    {tab === 'about' && <DetailInfoBlock detail={detail} />}
                                    {tab === 'sub_registration' && <SubRegistration detail={detail} />}
                                    {tab === 'groups' && <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                                        {[...Array(7)].map((item, k) =>
                                            <React.Fragment key={`item-box-group-${k}`}>
                                                {/* <RectangleGroupView k={k} /> */}
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