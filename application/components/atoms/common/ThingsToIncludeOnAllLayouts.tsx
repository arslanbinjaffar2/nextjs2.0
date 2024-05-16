import * as React from 'react';
import AlertPopups from 'application/components/atoms/common/AlertPopups';
import SocketRequestModal from 'application/components/atoms/reservation/SocketRequestModal';
const ThingsToIncludeOnAllLayouts = () => {

    return (
            <>
                <AlertPopups />
                <SocketRequestModal />
            </>
    );

};

export default ThingsToIncludeOnAllLayouts;
