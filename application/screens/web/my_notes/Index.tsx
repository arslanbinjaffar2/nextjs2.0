import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/web/layouts/Master';
import UseEventService from 'application/store/services/UseEventService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import IndexTemplate from 'application/components/templates/myNotes/web/Index';

type indexProps = {
    navigation: unknown
}

const Index = ({ navigation }: indexProps) => {
    const { modules,event } = UseEventService();
    const module = modules.find((module) => module.alias === 'my_notes');
    return (
        <>
            <NextBreadcrumbs module={module} />
            <IndexTemplate/> 
        </>
    );
};

Index.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Index;