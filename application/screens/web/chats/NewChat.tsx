import * as React from 'react';

import PropTypes from 'prop-types';

import Master from 'application/screens/web/layouts/Master';

import NewChatTemplate from 'application/components/templates/chat/web/NewChat';

type indexProps = {
    navigation: unknown
}

const NewChat = ({ navigation }: indexProps) => {

    return (
        <NewChatTemplate navigation={navigation}/>
    );

};

NewChat.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default NewChat;