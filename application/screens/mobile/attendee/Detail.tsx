import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/mobile/layouts/Master';
import Header from 'application/screens/mobile/layouts/headers/Header';
import { Center } from 'native-base';
import { useState } from 'react';
import DetailTemplate from 'application/components/templates/attendees/mobile/Detail';

const Detail = ({ navigation }: any) => {

    const [scroll, setScroll] = useState(false);

    return (
        <Master navigation={navigation}>
            <Header minimal={scroll} navigation={navigation} />
            <Center w={'100%'} px={15}>
                <DetailTemplate speaker={0} />
            </Center>
        </Master>
    );
};

Detail.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Detail;
