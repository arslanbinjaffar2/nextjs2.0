import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/mobile/layouts/Master';
import ReturnHeader from '../layouts/headers/ReturnHeader';
import { Center } from 'native-base';
import { useState } from 'react';
import DetailTemplate from 'application/components/templates/attendees/mobile/Detail';
import DynamicIcon from 'application/utils/DynamicIcon';

const Detail = ({ navigation }: any) => {

    const [scroll, setScroll] = useState(false);

    return (
        <Master navigation={navigation}>
            <ReturnHeader minimal={scroll} navigation={navigation} back={{
                screen: 'speakers',
            }} mobile={true} >
                <DynamicIcon iconType={'speakers'} iconProps={{ width: 35, height: 26 }} />
            </ReturnHeader>
            <Center w={'100%'} px={15}>
                <DetailTemplate speaker={1} />
            </Center>
        </Master>
    );
};

Detail.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Detail;
