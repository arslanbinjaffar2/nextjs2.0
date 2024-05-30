import * as React from 'react';
import PropTypes from 'prop-types';
import UseEventService from 'application/store/services/UseEventService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import IndexTemplate from 'application/components/templates/myNotes/web/Details';
import { useRouter } from 'next/router';

type indexProps = {
    navigation: unknown
}

const Index = ({ navigation }: indexProps) => {
    const { modules } = UseEventService();
    const module = modules.find((module) => module.alias === 'my_notes');
    const router = useRouter();
    const { type } = router.query;
    const ModuleTitle:any=type

    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>
            <NextBreadcrumbs module={module} title={capitalizeFirstLetter(ModuleTitle)}/>
            <IndexTemplate/> 
        </>
    );
};

Index.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Index;