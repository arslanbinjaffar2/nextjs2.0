import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/mobile/layouts/Master';
import ModuleHeader from 'application/screens/mobile/layouts/headers/ModuleHeader';
import { Center, ScrollView, Divider, HStack, Text, Spinner } from 'native-base';
import { useState } from 'react';
import DynamicIcon from 'application/utils/DynamicIcon';
import UseInfoService from 'application/store/services/UseInfoService';
import Listing from 'application/components/templates/event_info/Listing';
import BannerView from 'application/components/atoms/banners/RectangleView';
import Loading from 'application/components/atoms/Loading';
import UseLoadingService from 'application/store/services/UseLoadingService';
import { useIsFocused } from '@react-navigation/native';

const Index = ({ navigation, route }: any) => {

    const { loading } = UseLoadingService();

    const [scroll, setScroll] = useState(false);

    const { FetchInfo, info } = UseInfoService();

    const isFocused = useIsFocused();

    const aliases: any = {
        infobooth: 'practical-info',
        additional_info: 'additional-info',
        general_info: 'general-info'
    }

    React.useEffect(() => {
        FetchInfo(aliases[route.name]);
    }, [isFocused]);
  
    return (
        <Master navigation={navigation}>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <ModuleHeader minimal={scroll} navigation={navigation} >
                        <DynamicIcon iconType="maps" iconProps={{ width: 20, height: 26 }} />
                    </ModuleHeader>
                    <Center w={'100%'} px={15}>
                        <Divider mx="auto" w="160px" bg="primary.text" my="5" />
                        <ScrollView h="60%" onScroll={(event: { nativeEvent: { contentOffset: { y: number; }; }; }) => setScroll(event.nativeEvent.contentOffset.y > 40 ? true : false)}>
                            <HStack borderTopRadius="7" space={0} alignItems="center" w="100%" bg="primary.darkbox" >
                                <Text w="100%" py="10px" pl="18px">
                                    {
                                        (() => {
                                            if (route.name === 'infobooth') {
                                                return 'Practical information'
                                            } else if (route.name === 'additional_info') {
                                                return 'Additional information'
                                            } else if (route.name === 'general_info') {
                                                return 'General information'
                                            }
                                        })()
                                    }
                                </Text>
                            </HStack>
                            <HStack>
                                <Listing rounded={0} />
                            </HStack>
                        </ScrollView>
                        <BannerView />
                    </Center>
                </>
            )}


        </Master>
    );
};

Index.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Index;
