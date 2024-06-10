import * as React from 'react';
import PropTypes from 'prop-types';
import UseEventService from 'application/store/services/UseEventService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';

type indexProps = {
    navigation: unknown
}

const Index = ({ navigation }: indexProps) => {
    const { modules,event } = UseEventService();
    const module = modules.find((module) => module.alias === 'mydocuments');
    return (
        <>
            <NextBreadcrumbs module={module} />
        </>
    );
};

Index.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Index;
