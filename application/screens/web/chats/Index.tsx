import * as React from 'react';

import PropTypes from 'prop-types';

import Master from 'application/screens/web/layouts/Master';

import ChatIndex from 'application/components/templates/chat/web/Index';

type indexProps = {
    navigation: unknown
}

const Index = ({ navigation }: indexProps) => {

    return (
        <ChatIndex navigation={navigation} />
    );

};

Index.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Index;