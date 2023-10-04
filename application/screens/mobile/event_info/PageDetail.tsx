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
import { useIsFocused } from '@react-navigation/native';

type ScreenParams = { id: any, cms: any }

const { useParam } = createParam<ScreenParams>()

const PageDetail = ({ navigation, route }: any) => {

    const { loading } = UseLoadingService();

    const [scroll, setScroll] = useState(false);

    const { page, parent_folder, FetchPage } = UseInfoService();

    const { event } = UseEventService();

    const [cms] = useParam('cms');

    const [id] = useParam('id');

    const isFocused = useIsFocused();

    React.useMemo(() => {
        if (isFocused) {
            FetchPage({ id: Number(id), type: cms });
        }
    }, [id, cms, isFocused]);

    return (
        <Master navigation={navigation}>
            {loading ? (
                <MobileLoading />
            ) : (
                <>
                    <ReturnHeader minimal={scroll} navigation={navigation} back={`/${event.url}/${cms}/event-info/${parent_folder}`} >
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
