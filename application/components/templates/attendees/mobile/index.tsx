import React from 'react'
import { useState } from 'react';
import { Button, Container, HStack, Spacer, Text, VStack, FlatList } from 'native-base';
import RectangleAttendeeView from 'application/components/atoms/attendees/RectangleView';
import Search from 'application/components/atoms/Search';
import RectangleGroupView from 'application/components/atoms/attendees/groups/RectangleView';
import UseAttendeeService from 'application/store/services/UseAttendeeService';
import { Attendee } from 'application/models/attendee/Attendee';

const Index = () => {

    const [tab, setTab] = useState<string | null>('program');

    const alpha = Array.from(Array(26)).map((e, i) => i + 65);

    const alphabet = alpha.map((x) => String.fromCharCode(x));

    const { attendees } = UseAttendeeService();

    const fetchMore = async () => {
        console.log("sdsd")
        /*  if (isLoading) return;
     
         setIsLoading(true);
     
         const nextPage = currentPage + 1;
         const newData = await fetchBooks(nextPage);
     
         setCurrentPage(nextPage);
         setIsLoading(false);
         setBooks(prevData => [...prevData, ...newData]); */
    };

    const renderItem = ({ attendee }: any) => {
        return (
            <RectangleAttendeeView attendee={attendee} border={1} />
        );
    };

    return (
        <>
            <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                <Text fontSize="2xl">ATTENDEES</Text>
                <Spacer />
                <Search />
            </HStack>
            <HStack mb="3" space={1} justifyContent="center" w="100%">
                <Button onPress={() => setTab('program')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={tab === 'program' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{ fontWeight: '600' }}>ALL</Button>
                <Button onPress={() => setTab('my-program')} borderRadius="0" borderWidth="1px" py={0} borderColor="primary.darkbox" h="42px" bg={tab === 'my-program' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{ fontWeight: '600' }}>MY ATTENDEES</Button>
                <Button onPress={() => setTab('group')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px" bg={tab === 'group' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{ fontWeight: '600' }}>GROUPS</Button>
            </HStack>
            {tab === 'program' && <Container position="relative" mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                <VStack w="20px" position="absolute" right="-20px" top="0" space="1">
                    {alphabet && alphabet.map((item, k) =>
                        <Text textAlign="center" color="primary.text" opacity="0.5" key={k} fontSize="md">{item}</Text>
                    )}
                </VStack>
                <Text w="100%" pl="18px" bg="primary.darkbox">A</Text>
                <FlatList
                style={{width: '100%'}}
                    data={attendees}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    onEndReached={fetchMore}
                    onEndReachedThreshold={0.1}
                />


            </Container>}
            {tab === 'my-program' && <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                {[...Array(6)].map((item, k) =>
                    <React.Fragment key={`item-box-programs-${k}`}>
                        <RectangleAttendeeView border={k === 5 ? 0 : 1} />
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
    )

}

export default Index