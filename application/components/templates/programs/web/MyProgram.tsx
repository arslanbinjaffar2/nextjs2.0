import * as React from 'react';
import { Container, HStack, Spacer, Text } from 'native-base';
import Search from 'application/components/atoms/programs/Search';
import SlideView from 'application/components/molecules/programs/SlideView';
import UseProgramService from 'application/store/services/UseProgramService';
import in_array from "in_array";
import SectionLoading from 'application/components/atoms/SectionLoading';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseAuthService from 'application/store/services/UseAuthService';
import LoadMore from 'application/components/atoms/LoadMore';
import UseEventService from 'application/store/services/UseEventService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';

const MyProgram = () => {

    const mounted = React.useRef(false);
    
    const { event, modules } = UseEventService();

    const { FetchPrograms, programs, page, query } = UseProgramService();

    const { loading, scroll, processing } = UseLoadingService();

    const { response } = UseAuthService();

    React.useEffect(() => {
        if (mounted.current) {
            FetchPrograms({ query: query, page: page + 1, screen: 'my-program', id: response?.data?.user?.id, track_id: 0 });
        }
    }, [scroll]);

    React.useEffect(() => {
        mounted.current = true;
        return () => { mounted.current = false; };
    }, []);

    React.useEffect(() => {
        FetchPrograms({ query: '', page: 1, screen: 'my-program', id: response?.data?.user?.id, track_id: 0 });
    }, []);

    const module = modules.find((module) => module.alias === 'myprograms');

    return (
        <>
            <NextBreadcrumbs module={module} />
            <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                <Text  fontSize="2xl">{modules?.find((polls)=>(polls.alias == 'myprograms'))?.name ?? ''}</Text>
                <Spacer />
                <Search tab={'my-program'} />
            </HStack>
            {in_array('programs', processing) && page === 1 ? (
                <SectionLoading />
            ) : (
                <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                    <SlideView section="program" programs={programs} />
                </Container>
            )}
            {(in_array('programs', processing) || in_array('tracks', processing)) && page > 1 && (
                <LoadMore />
            )}
        </>
    );
};

export default MyProgram;
