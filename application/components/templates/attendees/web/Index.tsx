import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button, Container, HStack, Pressable, Spacer, Text, VStack, Icon, Input } from 'native-base';
import RectangleAttendeeView from 'application/components/atoms/attendees/RectangleView';
import RectangleGroupView from 'application/components/atoms/attendees/groups/RectangleView';
import UseAuthService from 'application/store/services/UseAuthService';
import UseAttendeeService from 'application/store/services/UseAttendeeService';
import { Attendee } from 'application/models/attendee/Attendee';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseEventService from 'application/store/services/UseEventService';
import SectionLoading from 'application/components/atoms/SectionLoading';
import debounce from 'lodash.debounce';
import LoadMore from 'application/components/atoms/LoadMore';
import { Group } from 'application/models/attendee/Group';
import in_array from "in_array";
import AntDesign from '@expo/vector-icons/AntDesign';
import GroupAlphabatically from 'application/utils/GroupAlphabatically';
import { createParam } from 'solito';
import { useRouter } from 'solito/router'
import RectangleCategoryView from 'application/components/atoms/attendees/categories/RectangleView';
import { Category } from 'application/models/event/Category';

type ScreenParams = { slug: any }

const { useParam } = createParam<ScreenParams>()

type Props = {
    speaker: number,
    screen: string
}

