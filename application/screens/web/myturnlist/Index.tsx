import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/web/layouts/Master';
import UseEventService from 'application/store/services/UseEventService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import { Text } from 'native-base';
import IndexTemplate from 'application/components/templates/myTurnList/web/Index';

type indexProps = {
    navigation: unknown
}

const Index = ({ navigation }: indexProps) => {
    return (
        <>
            <IndexTemplate />
        </>
    );
};

Index.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Index;
