import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/web/layouts/Master';
import MyProgram from 'application/components/templates/programs/MyProgram';

type indexProps = {
    navigation: unknown
}

const Index = ({ navigation }: indexProps) => {

    return (
        <Master>
            <MyProgram />
        </Master>
    );

};

Index.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Index;
