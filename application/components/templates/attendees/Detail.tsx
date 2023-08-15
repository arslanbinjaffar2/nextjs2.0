import React, { useState } from 'react'
import { Button, Container, HStack, Icon, Spacer, Text } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import Search from 'application/components/atoms/Search';
import BasicInfoBlock from 'application/components/atoms/attendees/detail/BasicInfoBlock';
import DetailInfoBlock from 'application/components/atoms/attendees/detail/DetailInfoBlock';
import RectangleGroupView from 'application/components/atoms/attendees/groups/RectangleView';
import SlideView from 'application/components/molecules/programs/SlideView';

const Detail = () => {

    const [tabs, settabs] = useState<string | null>('ABOUT');

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
                            {/* <RectangleGroupView k={k} /> */}
                        </React.Fragment>
                    )}
                </Container>}
                {tabs === 'MY_PROGRAMS' && <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                    <SlideView />
                </Container>}
            </Container>
        </>
    )

}

export default Detail