import * as React from 'react';

import PropTypes from 'prop-types';

import Master from 'application/screens/web/layouts/Master';

import CheckInDetails from 'application/components/templates/check-in/web/Details';

type indexProps = {
    navigation: unknown
}

const Detail = ({ navigation }: indexProps) => {

    return (
        <CheckInDetails />
    );

};

Detail.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Detail;
