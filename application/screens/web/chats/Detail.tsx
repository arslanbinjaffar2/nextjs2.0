import * as React from 'react';

import PropTypes from 'prop-types';

import Master from 'application/screens/web/layouts/Master';

import ChatDetails from 'application/components/templates/chat/web/Detail';

type indexProps = {
    navigation: unknown
}

const Detail = ({ navigation }: indexProps) => {

    return (
        <ChatDetails navigation={navigation}/>
    );

};

Detail.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Detail;
