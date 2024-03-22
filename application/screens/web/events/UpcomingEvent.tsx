import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/web/layouts/Master';
import UseEventService from 'application/store/services/UseEventService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import { Text } from 'native-base';

type indexProps = {
    navigation: unknown
}

const Index = ({ navigation }: indexProps) => {
    const { event } = UseEventService()
    const { modules } = UseEventService();
    const module = modules.find((module) => module.alias === 'upcomingEvents');
    return (
        <>
            <NextBreadcrumbs module={module} />
            <Text p={5} mb="3" bg="primary.box" rounded="lg" w="100%">{event?.labels?.GENERAL_NO_RECORD}</Text>
        </>
    );
};

Index.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Index;
