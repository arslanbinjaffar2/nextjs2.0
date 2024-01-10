import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/web/layouts/Master';
import AttendeeDetail from 'application/components/templates/attendees/web/Detail';

type indexProps = {
    navigation: unknown
}

const Detail = ({ navigation }: indexProps) => {

    return (
            <AttendeeDetail speaker={1} />
    );

};

Detail.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Detail;
