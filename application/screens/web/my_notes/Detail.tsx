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
    const { modules, event } = UseEventService();
    const module = modules.find((module) => module.alias === 'my_notes');
    const router = useRouter();
    const { type } = router.query;
    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    let moduleTitle = '';
    if (typeof type === 'string') {
        moduleTitle = type;
        if (type === 'programs') {
            moduleTitle = modules?.find((module) => module?.alias === 'agendas')?.name || moduleTitle;
        } else if (type === 'exhibitors') {
            moduleTitle = modules?.find((module) => module?.alias === 'exhibitors')?.name || moduleTitle;
        } else if (type === 'sponsors') {
            moduleTitle = modules?.find((module) => module?.alias === 'sponsors')?.name || moduleTitle;
        } else if (type === 'ddirectory') {
            moduleTitle = modules?.find((module) => module?.alias === 'ddirectory')?.name || moduleTitle;
        }
    }
    return (
        <>
            <NextBreadcrumbs module={module} title={capitalizeFirstLetter(moduleTitle)} />
            <IndexTemplate />
        </>
    );
};

Index.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Index;