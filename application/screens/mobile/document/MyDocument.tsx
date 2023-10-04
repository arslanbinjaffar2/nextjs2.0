import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/mobile/layouts/Master';
import Header from 'application/screens/mobile/layouts/headers/Header';
import { Center, VStack, ScrollView, Divider, Heading, HStack } from 'native-base';
import { useState } from 'react';

const MyDocument = ({ navigation }: any) => {

    const [scroll, setScroll] = useState(false);

    return (
        <Master navigation={navigation}>
            <Header minimal={scroll} navigation={navigation} />
            <Center w={'100%'} px={15}>
                <Divider mx="auto" w="160px" bg="primary.text" my="5" />
                <ScrollView h="85%" onScroll={(event: { nativeEvent: { contentOffset: { y: number; }; }; }) => setScroll(event.nativeEvent.contentOffset.y > 40 ? true : false)}>
                    <VStack pb="2" space={0} alignItems="center" w="100%">
                        <Heading fontSize="3xl">JANUAR VISION DANMARK</Heading>
                        <Heading fontSize="xl">KØBENHAVN 29 JANUAR 11:30 - 16:30</Heading>
                    </VStack>
                </ScrollView>
            </Center>
        </Master>
    );
};

MyDocument.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default MyDocument;
