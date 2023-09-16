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
import WebLoading from 'application/components/atoms/WebLoading';
import debounce from 'lodash.debounce';
import LoadMore from 'application/components/atoms/LoadMore';
import { Group } from 'application/models/attendee/Group';
import in_array from "in_array";
import AntDesign from '@expo/vector-icons/AntDesign';
import GroupAlphabatically from 'application/utils/GroupAlphabatically';
import { createParam } from 'solito';
import { useRouter } from 'solito/router'

type ScreenParams = { slug: any }

const { useParam } = createParam<ScreenParams>()

type Props = {
    speaker: number
}

const Index = ({ speaker }: Props) => {

    const mounted = React.useRef(false);

    const { scroll, processing } = UseLoadingService();

    const { response } = UseAuthService();

    const [tab, setTab] = useState<string | null>('attendee');

    const alpha = Array.from(Array(26)).map((e, i) => i + 65);

    const alphabet = alpha.map((x) => String.fromCharCode(x));

    const { attendees, FetchAttendees, query, page, FetchGroups, groups, group_id, group_name } = UseAttendeeService();

    const { event } = UseEventService();

    const [searchQuery, setSearch] = React.useState('')

    const [slug] = useParam('slug');

    const { push } = useRouter()

    useEffect(() => {
        if (mounted.current) {
            if (in_array(tab, ['attendee', 'group-attendee', 'my-attendee'])) {
                FetchAttendees({ query: query, group_id: 0, page: page + 1, my_attendee_id: tab === "my-attendee" ? response?.data?.user?.id : 0, speaker: speaker });
            }
        }
    }, [scroll]);

    useEffect(() => {
        if (mounted.current) {
            if (tab === "group") {
                FetchGroups({ query: query, group_id: 0, page: 1, attendee_id: 0 });
            } else if (in_array(tab, ['attendee', 'my-attendee'])) {
                FetchAttendees({ query: query, group_id: 0, page: 1, my_attendee_id: tab === "my-attendee" ? response?.data?.user?.id : 0, speaker: speaker });
            }
        }
    }, [tab]);

    useEffect(() => {
        mounted.current = true;
        return () => { mounted.current = false; };
    }, []);

    useEffect(() => {
        if (slug !== undefined && slug.length === 1) { // Group attendees by slug
            setTab('group-attendee');
            FetchAttendees({ query: query, group_id: slug[0], page: 1, my_attendee_id: 0, speaker: speaker });
        } else if (slug === undefined || slug.length === 0) {
            setTab('attendee');
            FetchAttendees({ query: '', group_id: 0, page: 1, my_attendee_id: 0, speaker: speaker });
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
                FetchGroups({ query: query, group_id: 0, page: 1, attendee_id: 0 });
            } else if (in_array(tab, ['attendee', 'group-attendee', 'my-attendee'])) {
                FetchAttendees({ query: query, group_id: 0, page: 1, my_attendee_id: tab === "my-attendee" ? response?.data?.user?.id : 0, speaker: speaker });
            }
        }, 1000);
    }, []);

    React.useEffect(() => {
        setSearch(query);
    }, [query]);

    return (
        <>
            {(in_array('attendee-listing', processing) || in_array('groups', processing)) && page === 1 ? (
                <WebLoading />
            ) : (
                <>
                    <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                        <Text fontSize="2xl">{speaker === 0 ? 'ATTENDEES' : 'SPEAKERS'}</Text>
                        <Spacer />
                        <Input rounded="10" w={'60%'} bg="primary.box" borderWidth={0} value={searchQuery} placeholder="Search" onChangeText={(text: string) => {
                            search(text);
                            setSearch(text);
                        }} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
                    </HStack>
                    {speaker === 0 && (
                        <HStack mb="3" space={1} justifyContent="center" w="100%">
                            <Button onPress={() => setTab('attendee')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={in_array(tab, ['attendee', 'group-attendee']) ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{ fontWeight: '600' }}>ALL</Button>
                            <Button onPress={() => setTab('my-attendee')} borderRadius="0" borderWidth="1px" py={0} borderColor="primary.darkbox" h="42px" bg={tab === 'my-attendee' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{ fontWeight: '600' }}>MY ATTENDEES</Button>
                            <Button onPress={() => setTab('group')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px" bg={tab === 'group' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{ fontWeight: '600' }}>GROUPS</Button>
                        </HStack>
                    )}
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
                                        FetchGroups({ query: query, page: 1, group_id: 0, attendee_id: 0 });
                                    }
                                }}>
                                <Text textTransform="uppercase" fontSize="xs">Go back</Text>
                            </Pressable>
                        </HStack>
                    )}
                    <VStack w="20px" position="absolute" right="-20px" top="0" space="1">
                        {alphabet && alphabet.map((item, k) =>
                            <React.Fragment key={k}>
                                {item && (
                                    <Text textAlign="center" color="primary.text" opacity="0.5" fontSize="md">{item}</Text>
                                )}
                            </React.Fragment>
                        )}
                    </VStack>
                    {in_array(tab, ['attendee', 'my-attendee', 'group-attendee']) && <Container position="relative" mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                        {GroupAlphabatically(attendees, 'first_name').map((map: any, k: number) =>
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
                    {(in_array('attendee-listing', processing) || in_array('groups', processing)) && page > 1 && (
                        <LoadMore />
                    )}
                </>
            )}
        </>
    )

}

export default Index