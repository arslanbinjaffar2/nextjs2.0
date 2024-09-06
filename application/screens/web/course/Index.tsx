import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/web/layouts/Master';

import IndexTemplate from 'application/components/templates/course/Index';

type indexProps = {
    navigation: unknown
}

const Index = ({ navigation }: indexProps) => {

    return (
            <IndexTemplate/>
    );
};

Index.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Index;
