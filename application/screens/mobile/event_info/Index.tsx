import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/mobile/layouts/Master';
import ModuleHeader from 'application/screens/mobile/layouts/headers/ModuleHeader';
import { Center, ScrollView, Divider, HStack, Text } from 'native-base';
import { useState } from 'react';
import DynamicIcon from 'application/utils/DynamicIcon';
import UseInfoService from 'application/store/services/UseInfoService';
import Listing from 'application/components/templates/event_info/Listing';

const Index = ({ navigation, route }: any) => {

    const [scroll, setScroll] = useState(false);

    const { FetchInfo, info } = UseInfoService();

    const aliases: any = {
        infobooth: 'practical-info',
        additional_info: 'additional-info',
        general_info: 'general-info'
    }

    React.useEffect(() => {
        FetchInfo(aliases[route.name]);
    }, [])

    return (
        <Master navigation={navigation}>
            <ModuleHeader minimal={scroll} navigation={navigation} >
                <DynamicIcon iconType="maps" iconProps={{ width: 20, height: 26 }} />
            </ModuleHeader>
            <Center w={'100%'} px={15}>
                <Divider mx="auto" w="160px" bg="primary.text" my="5" />
                <ScrollView h="85%" onScroll={(event: { nativeEvent: { contentOffset: { y: number; }; }; }) => setScroll(event.nativeEvent.contentOffset.y > 40 ? true : false)}>
                    <HStack borderTopRadius="7" space={0} alignItems="center" w="100%" bg="primary.darkbox" >
                        <Text w="100%" py="10px" pl="18px">Practical information</Text>
                    </HStack>
                    <HStack>
                        <Listing rounded={0} />
                    </HStack>
                </ScrollView>
            </Center>
        </Master>
    );
};

Index.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Index;
