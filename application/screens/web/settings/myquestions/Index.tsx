import * as React from 'react';

import PropTypes from 'prop-types';

import Master from 'application/screens/web/layouts/Master';

type indexProps = {
    navigation: unknown
}

const Index = ({ navigation }: indexProps) => {

    return (
        <Master section='settings'>

        </Master>
    );

};

Index.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Index;
