import * as React from 'react';

import PropTypes from 'prop-types';

import Master from 'application/screens/web/layouts/Master';

import NewChatAttendeeTemplate from 'application/components/templates/chat/web/NewChatAttendee';

type indexProps = {
    navigation: unknown
}

const NewChatAttendee = ({ navigation }: indexProps) => {

    return (
        <NewChatAttendeeTemplate navigation={navigation}/>
    );

};

NewChatAttendee.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default NewChatAttendee;