import * as React from 'react';

import PropTypes from 'prop-types';

import DetailTemplate from 'application/components/templates/settings/hdQuestions/web/Detail';

type indexProps = {
    navigation: unknown
}

const Detail = ({ navigation }: indexProps) => {

    return (
        <DetailTemplate/>
    );

};

Detail.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Detail;
