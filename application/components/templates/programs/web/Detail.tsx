import React, { useState } from 'react'

import { Box, Button, Container, HStack, Icon, Pressable, Spacer, Text, VStack, Image } from 'native-base';

import DetailBlock from 'application/components/atoms/programs/DetailBlock';

import SpeakerRectangleView from 'application/components/atoms/speakers/RectangleView'

import PollRectangleView from 'application/components/atoms/polls/RectangleView'

import IcoRaiseHand from 'application/assets/icons/IcoRaiseHand'

import DynamicIcon from 'application/utils/DynamicIcon';

import { createParam } from 'solito';

import UseProgramService from 'application/store/services/UseProgramService';

import UseEventService from 'application/store/services/UseEventService';

import UseAuthService from 'application/store/services/UseAuthService';

import { useRouter } from 'solito/router'

import { Attendee } from 'application/models/attendee/Attendee';

import RequestToSpeakRectangleView from 'application/components/atoms/request_to_speak/RectangleView'

import UseAttendeeService from 'application/store/services/UseAttendeeService';

import GroupAlphabatically from 'application/utils/GroupAlphabatically';

import SectionLoading from 'application/components/atoms/SectionLoading';

import RectangleAttendeeView from 'application/components/atoms/attendees/RectangleView';

import UseLoadingService from 'application/store/services/UseLoadingService';

import in_array from "in_array";

import LoadMore from 'application/components/atoms/LoadMore';

import RectangleGroupView from 'application/components/atoms/attendees/groups/RectangleView';

import UseDocumentService from 'application/store/services/UseDocumentService';

import { Group } from 'application/models/attendee/Group';

import AntDesign from '@expo/vector-icons/AntDesign';

import ListingLayout2 from 'application/components/molecules/documents/ListingLayout2';
import WebLoading from 'application/components/atoms/WebLoading';

import UseBannerService from 'application/store/services/UseBannerService';
import { Banner } from 'application/models/Banner'
import UseEnvService from 'application/store/services/UseEnvService';

type ScreenParams = { id: string }

const { useParam } = createParam<ScreenParams>()

