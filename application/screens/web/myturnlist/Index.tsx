import * as React from 'react';
import PropTypes from 'prop-types';
import IndexTemplate from 'application/components/templates/myTurnList/web/Index';
import UseEventService from 'application/store/services/UseEventService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import { Text } from 'native-base';

type indexProps = {
    navigation: unknown
}

const Index = ({ navigation }: indexProps) => {
    const { modules,event } = UseEventService();
    const module = modules.find((module) => module.alias === 'myturnlist');
   
    return (
        <>
            <NextBreadcrumbs module={module} />
            <IndexTemplate />
        </>
    );
};

Index.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Index;
