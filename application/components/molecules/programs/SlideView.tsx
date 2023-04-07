import * as React from 'react';
import { Center, Heading, HStack, Icon, IconButton, Text } from 'native-base';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import RectangleDetailView from 'application/components/atoms/programs/RectangleDetailView';
import WorkshopRectangleDetailView from 'application/components/atoms/programs/workshops/RectangleDetailView';
import TrackRectangleDetailView from 'application/components/atoms/programs/tracks/RectangleDetailView';

const SlideView = (props: any) => {

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
            {props?.section === 'my-program' && (
                <>
                    {programs?.map((program: any, key: any) =>
                        <RectangleDetailView key={key} program={program} k={key} />
                    )}
                </>
            )}
            {props?.section === 'program' && (
                <>
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
                    <Text w="100%" pl="30px" bg="primary.darkbox">Afternoon sessions</Text>
                    {programs?.map((program: any, key: any) =>
                        <RectangleDetailView key={key} program={program} k={key} />
                    )}
                    <Text w="100%" pl="30px" bg="primary.darkbox">Workshops</Text>
                    {programs?.map((program: any, key: any) =>
                        <WorkshopRectangleDetailView key={key} program={program} k={key} />
                    )}
                </>
            )}
            {props?.section === 'tracks' && (
                programs?.map((program: any, key: any) =>
                    <TrackRectangleDetailView key={key} program={program} k={key} />
                )
            )}
        </>
    );
};

export default SlideView;
