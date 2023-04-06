import React, { useState } from 'react'
import { Box, Button, Container, HStack, Icon, Spacer, Text, VStack, Center, ZStack, IconButton, Heading } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import Search from 'application/components/atoms/attendees/Search';
import BasicInfoBlock from 'application/components/atoms/attendees/detail/BasicInfoBlock';
import DetailInfoBlock from 'application/components/atoms/attendees/detail/DetailInfoBlock';
import RectangleGroupView from 'application/components/atoms/attendees/groups/RectangleView';
import RectangleDetailView from 'application/components/atoms/programs/RectangleDetailView';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'

const Detail = () => {

    const [tabs, settabs] = useState<string | null>('ABOUT');

    const programs = [{
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        text: 'First point in the agenda, with room for two or three lines of text.',
        starttime: '12:47',
        endtime: '12:47',
        tracks: [{ name: 'Technology', color: '#F5B761' }, { name: 'Nature', color: '#74AD6A' }, { name: 'Banking', color: '#74ADEF' }]
    }, {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        starttime: '11:11',
        endtime: '11:11',
        text: 'First point in the agenda',
        tracks: [{ name: 'Technology', color: '#F5B761' }, { name: 'Banking', color: '#74ADEF' }]
    }, {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        starttime: '6:22',
        endtime: '6:22',
        text: 'With room for two or three lines of text.',
        tracks: [{ name: 'Technology', color: '#F5B761' }]
    }, {
        id: '68694a0f-3da1-431f-bd56-142371e29d72',
        starttime: '8:56',
        endtime: '8:56',
        text: 'First point in the agenda, with room for two or three lines of text.',
        tracks: [{ name: 'Technology', color: '#74ADEF' }]
    }, {
        id: '28694a0f-3da1-471f-bd96-142456e29d72',
        starttime: '12:47',
        endtime: '12:47',
        text: 'First point in the agenda, with room for two or three lines of text.',
        tracks: [{ name: 'Technology', color: '#9F1C2B' }]
    }];

    return (
        <>
            <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                <HStack space="3" alignItems="center">
                    <Icon as={AntDesign} name="arrowleft" size="xl" color="primary.text" />
                    <Text fontSize="2xl">BACK</Text>
                </HStack>
                <Spacer />
                <Search />
            </HStack>
            <BasicInfoBlock />
            <Container mb="3" maxW="100%" w="100%">
                <HStack mb="3" space={1} justifyContent="center" w="100%">
                    <Button onPress={() => settabs('ABOUT')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={tabs === 'ABOUT' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{ fontWeight: '600' }}>ABOUT</Button>
                    <Button onPress={() => settabs('GROUPS')} borderRadius="0" borderWidth="1px" py={0} borderColor="primary.darkbox" h="42px" bg={tabs === 'GROUPS' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{ fontWeight: '600' }}>GROUPS</Button>
                    <Button onPress={() => settabs('MY_PROGRAMS')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px" bg={tabs === 'MY_PROGRAMS' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{ fontWeight: '600' }}>MY PROGRAMS</Button>
                </HStack>
                {tabs === 'ABOUT' && <DetailInfoBlock />}
                {tabs === 'GROUPS' && <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                    {[...Array(7)].map((item, k) =>
                        <React.Fragment key={`item-box-group-${k}`}>
                            <RectangleGroupView k={k} />
                        </React.Fragment>
                    )}
                </Container>}
                {tabs === 'MY_PROGRAMS' && <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                    <HStack my={3} py="2" w="100%" bg="primary.darkbox" space="0" alignItems="center">
                        <Center alignItems="flex-start" w="10%">
                            <IconButton
                                p="0"
                                w="40px"
                                variant="transparent"
                                icon={<Icon size="md" as={SimpleLineIcons} name="arrow-left" color="primary.text" />}
                                onPress={() => {
                                    console.log('hello')
                                }}
                            />
                        </Center>
                        <Center w="80%">
                            <Heading fontSize="lg">Wednesday - Oktober 7</Heading>
                        </Center>
                        <Center alignItems="flex-end" w="10%">
                            <IconButton
                                p="0"
                                w="40px"
                                variant="transparent"
                                icon={<Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />}
                                onPress={() => {
                                    console.log('hello')
                                }}
                            />
                        </Center>
                    </HStack>
                    {programs?.map((program: any, key: any) =>
                        <RectangleDetailView key={key} program={program} k={key} />
                    )}
                </Container>}
            </Container>
        </>
    )

}

export default Detail