const Index = ({ speaker, screen }: Props) => {

    const mounted = React.useRef(false);

    const { scroll, processing } = UseLoadingService();

    const { response } = UseAuthService();

    const { event } = UseEventService();
    
    const [tab, setTab] = useState<string | null>(speaker === 1 ?  (event?.speaker_settings?.default_display !== 'name' ? 'category' : 'attendee') :  (event?.attendee_settings?.default_display !== 'name' ? 'group' : 'attendee'));

    const alpha = Array.from(Array(26)).map((e, i) => i + 65);

    const alphabet = alpha.map((x) => String.fromCharCode(x));

    const { attendees, FetchAttendees, query, page, FetchGroups, groups, group_id, group_name, category_id, FetchCategories, categories, category_name } = UseAttendeeService();

    
    const [searchQuery, setSearch] = React.useState('')

    const [slug] = useParam('slug');

    const { push } = useRouter()

    useEffect(() => {
        if (mounted.current) {
            if (in_array(tab, ['attendee', 'group-attendee', 'my-attendee'])) {
                FetchAttendees({ query: query, group_id: group_id, page: page + 1, my_attendee_id: tab === "my-attendee" ? response?.data?.user?.id : 0, speaker: speaker, category_id: category_id, screen: speaker ? 'speakers' : 'attendees', program_id: 0 });
            }
        }
    }, [scroll]);

    useEffect(() => {
        if (mounted.current) {
            if (tab === "group") {
                FetchGroups({ query: query, group_id: 0, page: 1, attendee_id: 0, program_id: 0 });
            } else if (in_array(tab, ['attendee', 'my-attendee'])) {
                FetchAttendees({ query: query, group_id: 0, page: 1, my_attendee_id: tab === "my-attendee" ? response?.data?.user?.id : 0, speaker: speaker, category_id: category_id, screen: speaker ? 'speakers' : 'attendees', program_id: 0 });
            } else if (in_array(tab, ['category'])) {
                FetchCategories({ parent_id: 0, query: query, page: 1, cat_type: 'speakers' })
            }
        }
    }, [tab, category_id]);

    useEffect(() => {
        mounted.current = true;
        return () => { mounted.current = false; };
    }, []);

    useEffect(() => {
        console.log(slug);
        if (slug !== undefined && slug.length === 1) { // Group attendees by slug
            setTab('group-attendee');
            FetchAttendees({ query: query, group_id: slug[0], page: 1, my_attendee_id: 0, speaker: speaker, category_id: 0, screen: speaker ? 'speakers' : 'attendees', program_id: 0 });
        } else if ((slug === undefined || slug.length === 0) && tab === 'attendee') {
            setTab('attendee');
            FetchAttendees({ query: '', group_id: 0, page: 1, my_attendee_id: 0, speaker: speaker, category_id: category_id, screen: speaker ? 'speakers' : 'attendees', program_id: 0 });
        } else if ((slug === undefined || slug.length === 0) && tab === 'category') {
            setTab('category');
            FetchCategories({ parent_id: 0, query: query, page: 1, cat_type: 'speakers' })
        } else if ((slug === undefined || slug.length === 0) && tab === 'group') {
            setTab('group');
            FetchGroups({ query: query, group_id: 0, page: 1, attendee_id: 0, program_id: 0 });
        }
    }, [slug]);

    const updateTab = (tab: string) => {
        setTab(tab);
    }

    React.useEffect(() => {
        return () => {
            search.cancel();
        };
    }, []);

    const search = React.useMemo(() => {
        return debounce(function (query: string) {
            if (tab === "group") {
                FetchGroups({ query: query, group_id: group_id, page: 1, attendee_id: 0, program_id: 0 });
            } else if (in_array(tab, ['attendee', 'group-attendee', 'my-attendee'])) {
                FetchAttendees({ query: query, group_id: group_id, page: 1, my_attendee_id: tab === "my-attendee" ? response?.data?.user?.id : 0, speaker: speaker, category_id: category_id, screen: speaker ? 'speakers' : 'attendees', program_id: 0 });
            }
        }, 1000);
    }, []);

    React.useEffect(() => {
        setSearch(query);
    }, [query]);

    React.useEffect(() => {
        if (screen === 'my-attendees') {
            setTab('my-attendee');
        }
    }, [screen]);

    return (
        <>
            <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                <Text fontSize="2xl">{speaker === 0 ? 'ATTENDEES' : 'SPEAKERS'}</Text>
                <Spacer />
                <Input rounded="10" w={'60%'} bg="primary.box" borderWidth={0} value={searchQuery} placeholder="Search" onChangeText={(text: string) => {
                    search(text);
                    setSearch(text);
                }} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
            </HStack>
            {screen === 'attendees' && (
                <>
                    {speaker === 0 && <HStack mb="3" space={1} justifyContent="center" w="100%">
                        {(((event?.attendee_settings?.default_display === 'name' || event?.attendee_settings?.tab == 1))) &&  
                            <Button onPress={() => setTab('attendee')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={in_array(tab, ['attendee', 'group-attendee']) ? 'primary.darkbox' : 'primary.box'} w={((event?.attendee_settings?.default_display == 'name' && event?.attendee_settings?.tab == 0) ? '50%' : '33%')} _text={{ fontWeight: '600' }}>ALL</Button>}
                            <Button onPress={() => setTab('my-attendee')} borderRadius="0" borderWidth="1px" py={0} borderColor="primary.darkbox" h="42px" borderRightRadius={(event?.attendee_settings?.default_display != 'name' || event?.attendee_settings?.tab == 1) ? 0 : 8} borderLeftRadius={(event?.attendee_settings?.default_display == 'name' || event?.attendee_settings?.tab == 1) ? 0 : 8} bg={tab === 'my-attendee' ? 'primary.darkbox' : 'primary.box'} w={event?.attendee_settings?.tab == 1 ? '33%' : '50%'} _text={{ fontWeight: '600' }}>MY ATTENDEES</Button>
                        {(event?.attendee_settings?.default_display !== 'name' || event?.attendee_settings?.tab == 1) &&
                                <Button onPress={() => setTab('group')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px" bg={tab === 'group' ? 'primary.darkbox' : 'primary.box'} w={(event?.attendee_settings?.default_display !== 'name' && event?.attendee_settings?.tab == 0) ? '50%' : '33%'} _text={{ fontWeight: '600' }}>GROUPS</Button>
                        }
                    </HStack>}
                    {speaker ===  1 && <HStack mb="3" space={1} justifyContent="center" w="100%">
                        {((event?.speaker_settings?.default_display === 'name' || event?.speaker_settings?.tab == 1)) &&  
                            <Button onPress={() => setTab('attendee')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={in_array(tab, ['attendee', 'group-attendee']) ? 'primary.darkbox' : 'primary.box'} w={((event?.speaker_settings?.default_display == 'name' && event?.speaker_settings?.tab == 0) ? '100%' : '50%')} _text={{ fontWeight: '600' }}>ALL</Button>}
                        {(event?.speaker_settings?.default_display !== 'name' || event?.speaker_settings?.tab == 1) &&
                            <Button onPress={() => setTab('category')} borderRadius="0" borderWidth="1px" py={0} borderColor="primary.darkbox" h="42px" bg={tab === 'category' ? 'primary.darkbox' : 'primary.box'} w={((event?.speaker_settings?.default_display !== 'name' && event?.speaker_settings?.tab == 0)) ? '100%' : '50%'} _text={{ fontWeight: '600' }}>CATEGORIES</Button>
                        }
                    </HStack>}
                    {group_id > 0 && (
                        <HStack mb="3" pt="2" w="100%" space="3">
                            {group_name && (
                                <Text flex="1" textTransform="uppercase" fontSize="xs">{group_name}</Text>
                            )}
                            <Pressable
                                onPress={async () => {
                                    if (slug !== undefined || slug?.length > 0) {
                                        push(`/${event.url}/attendees`)
                                    } else {
                                        FetchGroups({ query: query, page: 1, group_id: 0, attendee_id: 0, program_id: 0 });
                                    }
                                }}>
                                <Text textTransform="uppercase" fontSize="xs">Go back</Text>
                            </Pressable>
                        </HStack>
                    )}
                    {category_name && (
                        <HStack mb="3" pt="2" w="100%" space="3">
                            <Text flex="1" textTransform="uppercase" fontSize="xs">{category_name}</Text>
                            <Pressable
                                onPress={async () => {
                                    if (in_array(tab, ['attendee', 'my-attendee'])) {
                                        FetchAttendees({ query: query, group_id: 0, page: 1, my_attendee_id: tab === "my-attendee" ? response?.data?.user?.id : 0, speaker: speaker, category_id: 0, screen: speaker ? 'speakers' : 'attendees', program_id: 0 });
                                    } else {
                                        FetchCategories({ parent_id: 0, query: query, page: 1, cat_type: 'speakers' })
                                    }
                                }}>
                                <Text textTransform="uppercase" fontSize="xs">Go back</Text>
                            </Pressable>
                        </HStack>
                    )}
                </>
            )}
            {speaker === 0 && <VStack w="20px" position="absolute" right="-20px" top="0" space="1">
                {alphabet && alphabet.map((item, k) =>
                    <React.Fragment key={k}>
                        {item && (
                            <Text textAlign="center" color="primary.text" opacity="0.5" fontSize="md">{item}</Text>
                        )}
                    </React.Fragment>
                )}
            </VStack>}
            <>
                {(in_array('attendee-listing', processing) || in_array('category-listing', processing) || in_array('groups', processing)) && page === 1 ? (
                    <SectionLoading />
                ) : (
                    <>
                        {in_array(tab, ['attendee', 'my-attendee', 'group-attendee']) && <Container position="relative" mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                            {speaker === 0 && GroupAlphabatically(attendees, 'first_name').map((map: any, k: number) =>
                                <React.Fragment key={`item-box-${k}`}>
                                    {map?.letter && (
                                        <Text w="100%" pl="18px" bg="primary.darkbox">{map?.letter}</Text>
                                    )}
                                    {map?.records?.map((attendee: Attendee, k: number) =>
                                        <React.Fragment key={`${k}`}>
                                            <RectangleAttendeeView attendee={attendee} border={attendees.length > 0 && attendees[attendees.length - 1]?.id !== attendee?.id ? 1 : 0} speaker={speaker} />
                                        </React.Fragment>
                                    )}
                                </React.Fragment>
                            )}
                            {speaker === 1 && attendees?.map((attendee: Attendee, k: number) =>
                                        <React.Fragment key={`${k}`}>
                                            <RectangleAttendeeView attendee={attendee} border={attendees.length > 0 && attendees[attendees.length - 1]?.id !== attendee?.id ? 1 : 0} speaker={speaker} />
                                        </React.Fragment>
                             )}
                        </Container>}
                        {tab === 'group' && <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                            {GroupAlphabatically(groups, 'info').map((map: any, k: number) =>
                                <React.Fragment key={`item-box-group-${k}`}>
                                    {map?.letter && (
                                        <Text w="100%" pl="18px" bg="primary.darkbox">{map?.letter}</Text>
                                    )}
                                    {map?.records?.map((group: Group, k: number) =>
                                        <React.Fragment key={`${k}`}>
                                            <RectangleGroupView group={group} k={k} border={groups.length > 0 && groups[groups.length - 1]?.id !== group?.id ? 1 : 0} updateTab={updateTab} />
                                        </React.Fragment>
                                    )}
                                </React.Fragment>
                            )}
                        </Container>}
                        {tab === 'category' && speaker === 1 && <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                            {categories.map((category: Category, k: number) =>
                                <React.Fragment key={`item-box-group-${k}`}>
                                    <RectangleCategoryView category={category} k={k} border={categories.length != (k + 1)} navigation={true} updateTab={updateTab} screen="listing" />
                                </React.Fragment>
                            )}
                        </Container>}
                    </>
                )}
            </>
            {(in_array('attendee-listing', processing) || in_array('groups', processing) || in_array('category-listing', processing)) && page > 1 && (
                <LoadMore />
            )}
        </>
    )

}

export default Index