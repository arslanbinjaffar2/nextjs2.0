import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/mobile/layouts/Master';
import ReturnHeader from 'application/screens/mobile/layouts/headers/ReturnHeader';
import { Center, ScrollView, Text } from 'native-base';
import { useState } from 'react';
import UseInfoService from 'application/store/services/UseInfoService';
import MobileLoading from 'application/components/atoms/MobileLoading';
import UseLoadingService from 'application/store/services/UseLoadingService';
import Detail from 'application/components/templates/event_info/Detail';
import UseEventService from 'application/store/services/UseEventService';
import { createParam } from 'solito';

type ScreenParams = { id: string, cms: string | undefined }

const { useParam } = createParam<ScreenParams>()

const PageDetail = ({ navigation, route }: any) => {

    const { loading } = UseLoadingService();

    const [scroll, setScroll] = useState(false);

    const { page } = UseInfoService();

    const { event } = UseEventService();

    const [cms] = useParam('cms');

    return (
        <Master navigation={navigation}>
            {loading ? (
                <MobileLoading />
            ) : (
                <>
                    <ReturnHeader minimal={scroll} navigation={navigation} back={`/${event.url}/${cms}`} >
                        <Text fontSize="xl">{page.name}</Text>
                    </ReturnHeader>
                    <Center w={'100%'} px={15} mt={5}>
                        <Detail />
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
