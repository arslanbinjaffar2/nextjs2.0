import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button, Container, HStack, Pressable, Spacer, Text, VStack, Icon, Input } from 'native-base';
import RectangleAttendeeView from 'application/components/atoms/attendees/RectangleView';
import RectangleGroupView from 'application/components/atoms/attendees/groups/RectangleView';
import UseAuthService from 'application/store/services/UseAuthService';
import UseAttendeeService from 'application/store/services/UseAttendeeService';
import { Attendee } from 'application/models/attendee/Attendee';
import UseLoadingService from 'application/store/services/UseLoadingService';
import WebLoading from 'application/components/atoms/WebLoading';
import debounce from 'lodash.debounce';
import LoadMore from 'application/components/atoms/LoadMore';
import { Group } from 'application/models/attendee/Group';
import in_array from "in_array";
import AntDesign from '@expo/vector-icons/AntDesign';
import GroupAlphabatically from 'application/utils/GroupAlphabatically';

const Index = () => {

    const mounted = React.useRef(false);

    const { scroll, loading } = UseLoadingService();

    const { response } = UseAuthService();

    const [tab, setTab] = useState<string | null>('attendee');

    const alpha = Array.from(Array(26)).map((e, i) => i + 65);

    const alphabet = alpha.map((x) => String.fromCharCode(x));

    const { attendees, FetchAttendees, query, page, FetchGroups, groups, group_id, group_name } = UseAttendeeService();

    const [searchQuery, setSearch] = React.useState('')

    useEffect(() => {
        if (mounted.current) {
            FetchAttendees({ query: query, group_id: 0, page: page + 1, my_attendee_id: 0 });
        }
    }, [scroll]);

    useEffect(() => {
        if (mounted.current) {
            if (tab !== "group-attendee") {
                if (tab === "group") {
                    FetchGroups({ query: query, group_id: 0, page: 1 });
                } else {
                    FetchAttendees({ query: query, group_id: 0, page: 1, my_attendee_id: tab === "my-attendee" ? response?.data?.user?.id : 0 });
                }
            }
        }
    }, [tab]);

    useEffect(() => {
        mounted.current = true;
        return () => { mounted.current = false; };
    }, []);

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
                FetchGroups({ query: query, group_id: 0, page: 1 });
            } else {
                FetchAttendees({ query: query, group_id: 0, page: 1, my_attendee_id: tab === "my-attendee" ? response?.data?.user?.id : 0 });
            }
        }, 1000);
    }, []);

    React.useEffect(() => {
        setSearch(query);
    }, [query]);

    return (
        <>
            {loading && page === 1 ? (
                <WebLoading />
            ) : (
                <>
                    <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                        <Text fontSize="2xl">ATTENDEES</Text>
                        <Spacer />
                        <Input rounded="10" w={'60%'} bg="primary.box" borderWidth={0} value={searchQuery} placeholder="Search" onChangeText={(text: string) => {
                            search(text);
                            setSearch(text);
                        }} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
                    </HStack>
                    <HStack mb="3" space={1} justifyContent="center" w="100%">
                        <Button onPress={() => setTab('attendee')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={in_array(tab, ['attendee', 'group-attendee']) ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{ fontWeight: '600' }}>ALL</Button>
                        <Button onPress={() => setTab('my-attendee')} borderRadius="0" borderWidth="1px" py={0} borderColor="primary.darkbox" h="42px" bg={tab === 'my-attendee' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{ fontWeight: '600' }}>MY ATTENDEES</Button>
                        <Button onPress={() => setTab('group')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px" bg={tab === 'group' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{ fontWeight: '600' }}>GROUPS</Button>
                    </HStack>
                    {group_id > 0 && (
                        <HStack mb="3" pt="2" w="100%" space="3">
                            {group_name && (
                                <Text flex="1" textTransform="uppercase" fontSize="xs">{group_name}</Text>
                            )}
                            <Pressable
                                onPress={async () => {
                                    FetchGroups({ query: query, page: 1, group_id: 0 });
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
                    {in_array(tab, ['attendee', 'group-attendee', 'my-attendee']) && <Container position="relative" mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                        {GroupAlphabatically(attendees, 'first_name').map((map: any, k: number) =>
                            <React.Fragment key={`item-box-${k}`}>
                                {map?.letter && (
                                    <Text w="100%" pl="18px" bg="primary.darkbox">{map?.letter}</Text>
                                )}
                                {map?.records?.map((attendee: Attendee, k: number) =>
                                    <React.Fragment key={`${k}`}>
                                        <RectangleAttendeeView attendee={attendee} border={attendees.length > 0 && attendees[attendees.length - 1]?.id !== attendee?.id ? 1 : 0} />
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
                    {loading && page > 1 && (
                        <LoadMore />
                    )}
                </>
            )}
        </>
    )

}

export default Index