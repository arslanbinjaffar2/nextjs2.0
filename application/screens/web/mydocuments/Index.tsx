import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/web/layouts/Master';
import UseEventService from 'application/store/services/UseEventService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import { Text } from 'native-base';
import NoRecordFound from 'application/components/atoms/NoRecordFound';

type indexProps = {
    navigation: unknown
}

const Index = ({ navigation }: indexProps) => {
    const { modules,event } = UseEventService();
    const module = modules.find((module) => module.alias === 'mydocuments');
    return (
        <>
            <NextBreadcrumbs module={module} />
            <NoRecordFound mb="3" bg="primary.box"/>
        </>
    );
};

Index.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Index;
