import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/web/layouts/Master';
import IndexTemplate from 'application/components/templates/attendees/web/Index';

type indexProps = {
    navigation: unknown
}

const Index = ({ navigation }: indexProps) => {

    return (
            <IndexTemplate banner_module='speakers' speaker={1} screen='attendees' />
    );

};

Index.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Index;