const Detail = () => {

    const { scroll, processing } = UseLoadingService();

    const [tab, setTab] = useState<string>('about');

    const mounted = React.useRef(false);

    const { FetchProgramDetail, detail } = UseProgramService();

    const [_id] = useParam('id');

    const { event, modules } = UseEventService();

    const { response } = UseAuthService();

    const { push, back } = useRouter()

    const { attendees, FetchAttendees, query, page, FetchGroups, groups, group_id, group_name, category_id, FetchCategories, categories, category_name } = UseAttendeeService();

    const { FetchDocuments } = UseDocumentService();

    const { _env } = UseEnvService();

    const { banners, FetchBanners } = UseBannerService();

    const [filteredBanner, setFilteredBanner] = React.useState<Banner[]>([]);

    React.useEffect(() => {
        if (mounted.current) {
            if (in_array(tab, ['attendee'])) {
                FetchAttendees({ query: query, group_id: group_id, page: page + 1, my_attendee_id: 0, speaker: 0, category_id: category_id, screen: 'program-attendees', program_id: Number(_id) });
            }
        }
    }, [scroll]);

    React.useEffect(() => {
        if (mounted.current) {
            if (tab === "group") {
                FetchGroups({ query: query, group_id: 0, page: 1, attendee_id: 0, program_id: Number(_id) });
            } else if (in_array(tab, ['attendee'])) {
                FetchAttendees({ query: query, group_id: 0, page: 1, my_attendee_id: 0, speaker: 0, category_id: category_id, screen: 'program-attendees', program_id: Number(_id) });
            } else if (tab === "documents") {
                FetchDocuments({ speaker_id: 0, exhibitor_id: 0, sponsor_id: 0, agenda_id: Number(_id) });
            }
        }
    }, [tab]);

    React.useEffect(() => {
        if (_id) {
            FetchProgramDetail({ id: Number(_id) });
        }
    }, [_id]);

    React.useEffect(() => {
        mounted.current = true;
        return () => { mounted.current = false; };
    }, []);

    React.useEffect(() => {

        const filteredBanner = banners.filter((banner: any) => {
            return _id == banner.agenda_id;
        });
        setFilteredBanner(filteredBanner);
    }, [banners]);

    return (
        <>
            {in_array('program-detail', processing) ? (
                <WebLoading />
            ) : (
                <>
                    <HStack pt="2" w="100%" space="3" alignItems="center">
                        <Pressable onPress={()=> back() }>
                        <HStack space="3" alignItems="center">
                                <Icon as={AntDesign} name="arrowleft" size="xl" color="primary.text" />
                                <Text fontSize="2xl">BACK</Text>
                        </HStack>
                        </Pressable>
                        <Spacer />
                        {/* <Text isTruncated pr="6" fontSize="lg">{detail?.topic}</Text> */}
                    </HStack>
                        <DetailBlock>
                                <Text>
                                    <div dangerouslySetInnerHTML={{ __html: detail?.program?.description! }}></div>
                                </Text>
                                
                        </DetailBlock>
                    <Container mb="3" maxW="100%" w="100%">
                        <HStack mb="3" space={0} overflow={'hidden'} flexWrap={'wrap'} rounded={8} justifyContent="flex-start" w="100%">
                            {detail?.program_tabs_settings!?.filter((tab: any, key: number) =>  in_array( tab?.tab_name, ['polls', 'speakers'] ) && tab?.status === 1).length > 0 &&<Button rounded={0} minW={'50%'} flex={1} onPress={() => setTab('about')} borderWidth="1px" py={0} borderColor="primary.darkbox" h="42px" bg={tab === 'about' ? 'primary.darkbox' : 'primary.box'} _text={{ fontWeight: '600' }}>ABOUT</Button>}
                            {event?.agenda_settings?.program_groups === 1 && detail?.program_tabs_settings!?.filter((tab: any, key: number) => tab?.tab_name === 'groups' && tab?.status === 1)?.length > 0 && detail?.group_count! > 0 && (
                                <Button flex={1} rounded={0} minW={'50%'} onPress={() => setTab('group')} borderWidth="1px" py={0} borderColor="primary.darkbox" h="42px" bg={tab === 'group' ? 'primary.darkbox' : 'primary.box'} _text={{ fontWeight: '600' }}>GROUPS</Button>
                            )}
                            {modules?.find((polls)=>(polls.alias == 'attendees')) && event?.agenda_settings?.show_attach_attendee === 1 && detail?.program_tabs_settings!?.filter((tab: any, key: number) => tab?.tab_name === 'attendees' && tab?.status === 1)?.length > 0 && detail?.attached_attendee_count! > 0 && (
                                <Button flex={1} rounded={0} minW={'50%'} onPress={() => setTab('attendee')} borderWidth="1px" py={0} borderColor="primary.darkbox" h="42px" bg={tab === 'attendee' ? 'primary.darkbox' : 'primary.box'} _text={{ fontWeight: '600' }}>ATTENDEES</Button>
                            )}
                            {modules?.find((polls)=>(polls.alias == 'documents')) && detail?.program_tabs_settings!?.filter((tab: any, key: number) => tab?.tab_name === 'documents' && tab?.status === 1)?.length > 0 && detail?.has_documents! > 0 && (
                                <Button flex={1} rounded={0} minW={'50%'} onPress={() => setTab('documents')} borderWidth="1px" py={0} borderColor="primary.darkbox" h="42px" bg={tab === 'documents' ? 'primary.darkbox' : 'primary.box'} _text={{ fontWeight: '600' }}>DOCUMENTS</Button>
                            )}
                        </HStack>
                        {group_id > 0 && (
                            <HStack mb="3" pt="2" w="100%" space="3">
                                {group_name && (
                                    <Text flex="1" textTransform="uppercase" fontSize="xs">{group_name}</Text>
                                )}
                                <Pressable
                                    onPress={async () => {
                                        FetchGroups({ query: query, page: 1, group_id: 0, attendee_id: 0, program_id: Number(_id) });
                                    }}>
                                    <Text textTransform="uppercase" fontSize="xs">Go back</Text>
                                </Pressable>
                            </HStack>
                        )}

                            {filteredBanner?.length > 0 && filteredBanner.map((banner: any, key: number) =>

                                <Image source={{ uri: `${_env.eventcenter_base_url}/assets/banners/${banner.image}` }} alt="Alternate Text" w="700px" h="100px" rounded={10} />
                            )}
                        {in_array(tab, ['about']) && (
                            <Box overflow="hidden" w="100%" bg="primary.box" p="0" rounded="10">
                                {modules?.find((polls)=>(polls.alias == 'speakers')) && detail?.program_tabs_settings!?.filter((tab: any, key: number) => tab?.tab_name === 'speaker' && tab?.status === 1)?.length > 0 && (
                                    <>
                                        {detail?.program?.program_speakers!?.length > 0 && <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                                            <DynamicIcon iconType="speakers" iconProps={{ width: 12, height: 18 }} />
                                            <Text fontSize="md">Speaker</Text>
                                        </HStack>}
                                        {detail?.program?.program_speakers?.map((attendee: Attendee, k: number) =>
                                            <SpeakerRectangleView key={k} attendee={attendee} k={k} total={detail?.program?.program_speakers!?.length} />
                                        )}
                                    </>
                                )}
                                {modules?.find((polls)=>(polls.alias == 'polls')) && detail?.polls_count! > 0 && detail?.program_tabs_settings!?.filter((tab: any, key: number) => tab?.tab_name === 'polls' && tab?.status === 1)?.length > 0 && (
                                    <>
                                        {detail?.agenda_poll_questions!?.filter((question: any, key: number) => question?.display === "yes").length > 0 && <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                                            <DynamicIcon iconType="polls" iconProps={{ width: 17, height: 17 }} />
                                            <Text fontSize="md">Polls</Text>
                                        </HStack>}
                                        {detail?.agenda_poll_questions!?.filter((question: any, key: number) => question?.display === "yes").length > 0 && (event.attendee_settings?.voting || response?.attendee_detail?.event_attendee?.allow_vote) && !detail?.authority_given && detail?.program_tabs_settings!?.filter((tab: any, key: number) => tab?.tab_name === 'polls' && tab?.status === 1)?.length > 0 && (
                                            <Pressable onPress={() => {
                                                if (detail?.authority_recieved) {

                                                } else {
                                                    push(`/${event.url}/polls/detail/${detail?.program?.id}`)
                                                }
                                            }}>
                                                <Box w="100%" py="4">
                                                    <HStack px="5" w="100%" space="0" alignItems="center" justifyContent="space-between">
                                                        <VStack bg="red" w="100%" maxW={['95%', '80%', '70%']} space="0">
                                                            <Text fontSize="md">{event?.labels?.PROGRAM_LIVE_POLLS}</Text>
                                                        </VStack>
                                                    </HStack>
                                                </Box>
                                            </Pressable>
                                        ) 
                                        // : (
                                        //     <Box w="100%" py="4">
                                        //         <HStack px="5" w="100%" space="0" alignItems="center" justifyContent="space-between">
                                        //             <VStack bg="red" w="100%" maxW={['95%', '80%', '70%']} space="0">
                                        //                 <Text fontSize="md">No poll found</Text>
                                        //             </VStack>
                                        //         </HStack>
                                        //     </Box>
                                        // )
                                        }
                                    </>
                                )}
                                {/* {event?.agenda_settings?.enable_notes === 1 && detail?.program_tabs_settings!?.filter((tab: any, key: number) => tab?.tab_name === 'notes' && tab?.status === 1)?.length > 0 && (
                                    <>
                                        <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                                            <DynamicIcon iconType="my_notes" iconProps={{ width: 17, height: 17 }} />
                                            <Text fontSize="md">Notes</Text>
                                        </HStack>
                                        <Box w="100%" py="4">
                                            <HStack px="5" w="100%" space="0" alignItems="center" justifyContent="space-between">
                                                <VStack w="100%" maxW={['95%', '80%', '70%']} space="0">
                                                    <Text fontSize="md">Take notes</Text>
                                                </VStack>
                                            </HStack>
                                        </Box>
                                    </>
                                )} */}
                                {/* <PollRectangleView /> */}
                                {/* {modules?.find((polls)=>(polls.alias == 'myturnlist')) && detail?.program_tabs_settings!?.filter((tab: any, key: number) => tab?.tab_name === 'ask_to_speak' && tab?.status === 1)?.length > 0 && detail?.program?.enable_speakerlist === 1 && modules.filter((module: any, key: number) => module.alias === 'myturnlist').length > 0 && (response?.attendee_detail?.event_attendee?.ask_to_apeak === 1 || event?.myturnlist_setting?.ask_to_apeak === 1) && ((event?.myturnlist_setting?.use_group_to_control_request_to_speak === 1 && (detail?.attached_attendee_count! > 0 || detail?.attendee_program_groups! > 0)) || event?.myturnlist_setting?.use_group_to_control_request_to_speak === 0) && (
                                    <>
                                        <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                                            <IcoRaiseHand width="14" height="17" />
                                            <Text fontSize="md">Request to speak</Text>
                                        </HStack>
                                        <RequestToSpeakRectangleView program={detail?.program} />
                                    </>
                                )} */}
                            </Box>
                        )}
                        {(in_array('attendee-listing', processing) || in_array('groups', processing) || in_array('documents', processing)) && page === 1 ? (
                            <SectionLoading />
                        ) : (
                            <>
                                {in_array(tab, ['attendee']) && <Container position="relative" mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                                    {GroupAlphabatically(attendees, 'first_name').map((map: any, k: number) =>
                                        <React.Fragment key={`item-box-${k}`}>
                                            {map?.letter && (
                                                <Text w="100%" pl="18px" bg="primary.darkbox">{map?.letter}</Text>
                                            )}
                                            {map?.records?.map((attendee: Attendee, k: number) =>
                                                <React.Fragment key={`${k}`}>
                                                    <RectangleAttendeeView attendee={attendee} border={attendees.length > 0 && attendees[attendees.length - 1]?.id !== attendee?.id ? 1 : 0} speaker={0} />
                                                </React.Fragment>
                                            )}
                                        </React.Fragment>
                                    )}
                                </Container>}
                                {tab === 'group' && <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                                    {groups.map((map: any, k: number) =>
                                        <React.Fragment key={`item-box-group-${k}`}>
                                                <Text w="100%" pl="18px" bg="primary.darkbox">{map[0]?.info?.parent_name}</Text>
                                            {map?.map((group: Group, k: number) =>
                                                <React.Fragment key={`${k}`}>
                                                    <RectangleGroupView group={group} k={k} border={groups.length > 0 && groups[groups.length - 1]?.id !== group?.id ? 1 : 0} navigation={true} />
                                                </React.Fragment>
                                            )}
                                        </React.Fragment>
                                    )}
                                </Container>}
                                {tab === 'documents' && <Container mb="3" rounded="10" w="100%" maxW="100%">
                                    <ListingLayout2 />
                                </Container>}
                            </>
                        )}
                    </Container>
                    {(in_array('attendee-listing', processing) || in_array('groups', processing)) && page > 1 && (
                        <LoadMore />
                    )}
                </>
            )}
        </>
    )

}

export default Detail