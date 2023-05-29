import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/mobile/layouts/Master';
import ReturnHeader from 'application/screens/mobile/layouts/headers/ReturnHeader';
import { Center, ScrollView, Text } from 'native-base';
import { useState } from 'react';
import UseInfoService from 'application/store/services/UseInfoService';
import BannerView from 'application/components/atoms/banners/RectangleView';
import MobileLoading from 'application/components/atoms/MobileLoading';
import UseLoadingService from 'application/store/services/UseLoadingService';
import Detail from 'application/components/templates/event_info/Detail';

const PageDetail = ({ navigation, route }: any) => {

    const { loading } = UseLoadingService();

    const [scroll, setScroll] = useState(false);

    const { page } = UseInfoService();

    return (
        <Master navigation={navigation}>
            {loading ? (
                <MobileLoading />
            ) : (
                <>
                    <ReturnHeader minimal={scroll} navigation={navigation} >
                        <Text fontSize="xl">{page.name}</Text>
                    </ReturnHeader>
                    <Center w={'100%'} px={15} mt={5}>
                        <ScrollView h="60%" onScroll={(event: { nativeEvent: { contentOffset: { y: number; }; }; }) => setScroll(event.nativeEvent.contentOffset.y > 40 ? true : false)}>
                            <Detail />
                        </ScrollView>
                        <BannerView />
                    </Center>
                </>
            )}
        </Master>
    );
};

PageDetail.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default PageDetail;
