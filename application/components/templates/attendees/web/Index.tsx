import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button, Container, HStack, Spacer, Text, VStack } from 'native-base';
import RectangleAttendeeView from 'application/components/atoms/attendees/RectangleView';
import Search from 'application/components/atoms/Search';
import RectangleGroupView from 'application/components/atoms/attendees/groups/RectangleView';
import UseAuthService from 'application/store/services/UseAuthService';
import UseAttendeeService from 'application/store/services/UseAttendeeService';
import { Attendee } from 'application/models/attendee/Attendee';
import UseLoadingService from 'application/store/services/UseLoadingService';
import WebLoading from 'application/components/atoms/WebLoading';

const Index = () => {

    const mounted = React.useRef(false);

    const { scroll, loading } = UseLoadingService();

    const { response } = UseAuthService();

    const [tab, setTab] = useState<string | null>('attendee');

    const alpha = Array.from(Array(26)).map((e, i) => i + 65);

    const alphabet = alpha.map((x) => String.fromCharCode(x));

    const { attendees, FetchAttendees, query, page } = UseAttendeeService();

    useEffect(() => {
        if (mounted.current) {
            FetchAttendees({ query: query, group_id: 0, page: page + 1, my_attendee_id: 0 });
        }
    }, [scroll]);

    useEffect(() => {
        if (mounted.current) {
            FetchAttendees({ query: query, group_id: 0, page: 1, my_attendee_id: tab === "my-attendee" ? response?.data?.user?.id : 0 });
        }
    }, [tab]);

    useEffect(() => {
        mounted.current = true;
        return () => { mounted.current = false; };
    }, []);

    return (
        <>
            {loading ? (
                <WebLoading />
            ) : (
                <>
                    <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                        <Text fontSize="2xl">ATTENDEES</Text>
                        <Spacer />
                        <Search />
                    </HStack>
                    <HStack mb="3" space={1} justifyContent="center" w="100%">
                        <Button onPress={() => setTab('attendee')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={tab === 'attendee' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{ fontWeight: '600' }}>ALL</Button>
                        <Button onPress={() => setTab('my-attendee')} borderRadius="0" borderWidth="1px" py={0} borderColor="primary.darkbox" h="42px" bg={tab === 'my-attendee' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{ fontWeight: '600' }}>MY ATTENDEES</Button>
                        <Button onPress={() => setTab('group')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px" bg={tab === 'group' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{ fontWeight: '600' }}>GROUPS</Button>
                    </HStack>
                    {tab === 'attendee' && <Container position="relative" mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                        <VStack w="20px" position="absolute" right="-20px" top="0" space="1">
                            {alphabet && alphabet.map((item, k) =>
                                <Text textAlign="center" color="primary.text" opacity="0.5" key={k} fontSize="md">{item}</Text>
                            )}
                        </VStack>
                        <Text w="100%" pl="18px" bg="primary.darkbox">A</Text>
                        {attendees.map((attendee: Attendee, k: number) =>
                            <React.Fragment key={`item-box-${k}`}>
                                <RectangleAttendeeView attendee={attendee} border={k === 2 ? 0 : 1} />
                            </React.Fragment>
                        )}
                    </Container>}
                    {tab === 'my-attendee' && <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                        {attendees.map((attendee: Attendee, k: number) =>
                            <React.Fragment key={`item-box-${k}`}>
                                <RectangleAttendeeView attendee={attendee} border={k === 2 ? 0 : 1} />
                            </React.Fragment>
                        )}
                    </Container>}
                    {tab === 'group' && <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                        {[...Array(7)].map((item, k) =>
                            <React.Fragment key={`item-box-group-${k}`}>
                                <RectangleGroupView k={k} />
                            </React.Fragment>
                        )}
                    </Container>}
                </>
            )}
        </>
    )

}

export default Index