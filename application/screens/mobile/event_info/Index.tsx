import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/mobile/layouts/Master';
import ModuleHeader from 'application/screens/mobile/layouts/headers/ModuleHeader';
import { Center, ScrollView, HStack, Text } from 'native-base';
import { useState } from 'react';
import DynamicIcon from 'application/utils/DynamicIcon';
import UseInfoService from 'application/store/services/UseInfoService';
import Listing from 'application/components/templates/event_info/Listing';
import BannerView from 'application/components/atoms/banners/RectangleView';
import MobileLoading from 'application/components/atoms/MobileLoading';
import UseLoadingService from 'application/store/services/UseLoadingService';
import { useIsFocused } from '@react-navigation/native';
import UseEventService from 'application/store/services/UseEventService';
import ReturnHeader from '../layouts/headers/ReturnHeader';
import { createParam } from 'solito';

type ScreenParams = { id: any, cms: any }

const { useParam } = createParam<ScreenParams>()

const Index = ({ navigation }: any) => {

    const { loading } = UseLoadingService();

    const [scroll, setScroll] = useState(false);

    const { FetchInfo, info, parent_folder } = UseInfoService();

    const { event } = UseEventService();

    const isFocused = useIsFocused();

    const [cms] = useParam('cms');

    const [id] = useParam('id');

    React.useEffect(() => {
        if (isFocused) {
            FetchInfo({ type: cms!, id: Number(id) });
        }
    }, [id, cms, isFocused]);

    return (
        <Master navigation={navigation}>
            {loading ? (
                <MobileLoading />
            ) : (
                <>
                    {Number(id) === 0 ? (
                        <ModuleHeader minimal={scroll} navigation={navigation}>
                            <DynamicIcon iconType={cms?.replace('-', '_')} iconProps={{ width: 20, height: 26 }} />
                        </ModuleHeader>
                    ) : (
                        <ReturnHeader minimal={scroll} navigation={navigation} back={`/${event.url}/${cms!}/event-info/${parent_folder}`} >
                            <DynamicIcon iconType={cms?.replace('-', '_')} iconProps={{ width: 20, height: 26 }} />
                        </ReturnHeader>
                    )}
                    <Center w={'100%'} px={15} mt={5}>
                        <HStack borderTopRadius="7" space={0} alignItems="center" w="100%" bg="primary.darkbox" >
                            <Text w="100%" py="10px" pl="18px">
                                {
                                    (() => {
                                        if (cms === 'practical-info') {
                                            return 'Practical information'
                                        } else if (cms === 'additional-info') {
                                            return 'Additional information'
                                        } else if (cms === 'general-info') {
                                            return 'General information'
                                        }
                                    })()
                                }
                            </Text>
                        </HStack>
                        <ScrollView h="58%" onScroll={(event: { nativeEvent: { contentOffset: { y: number; }; }; }) => setScroll(event.nativeEvent.contentOffset.y > 40 ? true : false)}>
                            <HStack>
                                <Listing rounded={0} cms={cms!} />
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
